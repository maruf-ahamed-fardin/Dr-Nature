import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { SslCommerzService } from "./sslcommerz.service";
@Module({controllers:[PaymentController],providers:[PaymentService,SslCommerzService]}) export class PaymentModule {}
