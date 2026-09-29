import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { CheckoutDto } from "./checkout.dto";
import { CheckoutService } from "./checkout.service";
@Controller("checkout") @UseGuards(AuthGuard)
export class CheckoutController { constructor(private readonly checkout:CheckoutService){} @Post() create(@Req() req:any,@Body() dto:CheckoutDto){return this.checkout.create(req.user.id,dto)} }
