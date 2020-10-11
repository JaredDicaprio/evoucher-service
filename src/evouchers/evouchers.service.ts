import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Evoucher } from './evoucher.entity';
const { checkCreditCard } = require('../utils/checkCreditCard.js');

@Injectable()
export class EvouchersService {
  constructor(
    @InjectRepository(Evoucher)
    private evouchersRepository: Repository<Evoucher>,
  ) {}

  // eVoucher list
  async findAll(): Promise<Evoucher[]> {
    return this.evouchersRepository.find();
  }

  // eVoucher detail
  async findOne(id: string): Promise<Evoucher> {
    return this.evouchersRepository.findOne(id);
  }

  // create eVoucher
  async create(data: Evoucher): Promise<Evoucher> {
    const newEv = new Evoucher();
    Object.keys(data).forEach(dt => {
      if (dt === 'paymentMethod') {
        newEv[dt] = JSON.stringify(data[dt]);
      } else {
        newEv[dt] = data[dt];
      }
    });

    await this.evouchersRepository.insert(newEv);

    return newEv;
  }

  // edit eVoucher
  async update(data: Evoucher): Promise<void> {
    const evData = { ...data };
    if (evData.paymentMethod) {
      evData.paymentMethod = JSON.stringify(data.paymentMethod);
    }
    await this.evouchersRepository.save(evData);
  }

  async checkBuy(data) {
    const { evoucherId, paymentMethod, cardNumber, qty, buyType, phone } = data;

    const isValid = checkCreditCard(cardNumber, paymentMethod);

    if (!isValid) {
      return {
        status: 'invalid card number',
      };
    }

    const eVoucher = await this.evouchersRepository.findOne(evoucherId);

    if (buyType === 'self' && qty > eVoucher.buyLimit) {
      return {
        status: 'exceeded buying limit',
      };
    } else if (buyType === 'gift' && qty > eVoucher.giftLimit) {
      return {
        status: 'exceeded gifting limit',
      };
    }

    const payments = JSON.parse(eVoucher.paymentMethod);
    const payment = payments.find(
      ({ name }) =>
        `${name}`.toLowerCase() === `${paymentMethod}`.toLowerCase(),
    );

    let discount = 1;

    if (payment) {
      discount = Number(payment.discount) / 100;
    }

    return { status: 'ok', price: eVoucher.amount * discount };
  }
}
