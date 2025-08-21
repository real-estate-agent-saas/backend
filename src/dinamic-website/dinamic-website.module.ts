import { Module } from '@nestjs/common';
import { DinamicWebsiteService } from './dinamic-website.service';
import { DinamicWebsiteController } from './dinamic-website.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DinamicWebsiteController],
  providers: [DinamicWebsiteService],
})
export class DinamicWebsiteModule {}
