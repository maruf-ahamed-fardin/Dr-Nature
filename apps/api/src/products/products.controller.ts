import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductsService, ProductQueryDto } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findActive(query);
  }

  @Get("featured")
  findFeatured(@Query("take") take?: string) {
    return this.productsService.findFeatured(take ? parseInt(take) : 8);
  }

  @Get("categories")
  findCategories() {
    return this.productsService.findCategories();
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.productsService.findBySlug(slug);
  }
}
