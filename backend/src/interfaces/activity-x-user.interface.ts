import { Activity, ActivityDay, ActivityXuser, User } from '@prisma/client';

export interface FullActivityXuser extends ActivityXuser {
  activity: IActivity;
  activityDay: ActivityDay;
}

interface IActivity extends Activity {
  instructor: User;
}
