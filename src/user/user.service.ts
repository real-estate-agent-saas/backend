import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Creates a new user
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('Não foi possível concluir o cadastro.');
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  // Updates the current user based on his ID from the JWT Token
  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: any = { ...updateUserDto };

    // If password is provided, hash it before updating
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // If specialties is provided, updates them
    if (updateUserDto.specialties) {
      data.specialties = {
        set: updateUserDto.specialties.map((id) => ({ id })),
      };
    }

    //Updates user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        specialties: true,
      },
    });

    // Return the updated data with no password
    return {
      ...updatedUser,
      password: undefined,
    };
  }

  // Gets all user data
  async read(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        specialties: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Gets all specialties
  async getAllSpecialties() {
    return this.prisma.specialty.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  // Searches user by email
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
