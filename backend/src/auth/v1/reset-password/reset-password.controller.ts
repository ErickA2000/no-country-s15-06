import { AccountService } from '@Account/account.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { GetHtmlService } from '@Helpers/get-html/get-html.service';
import { MailService } from '@Helpers/mail/mail.service';
import { PasswordService } from '@Helpers/password/password.service';
import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  PreconditionFailedException,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.AUTH,
})
export class ResetPasswordController {
  constructor(
    private accountService: AccountService,
    private passwordService: PasswordService,
    private getHtmlService: GetHtmlService,
    private mailService: MailService,
  ) {}

  @Public()
  @Get('reset-password/:username')
  async resetPassword(@Param('username') username: string) {
    try {
      const account = await this.accountService.findByEmailOrUsername(username);

      if (account == null) throw new Error('null');
      if (!account.emailVerified) throw new Error('no_verified');

      //*Generate new password
      const newPass = this.passwordService.generateRandom();

      //*Update password
      await this.accountService.update(
        account.id,
        {
          password: newPass,
        },
        true,
      );

      //*Send mail
      const body = await this.getHtmlService.get('reset-password', 'es', {
        pass: newPass,
      });

      await this.mailService.send(account.email, 'Reset password', body);

      return {
        success: true,
        message: 'New password generated, check your email',
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Not found account',
          });
        }

        if (error.message == 'no_verified') {
          throw new PreconditionFailedException({
            success: false,
            message: 'Email not verified',
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
