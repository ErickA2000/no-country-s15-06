import { IsStringCustom } from '@Decorators/string-custom.decorator';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @IsStringCustom(3, 10)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @IsStringCustom(3, 10)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(7)
  @MaxLength(9)
  @IsNumberString()
  dni?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  address?: string;
}
