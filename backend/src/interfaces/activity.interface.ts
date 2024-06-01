import { Activity, ActivityDay, Membership, User } from '@prisma/client';

export interface FullActivity extends Activity {
  activityDay: ActivityDay[];
  instructor: User;
  membership: Membership;
}
