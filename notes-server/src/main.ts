import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DelayMiddleware } from './delay.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.use(new DelayMiddleware().use);
  await app.listen(3000);
}

bootstrap();
