import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { BookingsModule } from "./bookings/bookings.module";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { CartModule } from "./cart/cart.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { PaymentModule } from "./payments/payment.module";
import { OrdersModule } from "./orders/orders.module";
import { ShippingModule } from "./shipping/shipping.module";
import { AddressesModule } from "./addresses/addresses.module";
import { AppController } from "./app.controller";
@Module({imports:[PrismaModule,AuthModule,ProductsModule,BookingsModule,AdminModule,CartModule,CheckoutModule,PaymentModule,OrdersModule,ShippingModule,AddressesModule],controllers:[AppController]}) export class AppModule {}
