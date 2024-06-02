import { PRINCIPAL_PATHS } from '@Constants/routes';
import { PhoneNumberCreateDTO } from '@PhoneNumber/dto/phone-number.dto';
import { PhoneNumberService } from '@PhoneNumber/phone-number.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PHONE_NUMBER,
})
export class AddController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  @Post()
  async add(@Req() req: Request, @Body() data: PhoneNumberCreateDTO) {
    try {
      const phoneNumber = await this.phoneNumberService.add({
        idUser: req.user['user'],
        number: data.number,
      });

      return {
        success: true,
        data: phoneNumber,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
