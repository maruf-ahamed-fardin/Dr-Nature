import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentStatus, OrderStatus, StockMovementType } from "@prisma/client";
import { randomUUID } from "crypto";
@Injectable()
export class SslCommerzService {
 constructor(private readonly prisma:PrismaService){}
 private get base(){return process.env.SSLCOMMERZ_SANDBOX==="true"?"https://sandbox.sslcommerz.com":"https://securepay.sslcommerz.com"}
 private required(){const storeId=process.env.SSLCOMMERZ_STORE_ID,storePassword=process.env.SSLCOMMERZ_STORE_PASSWORD;if(!storeId||!storePassword)throw new BadRequestException("SSLCOMMERZ credentials are not configured.");return {storeId,storePassword}}
 async initiate(userId:string,orderId:string){
  const order=await this.prisma.order.findFirst({where:{id:orderId,userId},include:{user:true,items:true,payments:true,address:true}});if(!order)throw new NotFoundException("Order not found.");
  if(order.paymentStatus===PaymentStatus.PAID) throw new BadRequestException("Order is already paid.");
  const {storeId,storePassword}=this.required();
  let payment=order.payments.find(p=>p.provider==="sslcommerz")||await this.prisma.payment.create({data:{orderId,provider:"sslcommerz",amount:order.total,status:PaymentStatus.PENDING}});
  const tranId=payment.transactionId||`DN-${Date.now()}-${randomUUID().slice(0,8).toUpperCase()}`;
  const apiOrigin=process.env.PUBLIC_API_URL||"http://localhost:4000/api/v1";
  const params=new URLSearchParams({store_id:storeId,store_passwd:storePassword,total_amount:Number(order.total).toFixed(2),currency:"BDT",tran_id:tranId,success_url:`${apiOrigin}/payments/sslcommerz/success`,fail_url:`${apiOrigin}/payments/sslcommerz/fail`,cancel_url:`${apiOrigin}/payments/sslcommerz/cancel`,ipn_url:`${apiOrigin}/payments/sslcommerz/ipn`,product_category:"healthcare",product_name:order.items.map(i=>i.name).join(", ").slice(0,255),product_profile:"general",cus_name:order.user.name||"Customer",cus_email:order.user.email,cus_add1:order.address?.line1||"Bangladesh",cus_city:order.address?.city||"Dhaka",cus_postcode:order.address?.postalCode||"1200",cus_country:"Bangladesh",cus_phone:order.user.phone||order.address?.phone||"01700000000",shipping_method:"YES",ship_name:order.address?.recipient||order.user.name||"Customer",ship_add1:order.address?.line1||"Bangladesh",ship_city:order.address?.city||"Dhaka",ship_postcode:order.address?.postalCode||"1200",ship_country:"Bangladesh",value_a:order.id});
  const response=await fetch(`${this.base}/gwprocess/v4/api.php`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:params});
  if(!response.ok)throw new BadRequestException("SSLCOMMERZ session request failed.");
  const data:any=await response.json();
  if(data.status!=="SUCCESS"||!data.GatewayPageURL)throw new BadRequestException(data.failedreason||"Could not start SSLCOMMERZ payment.");
  payment=await this.prisma.payment.update({where:{id:payment.id},data:{provider:"sslcommerz",transactionId:tranId,rawReference:data.sessionkey}});
  return {paymentUrl:data.GatewayPageURL,transactionId:tranId,sessionKey:data.sessionkey,orderId:order.id};
 }
 async handleCallback(kind:"success"|"fail"|"cancel",body:any){
  const tranId=body?.tran_id;if(!tranId)throw new BadRequestException("Missing transaction ID.");
  if(kind!=="success") return this.restoreFailedByTranId(tranId,kind);
  const {storeId,storePassword}=this.required();
  const valId=body.val_id;if(!valId)throw new BadRequestException("Missing validation ID.");
  const url=new URL(`${this.base}/validator/api/validationserverAPI.php`);
  url.searchParams.set("val_id",valId);url.searchParams.set("store_id",storeId);url.searchParams.set("store_passwd",storePassword);url.searchParams.set("format","json");
  const response=await fetch(url);if(!response.ok)throw new BadRequestException("SSLCOMMERZ validation request failed.");
  const data:any=await response.json();
  const payment=await this.prisma.payment.findFirst({where:{provider:"sslcommerz",transactionId:tranId},include:{order:true}});if(!payment)throw new NotFoundException("Payment transaction not found.");
  if(!["VALID","VALIDATED"].includes(data.status)||data.tran_id!==tranId||Math.abs(Number(data.amount)-Number(payment.amount))>0.01)throw new BadRequestException("Payment validation failed.");
  return this.markPaid(payment.id,data);
 }
 async ipn(body:any){return this.handleCallback("success",body)}
 private async restoreFailedByTranId(tranId:string,reason:string){const payment=await this.prisma.payment.findFirst({where:{provider:"sslcommerz",transactionId:tranId}});if(!payment)return {ok:true};return this.restoreFailed(payment.id,reason)}
 private async markPaid(paymentId:string,data:any){return this.prisma.$transaction(async tx=>{const payment=await tx.payment.findUniqueOrThrow({where:{id:paymentId}});if(payment.status===PaymentStatus.PAID)return {ok:true,paymentId:payment.id,orderId:payment.orderId,status:"PAID"};await tx.payment.update({where:{id:paymentId},data:{status:PaymentStatus.PAID,rawReference:data.val_id||payment.rawReference}});await tx.order.update({where:{id:payment.orderId},data:{paymentStatus:PaymentStatus.PAID,status:OrderStatus.CONFIRMED}});return {ok:true,paymentId:payment.id,orderId:payment.orderId,status:"PAID"};});}
 private async restoreFailed(paymentId:string,reason:string){return this.prisma.$transaction(async tx=>{const payment=await tx.payment.findUniqueOrThrow({where:{id:paymentId}});if(payment.status===PaymentStatus.PAID)return {ok:false,message:"Payment is already paid."};if(payment.status===PaymentStatus.FAILED)return {ok:true,status:"FAILED"};const items=await tx.orderItem.findMany({where:{orderId:payment.orderId}});for(const item of items){const inv=await tx.inventory.update({where:{productId:item.productId},data:{quantity:{increment:item.quantity}}});await tx.stockMovement.create({data:{inventoryId:inv.id,type:StockMovementType.RETURN,quantity:item.quantity,reference:payment.orderId,note:`SSLCOMMERZ ${reason}`}});}await tx.payment.update({where:{id:paymentId},data:{status:PaymentStatus.FAILED,rawReference:reason}});await tx.order.update({where:{id:payment.orderId},data:{paymentStatus:PaymentStatus.FAILED,status:OrderStatus.CANCELLED}});return {ok:true,status:"FAILED"};});}
}
