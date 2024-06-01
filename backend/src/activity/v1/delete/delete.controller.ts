import { ActivityService } from '@Activity/activity.service';
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
  path: PRINCIPAL_PATHS.ACTIVITY,
})
export class DeleteController {
  constructor(private activityService: ActivityService) {}

  @Roles('admin')
  @Delete(':id')
  async deleteActivity(@Param('id') id: string) {
    try {
      const activity = await this.activityService.deleteActivity(id);

      return {
        success: true,
        message: 'Activity deleted',
        data: activity,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException({
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
