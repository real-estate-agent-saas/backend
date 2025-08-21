import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Imports PrismaModule so UserService can use it
  controllers: [UserController],
  providers: [UserService], 
  exports: [UserService], // Exports UserService so other modules can use it
})
export class UserModule {}
