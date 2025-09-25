import { BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "src/application/dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";
import { IUserRepository } from "src/domain/interfaces/Iuser.repository";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('User alreadys exists');
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.userRepository.create({
      ...data,
    });

    if (!createdUser) {
      throw new BadRequestException('not possible to create user');
    }

    return {
      createdUser
    };
    
    // const createdUser = await this.prisma.user.create({
    //   data: {
    //     ...data,
    //     dynamicWebsite: {
    //       create: {
    //         templateId: 1,
    //       },
    //     },
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //   }
    // });
  }
}