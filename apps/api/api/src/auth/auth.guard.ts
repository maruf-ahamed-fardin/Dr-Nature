import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { SESSION_COOKIE } from "../common/auth.types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request & { user?: any }>();
    const user = await this.auth.validateToken(req.cookies?.[SESSION_COOKIE]);
    if (!user) throw new UnauthorizedException("Authentication required.");
    req.user = user; return true;
  }
}
