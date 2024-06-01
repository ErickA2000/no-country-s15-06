import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { GettersController } from './v1/getters/getters.controller';
import { AddController } from './v1/add/add.controller';
import { UpdateController } from './v1/update/update.controller';
import { DeleteController } from './v1/delete/delete.controller';

@Module({
  providers: [ActivityService],
  imports: [PrismaModule],
  controllers: [GettersController, AddController, UpdateController, DeleteController],
})
export class ActivityModule {}
