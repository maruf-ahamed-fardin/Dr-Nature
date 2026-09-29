import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./reviews.dto";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../common/auth.types";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Public — get approved reviews for a product
  @Get("product/:productId")
  findByProduct(@Param("productId") productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  // Authenticated — submit a review
  @UseGuards(AuthGuard)
  @Post("product/:productId")
  create(@Req() req: any, @Param("productId") productId: string, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(req.user.id, productId, dto);
  }

  // Admin — moderation
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "EDITOR")
  @Get("admin/pending")
  findPending() {
    return this.reviewsService.findPending();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "EDITOR")
  @Get("admin/all")
  findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "EDITOR")
  @Patch(":id/approve")
  approve(@Param("id") id: string) {
    return this.reviewsService.approve(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "EDITOR")
  @Delete(":id")
  reject(@Param("id") id: string) {
    return this.reviewsService.reject(id);
  }
}
