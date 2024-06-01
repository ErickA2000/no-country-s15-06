import { PaymentService } from '@Constants/enums';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PaymentCreateDTO {
  idSubscription: string;
  currencyCode: string;
  amount: number;
  date: Date;
  service: string;
  method: string;
  status: string;
}

export class PaymentUpdateDTO {
  idSubscription?: string;
  currencyCode?: string;
  amount?: number;
  date?: Date;
  service?: string;
  method?: string;
  status?: string;
}

export class PaymentDTO {
  @IsEnum(PaymentService)
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  idMembership: string;

  @IsString()
  @IsNotEmpty()
  idPlanProvider: string;
}
