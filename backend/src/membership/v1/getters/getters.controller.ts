import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { MembershipService } from '@Membership/membership.service';
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
  path: PRINCIPAL_PATHS.MEMBERSHIP,
})
export class GettersController {
  constructor(private membershipService: MembershipService) {}

  @Public()
  @Get()
  async getAll(@Query('frequency') paymentFrequency: string) {
    try {
      const memberships =
        await this.membershipService.findAll(paymentFrequency);

      return {
        success: true,
        date: memberships,
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
      const memberships = await this.membershipService.findAllPaginate(
        page,
        limit,
      );

      return {
        success: true,
        data: memberships,
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
      const membership = await this.membershipService.findById(id);

      if (membership == null) throw new Error('null');

      return {
        success: true,
        data: membership,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
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
