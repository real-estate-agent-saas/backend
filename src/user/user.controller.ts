import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserPayload } from 'src/auth/models/UserPayload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Cria um novo usuário com Email e Senha
  @IsPublic()
  @Post('create')
  @ApiOperation({ summary: 'Cadastra um usuário com Login e Senha' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Atualiza um usuário existente baseado no ID vindo do token do usuário logado
  @Patch('update')
  update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }

  // Busca os dados do usuário logado
  @Get('read')
  @ApiOperation({ summary: 'Busca todos os dados do usuário' })
  read(@CurrentUser() user: User) {
    return this.userService.read(user.id);
  }

 
  // Busca o usuário logado
  // @Get('me')
  // @ApiOperation({ summary: 'Busca o usuário logado' })
  // getMe(@CurrentUser() user: User) {
  //   return user;
  // }
}
