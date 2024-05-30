import { Test, TestingModule } from '@nestjs/testing';
import { CreateSubscriptionController } from './create-subscription.controller';

describe('CreateSubscriptionController', () => {
  let controller: CreateSubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateSubscriptionController],
    }).compile();

    controller = module.get<CreateSubscriptionController>(CreateSubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
