import { DaysWeek } from '@Constants/enums';
import { IsHourFormat } from '@Decorators/hour.decorator';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActivityDayCreateDTO {
  @IsString()
  @IsNotEmpty()
  idActivity: string;

  @IsEnum(DaysWeek)
  @IsNotEmpty()
  day: string;

  @IsNotEmpty()
  @IsString()
  @IsHourFormat({
    message: 'The time was not set correctly',
    context: '12',
  })
  hour: string;
}

export class ActivityDayUpdateDTO {
  idActivity?: string;

  @IsOptional()
  @IsEnum(DaysWeek)
  day?: string;

  @IsOptional()
  @IsString()
  @IsHourFormat({
    message: 'The time was not set correctly',
    context: '12',
  })
  hour?: string;
}
