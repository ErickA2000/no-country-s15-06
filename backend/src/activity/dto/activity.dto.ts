import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class ActivityCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  idMembership: string;

  @IsString()
  @IsNotEmpty()
  idInstructor: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  quotas: number;
}

export class ActivityUpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  idMembership?: string;

  @IsString()
  @IsOptional()
  idInstructor?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  quotas?: number;

  occupiedQuotas?: number;
}
