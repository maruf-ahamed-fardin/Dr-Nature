import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { PrismaService } from "../prisma/prisma.service";
@Controller("orders") @UseGuards(AuthGuard)
export class OrdersController {
 constructor(private readonly prisma:PrismaService){}
 @Get() list(@Req() req:any){return this.prisma.order.findMany({where:{userId:req.user.id},include:{items:true,payments:true,address:true},orderBy:{createdAt:"desc"}})}
 @Get(":id") async get(@Req() req:any,@Param("id") id:string){return this.prisma.order.findFirstOrThrow({where:{id,userId:req.user.id},include:{items:true,payments:true,address:true}})}
}
