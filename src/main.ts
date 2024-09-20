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
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['https://todolist-front-iota.vercel.app', 'http://localhost:5173'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();