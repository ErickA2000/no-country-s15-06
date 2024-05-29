import { AccountService } from '@Account/account.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import {
  BadRequestException,
  Controller,
  Delete,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACCOUNT,
})
export class DeleteController {
  constructor(private accountService: AccountService) {}

  @Delete()
  async deleteAccount(@Req() req: Request) {
    try {
      const account = await this.accountService.delete(
        req.user['account'],
        req.user['user'],
      );

      return {
        success: true,
        message: 'successful removal',
        data: account,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException({
            success: false,
            message: error.meta['cause'] ?? 'Account not found',
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
