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
