import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { setupSwagger } from './swagger';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || '3000';

  app.enableCors({
    origin: ['http://localhost:3000', '*'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  setupSwagger(app);
  await app.listen(port, host);

  console.log('\n');
  logger.log(`==========================================================`);
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log(`==========================================================`);
  console.log('\n');
}
bootstrap();
