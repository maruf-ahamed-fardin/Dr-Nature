import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./auth.guard";
import { SESSION_COOKIE } from "../common/auth.types";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  private meta(req: Request) { return { ip:req.ip, userAgent:req.get("user-agent") }; }
  private setCookie(res: Response, token: string) { res.cookie(SESSION_COOKIE, token, this.auth.cookieOptions()); }
  @Post("register") async register(@Body() dto:RegisterDto,@Req() req:Request,@Res({passthrough:true}) res:Response) { const r=await this.auth.register(dto,this.meta(req)); this.setCookie(res,r.token); return {user:r.user}; }
  @Post("login") async login(@Body() dto:LoginDto,@Req() req:Request,@Res({passthrough:true}) res:Response) { const r=await this.auth.login(dto,this.meta(req)); this.setCookie(res,r.token); return {user:r.user}; }
  @Post("logout") async logout(@Req() req:Request,@Res({passthrough:true}) res:Response) { await this.auth.logout(req.cookies?.[SESSION_COOKIE]); res.clearCookie(SESSION_COOKIE,{path:"/"}); return {ok:true}; }
  @Get("me") @UseGuards(AuthGuard) me(@Req() req:Request & {user:any}) { return {user:req.user}; }
}
