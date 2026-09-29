import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto, UpdateProductDto, AdjustInventoryDto } from "./dto/product.dto";
import { ProductStatus, StockMovementType, OrderStatus } from "@prisma/client";
@Injectable()
export class AdminService {
 constructor(private readonly prisma:PrismaService) {}
 dashboard(){ return Promise.all([this.prisma.product.count(),this.prisma.order.count(),this.prisma.booking.count(),this.prisma.user.count()]).then(([products,orders,bookings,users])=>({products,orders,bookings,users})); }
 listProducts(){return this.prisma.product.findMany({include:{category:true,inventory:true,images:true},orderBy:{createdAt:"desc"}})}
 createProduct(dto:CreateProductDto){return this.prisma.product.create({data:{name:dto.name,slug:dto.slug,sku:dto.sku,shortDescription:dto.shortDescription,description:dto.description,price:dto.price,compareAtPrice:dto.compareAtPrice,categoryId:dto.categoryId,status:dto.status ?? ProductStatus.DRAFT,inventory:{create:{quantity:0}}},include:{inventory:true,category:true}})}
 async updateProduct(id:string,dto:UpdateProductDto){const exists=await this.prisma.product.findUnique({where:{id}});if(!exists)throw new NotFoundException("Product not found.");return this.prisma.product.update({where:{id},data:dto as any,include:{inventory:true,category:true}})}
 async adjustInventory(id:string,dto:AdjustInventoryDto){const inv=await this.prisma.inventory.findUnique({where:{productId:id}});if(!inv)throw new NotFoundException("Inventory not found.");if(inv.quantity+dto.quantity<0)throw new Error("Inventory cannot become negative.");const type=dto.quantity>=0?StockMovementType.ADJUSTMENT:StockMovementType.SALE;return this.prisma.$transaction(async tx=>{const updated=await tx.inventory.update({where:{id:inv.id},data:{quantity:{increment:dto.quantity}}});await tx.stockMovement.create({data:{inventoryId:inv.id,type,quantity:dto.quantity,reference:"ADMIN",note:dto.note}});return updated;});}
 listCategories(){return this.prisma.category.findMany({include:{parent:true,children:true,_count:{select:{products:true}}},orderBy:{name:"asc"}})}
 async createCategory(dto:any){if(dto.parentId){const parent=await this.prisma.category.findUnique({where:{id:dto.parentId}});if(!parent)throw new NotFoundException("Parent category not found.");}return this.prisma.category.create({data:dto})}
 async updateCategory(id:string,dto:any){const existing=await this.prisma.category.findUnique({where:{id}});if(!existing)throw new NotFoundException("Category not found.");if(dto.parentId===id)throw new Error("A category cannot be its own parent.");return this.prisma.category.update({where:{id},data:dto})}
 async deleteCategory(id:string){const existing=await this.prisma.category.findUnique({where:{id},include:{products:true,children:true}});if(!existing)throw new NotFoundException("Category not found.");if(existing.products.length||existing.children.length)throw new Error("Category must be empty before deletion.");return this.prisma.category.delete({where:{id}})}
 listShippingZones(){return this.prisma.shippingZone.findMany({orderBy:[{city:"asc"},{area:"asc"}]})}
 createShippingZone(dto:any){return this.prisma.shippingZone.create({data:dto})}
 async updateShippingZone(id:string,dto:any){const existing=await this.prisma.shippingZone.findUnique({where:{id}});if(!existing)throw new NotFoundException("Shipping zone not found.");return this.prisma.shippingZone.update({where:{id},data:dto})}

 listOrders(){return this.prisma.order.findMany({include:{user:{select:{id:true,name:true,email:true}},items:true,payments:true},orderBy:{createdAt:"desc"},take:100})}
 async updateOrderStatus(id:string,status:OrderStatus){
  const order=await this.prisma.order.findUnique({where:{id}}); if(!order) throw new NotFoundException("Order not found.");
  return this.prisma.order.update({where:{id},data:{status},include:{items:true,payments:true}});
 }
 listBookings(){return this.prisma.booking.findMany({include:{user:{select:{id:true,name:true,email:true}},service:true,consultant:{include:{user:true}}},orderBy:{startsAt:"desc"},take:100})}
}
