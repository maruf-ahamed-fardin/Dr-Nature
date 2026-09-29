import { IsOptional, IsString, IsNotEmpty } from "class-validator";
export class CheckoutDto {
 @IsOptional() @IsString() addressId?:string;
 @IsNotEmpty() @IsString() shippingZoneId!:string;
 @IsOptional() @IsString() paymentProvider?:string;
}
