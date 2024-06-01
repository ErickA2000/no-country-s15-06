import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { SubscriptionService } from '@Subscription/subscription.service';
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

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.SUBSCRIPTION,
})
export class GettersController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Roles('admin')
  @Get()
  async getAll() {
    try {
      const subscriptions = await this.subscriptionService.findAll();

      return {
        success: true,
        data: subscriptions,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Roles('admin')
  @Get('p')
  async getAllPaginate(@Query('page') p: string, @Query('limit') l: string) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);

    try {
      const subscriptions = await this.subscriptionService.findAllPaginate(
        page,
        limit,
      );

      return {
        success: true,
        data: subscriptions,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Roles('member')
  @Get('user')
  async getByUser(@Req() req: Request) {
    try {
      const subscription = await this.subscriptionService.findByIdUser(
        req.user['user'],
      );

      if (subscription == null) throw new Error('null');

      return {
        success: true,
        data: subscription,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Subscription not found',
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Roles('admin')
  @Get('one/:id')
  async getById(@Param('id') id: string) {
    try {
      const subscription = await this.subscriptionService.findById(id);

      if (subscription == null) throw new Error('null');

      return {
        success: true,
        data: subscription,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Subscription not found',
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
