import { UserRole } from "@prisma/client";
export type AuthUser = { id: string; email: string; name: string | null; role: UserRole; isActive: boolean };
export const SESSION_COOKIE = "drn_session";
