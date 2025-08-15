import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
} from '@nestjs/common';


import { UserService } from './user.service';
import { User } from '@prisma/client';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Custom Decorator
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

// Swagger
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Creates a new user with email and password
  @IsPublic()
  @Post('create')
  @ApiOperation({ summary: 'Cadastra um usuário com Login e Senha' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Updates the user based on the current logged in user
  @Patch('update')
  update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }

  // Gets user data based on his ID
  @Get('read')
  @ApiOperation({ summary: 'Busca todos os dados do usuário' })
  read(@CurrentUser() user: User) {
    return this.userService.read(user.id);
  }

  // Gets all specialties
  @Get('getAllSpecialties')
  @ApiOperation({ summary: 'Busca todas as especialidades para dispor ao usuário para atualização'})
  specialties() {
    return this.userService.getAllSpecialties();
  }

  // Returns ID, Name and Email of the current user
  @Get('me')
  @ApiOperation({ summary: 'Verifica se o token está válido' })
  getMe(@CurrentUser() user: User) {
    return user;
  }
  
}
