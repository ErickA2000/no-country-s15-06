import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { PrismaModule } from '@Prisma/prisma.module';

@Module({
  providers: [ActivityService],
  imports: [PrismaModule],
})
export class ActivityModule {}
