import { Account, Role, User } from '@prisma/client';

export interface AccountWithUser extends Account {
  user: _User;
}

export interface _User extends User {
  role: Role;
}
