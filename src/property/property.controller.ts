import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { PropertyService } from './property.service';
import { User } from '@prisma/client';

// Decorator
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

// Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// DTO
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Properties')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @IsPublic()
  @Post('getFeatured')
  @ApiOperation({
    summary: 'Retorna todos os imóveis em destaque baseado no slug do corretor',
  })
  getFeatured(@Body('userId') userId: number) {
    return this.propertyService.getFeatured(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um imóvel' })
  @ApiResponse({ status: 201, description: 'Imóvel criado com sucesso' })
  create(@Body() dto: CreatePropertyDto, @CurrentUser() user: User) {
    return this.propertyService.create(dto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os imóveis do usuário logado' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@CurrentUser() user: User) {
    return this.propertyService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um imóvel específico' })
  findOne(
    @Param('id', ParseIntPipe) propertyId: number,
    @CurrentUser() user: User,
  ) {
    return this.propertyService.findOne(propertyId, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um imóvel do usuário logado' })
  update(
    @Param('id', ParseIntPipe) propertyId: number,
    @Body() dto: UpdatePropertyDto,
    @CurrentUser() user: User,
  ) {
    return this.propertyService.update(propertyId, dto, user.id);
  }

  @Patch('disable/:id')
  @ApiOperation({ summary: 'Desabilita um imóvel' })
  disable(
    @Param('id', ParseIntPipe) propertyId: number,
    @CurrentUser() user: User,
  ) {
    return this.propertyService.disable(propertyId, user.id);
  }

  @Patch('enable/:id')
  @ApiOperation({ summary: 'Habilita um imóvel' })
  enable(
    @Param('id', ParseIntPipe) propertyId: number,
    @CurrentUser() user: User,
  ) {
    return this.propertyService.enable(propertyId, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um imóvel' })
  delete(
    @Param('id', ParseIntPipe) propertyId: number,
    @CurrentUser() user: User,
  ) {
    return this.propertyService.delete(propertyId, user.id);
  }
}
