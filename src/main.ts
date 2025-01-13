import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if unknown properties are found
      transform: true, // Automatically transform payloads to match DTOs
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
