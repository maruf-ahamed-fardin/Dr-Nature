import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CheckoutDto } from "./checkout.dto";
import { PaymentStatus, ProductStatus, StockMovementType } from "@prisma/client";
import { randomUUID } from "crypto";
@Injectable()
export class CheckoutService {
 constructor(private readonly prisma:PrismaService){}
 async create(userId:string,dto:CheckoutDto){
  return this.prisma.$transaction(async tx=>{
   const cart=await tx.cart.findUnique({where:{userId},include:{items:{include:{product:{include:{inventory:true}}}}}});
   if(!cart || cart.items.length===0) throw new BadRequestException("Cart is empty.");
   const zone=await tx.shippingZone.findFirst({where:{id:dto.shippingZoneId,active:true}}); if(!zone) throw new NotFoundException("Shipping zone not found.");
   if(dto.addressId){const address=await tx.address.findFirst({where:{id:dto.addressId,userId}});if(!address) throw new NotFoundException("Address not found.");}
   let subtotal=0;
   for(const item of cart.items){
    if(item.product.status!==ProductStatus.ACTIVE) throw new BadRequestException(`${item.product.name} is unavailable.`);
    const inv=item.product.inventory; if(!inv || inv.quantity<item.quantity) throw new BadRequestException(`Insufficient stock for ${item.product.name}.`);
    subtotal+=Number(item.product.price)*item.quantity;
   }
   const shipping=Number(zone.fee); const total=subtotal+shipping;
   const order=await tx.order.create({data:{orderNumber:`DN-${Date.now()}-${randomUUID().slice(0,6).toUpperCase()}`,userId,addressId:dto.addressId,shippingZoneId:zone.id,subtotal,shippingFee:shipping,total,items:{create:cart.items.map(i=>({productId:i.productId,name:i.product.name,sku:i.product.sku,unitPrice:i.product.price,quantity:i.quantity}))},payments:{create:{provider:dto.paymentProvider||"sslcommerz",amount:total,status:PaymentStatus.PENDING}}},include:{items:true,payments:true,shippingZone:true}});
   for(const item of cart.items){
    const updated=await tx.inventory.updateMany({where:{productId:item.productId,quantity:{gte:item.quantity}},data:{quantity:{decrement:item.quantity}}});
    if(updated.count!==1) throw new BadRequestException(`Stock changed for ${item.product.name}; please try again.`);
    const inv=await tx.inventory.findUniqueOrThrow({where:{productId:item.productId}});
    await tx.stockMovement.create({data:{inventoryId:inv.id,type:StockMovementType.SALE,quantity:-item.quantity,reference:order.orderNumber,note:"Checkout stock allocation"}});
   }
   await tx.shipment.create({data:{orderId:order.id,zoneId:zone.id}});
   await tx.cartItem.deleteMany({where:{cartId:cart.id}});
   return order;
  });
 }
}
