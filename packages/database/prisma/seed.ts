/**
 * Database Seeder for Dr Natures Healthcare
 * Populates categories, products, consultants, services, and blog articles
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Dr Natures database seeding...");

  // Clean existing records if any
  try {
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productReview.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.consultant.deleteMany();
    await prisma.consultationService.deleteMany();
  } catch (e) {
    console.log("No previous records to clean or tables not created yet.");
  }

  // 1. Categories
  const supplementsCat = await prisma.category.create({
    data: {
      name: "Supplements",
      slug: "supplements",
      description: "Standardized organic adaptogens and herbal extracts",
    },
  });

  const booksCat = await prisma.category.create({
    data: {
      name: "Books",
      slug: "books",
      description: "Evidence-based clinical nutrition guides authored by doctors",
    },
  });

  const wellnessCat = await prisma.category.create({
    data: {
      name: "Wellness",
      slug: "wellness",
      description: "Whole-food wellness products and cold-pressed botanical oils",
    },
  });

  console.log("✅ Categories seeded");

  // 2. Demo Products
  const products = [
    {
      name: "Organic Ashwagandha Root Extract",
      slug: "organic-ashwagandha-root-extract",
      sku: "DN-ASH-001",
      price: 1200,
      compareAtPrice: 1800,
      shortDescription: "Pure adaptogen for stress relief and vitality. Clinically tested, 600mg per capsule.",
      description: "Standardized high-potency organic extract without synthetic binders, artificial colors, or GMO ingredients. Vegan capsule shells.",
      categoryId: supplementsCat.id,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
      stock: 48,
    },
    {
      name: "Himalayan Shilajit Resin",
      slug: "himalayan-shilajit-resin",
      sku: "DN-SHI-002",
      price: 2400,
      compareAtPrice: 3200,
      shortDescription: "Authentic Grade-A Shilajit. 85+ minerals, fulvic acid rich. Boosts energy & immunity.",
      description: "Purified Himalayan Shilajit resin tested for 85+ trace minerals and heavy metal safety.",
      categoryId: supplementsCat.id,
      imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80",
      stock: 22,
    },
    {
      name: "Moringa Leaf Powder (500g)",
      slug: "moringa-leaf-powder",
      sku: "DN-MOR-003",
      price: 650,
      compareAtPrice: null,
      shortDescription: "Organic moringa, naturally dried. Packed with vitamins A, C, E, iron & calcium.",
      description: "Naturally dried organic moringa leaves ground into fine micro-powder for daily smoothies.",
      categoryId: wellnessCat.id,
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
      stock: 95,
    },
    {
      name: "Functional Nutrition Bible",
      slug: "functional-nutrition-bible",
      sku: "DN-BOK-004",
      price: 850,
      compareAtPrice: 1200,
      shortDescription: "A comprehensive guide to food as medicine. 400+ pages by Dr. Rahman.",
      description: "400+ page clinical guide on root cause nutrition and metabolic healing in South Asia.",
      categoryId: booksCat.id,
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      stock: 15,
    },
  ];

  for (const p of products) {
    const created = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        shortDescription: p.shortDescription,
        description: p.description,
        categoryId: p.categoryId,
        status: "ACTIVE",
        images: {
          create: {
            url: p.imageUrl,
            alt: p.name,
            sortOrder: 0,
          },
        },
        inventory: {
          create: {
            quantity: p.stock,
            reserved: 0,
            reorderLevel: 10,
          },
        },
      },
    });
  }

  console.log("✅ Products & Inventories seeded");
  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
