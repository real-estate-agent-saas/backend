import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateSlugDto } from './dto/update-slug.dto';

// Constant
import { RESERVED_SLUGS } from './constants/reserved-slugs';
import { Prisma } from '@prisma/client';

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

  // ---------------------------------------------------- Read ------------------------------------------------
  async getProfile(id: number) {
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

  // ---------------------------------------------------- Update ------------------------------------------------
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

  // ---------------------------------------------------- Delete ------------------------------------------------
  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // ---------------------------------------------------- List all specialties ------------------------------------------------
  async listSpecialties() {
    return this.prisma.specialty.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  // ---------------------------------------------------- Auxiliary function to validate slug ------------------------------------------------

  private validateSlug(slug: string): void {
    if (RESERVED_SLUGS.includes(slug)) {
      throw new BadRequestException('Slug não permitido');
    }
  }

  // ---------------------------------------------------- Checks Slug Availability ------------------------------------------------
  async checkSlugAvailability(slugDto: UpdateSlugDto) {
    const slug = slugDto.slug;

    // Verifies if slug is not a reserved word
    this.validateSlug(slug);

    const existingSlug = await this.prisma.user.findFirst({
      where: {
        slug: slug,
      },
    });

    if (existingSlug) {
      return { available: false, reason: 'Já existe no sistema' };
    }
    return { available: true };
  }

  // ---------------------------------------------------- Get user slug ------------------------------------------------
  async getSlug(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        slug: true,
      },
    });
  }

  // ---------------------------------------------------- Updates user slug ------------------------------------------------
  async updateSlug(id: number, slugDto: UpdateSlugDto) {
    const slug = slugDto.slug;

    // Verifies if slug is not a reserved word
    this.validateSlug(slug);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: { slug },
        select: {
          slug: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' // Unique constraint failed (It means that the slug already exists)
      ) {
        throw new BadRequestException('Este slug já está em uso'); // Friendly message
      }
      throw error;
    }
  }
}
