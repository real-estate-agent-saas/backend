import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/application/dtos/create-user.dto";
import { CreateUserUseCase } from "src/application/use-cases/user/create-user.usecase";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@ApiTags('Users')
@Controller('user')
export class CreateUserController {
    constructor(private readonly usecase: CreateUserUseCase) {}
      @IsPublic()
      @Post()
      @ApiOperation({ summary: 'Cadastra um usuário com Login e Senha' })
      @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
      create(@Body() createUserDto: CreateUserDto) {
        return this.usecase.create(createUserDto);
      }
}