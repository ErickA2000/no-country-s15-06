import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { RoleService } from '@Role/role.service';
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ROLE,
})
export class GettersController {
  constructor(private roleService: RoleService) {}

  @Roles('admin')
  @Get()
  async getAll() {
    try {
      const role = await this.roleService.findAll();

      return {
        success: true,
        data: role,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
