import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoCode } from './promocode.entity';
import { PromocodesService } from './promocodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromoCode])],
  providers: [PromocodesService],
  exports: [PromocodesService],
})
export class PromocodesModule {}
