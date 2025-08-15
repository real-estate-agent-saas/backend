import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @ApiProperty({
    description: 'ID do endereço (gerado automaticamente)',
    required: false,
  })
  id?: number;

  @IsString()
  @ApiProperty({ description: 'Rua do imóvel', example: 'Av. Paulista' })
  street: string;

  @IsString()
  @ApiProperty({ description: 'Bairro', example: 'Bela Vista' })
  neighborhood: string;
}
