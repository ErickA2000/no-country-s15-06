import { ActivityService } from '@Activity/activity.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY,
})
export class GettersController {
  constructor(private activityService: ActivityService) {}

  @Public()
  @Get()
  async getAll() {
    try {
      const activities = await this.activityService.findAll();

      return {
        success: true,
        data: activities,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Public()
  @Get('p')
  async getAllPaginate(@Query('page') p: string, @Query('limit') l: string) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);

    try {
      const activities = await this.activityService.findAllPaginate(
        page,
        limit,
      );

      return {
        success: true,
        data: activities,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Public()
  @Get('one/:id')
  async getOneById(@Param('id') id: string) {
    try {
      const activity = await this.activityService.findOneById(id);

      if (activity == null) throw new Error('null');

      return {
        success: true,
        data: activity,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
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
