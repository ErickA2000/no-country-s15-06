import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  quotas: number;

  @IsNumber()
  @IsNotEmpty()
  occupiedQuotas: number;
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

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  quotas?: number;

  @IsNumber()
  @IsOptional()
  occupiedQuotas?: number;
}
