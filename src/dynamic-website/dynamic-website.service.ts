import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDynamicWebsiteDto } from './dto/create-dynamic-website.dto';
import { UpdateDynamicWebsiteDto } from './dto/update-dynamic-website.dto';
import { RESERVED_SLUGS } from 'src/dynamic-website/constants/reserved-slugs';
import { UpdateSlugDto } from 'src/dynamic-website/dto/update-slug.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DynamicWebsiteService {
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

    const existingSlug = await this.prisma.dynamicWebsite.findFirst({
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
    return this.prisma.dynamicWebsite.findUnique({
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
      return await this.prisma.dynamicWebsite.update({
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
    const existingSlug = await this.prisma.dynamicWebsite.findUnique({
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

  // ---------------------------------------------------- Returns a dynamic website based on slug ------------------------------------------------
  async findOne(slug: string) {
    const dynamicWebsite = await this.prisma.dynamicWebsite.findUnique({
      where: { slug },
      include: {
        template: true,
        user: {
          select: {
            name: true,
            tradingName: true,
            publicEmail: true,
            whatsapp: true,
            phone: true,
            facebook: true,
            instagram: true,
            linkedin: true,
            profileImage: true,
            bio: true,
            careerStartDate: true,
            creci: true,
            gender: true,
            specialties: true
          },
        },
      },
    });

    if (dynamicWebsite) {
      return dynamicWebsite;
    }

    throw new NotFoundException('Website não encontrado');
  }
}
