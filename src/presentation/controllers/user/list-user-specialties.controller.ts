import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListUserSpecialtiesUseCase } from "src/application/use-cases/user/list-user-specialties.usecase";

@ApiTags('Users')
@Controller('user')
export class ListUserSpecialtiesController {
    constructor(private readonly usecase: ListUserSpecialtiesUseCase) {}

  @Get('specialties')
  @ApiOperation({ summary: 'Lista todas as especialidades disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de especialidades retornada',
  })
  listSpecialties() {
    return this.usecase.listSpecialties();
  }
}