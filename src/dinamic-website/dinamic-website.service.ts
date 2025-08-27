import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDinamicWebsiteDto } from './dto/create-dinamic-website.dto';
import { UpdateDinamicWebsiteDto } from './dto/update-dinamic-website.dto';
import { RESERVED_SLUGS } from 'src/dinamic-website/constants/reserved-slugs';
import { UpdateSlugDto } from 'src/dinamic-website/dto/update-slug.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DinamicWebsiteService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------------------------------------------- Auxiliary function to validate slug ------------------------------------------------
  private validateSlug(slug: string): void {
    if (RESERVED_SLUGS.includes(slug)) {
      throw new BadRequestException('Slug não permitido');
    }
  }

  // ---------------------------------------------------- Checks Slug Availability ------------------------------------------------
  async checkSlugAvailability(slugDto: UpdateSlugDto) {
    const slug = slugDto.slug.toLocaleLowerCase();

    // Verifies if slug is not a reserved word
    this.validateSlug(slug);

    const existingSlug = await this.prisma.dinamicWebsite.findFirst({
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
    return this.prisma.dinamicWebsite.findUnique({
      where: { id },
      select: {
        slug: true,
      },
    });
  }

  // ---------------------------------------------------- Updates user slug ------------------------------------------------
  async updateSlug(id: number, slugDto: UpdateSlugDto) {
    const slug = slugDto.slug.toLowerCase();

    // Verifies if slug is not a reserved word
    this.validateSlug(slug);

    try {
      return await this.prisma.dinamicWebsite.update({
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

  // ---------------------------------------------------- Get user data based on slug ------------------------------------------------
  async getUserBasedOnSlug(slug: string) {
    const existingSlug = await this.prisma.dinamicWebsite.findUnique({
      where: { slug },
      include: {
        user: true,
      },
    });

    if (!existingSlug) {
      throw new NotFoundException('Slug não encontrado');
    }

    return existingSlug;
  }

  // ---------------------------------------------------- Checks if the slug exists ------------------------------------------------
  async findOne(slug: string) {
    const dinamicWebsite = await this.prisma.dinamicWebsite.findUnique({
      where: { slug },
      include: {
        template: true
      }
    });

    if (dinamicWebsite) {
      return dinamicWebsite;
    }

    throw new NotFoundException('Website não encontrado');
  }
}
