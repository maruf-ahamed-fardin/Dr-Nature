import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProductStatus } from "@prisma/client";

export class ProductQueryDto {
  search?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: "price_asc" | "price_desc" | "newest" | "popular";
  page?: string;
  limit?: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findActive(query: ProductQueryDto = {}) {
    const page = Math.max(1, parseInt(query.page ?? "1"));
    const limit = Math.min(48, Math.max(1, parseInt(query.limit ?? "12")));
    const skip = (page - 1) * limit;

    const where: any = { status: ProductStatus.ACTIVE };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { shortDescription: { contains: query.search, mode: "insensitive" } },
        { sku: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice) where.price.gte = parseFloat(query.minPrice);
      if (query.maxPrice) where.price.lte = parseFloat(query.maxPrice);
    }

    const orderBy: any =
      query.sort === "price_asc" ? { price: "asc" }
      : query.sort === "price_desc" ? { price: "desc" }
      : query.sort === "popular" ? { orderItems: { _count: "desc" } }
      : { createdAt: "desc" };

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true, name: true, slug: true, price: true, compareAtPrice: true,
          shortDescription: true, status: true,
          images: { take: 1, orderBy: { sortOrder: "asc" }, select: { url: true, alt: true } },
          category: { select: { id: true, name: true, slug: true } },
          inventory: { select: { quantity: true, reserved: true } },
          _count: { select: { reviews: true } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { data: products, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: true,
        category: true,
        inventory: true,
        tags: true,
        reviews: {
          where: { approved: true },
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });
  }

  async findCategories() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: true,
        _count: { select: { products: true } },
      },
      orderBy: { name: "asc" },
    });
  }

  async findFeatured(take = 8) {
    return this.prisma.product.findMany({
      where: { status: ProductStatus.ACTIVE },
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, name: true, slug: true, price: true, compareAtPrice: true,
        images: { take: 1, orderBy: { sortOrder: "asc" }, select: { url: true, alt: true } },
        inventory: { select: { quantity: true, reserved: true } },
        _count: { select: { reviews: true } },
      },
    });
  }
}
