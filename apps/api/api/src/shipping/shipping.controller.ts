import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Roles, RolesGuard } from "../auth/roles.guard";
import { UserRole } from "@prisma/client";
import { ShippingService } from "./shipping.service";
import { UpdateShipmentDto } from "./shipping.dto";
@Controller("shipping")
export class ShippingController {
 constructor(private readonly shipping:ShippingService){}
 @Get("zones") zones(){return this.shipping.zones()}
 @Get("quote") quote(@Query("city") city:string,@Query("area") area?:string){return this.shipping.quote(city,area)}
 @Get("orders/:orderId") @UseGuards(AuthGuard) shipment(@Req() req:any,@Param("orderId") orderId:string){return this.shipping.getShipmentForUser(req.user.id,orderId)}
 @Patch("admin/orders/:orderId") @UseGuards(AuthGuard,RolesGuard) @Roles(UserRole.ADMIN) update(@Param("orderId") orderId:string,@Body() dto:UpdateShipmentDto){return this.shipping.updateShipment(orderId,dto)}
}
