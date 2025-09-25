import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// DTOs
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/update-user.dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------------------------------------------- auxiliary function to find user by email ------------------------------------------------
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // ---------------------------------------------------- Create ------------------------------------------------
  // async create(createUserDto: CreateUserDto) {
  //   const existingUser = await this.findByEmail(createUserDto.email);

  //   if (existingUser) {
  //     throw new BadRequestException('Não foi possível concluir o cadastro.');
  //   }

  //   const data = {
  //     ...createUserDto,
  //     password: await bcrypt.hash(createUserDto.password, 10),
  //   };

  //   const createdUser = await this.prisma.user.create({
  //     data: {
  //       ...data,
  //       dynamicWebsite: {
  //         create: {
  //           templateId: 1,
  //         },
  //       },
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       email: true,
  //     }
  //   });

  //   return {
  //     createdUser
  //   };
  // }

  // ---------------------------------------------------- Read ------------------------------------------------
  
  // async getProfile(id: number) {
  //   return this.prisma.user.findUnique({
  //     where: { id },
  //     include: {
  //       specialties: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // ---------------------------------------------------- Update ------------------------------------------------
  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   const data: any = { ...updateUserDto };

  //   // If password is provided, hash it before updating
  //   if (updateUserDto.password) {
  //     data.password = await bcrypt.hash(updateUserDto.password, 10);
  //   }

  //   // If specialties is provided, updates them
  //   if (updateUserDto.specialties) {
  //     data.specialties = {
  //       set: updateUserDto.specialties.map((id) => ({ id })),
  //     };
  //   }

  //   //Updates user
  //   const updatedUser = await this.prisma.user.update({
  //     where: { id },
  //     data,
  //     include: {
  //       specialties: true,
  //     },
  //   });

  //   // Return the updated data with no password
  //   return {
  //     ...updatedUser,
  //     password: undefined,
  //   };
  // }

  // ---------------------------------------------------- Delete ------------------------------------------------
  // async delete(id: number) {
  //   return this.prisma.user.delete({
  //     where: { id },
  //   });
  // }

  // ---------------------------------------------------- List all specialties ------------------------------------------------
  // async listSpecialties() {
  //   return this.prisma.specialty.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //     },
  //   });
  // }
}
