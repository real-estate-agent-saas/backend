import { Module } from '@nestjs/common';
import { DynamicWebsiteService } from './dynamic-website.service';
import { DynamicWebsiteController } from './dynamic-website.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DynamicWebsiteController],
  providers: [DynamicWebsiteService],
  exports: [DynamicWebsiteService],
})
export class DynamicWebsiteModule {}
