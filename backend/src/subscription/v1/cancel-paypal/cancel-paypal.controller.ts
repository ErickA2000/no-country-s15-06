import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { Roles } from '@Decorators/role.decorator';
import { PaypalCancelledSubscription } from '@Interfaces/paypal.interface';
import { PaypalError } from '@Payment/errors/paypal';
import { PaypalService } from '@Payment/services/paypal/paypal.service';
import { CancelSubscriptionDTO } from '@Subscription/dto/subscription.dto';
import { SubscriptionService } from '@Subscription/subscription.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.SUBSCRIPTION,
})
export class CancelPaypalController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Roles('member')
  @HttpCode(HttpStatus.OK)
  @Post('cancel')
  async cancelSubscription(
    @Body() data: CancelSubscriptionDTO,
    @Req() req: Request,
  ) {
    try {
      const subscription = await this.subscriptionService.findByIdUser(
        req.user['user'],
      );

      if (subscription == null) throw new Error('null');

      if (subscription.subscriptionProvider == 'paypal') {
        return this.paypalService
          .cancelSubscription(subscription.idSubscriptionProvider, data)
          .pipe(
            map(async (res) => {
              if (res instanceof PaypalError) {
                throw new HttpException(
                  {
                    success: false,
                    message: res.message,
                    data: {
                      name: res.name,
                      details: res.details,
                    },
                  },
                  res.status,
                );
              }

              const updatedSubscription = await this.subscriptionService.update(
                subscription.id,
                {
                  state: 'cancelled',
                  nextPayment: null,
                },
              );

              return {
                success: true,
                data: updatedSubscription,
              };
            }),
          );
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('webhook/paypal/cancel')
  async webhookPaypalCancelled(@Body() data: PaypalCancelledSubscription) {
    try {
      if (data.resource.status.toLowerCase() === 'cancelled') {
        const subscription =
          await this.subscriptionService.findOneByIdSubscriptionProvider(
            data.resource.id,
          );

        if (subscription == null) throw new Error('null');

        await this.subscriptionService.update(subscription.id, {
          state: 'cancelled',
          nextPayment: null,
        });

        return {
          success: true,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
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
