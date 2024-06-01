import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ActivityXUserService } from 'src/activity-x-user/activity-x-user.service';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY + '/user',
})
export class DeleteController {
  constructor(private activityXuserService: ActivityXUserService) {}

  @Roles('member')
  @Delete(':id/:idActivity')
  async deleteActivityOfUser(
    @Param('id') id: string,
    @Param('idActivity') idActivity: string,
  ) {
    try {
      const activity = await this.activityXuserService.deleteActivity(
        id,
        idActivity,
      );

      return {
        success: true,
        data: activity,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'null') {
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
