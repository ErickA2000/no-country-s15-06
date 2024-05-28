import { AccountService } from '@Account/account.service';
import { AccountUpdateDTO } from '@Account/dto/account.dto';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Patch,
  Req,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACCOUNT,
})
export class UpdateController {
  constructor(private accountService: AccountService) {}

  @Patch()
  async update(@Body() data: AccountUpdateDTO, @Req() req: Request) {
    try {
      const account = await this.accountService.update(req.user['account'], {
        username: data.username,
        email: data.email,
        password: data.password,
        currentPassword: data.currentPassword,
      });
      account.password = '';

      return {
        success: true,
        data: account,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException({
            success: false,
            message: `${error.meta['target']} already registered`,
          });
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
