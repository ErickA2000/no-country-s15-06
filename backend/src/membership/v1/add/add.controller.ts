import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { MembershipCreateDTO } from '@Membership/dto/membership.dto';
import { MembershipService } from '@Membership/membership.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.MEMBERSHIP,
})
export class AddController {
  constructor(private membershipService: MembershipService) {}

  @Roles('admin')
  @Post()
  async create(@Body() data: MembershipCreateDTO) {
    try {
      const membership = await this.membershipService.add(data);

      return {
        success: true,
        data: membership,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
