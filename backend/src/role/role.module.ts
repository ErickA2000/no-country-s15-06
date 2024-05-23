import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaModule } from '@Prisma/prisma.module';

@Module({
  providers: [RoleService],
  imports: [PrismaModule],
  exports: [RoleService],
})
export class RoleModule {}
