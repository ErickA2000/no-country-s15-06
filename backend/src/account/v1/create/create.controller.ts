import { AccountService } from '@Account/account.service';
import { AccountCreateByAdminDTO } from '@Account/dto/account.dto';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { GetHtmlService } from '@Helpers/get-html/get-html.service';
import { MailService } from '@Helpers/mail/mail.service';
import { PasswordService } from '@Helpers/password/password.service';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACCOUNT,
})
export class CreateController {
  constructor(
    private accountService: AccountService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private getHtmlService: GetHtmlService,
    private mailService: MailService,
  ) {}

  @Roles('admin')
  @Post()
  async create(@Body() data: AccountCreateByAdminDTO) {
    const { email, firstName, lastName, username, address, dni, roleName } =
      data;

    try {
      const password = this.passwordService.generateRandom();

      const accountCreated = await this.accountService.create({
        email,
        username,
        firstName,
        lastName,
        address,
        dni,
        roleName,
        password,
        emailVerified: false,
      });

      accountCreated.password = '';

      const token = await this.jwtService.signAsync(
        {
          sub: accountCreated.id,
          user: accountCreated.user.id,
          role: accountCreated.user.idRole,
        },
        { expiresIn: '2h' },
      );

      const urlConfirm = `${this.configService.get('client_url')}/auth/confirm/${token}`;

      const bodyEmail = await this.getHtmlService.get(
        'register-by-admin',
        'en',
        {
          name: accountCreated.user.firstName,
          url: urlConfirm,
          username: accountCreated.username,
          password,
        },
      );

      await this.mailService.send(accountCreated.email, 'Register', bodyEmail);

      return {
        success: true,
        data: accountCreated,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            success: false,
            message: `${error.meta.target} already registered`,
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
