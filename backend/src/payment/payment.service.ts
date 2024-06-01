import { PaginateResponse } from '@Interfaces/global.interface';
import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PaymentCreateDTO, PaymentUpdateDTO } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginateResponse<Payment>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const count = await this.prisma.payment.count();
    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const payments = await this.prisma.payment.findMany({
      skip: offset,
      take: limit,
    });

    return this.prisma.paginate(payments, {
      page,
      limit,
      pages,
      count,
      length: payments.length,
    });
  }

  async findOneById(id: string): Promise<Payment> {
    return this.prisma.payment.findUnique({
      where: {
        id,
      },
    });
  }

  async findAllByUser(idUser: string): Promise<Payment[]> {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        idUser,
      },
    });

    if (subscription == null) throw new Error('no subscription');

    return this.prisma.payment.findMany({
      where: {
        idSubscription: subscription.id,
      },
    });
  }

  async add(data: PaymentCreateDTO): Promise<Payment> {
    return this.prisma.payment.create({
      data,
    });
  }

  async update(id: string, data: PaymentUpdateDTO): Promise<Payment> {
    return this.prisma.payment.update({
      where: {
        id,
      },
      data,
    });
  }
}
