import { string } from '@Constants/regex';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsStringCustom(
  lengthStart: number,
  lengthEnd: number,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringCustom',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            string(lengthStart, lengthEnd).test(value)
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid string`;
        },
      },
    });
  };
}
