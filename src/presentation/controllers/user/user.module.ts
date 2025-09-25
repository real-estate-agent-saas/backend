import { Module } from '@nestjs/common';


import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateUserController } from './create-user.controller';
import { DeleteUserController } from './delete-user.controller';
import { GetUserProfileController } from './get-user-profile.controller';
import { ListUserSpecialtiesController } from './list-user-specialties.controller';
import { UpdateUserController } from './update-user.controller';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.usecase';
import { DeleteUserUseCase } from 'src/application/use-cases/user/delete-user.usecase';
import { GetUserProfileUseCase } from 'src/application/use-cases/user/get-user-profile.usecase';
import { ListUserSpecialtiesUseCase } from 'src/application/use-cases/user/list-user-specialties.usecase';
import { UpdateUserUseCase } from 'src/application/use-cases/user/update-user.usecase';

@Module({
  imports: [PrismaModule], // Imports PrismaModule so UserService can use it
  controllers: [
    CreateUserController,
    DeleteUserController,
    GetUserProfileController,
    ListUserSpecialtiesController,
    UpdateUserController
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserProfileUseCase,
    ListUserSpecialtiesUseCase,
    UpdateUserUseCase
  ], 
  exports: [], // Exports UserService so other modules can use it
})
export class UserModule {}
