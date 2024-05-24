import { AccountService } from '@Account/account.service';
import { AuthService } from '@Auth/auth.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { GoogleAuthGuard } from '@Guards/google-auth/google-auth.guard';
import { LocalAuthGuard } from '@Guards/local-auth/local-auth.guard';
import { ResponseGoogleStrategy } from '@Interfaces/auth.interface';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.AUTH,
})
export class LoginController {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    try {
      const token = await this.authService.login(
        req.user['idAccount'],
        req.user['user'].id,
        req.user['user'].role.id,
      );

      return {
        success: true,
        data: {
          accessToken: token,
          account: {
            email: req.user['email'],
            username: req.user['username'],
            user: {
              firstName: req.user['user'].firstName,
              lastName: req.user['user'].lastName,
              role: {
                name: req.user['user'].role.name,
              },
            },
          },
        },
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async loginWithGoogle() {
    return {
      success: true,
    };
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAthCallback(@Req() req: Request) {
    const userInfo = req.user as ResponseGoogleStrategy;

    try {
      const account = await this.accountService.findByEmailOrUsername(
        userInfo.email,
      );

      if (account == null) {
        const accountCreated = await this.accountService.create({
          email: userInfo.email,
          username:
            userInfo.firstName.replace(/\s+/g, '') +
            new Date().valueOf().toString(),
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          roleName: 'member',
          emailVerified: userInfo.emailVerified,
        });

        const token = await this.authService.login(
          accountCreated.id,
          accountCreated.user.id,
          accountCreated.user.idRole,
        );

        return {
          success: true,
          data: {
            accessToken: token,
            account: {
              email: accountCreated.email,
              username: accountCreated.username,
              user: {
                firstName: accountCreated.user.firstName,
                lastName: accountCreated.user.lastName,
                role: {
                  name: accountCreated.user.role.name,
                },
              },
            },
          },
        };
      }

      const token = await this.authService.login(
        account.id,
        account.user.id,
        account.user.idRole,
      );

      return {
        success: true,
        data: {
          accessToken: token,
          account: {
            email: account.email,
            username: account.username,
            user: {
              firstName: account.user.firstName,
              lastName: account.user.lastName,
              role: {
                name: account.user.role.name,
              },
            },
          },
        },
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
