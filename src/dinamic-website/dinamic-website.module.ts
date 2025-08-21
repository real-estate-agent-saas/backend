import { Module } from '@nestjs/common';
import { DinamicWebsiteService } from './dinamic-website.service';
import { DinamicWebsiteController } from './dinamic-website.controller';

@Module({
  controllers: [DinamicWebsiteController],
  providers: [DinamicWebsiteService],
})
export class DinamicWebsiteModule {}
