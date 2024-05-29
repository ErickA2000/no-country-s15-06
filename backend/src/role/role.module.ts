import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { GettersController } from './v1/getters/getters.controller';

@Module({
  providers: [RoleService],
  imports: [PrismaModule],
  exports: [RoleService],
  controllers: [GettersController],
})
export class RoleModule {}
