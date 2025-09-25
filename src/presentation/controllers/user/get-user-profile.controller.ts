import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserProfileUseCase } from "src/application/use-cases/user/get-user-profile.usecase";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/user/entities/user.entity";


@ApiTags('Users')
@Controller('user')
export class GetUserProfileController {
  constructor(private readonly usecase: GetUserProfileUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Busca os dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário retornados' })
  getProfile(@CurrentUser() user: User) {
    return this.usecase.getProfile(user.id);
  }
}