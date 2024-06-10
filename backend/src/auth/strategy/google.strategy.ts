import { GoogleProfile } from '@Interfaces/auth.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const google = configService.get('google');

    super({
      clientID: google['clientId'],
      clientSecret: google['secret'],
      //* Cambiar el url /api/v1 cuando se este utilizando con el frontend
      callbackURL: configService.get('client_url') + '/auth/login',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    const user = {
      accessToken,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      email: profile._json.email,
      emailVerified: profile._json.email_verified,
    };

    done(null, user);
  }
}
