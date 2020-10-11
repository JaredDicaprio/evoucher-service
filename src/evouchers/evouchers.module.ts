import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocodesModule } from 'src/promocodes/promocodes.module';
import { Evoucher } from './evoucher.entity';
import { EvouchersController } from './evouchers.controller';
import { EvouchersService } from './evouchers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evoucher]), PromocodesModule],
  providers: [EvouchersService],
  controllers: [EvouchersController],
})
export class EvouchersModule {}
