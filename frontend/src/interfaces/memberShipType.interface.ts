//memberShipType.interface
export interface IResponseMemberShipType {
  success: boolean;
  date: IMemberShipType[];
}

export interface IMemberShipType {
  id: string;
  name: string;
  description: string;
  idPlanProvider: string;
  price: number;
  numberPeople: number;
  paymentFrequency: string;
  activities: IActivity[];
}

export interface IActivity {
  id: string;
  name: string;
  idMembership: string;
  idInstructor: string;
  location: string;
  description: string;
  quotas: number;
  occupiedQuotas: number;
}
