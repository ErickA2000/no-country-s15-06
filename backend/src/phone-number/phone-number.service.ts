import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PhoneNumber } from '@prisma/client';
import {
  PhoneNumberCreateDTO,
  PhoneNumberUpdateDTO,
} from './dto/phone-number.dto';

@Injectable()
export class PhoneNumberService {
  constructor(private prisma: PrismaService) {}

  async findAll(idUser: string): Promise<PhoneNumber[]> {
    return this.prisma.phoneNumber.findMany({
      where: {
        idUser,
      },
    });
  }

  async findOne(id: string, idUser: string): Promise<PhoneNumber> {
    return this.prisma.phoneNumber.findFirst({
      where: {
        id,
        idUser,
      },
    });
  }

  async add(data: PhoneNumberCreateDTO): Promise<PhoneNumber> {
    return this.prisma.phoneNumber.create({ data });
  }

  async update(id: string, data: PhoneNumberUpdateDTO): Promise<PhoneNumber> {
    return this.prisma.phoneNumber.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteNumber(id: string): Promise<PhoneNumber> {
    return this.prisma.phoneNumber.delete({
      where: {
        id,
      },
    });
  }
}
