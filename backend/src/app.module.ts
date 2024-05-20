import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PhoneNumberModule } from './phone-number/phone-number.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityDayModule } from './activity-day/activity-day.module';
import { MembershipModule } from './membership/membership.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PrismaModule, RoleModule, AccountModule, AuthModule, UserModule, PhoneNumberModule, ActivityModule, ActivityDayModule, MembershipModule, SubscriptionModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
