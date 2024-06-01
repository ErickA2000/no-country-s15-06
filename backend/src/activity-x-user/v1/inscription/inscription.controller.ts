import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  PreconditionFailedException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ActivityXUserService } from 'src/activity-x-user/activity-x-user.service';
import { ActivityXuserCreateDTO } from 'src/activity-x-user/dto/activity-x-user.dto';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ACTIVITY + '/user',
})
export class InscriptionController {
  constructor(private activityXuserService: ActivityXUserService) {}

  @Roles('member')
  @Post('inscription')
  async add(@Body() data: ActivityXuserCreateDTO, @Req() req: Request) {
    try {
      const activity = await this.activityXuserService.add({
        idActivity: data.idActivity,
        idActivityDay: data.idActivityDay,
        idUser: req.user['user'],
        state: true,
      });

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

        if (error.message == 'full') {
          throw new BadRequestException({
            success: false,
            message: 'There are no vacancies for the activity',
          });
        }

        if (error.message == 'noSubscription') {
          throw new PreconditionFailedException({
            success: false,
            message:
              'You cannot register for the activity because you are not subscribed to a membership.',
          });
        }

        if (error.message == 'isRegistered') {
          throw new BadRequestException({
            success: false,
            message: 'You are already registered in this activity',
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
