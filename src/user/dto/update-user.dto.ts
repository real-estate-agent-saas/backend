import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsUrl,
  IsDateString,
  IsArray,
  ArrayUnique,
  IsInt,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEmail()
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
  @IsUrl()
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
  @IsArray() // Afirma que specialties é um array
  @ArrayUnique() // Garante que os valores no array são únicos
  @IsInt({ each: true }) // Valida que os IDs no array são inteiros
  specialties?: number[];
}
