import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActivityXuserCreateDTO {
  idUser: string;

  @IsString()
  @IsNotEmpty()
  idActivity: string;

  @IsNotEmpty()
  @IsString()
  idActivityDay: string;

  state: boolean;
}

export class ActivityXuserUpdateDTO {
  idUser?: string;
  idActivity?: string;

  @IsOptional()
  @IsString()
  idActivityDay?: string;

  @IsNotEmpty()
  @IsBoolean()
  state?: boolean;
}
