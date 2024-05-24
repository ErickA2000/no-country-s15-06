import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateRandom(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_-/';
    const min = 6;
    const max = 16;
    let password: string = '';

    const length = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < length; i++) {
      const indexCharacter = Math.floor(Math.random() * characters.length);
      password += characters.charAt(indexCharacter);
    }

    return password;
  }
}
