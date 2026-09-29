import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "../auth/auth.guard";
import { Roles, RolesGuard } from "../auth/roles.guard";
import { UserRole, OrderStatus } from "@prisma/client";
import { CreateProductDto, UpdateProductDto, AdjustInventoryDto } from "./dto/product.dto";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";
import { CreateShippingZoneDto, UpdateShippingZoneDto } from "./dto/shipping.dto";
@Controller("admin") @UseGuards(AuthGuard,RolesGuard) @Roles(UserRole.ADMIN,UserRole.EDITOR)
export class AdminController {
 constructor(private readonly admin:AdminService){}
 @Get("dashboard") dashboard(){return this.admin.dashboard()}
 @Get("products") products(){return this.admin.listProducts()}
 @Post("products") @Roles(UserRole.ADMIN) create(@Body() dto:CreateProductDto){return this.admin.createProduct(dto)}
 @Patch("products/:id") @Roles(UserRole.ADMIN) update(@Param("id") id:string,@Body() dto:UpdateProductDto){return this.admin.updateProduct(id,dto)}
 @Post("products/:id/inventory") @Roles(UserRole.ADMIN) inventory(@Param("id") id:string,@Body() dto:AdjustInventoryDto){return this.admin.adjustInventory(id,dto)}
 @Get("categories") categories(){return this.admin.listCategories()}
 @Post("categories") @Roles(UserRole.ADMIN) createCategory(@Body() dto:CreateCategoryDto){return this.admin.createCategory(dto)}
 @Patch("categories/:id") @Roles(UserRole.ADMIN) updateCategory(@Param("id") id:string,@Body() dto:UpdateCategoryDto){return this.admin.updateCategory(id,dto)}
 @Get("shipping-zones") shippingZones(){return this.admin.listShippingZones()}
 @Post("shipping-zones") @Roles(UserRole.ADMIN) createShippingZone(@Body() dto:CreateShippingZoneDto){return this.admin.createShippingZone(dto)}
 @Patch("shipping-zones/:id") @Roles(UserRole.ADMIN) updateShippingZone(@Param("id") id:string,@Body() dto:UpdateShippingZoneDto){return this.admin.updateShippingZone(id,dto)}
 @Get("orders") orders(){return this.admin.listOrders()}
 @Get("bookings") bookings(){return this.admin.listBookings()}
 @Patch("orders/:id/status") @Roles(UserRole.ADMIN) orderStatus(@Param("id") id:string,@Body("status") status:OrderStatus){return this.admin.updateOrderStatus(id,status)}
}
