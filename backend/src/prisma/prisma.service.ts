import { PasswordService } from '@Helpers/password/password.service';
import { PaginateResponse } from '@Interfaces/global.interface';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly passwordService: PasswordService) {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      const foundRole = await this.role.count();
      const foundAccount = await this.account.count();

      //* Create role
      if (foundRole == 0) {
        this.role.createMany({
          data: [
            {
              name: 'member',
              description: 'Miembro del club',
            },
            {
              name: 'admin',
              description: 'Administrador del club',
            },
            {
              name: 'instructor',
              description: 'Instructor de actividades',
            },
          ],
        });
      }

      //* Create account
      if (foundAccount == 0) {
        const role = await this.role.findFirst({
          where: {
            name: 'admin',
          },
        });

        this.account.create({
          data: {
            email: 'admin@gmail.com',
            username: 'admin',
            password: await this.passwordService.hash('admin1234'),
            emailVerified: true,
            user: {
              create: {
                firstName: 'Admin',
                lastName: 'Admin',
                idRole: role.id,
              },
            },
          },
        });
      }
    } catch (error) {
      console.error('Initial setup: ', error);
    }
  }

  paginate<T>(
    docs: T[],
    complement: {
      page: number;
      limit: number;
      count: number;
      pages: number;
      length: number;
    },
  ): PaginateResponse<T> {
    const { page, limit, count, pages, length } = complement;
    return {
      docs,
      totalDocs: count,
      totalPages: pages,
      limit,
      page,
      hasPrevPage: page == 1 || length == 0 ? false : true,
      hasNextPage: pages > page ? true : false,
      nextPage: page == pages || length == 0 ? null : page + 1,
      prevPage: page <= 1 || length == 0 ? null : page - 1,
    };
  }
}
