import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreatePropertyGalleryDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  URL: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsInt()
  propertyId?: number;
}