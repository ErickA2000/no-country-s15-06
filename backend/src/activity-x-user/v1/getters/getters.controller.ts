import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ActivityXUserService } from 'src/activity-x-user/activity-x-user.service';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY + '/user',
})
export class GettersController {
  constructor(private activityXuserService: ActivityXUserService) {}

  @Roles('member')
  @Get()
  async getAll(@Req() req: Request) {
    try {
      const activities = await this.activityXuserService.findAll(
        req.user['user'],
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

  @Roles('member')
  @Get('p')
  async getAllPaginate(
    @Query('page') p: string,
    @Query('limit') l: string,
    @Req() req: Request,
  ) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);

    try {
      const activities = await this.activityXuserService.findAllPaginate(
        req.user['user'],
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

  @Roles('member')
  @Get('one/:idActivity')
  async getOne(@Param('idActivity') idActivity: string, @Req() req: Request) {
    try {
      const activity = await this.activityXuserService.findOne(
        req.user['user'],
        idActivity,
      );
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
