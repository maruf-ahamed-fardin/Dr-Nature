"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, Star, ShoppingBag, ArrowUpDown } from "lucide-react";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/demo-data";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { cn } from "@/lib/utils";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      const matchCat =
        selectedCategory === "all" ||
        product.category.slug === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "price-desc") return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === "rating") return (b.rating ?? 4.5) - (a.rating ?? 4.5);
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.3)] pb-20 pt-28">
      {/* Header banner */}
      <div className="bg-primary text-white py-12 mb-8">
        <div className="container-app">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-green-300 mb-2 block">
              100% Certified & Lab Tested
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
              Natural Health Shop
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Explore pure organic adaptogens, herbal extracts, physician-authored nutrition books, and wellness essentials delivered straight to your door.
            </p>
          </div>
        </div>
      </div>

      <div className="container-app">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl border border-border p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or herbs..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.4)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
                  selectedCategory === "all"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                All Products ({DEMO_PRODUCTS.length})
              </button>
              {DEMO_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
                    selectedCategory === cat.slug
                      ? "bg-primary text-white shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="text-xs font-medium bg-[hsl(var(--muted)/0.4)] border border-border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-bold text-foreground mb-1">No products found</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inStock =
                (product.inventory?.quantity ?? 1) > (product.inventory?.reserved ?? 0);
              const img = product.images?.[0];
              const disc = product.compareAtPrice
                ? Math.round(
                    ((parseFloat(product.compareAtPrice) - parseFloat(product.price)) /
                      parseFloat(product.compareAtPrice)) *
                      100
                  )
                : 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <Link href={`/shop/${product.slug}`} className="block w-full h-full">
                      {img ? (
                        <Image
                          src={img.url}
                          alt={img.alt ?? product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          🌿
                        </div>
                      )}
                    </Link>

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

                    {/* Quick Add overlay */}
                    <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                      <AddToCartButton product={product} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                        {product.category.name}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating ?? 4.8}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {product.shortDescription}
                    </p>

                    {/* Price and Add button */}
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-base font-bold text-foreground">
                          ৳{parseFloat(product.price).toLocaleString()}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-muted-foreground line-through ml-2">
                            ৳{parseFloat(product.compareAtPrice).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <AddToCartButton product={product} variant="icon" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
