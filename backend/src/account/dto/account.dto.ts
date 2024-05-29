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

  emailVerified?: boolean;

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

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(7)
  @MaxLength(9)
  dni?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  address?: string;

  roleName: string;
}

export class AccountUpdateDTO {
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
  currentPassword?: string;

  emailVerified?: boolean;
}

export class AccountCreateByAdminDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  emailVerified?: boolean;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  username: string;

  password?: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(7)
  @MaxLength(9)
  dni?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  address?: string;

  @IsNotEmpty()
  @IsString()
  roleName: string;
}
