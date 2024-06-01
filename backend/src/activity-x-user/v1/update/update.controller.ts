import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ActivityXUserService } from 'src/activity-x-user/activity-x-user.service';
import { ActivityXuserUpdateDTO } from 'src/activity-x-user/dto/activity-x-user.dto';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY + '/user',
})
export class UpdateController {
  constructor(private activityXuserService: ActivityXUserService) {}

  @Roles('member')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: ActivityXuserUpdateDTO) {
    try {
      const activity = await this.activityXuserService.update(id, {
        idActivityDay: data.idActivityDay,
        state: data.state,
      });

      return {
        success: false,
        data: activity,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException({
            success: false,
            message: 'Activity not found',
          });
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
