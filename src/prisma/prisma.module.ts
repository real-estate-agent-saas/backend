import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// O PrismaModule é um módulo do NestJS que encapsula o PrismaService, permitindo que ele seja facilmente importado e utilizado em outros módulos da aplicação.
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}