import { PaginateResponse } from '@Interfaces/global.interface';
import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        account: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            username: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        phoneNumber: true,
        activity: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginateResponse<User>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 20;

    const count = await this.prisma.user.count();
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      include: {
        account: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            username: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        phoneNumber: true,
        activity: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.prisma.paginate<User>(users, {
      page,
      limit,
      pages,
      count,
      length: users.length,
    });
  }

  async findOneById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        account: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            username: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        phoneNumber: true,
        activity: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
