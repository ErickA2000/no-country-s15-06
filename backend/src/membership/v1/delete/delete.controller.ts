import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { MembershipService } from '@Membership/membership.service';
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
  path: PRINCIPAL_PATHS.MEMBERSHIP,
})
export class DeleteController {
  constructor(private membershipService: MembershipService) {}

  @Roles('admin')
  @Delete(':id')
  async deleteMembership(@Param('id') id: string) {
    try {
      await this.membershipService.deleteMembership(id);

      return {
        success: true,
        message: 'Membership deleted',
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
