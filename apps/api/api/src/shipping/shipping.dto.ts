import { IsEnum, IsOptional, IsString } from "class-validator";
import { ShipmentStatus } from "@prisma/client";
export class UpdateShipmentDto { @IsEnum(ShipmentStatus) status!:ShipmentStatus; @IsOptional() @IsString() courier?:string; @IsOptional() @IsString() trackingNumber?:string; @IsOptional() @IsString() note?:string; }
