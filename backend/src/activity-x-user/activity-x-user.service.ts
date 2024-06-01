import { FullActivityXuser } from '@Interfaces/activity-x-user.interface';
import { PaginateResponse } from '@Interfaces/global.interface';
import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  ActivityXuserCreateDTO,
  ActivityXuserUpdateDTO,
} from './dto/activity-x-user.dto';
import { ActivityXuser } from '@prisma/client';

@Injectable()
export class ActivityXUserService {
  constructor(private prisma: PrismaService) {}

  async findAll(idUser: string): Promise<FullActivityXuser[]> {
    return this.prisma.activityXuser.findMany({
      where: {
        idUser,
      },
      include: {
        activity: {
          include: {
            instructor: true,
          },
        },
        activityDay: true,
      },
    });
  }

  async findAllPaginate(
    idUser: string,
    page: number,
    limit: number,
  ): Promise<PaginateResponse<FullActivityXuser>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const count = await this.prisma.activityXuser.count();
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const activitiesXuser = await this.prisma.activityXuser.findMany({
      where: {
        idUser,
      },
      skip: offset,
      take: limit,
      include: {
        activity: {
          include: {
            instructor: true,
          },
        },
        activityDay: true,
      },
    });

    return this.prisma.paginate(activitiesXuser, {
      page,
      limit,
      pages,
      count,
      length: activitiesXuser.length,
    });
  }

  async findOne(
    idUser: string,
    idActivity: string,
  ): Promise<FullActivityXuser> {
    return this.prisma.activityXuser.findFirst({
      where: {
        idUser,
        idActivity,
      },
      include: {
        activity: {
          include: {
            instructor: true,
          },
        },
        activityDay: true,
      },
    });
  }

  async add(data: ActivityXuserCreateDTO): Promise<ActivityXuser> {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        idUser: data.idUser,
      },
    });

    if (subscription == null || subscription.state != 'active') {
      throw new Error('noSubscription');
    }

    const activity = await this.prisma.activity.findUnique({
      where: {
        id: data.idActivity,
      },
    });
    if (activity === null) throw new Error('null');
    const available = activity.quotas - activity.occupiedQuotas;

    if (available == 0) throw new Error('full');

    const isRegistered = await this.prisma.activityXuser.findFirst({
      where: {
        idActivity: data.idActivity,
        idUser: data.idUser,
      },
    });

    if (isRegistered != null) throw new Error('isRegistered');

    const activityUser = await this.prisma.activityXuser.create({ data });

    await this.prisma.activity.update({
      where: {
        id: data.idActivity,
      },
      data: {
        occupiedQuotas: activity.occupiedQuotas + 1,
      },
    });

    return activityUser;
  }

  async update(
    id: string,
    data: ActivityXuserUpdateDTO,
  ): Promise<ActivityXuser> {
    return this.prisma.activityXuser.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteActivity(id: string, idActivity: string): Promise<ActivityXuser> {
    const activity = await this.prisma.activity.findUnique({
      where: {
        id: idActivity,
      },
    });
    if (activity == null) throw new Error('null');

    const activityUser = await this.prisma.activityXuser.delete({
      where: {
        id,
      },
    });

    await this.prisma.activity.update({
      where: {
        id: idActivity,
      },
      data: {
        occupiedQuotas: activity.occupiedQuotas - 1,
      },
    });

    return activityUser;
  }
}
