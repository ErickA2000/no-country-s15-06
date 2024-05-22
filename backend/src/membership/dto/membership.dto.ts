export class MembershipCreateDTO {
  name: string;
  description: string;
  idPlanProvider?: string;
  price: number;
}

export class MembershipUpdateDTO {
  name?: string;
  description?: string;
  idPlanProvider?: string;
  price?: number;
}
