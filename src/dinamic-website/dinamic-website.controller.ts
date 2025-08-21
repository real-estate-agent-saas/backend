import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DinamicWebsiteService } from './dinamic-website.service';
import { CreateDinamicWebsiteDto } from './dto/create-dinamic-website.dto';
import { UpdateDinamicWebsiteDto } from './dto/update-dinamic-website.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateSlugDto } from 'src/dinamic-website/dto/update-slug.dto';

@Controller('dinamic-website')
export class DinamicWebsiteController {
  constructor(private readonly dinamicWebsiteService: DinamicWebsiteService) {}

  // ---------------------------------------------------- Checks Slug Availability ------------------------------------------------
  @Post('slug/isAvailable')
  @ApiOperation({ summary: 'Verifica se o slug já está sendo utilizado' })
  @ApiResponse({ status: 200, description: 'Slug disponível' })
  @ApiResponse({ status: 400, description: 'Slug inválido ou já em uso' })
  checkSlugAvailability(@Body() slug: UpdateSlugDto) {
    return this.dinamicWebsiteService.checkSlugAvailability(slug);
  }

  // ---------------------------------------------------- Get user slug ------------------------------------------------
  @Get('slug')
  @ApiOperation({ summary: 'Pega o slug do corretor logado' })
  @ApiResponse({ status: 200, description: 'Slug encontrado com sucesso' })
  getSlug(@CurrentUser() user: User) {
    return this.dinamicWebsiteService.getSlug(user.id);
  }

  // ---------------------------------------------------- Updates user slug ------------------------------------------------
  @Patch('slug')
  @ApiOperation({
    summary: 'Atualiza o slug do corretor se não existir outro igual',
  })
  @ApiResponse({ status: 200, description: 'Slug atualizado com sucesso' })
  updateSlug(@CurrentUser() user: User, @Body() slug: UpdateSlugDto) {
    return this.dinamicWebsiteService.updateSlug(user.id, slug);
  }

  // -------------------------------------------- Get user data based on his slug ------------------------------------------------
  // @Get('slug/getUser/:slug')
  // @ApiOperation({
  //   summary: 'Busca dados do corretor para exibir na página dinâmica',
  // })
  // @ApiResponse({ status: 200, description: 'Dados retornados com sucesso!' })
  // getUserBasedOnSlug() {}
}
