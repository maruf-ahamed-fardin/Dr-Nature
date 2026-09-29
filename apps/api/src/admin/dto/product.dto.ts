import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Min, MinLength } from "class-validator";
import { ProductStatus } from "@prisma/client";
export class CreateProductDto {
 @IsString() @Length(2,160) name!:string; @IsString() @Length(2,180) slug!:string; @IsString() @Length(1,80) sku!:string;
 @IsOptional() @IsString() shortDescription?:string; @IsOptional() @IsString() description?:string; @IsNumber() @Min(0) price!:number;
 @IsOptional() @IsNumber() @Min(0) compareAtPrice?:number; @IsOptional() @IsString() categoryId?:string; @IsOptional() @IsEnum(ProductStatus) status?:ProductStatus;
}
export class UpdateProductDto extends CreateProductDto { @IsOptional() name?:string; @IsOptional() slug?:string; @IsOptional() sku?:string; @IsOptional() price?:number; }
export class AdjustInventoryDto { @IsInt() quantity!:number; @IsOptional() @IsString() note?:string; }
