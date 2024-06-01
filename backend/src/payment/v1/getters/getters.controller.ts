import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { PaymentService } from '@Payment/payment.service';
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
  path: PRINCIPAL_PATHS.PAYMENT,
})
export class GettersController {
  constructor(private paymentService: PaymentService) {}

  @Roles('admin')
  @Get()
  async getAll() {
    try {
      const payments = await this.paymentService.findAll();

      return {
        success: true,
        data: payments,
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
      const payments = await this.paymentService.findAllPaginate(page, limit);

      return {
        success: true,
        data: payments,
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
  async getAllByUser(@Req() req: Request) {
    try {
      const payments = await this.paymentService.findAllByUser(
        req.user['user'],
      );

      return {
        success: true,
        data: payments,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Roles('admin', 'member')
  @Get('one/:id')
  async getOneById(@Param('id') id: string) {
    try {
      const payment = await this.paymentService.findOneById(id);

      if (payment == null) throw new Error('null');

      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Payment not found',
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
