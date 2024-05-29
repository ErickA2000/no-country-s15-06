import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { GettersController } from './v1/getters/getters.controller';

@Module({
  providers: [SubscriptionService],
  imports: [PrismaModule],
  controllers: [GettersController],
})
export class SubscriptionModule {}
