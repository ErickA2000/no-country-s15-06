import { ActivityDayService } from '@ActivityDay/activity-day.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  BadRequestException,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY_DAY,
})
export class DeleteController {
  constructor(private activityDayService: ActivityDayService) {}

  @Roles('admin')
  @Delete(':id')
  async deleteActivityDay(@Param('id') id: string) {
    try {
      const activityDay = await this.activityDayService.deleteActivityDay(id);

      return {
        success: true,
        message: 'Activity day deleted',
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
