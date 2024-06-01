import { FullActivity } from '@Interfaces/activity.interface';
import { PaginateResponse } from '@Interfaces/global.interface';
import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ActivityCreateDTO, ActivityUpdateDTO } from './dto/activity.dto';
import { Activity } from '@prisma/client';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FullActivity[]> {
    return this.prisma.activity.findMany({
      include: {
        activityDay: true,
        instructor: true,
        membership: true,
      },
    });
  }

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginateResponse<FullActivity>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 20;

    const count = await this.prisma.activity.count();
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const activities = await this.prisma.activity.findMany({
      skip: offset,
      take: limit,
      include: {
        activityDay: true,
        instructor: true,
        membership: true,
      },
    });

    return this.prisma.paginate<FullActivity>(activities, {
      page,
      limit,
      pages,
      count,
      length: activities.length,
    });
  }

  async findOneById(id: string): Promise<FullActivity> {
    return this.prisma.activity.findUnique({
      where: {
        id,
      },
      include: {
        activityDay: true,
        instructor: true,
        membership: true,
      },
    });
  }

  async create(data: ActivityCreateDTO): Promise<Activity> {
    return this.prisma.activity.create({
      data: {
        occupiedQuotas: 0,
        ...data,
      },
    });
  }

  async update(id: string, data: ActivityUpdateDTO): Promise<Activity> {
    return this.prisma.activity.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteActivity(id: string) {
    const activityDay = this.prisma.activityDay.deleteMany({
      where: {
        idActivity: id,
      },
    });

    const activity = this.prisma.activity.delete({
      where: {
        id,
      },
    });

    return this.prisma.$transaction([activityDay, activity]);
  }
}
