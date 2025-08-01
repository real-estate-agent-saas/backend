import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

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

  // Get user data based on his ID
  @Get('read')
  @ApiOperation({ summary: 'Busca todos os dados do usuário' })
  read(@CurrentUser() user: User) {
    return this.userService.read(user.id);
  }

  // Returns ID, Name and Email of the current user
  @Get('me')
  @ApiOperation({ summary: 'Verifica se o token está válido' })
  getMe(@CurrentUser() user: User) {
    return user;
  }
  
}
