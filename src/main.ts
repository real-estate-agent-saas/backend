import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      // Customizando a mensagem de erro para BadRequestException. Exibe apenas a primeira mensagem de erro de cada propriedade.
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err) => {
          const firstConstraintKey = Object.keys(err.constraints || {})[0];
          return err.constraints?.[firstConstraintKey];
        });
        return new BadRequestException(formattedErrors);
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

  // Ativa o cookie-parser
  app.use(cookieParser());

  // Configuração do CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL do frontend Next.js
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
