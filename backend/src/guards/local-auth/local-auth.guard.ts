import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { LoginDTO } from '@Auth/dto/auth.dto';
import { validate } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const body = context.switchToHttp().getRequest().body;

    const authDTO = plainToClass(LoginDTO, body);
    const error = await validate(authDTO);

    if (error.length > 0) {
      const message = error.map((error) => {
        const messages = Object.values(error.constraints).map((value) => value);
        return messages;
      });
      throw new BadRequestException({
        success: false,
        message: message.flat(),
      });
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
