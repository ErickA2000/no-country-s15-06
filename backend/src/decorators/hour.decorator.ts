import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { HOUR12FORMAT, HOUR24FORMAT } from '@Constants/regex';

/**
 *
 * @description Valida que una hora data cumpla con el formato HH:MMPrefix -> Prefix AM or PM
 * @argument You can send the context property with the values 12 or 24 for the time format, the default is the format 12
 *
 */
export function IsHourFormat(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isHourFormat',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          let context = validationOptions.context;

          if (!context) context = '12';

          if (context === '12') {
            return HOUR12FORMAT.test(value);
          }

          if (context === '24') {
            return HOUR24FORMAT.test(value);
          }
        },
      },
    });
  };
}
