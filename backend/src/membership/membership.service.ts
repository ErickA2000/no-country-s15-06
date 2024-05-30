import { PaginateResponse } from '@Interfaces/global.interface';
import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Membership } from '@prisma/client';
import { MembershipCreateDTO, MembershipUpdateDTO } from './dto/membership.dto';

@Injectable()
export class MembershipService {
  constructor(private prisma: PrismaService) {}

  async findAll(paymentFrequency = 'mensual'): Promise<Membership[]> {
    return this.prisma.membership.findMany({
      where: {
        paymentFrequency,
      },
      include: {
        activities: true,
      },
    });
  }

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginateResponse<Membership>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const count = await this.prisma.membership.count();
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const memberships = await this.prisma.membership.findMany({
      skip: offset,
      take: limit,
      include: {
        activities: true,
      },
    });

    return this.prisma.paginate(memberships, {
      page,
      limit,
      pages,
      count,
      length: memberships.length,
    });
  }

  async findById(id: string): Promise<Membership> {
    return this.prisma.membership.findUnique({
      where: {
        id,
      },
      include: {
        activities: true,
      },
    });
  }

  async add(data: MembershipCreateDTO): Promise<Membership> {
    return this.prisma.membership.create({
      data: {
        name: data.name,
        description: data.description,
        idPlanProvider: data.idPlanProvider,
        price: data.price,
        numberPeople: data.numberPeople,
        paymentFrequency: data.paymentFrequency,
      },
    });
  }

  async update(id: string, data: MembershipUpdateDTO): Promise<Membership> {
    return this.prisma.membership.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        idPlanProvider: data.idPlanProvider,
        price: data.price,
        numberPeople: data.numberPeople,
        paymentFrequency: data.paymentFrequency,
      },
    });
  }

  async deleteMembership(id: string): Promise<Membership> {
    return this.prisma.membership.delete({
      where: {
        id,
      },
    });
  }
}
