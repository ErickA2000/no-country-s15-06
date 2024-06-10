import { ActivityService } from '@Activity/activity.service';
import { ActivityUpdateDTO } from '@Activity/dto/activity.dto';
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
  path: PRINCIPAL_PATHS.ACTIVITY,
})
export class UpdateController {
  constructor(private activityService: ActivityService) {}

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: ActivityUpdateDTO) {
    try {
      const activity = await this.activityService.update(id, {
        name: data.name,
        idMembership: data.idMembership,
        idInstructor: data.idInstructor,
        image: data.image,
        description: data.description,
        location: data.location,
        quotas: data.quotas,
      });

      return {
        success: false,
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
