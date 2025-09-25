import { Controller, Delete } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteUserUseCase } from "src/application/use-cases/user/delete-user.usecase";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/user/entities/user.entity";

@ApiTags('Users')
@Controller('user')
export class DeleteUserController {
constructor(private readonly usecase: DeleteUserUseCase) {} 


  @Delete()
  @ApiOperation({
    summary: 'Deleta um usuário do banco e suas relações no banco',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário apagado com sucesso',
  })
  delete(@CurrentUser() user: User) {
    return this.usecase.delete(user.id);
  }
}
  
