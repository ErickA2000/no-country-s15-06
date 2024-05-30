import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { GettersController } from './v1/getters/getters.controller';
import { UpdateController } from './v1/update/update.controller';
import { DeleteController } from './v1/delete/delete.controller';
import { AddController } from './v1/add/add.controller';

@Module({
  providers: [MembershipService],
  imports: [PrismaModule],
  controllers: [GettersController, UpdateController, DeleteController, AddController],
})
export class MembershipModule {}
