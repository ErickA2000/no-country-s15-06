import {
  CreateSubscription,
  ResponseAuth,
  ResponseSubscription,
  ShowSubscription,
} from '@Interfaces/paypal.interface';
import { PaymentDTO } from '@Payment/dto/payment.dto';
import { PaypalError } from '@Payment/errors/paypal';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { CancelSubscriptionDTO } from '@Subscription/dto/subscription.dto';

@Injectable()
export class PaypalService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private client_url = this.configService.get('client_url');
  private paypal_api = this.configService.get('paypal')['api'];

  createSubscription(
    data: PaymentDTO,
  ): Observable<ResponseSubscription | PaypalError> {
    const subscription: CreateSubscription = {
      plan_id: data.idPlanProvider,
      application_context: {
        brand_name: 'Club X',
        user_action: 'SUBSCRIBE_NOW',
        shipping_preference: 'SET_PROVIDED_ADDRESS',
        return_url: `${this.client_url}/capture/paypal`,
        cancel_url: `${this.client_url}/subscriptions/cancel`,
      },
    };

    return this.getToken().pipe(
      switchMap((firstResponse: ResponseAuth) => {
        return this.http
          .post(`${this.paypal_api}/v1/billing/subscriptions`, subscription, {
            headers: {
              Authorization: `Bearer ${firstResponse.access_token}`,
            },
          })
          .pipe(
            map((res) => res.data),
            catchError((err) => {
              const { name, message, debug_id, details, links } =
                err.response.data;

              return of(
                new PaypalError(
                  err.response.status,
                  name,
                  message,
                  debug_id,
                  details,
                  links,
                ),
              );
            }),
          );
      }),
    );
  }

  showSubscription(
    idSubscriptionPaypal: string,
  ): Observable<ShowSubscription | PaypalError> {
    return this.getToken().pipe(
      switchMap((firstResponse: ResponseAuth) => {
        return this.http
          .get<ShowSubscription>(
            `${this.paypal_api}/v1/billing/subscriptions/${idSubscriptionPaypal}`,
            {
              headers: {
                Authorization: `Bearer ${firstResponse.access_token}`,
              },
            },
          )
          .pipe(
            map((res) => res.data),
            catchError((err) => {
              const { name, message, debug_id, details, links } =
                err.response.data;

              return of(
                new PaypalError(
                  err.response.status,
                  name,
                  message,
                  debug_id,
                  details,
                  links,
                ),
              );
            }),
          );
      }),
    );
  }

  cancelSubscription(
    idSubscriptionPaypal: string,
    data: CancelSubscriptionDTO,
  ): Observable<PaypalError | AxiosResponse<any>> {
    return this.getToken().pipe(
      switchMap((firstResponse: ResponseAuth) => {
        return this.http
          .post(
            `${this.paypal_api}/v1/billing/subscriptions/${idSubscriptionPaypal}/cancel`,
            {
              reason: data.reason,
            },
            {
              headers: {
                Authorization: `Bearer ${firstResponse.access_token}`,
              },
            },
          )
          .pipe(
            catchError((err) => {
              const { name, message, debug_id, details, links } =
                err.response.data;

              return of(
                new PaypalError(
                  err.response.status,
                  name,
                  message,
                  debug_id,
                  details,
                  links,
                ),
              );
            }),
          );
      }),
    );
  }

  private getToken(): Observable<ResponseAuth> {
    const paypal_client = this.configService.get('paypal')['client'];
    const paypal_secret = this.configService.get('paypal')['secret'];

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    return this.http
      .post<ResponseAuth>(`${this.paypal_api}/v1/oauth2/token`, params, {
        auth: {
          username: paypal_client,
          password: paypal_secret,
        },
      })
      .pipe(
        map((res) => res.data),
        catchError((err) => of(err)),
      );
  }
}
