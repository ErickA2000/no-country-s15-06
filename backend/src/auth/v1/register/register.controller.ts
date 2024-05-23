import { AccountService } from '@Account/account.service';
import { AccountCreateDTO } from '@Account/dto/account.dto';
import { AuthService } from '@Auth/auth.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { GetHtmlService } from '@Helpers/get-html/get-html.service';
import { MailService } from '@Helpers/mail/mail.service';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.AUTH,
})
export class RegisterController {
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private configService: ConfigService,
    private getHtmlService: GetHtmlService,
    private mailService: MailService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() data: AccountCreateDTO) {
    try {
      const { email, password, firstName, lastName, username, address, dni } =
        data;

      const accountCreated = await this.accountService.create({
        email,
        firstName,
        lastName,
        username,
        address,
        password,
        dni,
        roleName: 'member',
        emailVerified: false,
      });

      accountCreated.password = '';

      const token = await this.authService.login(
        accountCreated.id,
        accountCreated['user'].id,
        accountCreated['user'].idRole,
      );

      const verifiedToken = await this.authService.login(
        accountCreated.id,
        accountCreated['user'].id,
        accountCreated['user'].idRole,
        '2h',
      );

      const urlConfirm = `${this.configService.get('client_url')}/auth/confirm/${verifiedToken}`;

      const bodyEmail = await this.getHtmlService.get('register', 'en', {
        name: accountCreated['user'].firstName,
        url: urlConfirm,
      });

      await this.mailService.send(accountCreated.email, 'Register', bodyEmail);

      return {
        success: true,
        data: {
          accessToken: token,
          account: accountCreated,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            success: false,
            message: 'username or email already registered',
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
