import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateFloorPlanGalleryDto {
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