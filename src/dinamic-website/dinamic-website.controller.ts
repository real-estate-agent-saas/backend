import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DinamicWebsiteService } from './dinamic-website.service';
import { CreateDinamicWebsiteDto } from './dto/create-dinamic-website.dto';
import { UpdateDinamicWebsiteDto } from './dto/update-dinamic-website.dto';

@Controller('dinamic-website')
export class DinamicWebsiteController {
  constructor(private readonly dinamicWebsiteService: DinamicWebsiteService) {}

  @Post()
  create(@Body() createDinamicWebsiteDto: CreateDinamicWebsiteDto) {
    return this.dinamicWebsiteService.create(createDinamicWebsiteDto);
  }

  @Get()
  findAll() {
    return this.dinamicWebsiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dinamicWebsiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDinamicWebsiteDto: UpdateDinamicWebsiteDto) {
    return this.dinamicWebsiteService.update(+id, updateDinamicWebsiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dinamicWebsiteService.remove(+id);
  }
}
