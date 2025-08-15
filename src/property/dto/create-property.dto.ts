import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class CreatePropertyDto {
  @IsOptional()
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

  @ValidateNested() // Validates also Address object
  @Type(() => CreateAddressDto)
  @ApiProperty({
    description: 'Endereço do imóvel',
    type: CreateAddressDto,
  })
  address: CreateAddressDto;
}
