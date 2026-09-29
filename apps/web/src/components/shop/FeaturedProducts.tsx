// Server Component
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  compareAtPrice?: string | null;
  shortDescription?: string;
  category?: { name: string; slug: string };
  images?: { url: string; alt?: string }[];
  inventory?: { quantity: number; reserved: number };
  _count?: { reviews: number };
  rating?: number;
}

function discount(price: string, compare: string) {
  const p = parseFloat(price);
  const c = parseFloat(compare);
  return Math.round(((c - p) / c) * 100);
}

function ProductCard({ product }: { product: Product }) {
  const inStock = (product.inventory?.quantity ?? 1) > (product.inventory?.reserved ?? 0);
  const img = product.images?.[0];
  const disc = product.compareAtPrice ? discount(product.price, product.compareAtPrice) : 0;

  return (
    <Link href={`/shop/${product.slug}`} className="group block product-hover">
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        {/* Image */}
        <div className="relative aspect-square bg-[hsl(var(--muted)/0.5)] overflow-hidden">
          {img ? (
            <Image
              src={img.url}
              alt={img.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🌿</div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            {disc > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-lg shadow-sm">
                -{disc}%
              </span>
            )}
            {!inStock && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-muted text-muted-foreground rounded-lg">
                Out of stock
              </span>
            )}
          </div>

          {/* Quick add — appears on hover */}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {product.category && (
            <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
          )}
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          {(product._count?.reviews ?? 0) > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("w-3 h-3", i < Math.round(product.rating ?? 4.5) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted")} />
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground">({product._count!.reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-foreground">৳{parseFloat(product.price).toLocaleString()}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">৳{parseFloat(product.compareAtPrice).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// This is a Server Component — receives props from page
export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
