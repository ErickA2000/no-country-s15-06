import { AccountService } from '@Account/account.service';
import { PasswordService } from '@Helpers/password/password.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(userName: string, pass: string) {
    const account = await this.accountService.findByEmailOrUsername(userName);

    if (!account) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const comparePassword = await this.passwordService.compare(
      pass,
      account.password,
    );

    if (!comparePassword) {
      return {
        success: false,
        message: 'Incorrect password',
      };
    }

    return {
      success: true,
      data: {
        idAccount: account.id,
        email: account.email,
        username: account.username,
        user: {
          id: account.user.id,
          firstName: account.user.firstName,
          lastName: account.user.lastName,
          role: account.user.role,
        },
      },
    };
  }

  async login(
    idAccount: string,
    idUser: string,
    idRole: string,
    expiresIn?: string,
  ): Promise<string> {
    if (!expiresIn) expiresIn = '24h';

    const payload = {
      sub: idAccount,
      user: idUser,
      role: idRole,
    };

    return this.jwtService.signAsync(payload, { expiresIn });
  }
}
