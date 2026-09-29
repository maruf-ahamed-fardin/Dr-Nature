import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as argon2 from "argon2";
import { createHash, randomBytes } from "crypto";
import { SESSION_COOKIE } from "../common/auth.types";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  private hashToken(token: string) { return createHash("sha256").update(token).digest("hex"); }
  async register(dto: RegisterDto, meta: { ip?: string; userAgent?: string }) {
    const email = dto.email.toLowerCase().trim();
    if (await this.prisma.user.findUnique({ where: { email } })) throw new ConflictException("Email is already registered.");
    const user = await this.prisma.user.create({ data: { email, name: dto.name.trim(), phone: dto.phone, passwordHash: await argon2.hash(dto.password) }, select: { id:true,email:true,name:true,role:true,isActive:true } });
    const token = await this.createSession(user.id, meta);
    return { user, token };
  }
  async login(dto: LoginDto, meta: { ip?: string; userAgent?: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase().trim() } });
    if (!user || !user.isActive || !(await argon2.verify(user.passwordHash, dto.password))) throw new UnauthorizedException("Invalid email or password.");
    const token = await this.createSession(user.id, meta);
    return { user: { id:user.id,email:user.email,name:user.name,role:user.role,isActive:user.isActive }, token };
  }
  async createSession(userId: string, meta: { ip?: string; userAgent?: string }) {
    const raw = randomBytes(32).toString("base64url");
    await this.prisma.session.create({ data: { tokenHash: this.hashToken(raw), userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), ipAddress: meta.ip, userAgent: meta.userAgent } });
    return raw;
  }
  async validateToken(token?: string) {
    if (!token) return null;
    const session = await this.prisma.session.findUnique({ where: { tokenHash: this.hashToken(token) }, include: { user: true } });
    if (!session || session.expiresAt <= new Date() || !session.user.isActive) return null;
    return { id:session.user.id,email:session.user.email,name:session.user.name,role:session.user.role,isActive:session.user.isActive,sessionId:session.id };
  }
  async logout(token?: string) { if (token) await this.prisma.session.deleteMany({ where: { tokenHash: this.hashToken(token) } }); }
  cookieOptions() { return { httpOnly:true, sameSite:"lax" as const, secure:process.env.NODE_ENV === "production", path:"/", maxAge:60*60*24*30 }; }
  cookieName() { return SESSION_COOKIE; }
}
