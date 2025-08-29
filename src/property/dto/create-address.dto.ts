import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsArray, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @ApiProperty({
    description: 'Rua do imóvel',
    example: 'Av. Paulista',
    required: false,
  })
  street: string;

  @IsString()
  @ApiProperty({
    description: 'Bairro',
    example: 'Bela Vista',
    required: false,
  })
  neighborhood: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Número do endereço podendo incluir letra',
    example: "1000-B",
    required: false,
  })
  number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Complemento do endereço',
    example: 'Apto 101',
    required: false,
  })
  complement?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Cidade',
    example: 'São Paulo',
    required: false,
  })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Estado',
    example: 'SP',
    required: false,
  })
  state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'CEP',
    example: '01310-100',
    required: false,
  })
  zipCode?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Latitude',
    example: -23.563,
    required: false,
  })
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Longitude',
    example: -46.654,
    required: false,
  })
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description:
      'IDs das zonas associadas ao endereço (Norte, Sul, Leste, Oeste)',
    required: false,
    type: Number,
  })
  zoneId?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'ID da propriedade associada',
    example: 1,
    required: false,
  })
  propertyId?: number;
}
