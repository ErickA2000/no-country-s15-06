import { PRINCIPAL_PATHS } from '@Constants/routes';
import { PhoneNumberService } from '@PhoneNumber/phone-number.service';
import {
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PHONE_NUMBER,
})
export class DeleteController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  @Delete(':id')
  async deletePhoneNumber(@Param('id') id: string) {
    try {
      const phoneNumber = await this.phoneNumberService.deleteNumber(id);

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
