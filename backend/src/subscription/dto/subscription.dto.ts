import { IsString } from 'class-validator';

export class SubscriptionCreatedDTO {
  idUser: string;
  idMembership: string;
  idSubscriptionProvider: string;
  subscriptionProvider: string;
  startDate: Date;
  nextPayment?: Date;
  lastPayment?: Date;
  state: string;
  pay_link: string;
}

export class SubscriptionUpdatedDTO {
  // idUser?: string;
  idMembership?: string;
  idSubscriptionProvider?: string;
  subscriptionProvider?: string;
  startDate?: Date;
  nextPayment?: Date;
  lastPayment?: Date;
  state?: string;
  pay_link?: string;
}

export class CancelSubscriptionDTO {
  @IsString()
  reason: string;
}
