import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertyService } from './property.service';

// Dtos
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

// Swagger
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// User data
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um imóvel' })
  @ApiResponse({ status: 201, description: 'Imóvel criado com sucesso' })
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @CurrentUser() user: User,
  ) {
    return this.propertyService.create(createPropertyDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os imóveis' })
  @ApiResponse({ status: 200, description: 'Imóveis encontrados' })
  @ApiResponse({ status: 404, description: 'Imóveis não encontrados' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum imóvel encontrado para esse usuário',
  })
  findAll(@CurrentUser() user: User) {
    return this.propertyService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um imóvel específico do usuário logado' })
  @ApiResponse({ status: 200, description: 'Imóvel encontrado' })
  @ApiResponse({ status: 404, description: 'Imóvel não encontrado' })
  findOne(@Param('id') propertyId: string, @CurrentUser() user: User) {
    return this.propertyService.findOne(+propertyId, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um imóvel do usuário logado' })
  @ApiResponse({ status: 200, description: 'Imóvel atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Imóvel não encontrado' })
  async update(
    @Param('id') propertyId: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @CurrentUser() user: User,
  ) {
    return this.propertyService.update(+propertyId, updatePropertyDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um imóvel' })
  @ApiResponse({ status: 200, description: 'Imóvel removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Imóvel não encontrado' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.propertyService.remove(+id, user.id);
  }
}
