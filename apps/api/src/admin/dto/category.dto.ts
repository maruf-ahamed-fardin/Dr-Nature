import { IsOptional, IsString, Length } from "class-validator";
export class CreateCategoryDto { @IsString() @Length(2,120) name!:string; @IsString() @Length(2,160) slug!:string; @IsOptional() @IsString() description?:string; @IsOptional() @IsString() parentId?:string; }
export class UpdateCategoryDto extends CreateCategoryDto {}
