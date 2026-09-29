"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShoppingBag, Eye, Star, Sparkles, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { ProductQuickViewModal, ModalProduct } from "./ProductQuickViewModal";

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
  rating?: number;
}

const CATEGORIES = [
  { id: "all", label: "All Curations" },
  { id: "supplements", label: "Sacred Adaptogens" },
  { id: "wellness", label: "Pure Superfoods & Oils" },
  { id: "books", label: "Clinical Literature" },
];

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState<ModalProduct | null>(null);
  const { addItem, setIsOpen } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category?.slug === activeCategory);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
      setIsOpen(true);
    }, 600);
  };

  return (
    <section id="formulations" className="py-28 md:py-36 bg-[#FAFBF8] border-t border-[#B39868]/20 relative">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#EEF2ED]/50 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium block mb-2">
              ✦ Formulated in Small Batches · Lab-Tested
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light leading-none">
              Apothecary <span className="italic text-[#B39868]">Curations</span>
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-3 max-w-md">
              Each botanical extract is tested for bio-availability and heavy metals before nitrogen-sealed bottle packaging in Dhaka.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-body tracking-wider uppercase text-[#14221A]/50">
              Showing {filtered.length} Formulations
            </span>
          </div>
        </div>

        {/* Filter Tabs (Horizontal Scrollable on mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-body tracking-[0.2em] uppercase transition-all duration-300 shrink-0 ${
                activeCategory === cat.id
                  ? "bg-[#14221A] text-white shadow-md"
                  : "bg-white border border-[#B39868]/30 text-[#14221A]/70 hover:border-[#B39868] hover:text-[#14221A]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Arch Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence>
            {filtered.map((product, i) => {
              const isAdded = addedId === product.id;
              const img = product.images?.[0]?.url ?? "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80";

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative flex flex-col justify-between"
                >
                  {/* Card Container */}
                  <div className="relative arch-card border border-[#B39868]/30 bg-white p-4 pb-6 transition-all duration-500 hover:border-[#B39868] hover:shadow-[0_20px_50px_rgba(20,34,26,0.08)] flex flex-col justify-between h-full">
                    {/* Arch Image Window */}
                    <div className="relative aspect-[3/4] w-full arch-card overflow-hidden bg-gradient-to-b from-[#EEF2ED] to-[#D8E2DC]/30 border border-[#B39868]/15 mb-4">
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                      />

                      {/* Potency Badge */}
                      <div className="absolute top-3.5 inset-x-0 flex justify-center pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-[#FAFBF8]/95 backdrop-blur-md border border-[#B39868]/30 text-[9px] font-body tracking-[0.22em] uppercase text-[#14221A] shadow-sm">
                          100% Lab Tested
                        </span>
                      </div>

                      {/* Quick View Button (Top Right on Hover) */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuickViewProduct(product);
                        }}
                        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 border border-[#B39868]/40 flex items-center justify-center text-[#14221A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-[#14221A] hover:text-white"
                        title="Quick View Formulation"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Hover Slide-Up: Add to Bag (Desktop hover, and mobile-friendly tap) */}
                      <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[0.16,1,0.3,1] hidden sm:block">
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className={`w-full py-3 px-4 rounded-full text-xs tracking-[0.2em] uppercase font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                            isAdded
                              ? "bg-[#14221A] text-white"
                              : "bg-[#FAFBF8]/95 text-[#14221A] border border-[#B39868] hover:bg-[#B39868] hover:text-white"
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                          <span>{isAdded ? "Added to Bag" : "Add to Bag"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Narrative Details */}
                    <div className="text-center px-1 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        {product.category && (
                          <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] block">
                            {product.category.name}
                          </span>
                        )}

                        <h3 className="font-editorial text-xl sm:text-2xl text-[#14221A] font-light leading-snug line-clamp-2 mt-1 group-hover:text-[#B39868] transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-xs text-[#14221A]/60 font-body line-clamp-2 mt-1 font-light">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* Price Line */}
                      <div className="pt-3 border-t border-[#B39868]/15 mt-3 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-editorial text-2xl font-light text-[#14221A]">
                            ৳{parseFloat(product.price).toLocaleString()}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-[11px] text-[#14221A]/40 line-through font-body">
                              ৳{parseFloat(product.compareAtPrice).toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Mobile Add to Bag icon button (Always visible on mobile) */}
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="sm:hidden w-8 h-8 rounded-full border border-[#B39868] bg-[#14221A] text-white flex items-center justify-center shadow-sm"
                          aria-label="Add to bag"
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="hidden sm:inline-flex items-center gap-1 text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/60 hover:text-[#B39868] transition-colors"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="w-3 h-3 text-[#B39868]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
