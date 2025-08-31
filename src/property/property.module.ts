import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DynamicWebsiteModule } from 'src/dynamic-website/dynamic-website.module';

@Module({
  imports: [PrismaModule, DynamicWebsiteModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
