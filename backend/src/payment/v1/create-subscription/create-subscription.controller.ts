import { PaymentService } from '@Constants/enums';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { FullSubscription } from '@Interfaces/subscription.interface';
import { MembershipService } from '@Membership/membership.service';
import { PaymentDTO } from '@Payment/dto/payment.dto';
import { PaypalError } from '@Payment/errors/paypal';
import { PaypalService } from '@Payment/services/paypal/paypal.service';
import { SubscriptionService } from '@Subscription/subscription.service';
import {
  BadRequestException,
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
    private readonly membershipService: MembershipService,
  ) {}

  @Roles('member')
  @Post()
  async createSubscription(@Body() data: PaymentDTO, @Req() req: Request) {
    if (data.service === PaymentService.PAYPAL) {
      let foundSubscription: FullSubscription;
      try {
        const foundMembership = await this.membershipService.findById(
          data.idMembership,
        );
        if (foundMembership === null) {
          throw new Error('null-membership');
        }
        if (foundMembership.idPlanProvider !== data.idPlanProvider) {
          throw new Error('null-membership');
        }

        foundSubscription = await this.subscriptionService.findByIdUser(
          req.user['user'],
        );

        if (
          foundSubscription &&
          foundSubscription.idMembership === data.idMembership &&
          foundSubscription.membership.idPlanProvider === data.idPlanProvider &&
          foundSubscription.state === 'active'
        ) {
          throw new Error('subscribed');
        }

        if (foundSubscription && foundSubscription.pay_link != null) {
          return {
            success: true,
            data: foundSubscription,
          };
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'subscribed') {
            throw new BadRequestException({
              success: false,
              message: 'You are already subscribed to this membership',
            });
          }

          if (error.message === 'null-membership') {
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
              idSubscriptionProvider: res.id,
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
