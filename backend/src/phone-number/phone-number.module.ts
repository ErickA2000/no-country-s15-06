import { Module } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { GettersController } from './v1/getters/getters.controller';
import { AddController } from './v1/add/add.controller';
import { DeleteController } from './v1/delete/delete.controller';
import { UpdateController } from './v1/update/update.controller';

@Module({
  providers: [PhoneNumberService],
  imports: [PrismaModule],
  controllers: [GettersController, AddController, DeleteController, UpdateController],
})
export class PhoneNumberModule {}
