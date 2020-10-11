import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvouchersModule } from './evouchers/evouchers.module';
import { PromocodesModule } from './promocodes/promocodes.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), EvouchersModule, PromocodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
