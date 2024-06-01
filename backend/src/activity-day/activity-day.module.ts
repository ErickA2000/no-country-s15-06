import { Module } from '@nestjs/common';
import { ActivityDayService } from './activity-day.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { AddController } from './v1/add/add.controller';
import { UpdateController } from './v1/update/update.controller';
import { DeleteController } from './v1/delete/delete.controller';

@Module({
  providers: [ActivityDayService],
  imports: [PrismaModule],
  controllers: [AddController, UpdateController, DeleteController],
})
export class ActivityDayModule {}
