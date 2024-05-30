import { PaymentFrequency } from '@Constants/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MembershipCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  idPlanProvider: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  numberPeople: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(PaymentFrequency)
  paymentFrequency: string;
}

export class MembershipUpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  idPlanProvider?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  numberPeople?: number;

  @IsString()
  @IsOptional()
  @IsEnum(PaymentFrequency)
  paymentFrequency?: string;
}
