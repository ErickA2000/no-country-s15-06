import { Test, TestingModule } from '@nestjs/testing';
import { CancelPaypalController } from './cancel-paypal.controller';

describe('CancelPaypalController', () => {
  let controller: CancelPaypalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancelPaypalController],
    }).compile();

    controller = module.get<CancelPaypalController>(CancelPaypalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
