import { Injectable, NotFoundException, ConflictException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./reviews.dto";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProduct(productId: string) {
    const reviews = await this.prisma.productReview.findMany({
      where: { productId, approved: true },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true } } },
    });

    const aggregate = await this.prisma.productReview.aggregate({
      where: { productId, approved: true },
      _avg: { rating: true },
      _count: { rating: true },
    });

    return {
      reviews,
      averageRating: aggregate._avg.rating ?? 0,
      totalReviews: aggregate._count.rating,
    };
  }

  async create(userId: string, productId: string, dto: CreateReviewDto) {
    // Verify product exists
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException("Product not found");

    // Check existing review
    const existing = await this.prisma.productReview.findUnique({
      where: { productId_userId: { productId, userId } },
    });
    if (existing) throw new ConflictException("You have already reviewed this product");

    return this.prisma.productReview.create({
      data: { ...dto, productId, userId, approved: false },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async approve(id: string) {
    const review = await this.prisma.productReview.findUnique({ where: { id } });
    if (!review) throw new NotFoundException("Review not found");
    return this.prisma.productReview.update({ where: { id }, data: { approved: true } });
  }

  async reject(id: string) {
    const review = await this.prisma.productReview.findUnique({ where: { id } });
    if (!review) throw new NotFoundException("Review not found");
    return this.prisma.productReview.delete({ where: { id } });
  }

  async findPending() {
    return this.prisma.productReview.findMany({
      where: { approved: false },
      orderBy: { createdAt: "asc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        product: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.productReview.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        product: { select: { id: true, name: true, slug: true } },
      },
    });
  }
}
