import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  ActivityDayCreateDTO,
  ActivityDayUpdateDTO,
} from './dto/activity-day.dto';
import { ActivityDay } from '@prisma/client';

@Injectable()
export class ActivityDayService {
  constructor(private prisma: PrismaService) {}

  async add(data: ActivityDayCreateDTO): Promise<ActivityDay> {
    return this.prisma.activityDay.create({
      data,
    });
  }

  async update(id: string, data: ActivityDayUpdateDTO): Promise<ActivityDay> {
    return this.prisma.activityDay.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteActivityDay(id: string): Promise<ActivityDay> {
    return this.prisma.activityDay.delete({
      where: {
        id,
      },
    });
  }
}
