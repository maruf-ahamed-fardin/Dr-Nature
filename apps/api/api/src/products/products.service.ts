import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findActive() {
    return this.prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: { images: true, category: true, inventory: true },
      orderBy: { createdAt: "desc" },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: { images: true, variants: true, category: true, inventory: true, reviews: { where: { approved: true } } },
    });
  }
}
