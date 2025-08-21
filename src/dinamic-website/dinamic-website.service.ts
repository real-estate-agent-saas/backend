import { Injectable } from '@nestjs/common';
import { CreateDinamicWebsiteDto } from './dto/create-dinamic-website.dto';
import { UpdateDinamicWebsiteDto } from './dto/update-dinamic-website.dto';

@Injectable()
export class DinamicWebsiteService {
  create(createDinamicWebsiteDto: CreateDinamicWebsiteDto) {
    return 'This action adds a new dinamicWebsite';
  }

  findAll() {
    return `This action returns all dinamicWebsite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dinamicWebsite`;
  }

  update(id: number, updateDinamicWebsiteDto: UpdateDinamicWebsiteDto) {
    return `This action updates a #${id} dinamicWebsite`;
  }

  remove(id: number) {
    return `This action removes a #${id} dinamicWebsite`;
  }
}
