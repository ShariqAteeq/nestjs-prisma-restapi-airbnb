import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  (BigInt.prototype as any).toJSON = function (): number {
    return Number(this);
  };;

  const config = new DocumentBuilder()
    .setTitle('Airbnb Clone')
    .setDescription('The API for DEV only Airbnb Server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
