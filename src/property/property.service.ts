import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService to interact with the database

  //-------------------------------- Creates a property that is related to one user with a new address -----------------------------
  async create(propertyDto: CreatePropertyDto, userId: User['id']) {
    const { address, ...propertyData } = propertyDto;

    const propertyInput: Prisma.PropertyCreateInput = {
      ...propertyData,
      user: {
        connect: { id: userId },
      },
      address: {
        create: address,
      },
    };

    const property = await this.prisma.property.create({
      data: propertyInput,
      include: {
        address: true,
      },
    });

    return property;
  }

  //-------------------------------- Gets (ALL) properties related to the current user -----------------------------
  async findAll(userId: User['id']) {
    const properties = await this.prisma.property.findMany({
      where: {
        userId: userId, // Logged in user
      },
      include: {
        address: true,
        propertyGallery: true,
        floorPlanGallery: true,
        propertyLeisure: true,
      },
      orderBy: {
        createdAt: 'desc', // Orders by creation date (most recent first)
      },
    });

    if (properties.length === 0) {
      throw new NotFoundException(
        'Nenhum imóvel encontrado para este usuário.',
      );
    }

    return properties;
  }

  //-------------------------------- Gets (ONE) property related to the current user -----------------------------
  async findOne(propertyId: number, userId: number) {
    const property = await this.prisma.property.findUnique({
      where: {
        id: propertyId,
        userId: userId, // Brings properties that belong to the current user
      },
      include: {
        address: true,
        propertyGallery: true,
        floorPlanGallery: true,
        propertyLeisure: true,
      },
    });

    if (!property) {
      throw new NotFoundException('Imóvel não encontrado');
    }

    return property;
  }

  //-------------------------------- Updates a property related to the current user -----------------------------
  async update(
    propertyId: number,
    updatePropertyDto: UpdatePropertyDto,
    userId: number,
  ) {
    // Verifies if the property exists and belongs to the current user
    const existingProperty = await this.prisma.property.findFirst({
      where: {
        id: propertyId,
        userId: userId,
      },
    });

    // If the property does not exist or does not belong to the user
    if (!existingProperty) {
      throw new NotFoundException('Imóvel não encontrado');
    }

    // Updates the property and returns the updated property
    const { address, ...propertyData } = updatePropertyDto;
    return this.prisma.property.update({
      where: { id: propertyId },
      data: {
        ...propertyData,
        ...(address && {
          // Updates address only if provided
          address: {
            update: address,
          },
        }),
      },
      include: {
        address: true,
        propertyGallery: true,
        floorPlanGallery: true,
        propertyLeisure: true,
      },
    });
  }

  //-------------------------------- Deletes a property related to the current user -----------------------------
  async remove(propertyId: number, userId: number) {
    // Verifies if the property exists and belongs to the user
    const property = await this.prisma.property.findFirst({
      where: {
        id: propertyId,
        userId: userId,
      },
      include: {
        address: true,
      },
    });

    // If the property does not exist or does not belong to the user
    if (!property) {
      throw new NotFoundException(
        'Imóvel não encontrado',
      );
    }

    // Deletes the property and its address if it exists
    return this.prisma.$transaction(async (tx) => {
      // Removes the address first if it exists
      if (property.address) {
        await tx.address.delete({
          where: { propertyId },
        });
      }

      // Removes the property
      return tx.property.delete({
        where: { id: propertyId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    });
  }

}
