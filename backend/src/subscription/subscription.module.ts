import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { GettersController } from './v1/getters/getters.controller';
import { CancelPaypalController } from './v1/cancel-paypal/cancel-paypal.controller';
import { PaypalService } from '@Payment/services/paypal/paypal.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [SubscriptionService, PaypalService],
  imports: [PrismaModule, HttpModule, ConfigModule],
  controllers: [GettersController, CancelPaypalController],
})
export class SubscriptionModule {}
