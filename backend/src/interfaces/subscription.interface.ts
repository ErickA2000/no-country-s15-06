import { Membership, Subscription } from '@prisma/client';

export interface FullSubscription extends Subscription {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  membership: Membership;
}
