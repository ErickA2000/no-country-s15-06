import { ActivityDayService } from '@ActivityDay/activity-day.service';
import { ActivityDayCreateDTO } from '@ActivityDay/dto/activity-day.dto';
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
  path: PRINCIPAL_PATHS.ACTIVITY_DAY,
})
export class AddController {
  constructor(private activityDayService: ActivityDayService) {}

  @Roles('admin')
  @Post()
  async add(@Body() data: ActivityDayCreateDTO) {
    try {
      const activityDay = await this.activityDayService.add(data);

      return {
        success: true,
        data: activityDay,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
