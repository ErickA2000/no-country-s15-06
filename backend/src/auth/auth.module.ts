import { AccountModule } from '@Account/account.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PasswordService } from '@Helpers/password/password.service';
import { LoginController } from './v1/login/login.controller';
import { RegisterController } from './v1/register/register.controller';
import { MailService } from '@Helpers/mail/mail.service';
import { GetHtmlService } from '@Helpers/get-html/get-html.service';
import { ConfirmController } from './v1/confirm/confirm.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('jwt_secret'),
      }),
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    PasswordService,
    MailService,
    GetHtmlService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
  ],
  controllers: [LoginController, RegisterController, ConfirmController],
})
export class AuthModule {}
