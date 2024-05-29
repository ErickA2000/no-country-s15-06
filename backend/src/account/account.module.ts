import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { PasswordService } from '@Helpers/password/password.service';
import { RoleModule } from '@Role/role.module';
import { PrismaModule } from '@Prisma/prisma.module';
import { UpdateController } from './v1/update/update.controller';
import { CreateController } from './v1/create/create.controller';
import { GetHtmlService } from '@Helpers/get-html/get-html.service';
import { MailService } from '@Helpers/mail/mail.service';
import { ConfigModule } from '@nestjs/config';
import { DeleteController } from './v1/delete/delete.controller';

@Module({
  providers: [AccountService, PasswordService, GetHtmlService, MailService],
  imports: [RoleModule, PrismaModule, ConfigModule],
  exports: [AccountService],
  controllers: [UpdateController, CreateController, DeleteController],
})
export class AccountModule {}
