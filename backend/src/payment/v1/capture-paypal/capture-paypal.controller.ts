import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { PaypalError } from '@Payment/errors/paypal';
import { PaymentService } from '@Payment/payment.service';
import { PaypalService } from '@Payment/services/paypal/paypal.service';
import { SubscriptionService } from '@Subscription/subscription.service';
import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { map } from 'rxjs';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PAYMENT + '/capture',
})
export class CapturePaypalController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly subscriptionService: SubscriptionService,
    private readonly paymentService: PaymentService,
  ) {}

  @Public()
  @Get('paypal')
  capture(@Query('subscription_id') idSubscriptionProvider: string) {
    return this.paypalService.showSubscription(idSubscriptionProvider).pipe(
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
          const subscription =
            await this.subscriptionService.findOneByIdSubscriptionProvider(
              idSubscriptionProvider,
            );

          if (subscription == null) throw new Error('null');

          await this.subscriptionService.update(subscription.id, {
            lastPayment: res.billing_info.last_payment.time,
            nextPayment: res.billing_info.next_billing_time,
            state: res.status == 'ACTIVE' ? 'active' : 'inactive',
            pay_link: null,
          });

          await this.paymentService.add({
            idSubscription: subscription.id,
            amount: parseFloat(res.billing_info.last_payment.amount.value),
            currencyCode: res.billing_info.last_payment.amount.currency_code,
            date: res.start_time,
            method: 'paypal',
            service: 'paypal',
            status: res.status == 'ACTIVE' ? 'active' : 'pending',
          });

          return {
            success: true,
          };
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
      }),
    );
  }
}
