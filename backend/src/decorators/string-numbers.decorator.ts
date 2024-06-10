import { numbers } from '@Constants/regex';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsStringNumbers(
  length: number,
  lengthEnd: number,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringNumbers',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' && numbers(length, lengthEnd).test(value)
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid number`;
        },
      },
    });
  };
}
