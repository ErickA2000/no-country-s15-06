import { ActivityDayService } from '@ActivityDay/activity-day.service';
import { ActivityDayUpdateDTO } from '@ActivityDay/dto/activity-day.dto';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Patch,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY_DAY,
})
export class UpdateController {
  constructor(private activityDayService: ActivityDayService) {}

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: ActivityDayUpdateDTO) {
    try {
      const activityDay = await this.activityDayService.update(id, {
        day: data.day,
        hour: data.hour,
      });

      return {
        success: true,
        data: activityDay,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException({
            success: false,
            message: 'Activity day not found',
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
