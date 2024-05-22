import { AuthService } from '@Auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const account = await this.authService.validateAccount(username, password);

    if (!account.success) {
      throw new UnauthorizedException(account.message);
    }

    return account.data;
  }
}
