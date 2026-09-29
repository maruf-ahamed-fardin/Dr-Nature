import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./addresses.dto";
@Controller("addresses") @UseGuards(AuthGuard)
export class AddressesController { constructor(private readonly addresses:AddressesService){}
 @Get() list(@Req() req:any){return this.addresses.list(req.user.id)}
 @Post() create(@Req() req:any,@Body() dto:CreateAddressDto){return this.addresses.create(req.user.id,dto)}
 @Delete(":id") remove(@Req() req:any,@Param("id") id:string){return this.addresses.remove(req.user.id,id)}
}
