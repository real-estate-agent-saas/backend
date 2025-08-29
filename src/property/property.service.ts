import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService to interact with the database

  //------------------------------------ (HELPER) Verifies if the property exists and belongs to the current user -----------------------------------
  private async findUserProperty(
    propertyId: number,
    userId: number,
    include?: Prisma.PropertyInclude, // Specifies which fields to bring if the property is found
  ) {
    const property = await this.prisma.property.findFirst({
      where: {
        id: propertyId,
        userId: userId,
      },
      include: {
        address: {
          include: {
            zone: {
              select: {
                name: true,
              },
            },
          },
        },
        floorPlanGallery: true,
        propertyGallery: true,
        propertyLeisure: true,
      },
    });

    if (!property) {
      throw new NotFoundException('Imóvel não encontrado');
    }

    return property;
  }

  //---------------------------------------------------- Creates a property with a new address -----------------------------
  async create(createPropertyDto: CreatePropertyDto, userId: number) {
    const {
      address,
      propertyGallery,
      floorPlanGallery,
      propertyLeisure,
      propertyPurposes,
      propertyStandings,
      propertyTypes,
      propertyTypologies,
      deliveryStatus,
      ...propertyData
    } = createPropertyDto;
  }

  //---------------------------------------------------------------- Gets (ALL) properties -------------------------------------
  async findAll(userId: number) {
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

    if (!properties.length) {
      throw new NotFoundException(
        'Nenhum imóvel encontrado para este usuário.',
      );
    }

    return properties;
  }

  //------------------------------------------------------------ Gets (ONE) property -------------------------------------
  async findOne(propertyId: number, userId: number) {
    return this.findUserProperty(propertyId, userId, {
      address: true,
      propertyGallery: true,
      floorPlanGallery: true,
      propertyLeisure: true,
    });
  }

  //------------------------------------------------------------ Updates a property  -----------------------------------------
  // async update(
  //   propertyId: number,
  //   updatePropertyDto: UpdatePropertyDto,
  //   userId: number,
  // ) {
  //   await this.findUserProperty(propertyId, userId);

  //   const { address, ...propertyData } = updatePropertyDto;
  //   return this.prisma.property.update({
  //     where: { id: propertyId },
  //     data: {
  //       ...propertyData,
  //       ...(address && { address: { update: address } }), // If address is provided updates it
  //     },
  //     include: {
  //       address: true,
  //       propertyGallery: true,
  //       floorPlanGallery: true,
  //       propertyLeisure: true,
  //     },
  //   });
  // }

  //-------------------------------------------------------- Enable/Disable Property -------------------------------------
  private async togglePropertyStatus(
    propertyId: number,
    userId: number,
    isActive: boolean,
  ) {
    await this.findUserProperty(propertyId, userId);
    return this.prisma.property.update({
      where: { id: propertyId },
      data: { isActive },
    });
  }

  async disable(propertyId: number, userId: number) {
    return this.togglePropertyStatus(propertyId, userId, false);
  }

  async enable(propertyId: number, userId: number) {
    return this.togglePropertyStatus(propertyId, userId, true);
  }
  //---------------------------------------------------------- Deletes a property  -------------------------------------------
  async delete(propertyId: number, userId: number) {
    await this.findUserProperty(propertyId, userId);

    return this.prisma.property.delete({
      where: { id: propertyId },
      include: {
        user: { select: { id: true, name: true } },
        address: true,
        propertyGallery: true,
        floorPlanGallery: true,
        propertyLeisure: true,
      },
    });
  }
}
