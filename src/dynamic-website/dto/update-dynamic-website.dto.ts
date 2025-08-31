import { PartialType } from '@nestjs/swagger';
import { CreateDynamicWebsiteDto } from './create-dynamic-website.dto';
import { IsOptional } from 'class-validator';
import { UpdateCustomDomainDto } from './update-custom-domain.dto';
import { UpdateSlugDto } from './update-slug.dto';

export class UpdateDynamicWebsiteDto extends PartialType(
  CreateDynamicWebsiteDto,
) {
  // For page exhibition
  @IsOptional()
  slug?: UpdateSlugDto['slug'];

  @IsOptional()
  customDomain?: UpdateCustomDomainDto['customDomain'];
}
