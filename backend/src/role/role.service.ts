import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findByName(name: string): Promise<Role> {
    return this.prisma.role.findFirst({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<Role> {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }
}
