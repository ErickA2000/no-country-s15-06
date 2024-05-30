import { PrismaModule } from '@Prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { GettersController } from './v1/getters/getters.controller';
import { CreateSubscriptionController } from './v1/create-subscription/create-subscription.controller';

@Module({
  imports: [PrismaModule],
  providers: [PaymentService],
  controllers: [GettersController, CreateSubscriptionController],
})
export class PaymentModule {}
