import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Controller } from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.AUTH,
})
export class LoginController {}
