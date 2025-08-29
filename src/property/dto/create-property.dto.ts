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
import { CreatePropertyGalleryDto } from './create-propertyGalley.dto';
import { CreateFloorPlanGalleryDto } from './create-floorPlanGallery.dto';

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
    example: 'Get Home Design',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do imóvel',
    example: 'A menor distância entre Nova York e São Paulo',
  })
  description: string;

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
  youtubeURL?: string;

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
  @IsInt()
  propertyPurposeId?: number;

  @IsOptional()
  @IsInt()
  propertyStandingId?: number;

  @IsOptional()
  @IsInt()
  propertyTypeId?: number;

  @IsOptional()
  @IsInt()
  propertyTypologyId?: number;

  @IsOptional()
  @IsInt()
  deliveryStatusId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  propertyLeisure?: number[];

  // --------------------------------------- NESTED VALIDATIONS -----------------------

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePropertyGalleryDto)
  propertyGallery?: CreatePropertyGalleryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFloorPlanGalleryDto)
  floorPlanGallery?: CreateFloorPlanGalleryDto[];

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty({
    description: 'Endereço do imóvel',
    type: CreateAddressDto,
  })
  address: CreateAddressDto;
}
