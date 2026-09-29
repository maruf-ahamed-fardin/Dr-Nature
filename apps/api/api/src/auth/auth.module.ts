import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./roles.guard";
@Module({controllers:[AuthController],providers:[AuthService,AuthGuard,RolesGuard],exports:[AuthService,AuthGuard,RolesGuard]})
export class AuthModule {}
