const fs = require('fs');
const path = require('path');

import { Controller, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';

import { Evoucher } from './evoucher.entity';
import { EvouchersService } from './evouchers.service';
import { PromocodesService } from '../promocodes/promocodes.service';

@Controller('evouchers')
export class EvouchersController {
  private client: ClientProxy;
  private logger = new Logger('EvoucherLogger');

  constructor(
    private readonly evoucherService: EvouchersService,
    private readonly promocodesService: PromocodesService,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'promocodes-generator-queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  @MessagePattern('findAll')
  findAll(): Promise<Evoucher[]> {
    return this.evoucherService.findAll();
  }

  @MessagePattern('findOne')
  findOne(id: string): Promise<Evoucher> {
    return this.evoucherService.findOne(id);
  }

  @MessagePattern('create')
  async create(data: Evoucher): Promise<void> {
    try {
      const created = await this.evoucherService.create(data);

      this.client
        .send('generate', {
          evoucherId: created.id,
          qty: data.quantity,
        })
        .subscribe(promoCodes => {
          // this.logger.log(promoCodes);
          const codes = [];

          promoCodes.forEach(({ code, qrImage, evoucherId, hasUsed }) => {
            const filePath = path.join(__dirname, `../../qrCodes/${code}.png`);

            fs.writeFile(
              filePath,
              qrImage.split(';base64,').pop(),
              { encoding: 'base64' },
              err => {
                if (err) {
                  this.logger.error(err);
                }
              },
            );

            codes.push({
              code,
              qrImage: filePath,
              evoucherId,
              hasUsed,
            });
          });

          this.promocodesService.bulkInsert(codes);
        });
    } catch (err) {
      this.logger.error(err);
    }
  }

  @MessagePattern('update')
  async update(data: Evoucher): Promise<void> {
    await this.evoucherService.update(data);
  }

  @MessagePattern('verify')
  async verify(data) {
    return this.promocodesService.verify(data);
  }

  @MessagePattern('buy')
  async buy(data) {
    const { evoucherId, phone } = data;
    const res = await this.evoucherService.checkBuy(data);

    if (res.status !== 'ok') {
      return res;
    }

    const promoCodes = await this.promocodesService.find({
      evoucherId,
    });

    await this.promocodesService.update(
      promoCodes.map(({ code }) => ({ code, phone })),
    );

    return {
      promoCodes,
    };
  }

  @MessagePattern('history')
  async history(data) {
    // find by phone
    return this.promocodesService.find(data);
  }
}
