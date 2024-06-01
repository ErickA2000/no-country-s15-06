import { Test, TestingModule } from '@nestjs/testing';
import { ActivityXUserService } from './activity-x-user.service';

describe('ActivityXUserService', () => {
  let service: ActivityXUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityXUserService],
    }).compile();

    service = module.get<ActivityXUserService>(ActivityXUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
