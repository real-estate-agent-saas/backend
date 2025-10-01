import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  //------------------------------------ (HELPER) Verifies if the property exists and belongs to the current user -----------------------------------
  private async findUserProperty(
    propertyId: number,
    userId: number,
    include?: Prisma.PropertyInclude, // Specifies which fields to bring if the property is found
  ) {

    if(!propertyId || !userId) {
      throw new BadRequestException("ID do usuário e do Imóvel são obrigatórios!")
    }

    const property = await this.prisma.property.findFirst({
      where: {
        id: propertyId,
        userId: userId,
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
      propertyPurposeId,
      propertyStandingId,
      propertyTypeId,
      propertyTypologyId,
      deliveryStatusId,
      propertyLeisure,
      propertyGallery,
      floorPlanGallery,
      ...propertyData
    } = createPropertyDto;

    if (!address) {
      throw new BadRequestException(
        'Enderço é necessário para criação do imóvel',
      );
    }

    const propertyInput: Prisma.PropertyCreateInput = {
      // Basic property data and user connection
      ...propertyData,
      user: {
        connect: { id: userId },
      },

      //------------------------------------- NESTED QUERIES ----------------------

      address: {
        create: {
          ...address,
        },
      },

      //------- FK connections ------
      ...(propertyPurposeId && {
        propertyPurpose: {
          connect: {
            id: propertyPurposeId,
          },
        },
      }),
      ...(propertyStandingId && {
        propertyStanding: {
          connect: {
            id: propertyStandingId,
          },
        },
      }),
      ...(propertyTypeId && {
        propertyType: {
          connect: {
            id: propertyTypeId,
          },
        },
      }),
      ...(propertyTypologyId && {
        propertyTypology: {
          connect: {
            id: propertyTypologyId,
          },
        },
      }),
      ...(deliveryStatusId && {
        deliveryStatus: {
          connect: {
            id: deliveryStatusId,
          },
        },
      }),
      ...(propertyLeisure && {
        propertyLeisure: {
          connect: propertyLeisure.map((id) => ({ id })),
        },
      }),

      //------ Images Creations ------
      propertyGallery: propertyGallery?.length
        ? {
            create: propertyGallery.map((gallery) => ({
              URL: gallery.URL,
              order: gallery.order,
            })),
          }
        : undefined,
      floorPlanGallery: floorPlanGallery?.length
        ? {
            create: floorPlanGallery.map((gallery) => ({
              URL: gallery.URL,
              description: gallery.description,
              order: gallery.order,
            })),
          }
        : undefined,
    };

    const property = this.prisma.property.create({
      data: propertyInput,
      include: {
        address: {
          include: {
            State: true,
            zone: true,
          },
        },
        propertyPurpose: true,
        deliveryStatus: true,
        propertyType: true,
        propertyTypology: true,
        propertyStanding: true,
        propertyLeisure: true,
        propertyGallery: true,
        floorPlanGallery: true,
      },
    });

    return property;
  }

  //------------------------------------------------------------ Updates a property  -----------------------------------------
  async update(
    propertyId: number,
    updatePropertyDto: UpdatePropertyDto,
    userId: number,
  ) {
    // Checks if property belongs to the logged in user
    const userProperty = await this.findUserProperty(propertyId, userId);

    if (userProperty) {
      const {
        address,
        propertyPurposeId,
        propertyStandingId,
        propertyTypeId,
        propertyTypologyId,
        deliveryStatusId,
        propertyLeisure,
        propertyGallery,
        floorPlanGallery,
        ...propertyData
      } = updatePropertyDto;

      const propertyInput: Prisma.PropertyUpdateInput = {
        ...propertyData,
        ...(address && {
          address: {
            update: {
              ...address,
            },
          },
        }),

        //------- FK connections ------
        ...(propertyPurposeId && { propertyPurposeId }),
        ...(propertyStandingId && { propertyStandingId }),
        ...(propertyTypeId && { propertyTypeId }),
        ...(propertyTypologyId && { propertyTypologyId }),
        ...(deliveryStatusId && { deliveryStatusId }),
        ...(propertyLeisure && {
          propertyLeisure: {
            set: propertyLeisure.map((id) => ({ id })),
          },
        }),

        //------ Images Relationship ------
        propertyGallery: {
          // First: Removes all gallery that is not provided on the array
          deleteMany: {
            id: {
              // Ensures that the array is not going to be undefined making it number[] and not (number | undefined)[]
              // This is necessary because gallery is optional
              notIn: propertyGallery
                ?.map((g) => g.id)
                .filter((id): id is number => typeof id === 'number'),
            },
          },

          // Second: Maps the ID with the ones on the database
          // If the ID mathches, updates it, else creates it
          upsert: propertyGallery?.map((gallery) => ({
            where: { id: gallery.id ?? 0 }, // If there is no ID tries with 0 it doesnt exist on database then create it
            update: {
              order: gallery.order,
            },
            create: {
              URL: gallery.URL,
              order: gallery.order,
            },
          })),
        },

        floorPlanGallery: {
          deleteMany: {
            id: {
              notIn: floorPlanGallery
                ?.map((g) => g.id)
                .filter((id): id is number => typeof id === 'number'),
            },
          },
          upsert: floorPlanGallery?.map((gallery) => ({
            where: { id: gallery.id ?? 0 },
            update: {
              description: gallery.description,
              order: gallery.order,
            },
            create: {
              URL: gallery.URL,
              description: gallery.description,
              order: gallery.order,
            },
          })),
        },
      };

      const property = this.prisma.property.update({
        data: propertyInput,
        where: { id: propertyId },
        include: {
          address: {
            include: {
              State: true,
              zone: true,
            },
          },
          propertyPurpose: true,
          deliveryStatus: true,
          propertyType: true,
          propertyTypology: true,
          propertyStanding: true,
          propertyLeisure: true,
          propertyGallery: true,
          floorPlanGallery: true,
        },
      });

      return property;
    } else {
      throw new NotFoundException(
        'Nenhum imóvel encontrado para este usuário.',
      );
    }
  }

  //---------------------------------------------------------------- Gets (ALL) properties -------------------------------------
  async findAll(userId: number) {
    const properties = await this.prisma.property.findMany({
      where: {
        userId: userId,
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

  //---------------------------------------------------------- Returns featured properties  -------------------------------------------
  async getFeaturedBySlug(userId: number) {
    if (!userId) {
      throw new BadRequestException('O userId é obrigatório');
    }
    const featuredProperties = await this.prisma.property.findMany({
      where: {
        userId: userId,
        isFeatured: true,
      },
      select: {
        id: true,
        coverImage: true,
        title: true,
        price: true,
        userId: true,
        address: {
          select: {
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (featuredProperties.length === 0) {
      return [];
    }

    return featuredProperties;
  }
  //------------------------------------------------------------ Gets (ONE) property by Slug -------------------------------------
  async findOneBySlug(userId: number, propertyId: number) {
    const property = await this.findUserProperty(propertyId, userId, {
      propertyPurpose: true,
      propertyStanding: true,
      propertyType: true,
      propertyTypology: true,
      deliveryStatus: true,
      address: true,
      propertyGallery: true,
      floorPlanGallery: true,
      propertyLeisure: true,
    });

    console.log("ID do usuário: ", userId, "ID do Imóvel: ", propertyId);
    console.log("Resultado de Property: ", property);

    return property;
  }
}
