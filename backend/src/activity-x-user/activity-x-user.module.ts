import { Module } from '@nestjs/common';
import { ActivityXUserService } from './activity-x-user.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { GettersController } from './v1/getters/getters.controller';
import { InscriptionController } from './v1/inscription/inscription.controller';
import { UpdateController } from './v1/update/update.controller';
import { DeleteController } from './v1/delete/delete.controller';

@Module({
  providers: [ActivityXUserService],
  imports: [PrismaModule],
  controllers: [GettersController, InscriptionController, UpdateController, DeleteController],
})
export class ActivityXUserModule {}
