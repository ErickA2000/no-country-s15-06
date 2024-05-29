import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '@Prisma/prisma.module';
import { UpdateController } from './v1/update/update.controller';
import { GettersController } from './v1/getters/getters.controller';

@Module({
  providers: [UserService],
  imports: [PrismaModule],
  controllers: [UpdateController, GettersController],
})
export class UserModule {}
