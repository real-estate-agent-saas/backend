import { PartialType } from '@nestjs/swagger';
import { CreateDinamicWebsiteDto } from './create-dinamic-website.dto';
import { IsOptional } from 'class-validator';
import { UpdateCustomDomainDto } from './update-custom-domain.dto';
import { UpdateSlugDto } from './update-slug.dto';

export class UpdateDinamicWebsiteDto extends PartialType(
  CreateDinamicWebsiteDto,
) {
  // For page exhibition
  @IsOptional()
  slug?: UpdateSlugDto['slug'];

  @IsOptional()
  customDomain?: UpdateCustomDomainDto['customDomain'];
}
