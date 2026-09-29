import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class CreateShippingZoneDto { @IsString() @Length(2,80) name!:string; @IsString() @Length(2,80) city!:string; @IsOptional() @IsString() area?:string; @IsNumber() @Min(0) fee!:number; @IsInt() @Min(0) etaMinDays!:number; @IsInt() @Min(0) etaMaxDays!:number; @IsOptional() @IsBoolean() active?:boolean; }
export class UpdateShippingZoneDto extends CreateShippingZoneDto {}
