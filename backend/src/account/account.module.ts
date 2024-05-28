import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { PasswordService } from '@Helpers/password/password.service';
import { RoleModule } from '@Role/role.module';
import { PrismaModule } from '@Prisma/prisma.module';
import { UpdateController } from './v1/update/update.controller';

@Module({
  providers: [AccountService, PasswordService],
  imports: [RoleModule, PrismaModule],
  exports: [AccountService],
  controllers: [UpdateController],
})
export class AccountModule {}
