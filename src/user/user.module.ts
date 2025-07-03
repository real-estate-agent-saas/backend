import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importa o PrismaModule para que o UserService possa usá-lo
  controllers: [UserController],
  providers: [UserService], 
  exports: [UserService], // Exporta o UserService para que outros módulos possam usá-lo
})
export class UserModule {}
