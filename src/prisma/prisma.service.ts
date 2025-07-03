import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Importa o PrismaClient do Prisma para interagir com o banco de dados
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  // Método chamado quando o módulo é inicializado
  async onModuleInit() {
    // Conecta ao banco de dados
    await this.$connect();
  }

  // Método chamado quando o módulo é destruído
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }
}

