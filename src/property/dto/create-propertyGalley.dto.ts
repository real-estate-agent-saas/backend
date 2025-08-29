import { IsString, IsOptional, IsInt } from 'class-validator';

export class PropertyGallery {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  URL: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsInt()
  propertyId?: number;
}