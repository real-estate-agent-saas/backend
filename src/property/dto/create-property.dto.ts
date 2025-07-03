import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsBoolean,
  IsUrl,
  Min,
} from 'class-validator';

// DTO para criação de uma propriedade (imóvel)
export class CreatePropertyDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'ID do imóvel (gerado automaticamente)',
    required: false,
  })
  id?: number;

  @IsString()
  @ApiProperty({
    description: 'Título do imóvel, usado como nome no anúncio',
    example: 'Apartamento moderno no centro',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Descrição detalhada do imóvel',
    required: false,
  })
  description?: string;

  // 🔢 Características
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Número mínimo de quartos', example: 2 })
  bedroomsMin: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Número máximo de quartos', example: 3 })
  bedroomsMax: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Número mínimo de banheiros', example: 1 })
  bathroomsMin: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Número máximo de banheiros', example: 2 })
  bathroomsMax: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Número mínimo de vagas na garagem',
    example: 1,
  })
  parkingSpacesMin: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Número máximo de vagas na garagem',
    example: 2,
  })
  parkingSpacesMax: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Área do imóvel em metros quadrados',
    example: 75,
    required: false,
  })
  area?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Valor do imóvel',
    example: 350000,
    required: false,
  })
  price?: number;

  // 📍 Localização
  @IsString()
  @ApiProperty({
    description: 'Logradouro do imóvel (Rua, Avenida, etc.)',
    example: 'Rua Dr. Afonso Baccari',
  })
  street: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Número do imóvel (opcional)',
    example: '100',
    required: false,
  })
  number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Complemento do imóvel (opcional)',
    example: 'Apto 202, Bloco B',
    required: false,
  })
  complement?: string;

  @IsString()
  @ApiProperty({
    description: 'Bairro do imóvel',
    example: 'Vila Clementino',
  })
  neighborhood: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Cidade onde o imóvel está localizado (opcional)',
    example: 'São Paulo',
    required: false,
  })
  city?: string;

  @IsString()
  @ApiProperty({
    description: 'Estado (UF) do imóvel',
    example: 'SP',
  })
  state: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'CEP do imóvel (opcional)',
    example: '04026-000',
    required: false,
  })
  zipCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Região da cidade (opcional). Ex.: Zona Sul',
    example: 'Zona Sul',
    required: false,
  })
  region?: string;

  // 📸 Mídia
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'URL da imagem principal do imóvel (imagem de destaque)',
    example: 'https://site.com/imagens/imovel1.jpg',
    required: false,
  })
  featuredImage?: string;

  @IsArray()
  @ApiProperty({
    description: 'Galeria de fotos do imóvel (array de URLs)',
    example: [
      'https://site.com/imagens/foto1.jpg',
      'https://site.com/imagens/foto2.jpg',
    ],
  })
  photoGallery: string[];

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'URL do vídeo no YouTube apresentando o imóvel (opcional)',
    example: 'https://www.youtube.com/watch?v=abc123xyz',
    required: false,
  })
  youTubeVideo?: string;

  // 🏷️ Categorias e status
  @IsString()
  @ApiProperty({
    description: 'Finalidade do imóvel: venda, aluguel ou temporada',
    example: 'venda',
  })
  purpose: string;

  @IsString()
  @ApiProperty({
    description: 'Tipo de imóvel: casa, apartamento, sala comercial, terreno, etc.',
    example: 'apartamento',
  })
  housingType: string;

  @IsBoolean()
  @ApiProperty({
    description:
      'Define se o imóvel está salvo como rascunho (true) ou publicado (false)',
    example: true,
  })
  isDraft: boolean;
}