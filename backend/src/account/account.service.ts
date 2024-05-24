import { EMAIL } from '@Constants/regex';
import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { AccountCreateDTO, AccountUpdateDTO } from './dto/account.dto';
import { PasswordService } from '@Helpers/password/password.service';
import { RoleService } from '@Role/role.service';
import { AccountWithUser } from '@Interfaces/account.interface';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private roleService: RoleService,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.prisma.account.findMany({
      include: {
        user: true,
      },
    });
  }

  async findByEmailOrUsername(username: string): Promise<AccountWithUser> {
    if (EMAIL.test(username)) {
      return this.prisma.account.findFirst({
        where: {
          email: username,
        },
        include: {
          user: {
            include: {
              role: true,
            },
          },
        },
      });
    }

    return this.prisma.account.findFirst({
      where: {
        username,
      },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Account> {
    return this.prisma.account.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: AccountCreateDTO): Promise<AccountWithUser> {
    const role = await this.roleService.findByName(data.roleName);

    if (role === null) {
      throw new Error('Role not found');
    }

    return this.prisma.account.create({
      data: {
        email: data.email,
        username: data.username,
        password:
          data.password == null || data.password == undefined
            ? null
            : await this.passwordService.hash(data.password),
        emailVerified: data.emailVerified,
        user: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName == undefined ? '' : data.lastName,
            idRole: role.id,
            dni: data.dni,
            address: data.address,
          },
        },
      },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: AccountUpdateDTO,
    resetPassword = false,
  ): Promise<Account> {
    const { password, currentPassword, ...req } = data;

    if (!resetPassword) {
      if ((password && !currentPassword) || (!password && currentPassword)) {
        throw new Error('current or new password has not been sent');
      }
    }

    let hash: string;
    if (password && currentPassword) {
      if (password === currentPassword) throw new Error('matching passwords');
      const account = await this.prisma.account.findUnique({
        where: {
          id,
        },
      });

      const comparePassword = await this.passwordService.compare(
        currentPassword,
        account.password,
      );

      if (!comparePassword) throw new Error('incorrect current password');

      hash = await this.passwordService.hash(password);
    }

    if (resetPassword) {
      hash = await this.passwordService.hash(password);
    }

    return this.prisma.account.update({
      where: {
        id,
      },
      data: {
        email: req.email,
        emailVerified: req.emailVerified,
        username: req.username,
        password: hash,
      },
    });
  }

  async delete(idAccount: string, idUser: string) {
    const phoneNumber = this.prisma.phoneNumber.deleteMany({
      where: {
        idUser,
      },
    });

    const activityXuser = this.prisma.activityXuser.deleteMany({
      where: {
        idUser,
      },
    });

    const user = this.prisma.user.delete({
      where: {
        id: idUser,
      },
    });

    const account = this.prisma.account.delete({
      where: {
        id: idAccount,
      },
    });

    return this.prisma.$transaction([
      phoneNumber,
      activityXuser,
      user,
      account,
    ]);
  }
}
