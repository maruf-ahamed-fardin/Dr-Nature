import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
export const SESSION_COOKIE = "dr_session";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
