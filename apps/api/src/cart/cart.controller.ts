import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AuthGuard } from "../auth/auth.guard";
import { AddCartItemDto, UpdateCartItemDto } from "./cart.dto";
@Controller("cart") @UseGuards(AuthGuard)
export class CartController {
 constructor(private readonly cart:CartService){}
 @Get() get(@Req() req:any){return this.cart.get(req.user.id)}
 @Post("items") add(@Req() req:any,@Body() dto:AddCartItemDto){return this.cart.add(req.user.id,dto)}
 @Patch("items/:id") update(@Req() req:any,@Param("id") id:string,@Body() dto:UpdateCartItemDto){return this.cart.update(req.user.id,id,dto)}
 @Delete("items/:id") remove(@Req() req:any,@Param("id") id:string){return this.cart.remove(req.user.id,id)}
}
