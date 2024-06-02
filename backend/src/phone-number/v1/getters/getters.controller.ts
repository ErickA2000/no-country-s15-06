import { PRINCIPAL_PATHS } from '@Constants/routes';
import { PhoneNumberService } from '@PhoneNumber/phone-number.service';
import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PHONE_NUMBER,
})
export class GettersController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  @Get()
  async getAllByUser(@Req() req: Request) {
    try {
      const phoneNumbers = await this.phoneNumberService.findAll(
        req.user['user'],
      );

      return {
        success: true,
        data: phoneNumbers,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    try {
      const phoneNumber = await this.phoneNumberService.findOne(
        id,
        req.user['user'],
      );

      if (phoneNumber == null) throw new Error('null');

      return {
        success: true,
        data: phoneNumber,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Phone number not found',
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
