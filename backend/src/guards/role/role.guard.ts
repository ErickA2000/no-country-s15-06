import { RoleService } from '@Role/role.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly roleService: RoleService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const idRole = request.user['role'];
    const result = await this.matchRole(idRole, roles);

    request.user['roleName'] = result.success ? result.roleName : '';
    return result.success;
  }

  private async matchRole(
    idRole: string,
    roles: string[],
  ): Promise<{
    success: boolean;
    roleName?: string;
  }> {
    try {
      const role = await this.roleService.findById(idRole);

      if (roles.includes(role.name)) {
        return {
          success: true,
          roleName: role.name,
        };
      }

      return {
        success: false,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
