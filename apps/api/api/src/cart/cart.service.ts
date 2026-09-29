import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddCartItemDto, UpdateCartItemDto } from "./cart.dto";

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  private async getOrCreate(userId:string){
    return this.prisma.cart.upsert({where:{userId},create:{userId},update:{},include:{items:{include:{product:{include:{images:true,inventory:true}}}}}});
  }
  async get(userId:string){ const cart=await this.getOrCreate(userId); return this.present(cart); }
  async add(userId:string,dto:AddCartItemDto){
    const product=await this.prisma.product.findFirst({where:{id:dto.productId,status:"ACTIVE"},include:{inventory:true}});
    if(!product) throw new NotFoundException("Product not found.");
    if(!product.inventory || product.inventory.quantity<dto.quantity) throw new BadRequestException("Insufficient stock.");
    const cart=await this.getOrCreate(userId);
    const item=await this.prisma.cartItem.upsert({where:{cartId_productId:{cartId:cart.id,productId:dto.productId}},create:{cartId:cart.id,productId:dto.productId,quantity:dto.quantity},update:{quantity:{increment:dto.quantity}},include:{product:{include:{images:true,inventory:true}}}});
    if(item.quantity>product.inventory.quantity) throw new BadRequestException("Requested quantity exceeds available stock.");
    return this.get(userId);
  }
  async update(userId:string,id:string,dto:UpdateCartItemDto){
    const item=await this.prisma.cartItem.findFirst({where:{id,cart:{userId}},include:{product:{include:{inventory:true}}}});
    if(!item) throw new NotFoundException("Cart item not found.");
    if(!item.product.inventory || dto.quantity>item.product.inventory.quantity) throw new BadRequestException("Insufficient stock.");
    await this.prisma.cartItem.update({where:{id},data:{quantity:dto.quantity}}); return this.get(userId);
  }
  async remove(userId:string,id:string){
    const item=await this.prisma.cartItem.findFirst({where:{id,cart:{userId}}});
    if(!item) throw new NotFoundException("Cart item not found.");
    await this.prisma.cartItem.delete({where:{id}}); return this.get(userId);
  }
  present(cart:any){
    const items=cart.items.map((i:any)=>({id:i.id,productId:i.productId,quantity:i.quantity,name:i.product.name,sku:i.product.sku,unitPrice:Number(i.product.price),image:i.product.images?.[0]?.url??null,stock:i.product.inventory?.quantity??0,lineTotal:Number(i.product.price)*i.quantity}));
    return {id:cart.id,items,subtotal:items.reduce((s:number,i:any)=>s+i.lineTotal,0)};
  }
}
