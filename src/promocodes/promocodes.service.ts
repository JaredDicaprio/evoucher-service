import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromoCode } from './promocode.entity';

@Injectable()
export class PromocodesService {
  constructor(
    @InjectRepository(PromoCode)
    private promocodesRepository: Repository<PromoCode>,
  ) {}

  // bulk insert
  async bulkInsert(data): Promise<void> {
    this.promocodesRepository.insert(data);
  }

  async find(data) {
    return this.promocodesRepository.find(data);
  }

  async update(data) {
    return this.promocodesRepository.save(data);
  }

  // verify provided promocodes
  async verify(data) {
    const codes = await this.promocodesRepository.findByIds(data);
    const codeMap = codes.reduce((a, b) => {
      a[b.code] = b;
      return a;
    }, {});

    return data.map(d => {
      if (codeMap[d]) {
        const { code, hasUsed } = codeMap[d];
        return {
          code,
          valid: true,
          hasUsed,
        };
      }

      return {
        code: d,
        valid: false,
      };
    });
  }
}
