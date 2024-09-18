import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('TodoList API')
    .setDescription('The TodoList API description')
    .setVersion('1.0')
    .addTag('todos')
    .addBearerAuth() // Adiciona suporte para autenticação Bearer (JWT)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors(); // Permite CORS

  // Usa a porta fornecida pelo ambiente ou 3000 como padrão
  const port = process.env.DB_PORT || 3000;
  await app.listen(port);
}
bootstrap();