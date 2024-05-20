import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PasswordService } from '@Helpers/password/password.service';

@Module({
  providers: [PrismaService, PasswordService],
  exports: [PrismaService],
})
export class PrismaModule {}
