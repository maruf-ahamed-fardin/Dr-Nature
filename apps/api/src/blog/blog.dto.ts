import { IsString, IsOptional, IsEnum, IsInt, Min, Max, IsArray } from "class-validator";
import { BlogStatus } from "@prisma/client";

export class CreateBlogPostDto {
  @IsString() title: string;
  @IsString() slug: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsString() content: string;
  @IsOptional() @IsString() coverImageUrl?: string;
  @IsOptional() @IsInt() @Min(1) readTimeMin?: number;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional() @IsEnum(BlogStatus) status?: BlogStatus;
}

export class UpdateBlogPostDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() coverImageUrl?: string;
  @IsOptional() @IsInt() @Min(1) readTimeMin?: number;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional() @IsEnum(BlogStatus) status?: BlogStatus;
}

export class BlogQueryDto {
  @IsOptional() @IsString() tag?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsInt() @Min(1) page?: number;
  @IsOptional() @IsInt() @Min(1) @Max(50) limit?: number;
}
