import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { createHmac, timingSafeEqual } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { OrderStatus, PaymentStatus, StockMovementType } from "@prisma/client";
@Injectable()
export class PaymentService {
 constructor(private readonly prisma:PrismaService){}
 async status(userId:string,orderId:string){const p=await this.prisma.payment.findFirst({where:{orderId,order:{userId}},orderBy:{createdAt:"desc"}});if(!p)throw new NotFoundException("Payment not found.");return p;}
 async webhook(provider:string,transactionId:string,status:PaymentStatus,signature:string|undefined,payload:any){
  const secret=process.env.PAYMENT_WEBHOOK_SECRET;
  if(secret){const raw=JSON.stringify(payload);const expected=createHmac("sha256",secret).update(raw).digest("hex");if(!signature||signature.length!==expected.length||!timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))throw new BadRequestException("Invalid webhook signature.");}
  const payment=await this.prisma.payment.findUnique({where:{provider_transactionId:{provider,transactionId}}}); if(!payment) throw new NotFoundException("Payment transaction not found.");
  if(payment.status===status) return payment;
  return this.prisma.$transaction(async tx=>{
   const updated=await tx.payment.update({where:{id:payment.id},data:{status}});
   if(status===PaymentStatus.PAID){await tx.order.update({where:{id:payment.orderId},data:{paymentStatus:PaymentStatus.PAID,status:OrderStatus.CONFIRMED}});}
   if(status===PaymentStatus.FAILED){await tx.order.update({where:{id:payment.orderId},data:{paymentStatus:PaymentStatus.FAILED,status:OrderStatus.CANCELLED}});const items=await tx.orderItem.findMany({where:{orderId:payment.orderId}});for(const item of items){const inv=await tx.inventory.update({where:{productId:item.productId},data:{quantity:{increment:item.quantity}}});await tx.stockMovement.create({data:{inventoryId:inv.id,type:StockMovementType.RETURN,quantity:item.quantity,reference:payment.orderId,note:"Payment failed/refunded"}});}}
   return updated;
  });
 }
}
