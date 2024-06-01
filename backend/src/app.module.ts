import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { envSchema } from './env-schema';
import { configLoad } from './config-load';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '@Guards/role/role.guard';
import { GetHtmlService } from './helpers/get-html/get-html.service';
import { MailService } from './helpers/mail/mail.service';
import { JwtAuthGuard } from '@Guards/jwt-auth/jwt-auth.guard';
import { ActivityXUserModule } from './activity-x-user/activity-x-user.module';

@Module({
  imports: [
    PrismaModule,
    RoleModule,
    AccountModule,
    AuthModule,
    UserModule,
    PhoneNumberModule,
    ActivityModule,
    ActivityDayModule,
    MembershipModule,
    SubscriptionModule,
    PaymentModule,
    ConfigModule.forRoot({
      load: [configLoad],
      validationSchema: envSchema,
    }),
    ActivityXUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    RoleGuard,
    {
      provide: APP_GUARD,
      useExisting: RoleGuard,
    },
    GetHtmlService,
    MailService,
  ],
})
export class AppModule {}
