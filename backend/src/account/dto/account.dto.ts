import { IsPassword } from '@Decorators/password.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AccountCreateDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @IsPassword({
    message:
      'The password does not meet any of these, at least one uppercase letter, at least one lowercase letter, at least one number or at least one of the following special characters @; :-_/',
  })
  password?: string;
}

export class UpdateCreateDTO {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @IsPassword({
    message:
      'The password does not meet any of these, at least one uppercase letter, at least one lowercase letter, at least one number or at least one of the following special characters @; :-_/',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @IsPassword()
  currentPassword?: string;

  emailVerified?: boolean;
}
