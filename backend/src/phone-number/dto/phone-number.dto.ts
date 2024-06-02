import { IsPhoneNumberCustom } from '@Decorators/phone-number.decorator';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PhoneNumberCreateDTO {
  idUser: string;

  @IsPhoneNumberCustom(10)
  @IsNotEmpty()
  number: string;
}

export class PhoneNumberUpdateDTO {
  idUser?: string;

  @IsOptional()
  @IsPhoneNumberCustom(10)
  number?: string;
}
