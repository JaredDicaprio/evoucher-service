import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Evoucher } from './evoucher.entity';

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
  async create(data: Evoucher): Promise<void> {
    await this.evouchersRepository.insert(data);
  }

  // edit eVoucher
  async update(data: Evoucher): Promise<void> {
    await this.evouchersRepository.save(data);
  }
}
