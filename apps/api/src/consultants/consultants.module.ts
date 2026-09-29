import { Module } from "@nestjs/common";
import { ConsultantsController } from "./consultants.controller";
import { ConsultantsService } from "./consultants.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ConsultantsController],
  providers: [ConsultantsService],
  exports: [ConsultantsService],
})
export class ConsultantsModule {}
