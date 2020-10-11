import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

const microserviceOptions = <MicroserviceOptions>{
  transport: Transport.REDIS,
  options: {
    url: process.env.REDIS_URL,
  },
};

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions,
  );
  await app.listen(() => logger.log('eVoucher Microservice Started'));
}
bootstrap();
