import { PaymentService } from '@Constants/enums';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { PaymentDTO } from '@Payment/dto/payment.dto';
import { PaypalError } from '@Payment/errors/paypal';
import { PaypalService } from '@Payment/services/paypal/paypal.service';
import { SubscriptionService } from '@Subscription/subscription.service';
import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PAYMENT,
})
export class CreateSubscriptionController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Roles('member')
  @Post()
  createSubscription(@Body() data: PaymentDTO, @Req() req: Request) {
    if (data.service === PaymentService.PAYPAL) {
      return this.paypalService.createSubscription(data).pipe(
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

          try {
            const foundSubscription =
              await this.subscriptionService.findByIdUser(req.user['user']);

            if (foundSubscription) {
              const updatedSubscription = await this.subscriptionService.update(
                foundSubscription.id,
                {
                  idMembership: data.idMembership,
                  idSubscriptionProvider: res.id,
                  subscriptionProvider: 'paypal',
                  state: 'pending',
                  pay_link: res.links[0].href,
                },
              );

              return {
                success: true,
                data: updatedSubscription,
              };
            }

            const createdSubscription = await this.subscriptionService.add({
              idMembership: data.idMembership,
              idSubscriptionProvider: data.idPlanProvider,
              subscriptionProvider: 'paypal',
              idUser: req.user['user'],
              startDate: res.start_time,
              state: 'pending',
              pay_link: res.links[0].href,
            });

            return {
              success: true,
              data: createdSubscription,
            };
          } catch (error) {
            throw new InternalServerErrorException({
              success: false,
              message: error.message,
            });
          }
        }),
      );
    }
  }
}
