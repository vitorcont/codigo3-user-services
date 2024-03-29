import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/codigo3/user-services');

  const config = new DocumentBuilder()
    .setTitle('Código3: API de serviços de usuário')
    .setDescription('Aplicação voltada a priorização de veículos oficiais')
    .addBearerAuth({
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/codigo3/user-services', app, document);

  await app.listen(process.env.DEFAULT_PORT);

  console.log(
    `\nApp Running on http://localhost:${process.env.DEFAULT_PORT}/codigo3/user-services`,
  );
}
bootstrap();
