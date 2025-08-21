import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '@prisma/client';

// Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Decorators
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ---------------------------------------------------- Create ------------------------------------------------
  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Cadastra um usuário com Login e Senha' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // ---------------------------------------------------- Read ------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Busca os dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário retornados' })
  getProfile(@CurrentUser() user: User) {
    return this.userService.getProfile(user.id);
  }

  // ---------------------------------------------------- Update ------------------------------------------------
  @Patch()
  @ApiOperation({ summary: 'Atualiza o usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }

  // ---------------------------------------------------- Delete ------------------------------------------------
  @Delete()
  @ApiOperation({
    summary: 'Deleta um usuário do banco e suas relações no banco',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário apagado com sucesso',
  })
  delete(@CurrentUser() user: User) {
    return this.userService.delete(user.id);
  }

  // ---------------------------------------------------- List all specialties ------------------------------------------------
  @Get('specialties')
  @ApiOperation({ summary: 'Lista todas as especialidades disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de especialidades retornada',
  })
  listSpecialties() {
    return this.userService.listSpecialties();
  }


}
