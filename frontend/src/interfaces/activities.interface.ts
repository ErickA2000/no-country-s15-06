export interface IResponseSports {
  ok: boolean;
  message: string;
  sports: IActivity[] | null;
}

export interface IResponseActivities {
  ok: boolean;
  message: string;
  activities: IActivity[] | null;
}

export interface IResponseActivity {
  ok: boolean;
  message: string;
  activity: IActivity | null;
}

export interface IActivity {
  id: string;
  name: string;
  image: string;
  idMembership: string;
  idInstructor: string;
  location: string;
  description: string;
  quotas: number;
  occupiedQuotas: number;
  activityDay: IActivityDay[];
  instructor: IInstructor;
  membership: IMembership;
}

export interface IActivityDay {
  id: string;
  idActivity: string;
  day: string;
  hour: string;
}

export interface IInstructor {
  id: string;
  idRole: string;
  idAccount: string;
  firstName: string;
  lastName: string;
  dni: null;
  address: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMembership {
  id: string;
  name: string;
  description: string;
  idPlanProvider: string;
  price: number;
  numberPeople: number;
  paymentFrequency: string;
}
