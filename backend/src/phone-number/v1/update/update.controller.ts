import { PRINCIPAL_PATHS } from '@Constants/routes';
import { PhoneNumberUpdateDTO } from '@PhoneNumber/dto/phone-number.dto';
import { PhoneNumberService } from '@PhoneNumber/phone-number.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PHONE_NUMBER,
})
export class UpdateController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  @Patch(':id')
  async update(@Body() data: PhoneNumberUpdateDTO, @Param('id') id: string) {
    try {
      const phoneNumber = await this.phoneNumberService.update(id, {
        number: data.number,
      });

      return {
        success: true,
        data: phoneNumber,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
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
