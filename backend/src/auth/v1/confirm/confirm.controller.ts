import { AccountService } from '@Account/account.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { PayloadJwt } from '@Interfaces/auth.interface';
import {
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.AUTH,
})
export class ConfirmController {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Get('confirm/:token')
  async confirm(@Param('token') token: string) {
    try {
      const payload: PayloadJwt = await this.jwtService.verifyAsync(token);

      const account = await this.accountService.findById(payload.sub);

      if (account == null) {
        throw new Error('null');
      }

      if (account.emailVerified) {
        throw new Error('isVerified');
      }

      await this.accountService.update(account.id, {
        emailVerified: true,
      });

      return {
        success: true,
        message: 'Account verification successful',
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Not found account',
          });
        }

        if (error.message == 'isVerified') {
          throw new ConflictException({
            success: false,
            message: 'The account is already verified',
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
