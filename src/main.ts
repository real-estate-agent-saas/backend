import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automaticamente converte os dados de entrada para o tipo correto. Ex: se você tem um DTO com um campo do tipo number, o NestJS tentará converter o valor de entrada para number.
      whitelist: true, // Remove propriedades que não estão no DTO. Isso ajuda a evitar que dados indesejados sejam enviados para o servidor.
      forbidNonWhitelisted: true, // Lança um erro se propriedades não permitidas forem enviadas. Isso é útil para garantir que apenas os dados esperados sejam processados.
      transformOptions: {
        enableImplicitConversion: true, // Permite a conversão implícita de tipos. Por exemplo, se você tem um DTO com um campo do tipo number e recebe uma string que pode ser convertida para number, o NestJS fará essa conversão automaticamente.
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Fábrica de Sinapse')
    .setDescription(
      'O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.',
    )
    .setVersion('1.0')
    .build();

    // Configuração do Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuração do CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL do frontend Next.js
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
