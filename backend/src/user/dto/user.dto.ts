import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @MinLength(3)
  firstName?: string;

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
}
