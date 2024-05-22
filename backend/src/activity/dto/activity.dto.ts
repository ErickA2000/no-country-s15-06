export class ActivityCreateDTO {
  name: string;
  idMembership: string;
  idInstructor: string;
  location: string;
  description: string;
  quotas: number;
  occupiedQuotas: number;
}

export class ActivityUpdateDTO {
  name: string;
  idMembership: string;
  idInstructor: string;
  location: string;
  description: string;
  quotas: number;
  occupiedQuotas: number;
}
