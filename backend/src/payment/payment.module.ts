import { PrismaModule } from '@Prisma/prisma.module';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from './payment.service';
import { GettersController } from './v1/getters/getters.controller';
import { CreateSubscriptionController } from './v1/create-subscription/create-subscription.controller';
import { PaypalService } from './services/paypal/paypal.service';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionService } from '@Subscription/subscription.service';
import { CapturePaypalController } from './v1/capture-paypal/capture-paypal.controller';
import { MembershipService } from '@Membership/membership.service';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule],
  providers: [
    PaymentService,
    PaypalService,
    SubscriptionService,
    MembershipService,
  ],
  controllers: [
    GettersController,
    CreateSubscriptionController,
    CapturePaypalController,
  ],
})
export class PaymentModule {}
