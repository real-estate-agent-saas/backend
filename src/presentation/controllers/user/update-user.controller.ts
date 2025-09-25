import { Body, Controller, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "src/application/dtos/update-user.dto";
import { UpdateUserUseCase } from "src/application/use-cases/user/update-user.usecase";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/domain/entities/user.entity";


@ApiTags('Users')
@Controller('user')
export class UpdateUserController {
    constructor(private readonly usecase: UpdateUserUseCase) {}

  @Patch()
  @ApiOperation({ summary: 'Atualiza o usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usecase.update(user.id, updateUserDto);
  }
}