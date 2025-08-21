import { PartialType } from '@nestjs/swagger';
import { CreateDinamicWebsiteDto } from './create-dinamic-website.dto';

export class UpdateDinamicWebsiteDto extends PartialType(CreateDinamicWebsiteDto) {}
