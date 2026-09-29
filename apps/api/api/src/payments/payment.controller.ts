import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "../auth/auth.guard";
import { PaymentService } from "./payment.service";
import { SslCommerzService } from "./sslcommerz.service";
@Controller("payments")
export class PaymentController {
 constructor(private readonly payments:PaymentService,private readonly ssl:SslCommerzService){}
 @Get("orders/:orderId") @UseGuards(AuthGuard) status(@Req() req:any,@Param("orderId") orderId:string){return this.payments.status(req.user.id,orderId)}
 @Post("sslcommerz/initiate/:orderId") @UseGuards(AuthGuard) initiate(@Req() req:any,@Param("orderId") orderId:string){return this.ssl.initiate(req.user.id,orderId)}
 @Post("sslcommerz/ipn") ipn(@Body() body:any){return this.ssl.ipn(body)}
 @Post("sslcommerz/success") async success(@Body() body:any,@Res() res:Response){await this.ssl.handleCallback("success",body);return res.redirect(`${process.env.WEB_URL||"http://localhost:3000"}/orders/${body?.value_a||""}?payment=success`)}
 @Post("sslcommerz/fail") async fail(@Body() body:any,@Res() res:Response){await this.ssl.handleCallback("fail",body);return res.redirect(`${process.env.WEB_URL||"http://localhost:3000"}/orders/${body?.value_a||""}?payment=failed`)}
 @Post("sslcommerz/cancel") async cancel(@Body() body:any,@Res() res:Response){await this.ssl.handleCallback("cancel",body);return res.redirect(`${process.env.WEB_URL||"http://localhost:3000"}/orders/${body?.value_a||""}?payment=cancelled`)}
}
