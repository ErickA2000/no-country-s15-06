import { Test, TestingModule } from '@nestjs/testing';
import { ActivityDayService } from './activity-day.service';

describe('ActivityDayService', () => {
  let service: ActivityDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityDayService],
    }).compile();

    service = module.get<ActivityDayService>(ActivityDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
