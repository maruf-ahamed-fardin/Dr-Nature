import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "@prisma/client";
export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const required = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY,[context.getHandler(),context.getClass()]);
    if (!required?.length) return true;
    const req = context.switchToHttp().getRequest<{user?:{role:UserRole}}>();
    if (!req.user || !required.includes(req.user.role)) throw new ForbiddenException("You do not have permission for this action.");
    return true;
  }
}
