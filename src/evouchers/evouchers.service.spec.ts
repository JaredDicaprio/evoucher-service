import { Test, TestingModule } from '@nestjs/testing';
import { EvouchersService } from './evouchers.service';

describe('EvouchersService', () => {
  let service: EvouchersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvouchersService],
    }).compile();

    service = module.get<EvouchersService>(EvouchersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
