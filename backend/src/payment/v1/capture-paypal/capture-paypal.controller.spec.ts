import { Test, TestingModule } from '@nestjs/testing';
import { CapturePaypalController } from './capture-paypal.controller';

describe('CapturePaypalController', () => {
  let controller: CapturePaypalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapturePaypalController],
    }).compile();

    controller = module.get<CapturePaypalController>(CapturePaypalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
