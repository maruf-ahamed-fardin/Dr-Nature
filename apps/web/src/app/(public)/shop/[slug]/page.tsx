import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Heart,
  Share2,
  Sparkles,
} from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Dr Natures Shop`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const inStock = (product.inventory?.quantity ?? 1) > (product.inventory?.reserved ?? 0);
  const img = product.images?.[0];
  const disc = product.compareAtPrice
    ? Math.round(
        ((parseFloat(product.compareAtPrice) - parseFloat(product.price)) /
          parseFloat(product.compareAtPrice)) *
          100
      )
    : 0;

  const relatedProducts = DEMO_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      <div className="container-app">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${product.category.slug}`} className="hover:text-foreground">
            {product.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Product Core Grid */}
        <div className="bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm mb-12">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/80 group">
                {img ? (
                  <Image
                    src={img.url}
                    alt={img.alt ?? product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">🌿</div>
                )}
                {disc > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-xl shadow-md">
                    Save {disc}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary relative cursor-pointer">
                  {img && (
                    <Image
                      src={img.url}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  {product.category.name}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">SKU:</span>
                  <span>DN-{product.id.toUpperCase()}</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-foreground mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews summary */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">{product.rating ?? 4.8}</span>
                <span className="text-xs text-muted-foreground">
                  ({product._count?.reviews ?? 124} customer reviews)
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified Lab Report
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/80 mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-extrabold text-foreground">
                    ৳{parseFloat(product.price).toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-muted-foreground line-through">
                      ৳{parseFloat(product.compareAtPrice).toLocaleString()}
                    </span>
                  )}
                  {disc > 0 && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      You save ৳{(parseFloat(product.compareAtPrice!) - parseFloat(product.price)).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Inclusive of all taxes. Free delivery on orders over ৳1,500.</p>
              </div>

              {/* Short Description */}
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Stock status & Add To Cart CTA */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium">
                  {inStock ? (
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      In Stock — Ready to ship from Dhaka
                    </span>
                  ) : (
                    <span className="text-red-500">Currently out of stock</span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <AddToCartButton product={product} className="py-3.5 text-sm" />
                  </div>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-border bg-white text-foreground hover:bg-muted text-xs font-semibold transition-all shadow-sm"
                  >
                    Consult Doctor First
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/70 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>2-3 Days Nationwide Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>100% Genuine Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span>7-Day Return Policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Heavy Metal Tested</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Info Tabs */}
        <div className="bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm mb-16">
          <h2 className="text-xl font-bold font-display text-foreground mb-6">Product Details & Science</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-5 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/60">
              <h3 className="font-bold text-sm text-foreground mb-2">🌿 Ingredients</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Standardized high-potency organic extract without synthetic binders, artificial colors, or GMO ingredients. Vegan capsule shells.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/60">
              <h3 className="font-bold text-sm text-foreground mb-2">📋 Suggested Use</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Take 1 to 2 capsules daily with a meal or as prescribed by your Dr Natures certified nutritionist. Drink plenty of warm water.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/60">
              <h3 className="font-bold text-sm text-foreground mb-2">🔬 Quality Assurance</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every batch is third-party lab tested for purity, microbial contaminants, and heavy metals according to WHO and Bangladesh standards.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold font-display text-foreground">
              You May Also Like
            </h2>
            <Link href="/shop" className="text-xs font-semibold text-primary hover:underline">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-2xl border border-border overflow-hidden p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <Link href={`/shop/${rel.slug}`} className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-3 block">
                  {rel.images?.[0] && (
                    <Image
                      src={rel.images[0].url}
                      alt={rel.name}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  )}
                </Link>
                <h4 className="text-xs font-bold text-foreground line-clamp-1 mb-1">
                  <Link href={`/shop/${rel.slug}`}>{rel.name}</Link>
                </h4>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-sm font-bold text-foreground">৳{rel.price}</span>
                  <AddToCartButton product={rel} variant="icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
