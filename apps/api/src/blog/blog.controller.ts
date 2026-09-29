import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Req } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogPostDto, UpdateBlogPostDto, BlogQueryDto } from "./blog.dto";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../common/auth.types";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Public endpoints
  @Get()
  findAll(@Query() query: BlogQueryDto) {
    return this.blogService.findAll(query);
  }

  @Get("tags")
  findAllTags() {
    return this.blogService.findAllTags();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.blogService.findBySlug(slug);
  }

  // Admin endpoints
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "EDITOR")
  @Get("admin/all")
  findAllAdmin(@Query() query: BlogQueryDto) {
    return this.blogService.findAllAdmin(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "EDITOR")
  @Post()
  create(@Req() req: any, @Body() dto: CreateBlogPostDto) {
    return this.blogService.create(req.user.id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "EDITOR")
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBlogPostDto) {
    return this.blogService.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blogService.remove(id);
  }
}
