import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { MembershipUpdateDTO } from '@Membership/dto/membership.dto';
import { MembershipService } from '@Membership/membership.service';
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
  path: PRINCIPAL_PATHS.MEMBERSHIP,
})
export class UpdateController {
  constructor(private membershipService: MembershipService) {}

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: MembershipUpdateDTO) {
    try {
      const membership = await this.membershipService.update(id, data);

      return {
        success: true,
        data: membership,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException({
            success: false,
            message: 'Membership not found',
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
