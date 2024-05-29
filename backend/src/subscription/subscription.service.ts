import { PaginateResponse } from '@Interfaces/global.interface';
import { FullSubscription } from '@Interfaces/subscription.interface';
import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Subscription } from '@prisma/client';
import {
  SubscriptionCreatedDTO,
  SubscriptionUpdatedDTO,
} from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FullSubscription[]> {
    return this.prisma.subscription.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        membership: true,
      },
    });
  }

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginateResponse<FullSubscription>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const count = await this.prisma.subscription.count();
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const subscriptions = await this.prisma.subscription.findMany({
      skip: offset,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        membership: true,
      },
    });

    return this.prisma.paginate(subscriptions, {
      page,
      limit,
      pages,
      count,
      length: subscriptions.length,
    });
  }

  async findById(id: string): Promise<FullSubscription> {
    return this.prisma.subscription.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        membership: true,
      },
    });
  }

  async findByIdUser(idUser: string): Promise<FullSubscription> {
    return this.prisma.subscription.findFirst({
      where: {
        idUser,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        membership: true,
      },
    });
  }

  async add(data: SubscriptionCreatedDTO): Promise<Subscription> {
    return this.prisma.subscription.create({
      data,
    });
  }

  async update(
    id: string,
    data: SubscriptionUpdatedDTO,
  ): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: {
        id,
      },
      data,
    });
  }
}
