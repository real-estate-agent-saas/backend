import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdateSlugDto } from '../../dinamic-website/dto/update-slug.dto';
import { UpdateCustomDomainDto } from './update-custom-domain.dto';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
  ArrayUnique,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  publicEmail?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  profileImage?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDateString()
  careerStartDate?: string;

  @IsOptional()
  @IsString()
  creci?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique() // ensures that array values are unique
  @IsInt({ each: true }) // Validates that the IDs in the array are integers
  specialties?: number[];

  // For page exhibition
  @IsOptional()
  slug?: UpdateSlugDto['slug'];

  @IsOptional()
  customDomain?: UpdateCustomDomainDto['customDomain'];
}
