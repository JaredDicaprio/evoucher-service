import { Test, TestingModule } from '@nestjs/testing';
import { EvouchersController } from './evouchers.controller';

describe('EvouchersController', () => {
  let controller: EvouchersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvouchersController],
    }).compile();

    controller = module.get<EvouchersController>(EvouchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
