import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsInt,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';
import { PropertyGallery } from './create-propertyGalley.dto';
import { FloorPlanGallery } from './create-floorPlanGallery.dto';

export class CreatePropertyDto {
  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'ID do imóvel (gerado automaticamente)',
    required: false,
  })
  id?: number;

  @IsString()
  @ApiProperty({
    description: 'Título do imóvel',
    example: 'Apartamento moderno no centro',
  })
  title: string;

  @IsNumber()
  @ApiProperty({ description: 'Quantidade de quartos', example: 3 })
  roomsQty: number;

  @IsNumber()
  @ApiProperty({ description: 'Quantidade de banheiros', example: 2 })
  bathroomsQty: number;

  @IsNumber()
  @ApiProperty({ description: 'Quantidade de vagas de garagem', example: 1 })
  parkingSpacesQty: number;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsString()
  youtubeUrl?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isFurnished?: boolean;

  @IsOptional()
  @IsBoolean()
  isNearSubway?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsArray()
  propertyLeisure?: number[];

  @IsOptional()
  @IsArray()
  propertyPurposes?: number[];

  @IsOptional()
  @IsArray()
  propertyStandings?: number[];

  @IsOptional()
  @IsArray()
  propertyTypes?: number[];

  @IsOptional()
  @IsArray()
  propertyTypologies?: number[];

  @IsOptional()
  @IsArray()
  deliveryStatus?: number[];

  // --------------------------------------- NESTED VALIDATIONS -----------------------

  @ValidateNested()
  @Type(() => PropertyGallery)
  propertyGallery: PropertyGallery;

  @ValidateNested()
  @Type(() => FloorPlanGallery)
  floorPlanGallery: FloorPlanGallery;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty({
    description: 'Endereço do imóvel',
    type: CreateAddressDto,
  })
  address: CreateAddressDto;
}
