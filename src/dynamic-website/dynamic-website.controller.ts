import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DynamicWebsiteService } from './dynamic-website.service';
import { CreateDynamicWebsiteDto } from './dto/create-dynamic-website.dto';
import { UpdateDynamicWebsiteDto } from './dto/update-dynamic-website.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateSlugDto } from 'src/dynamic-website/dto/update-slug.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('dynamic-website')
export class DynamicWebsiteController {
  constructor(private readonly dynamicWebsiteService: DynamicWebsiteService) {}

  // ---------------------------------------------------- Gets data from a dynamic Website ------------------------------------------------
  @IsPublic()
  @Get(':slug')
  @ApiOperation({
    summary: 'Retorna informações sobre o Website',
  })
  @ApiResponse({
    status: 200,
    description: 'Website encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Website não encontrado',
  })
  findOne(@Param('slug') slug: string) {
    return this.dynamicWebsiteService.findOne(slug);
  }

  // ---------------------------------------------------- Checks Slug Availability ------------------------------------------------
  @Post('slug/isAvailable')
  @ApiOperation({ summary: 'Verifica se o slug já está sendo utilizado' })
  @ApiResponse({ status: 200, description: 'Slug disponível' })
  @ApiResponse({ status: 400, description: 'Slug inválido ou já em uso' })
  checkSlugAvailability(@Body() slug: UpdateSlugDto) {
    return this.dynamicWebsiteService.checkSlugAvailability(slug);
  }

  // ---------------------------------------------------- Get user slug ------------------------------------------------
  @Get('slug/currentSlug')
  @ApiOperation({ summary: 'Pega o slug do corretor logado' })
  @ApiResponse({ status: 200, description: 'Slug encontrado com sucesso' })
  getUserSlug(@CurrentUser() user: User) {
    return this.dynamicWebsiteService.getUserSlug(user.id);
  }

  // ---------------------------------------------------- Updates user slug ------------------------------------------------
  @Patch('slug')
  @ApiOperation({
    summary: 'Atualiza o slug do corretor se não existir outro igual',
  })
  @ApiResponse({ status: 200, description: 'Slug atualizado com sucesso' })
  updateUserSlug(@CurrentUser() user: User, @Body() slug: UpdateSlugDto) {
    return this.dynamicWebsiteService.updateUserSlug(user.id, slug);
  }

  // -------------------------------------------- Get user data based on his slug ------------------------------------------------
  @IsPublic()
  @Get('slug/getUser/:slug')
  @ApiOperation({
    summary: 'Busca dados do corretor para exibir na página dinâmica',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário retornados com sucesso!',
  })
  getUserBasedOnSlug(@Param('slug') slug: string) {
    return this.dynamicWebsiteService.getUserBasedOnSlug(slug);
  }

  // -------------------------------------------- Get user data based on his slug ------------------------------------------------
  @IsPublic()
  @Get()
  @ApiOperation({
    summary: 'Busca o ID do corretor para realizar consultas na página dinâmica',
  })
  @ApiResponse({
    status: 200,
    description: 'ID do usuário retornado com sucesso!',
  })
  getUserIdBasedOnSlug(@Param() slug: string) {
    return this.dynamicWebsiteService.getUserIdBasedOnSlug(slug);
  }
}
