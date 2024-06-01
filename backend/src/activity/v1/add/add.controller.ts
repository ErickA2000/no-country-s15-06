import { ActivityService } from '@Activity/activity.service';
import { ActivityCreateDTO } from '@Activity/dto/activity.dto';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY,
})
export class AddController {
  constructor(private activityService: ActivityService) {}

  @Roles('admin')
  @Post()
  async add(@Body() data: ActivityCreateDTO) {
    try {
      const activity = await this.activityService.create(data);

      return {
        success: true,
        data: activity,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
