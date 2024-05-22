import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { PasswordService } from '@Helpers/password/password.service';
import { RoleService } from '@Role/role.service';

@Module({
  providers: [AccountService, PasswordService, RoleService],
})
export class AccountModule {}
