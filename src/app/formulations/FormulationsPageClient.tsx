"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Eye,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  FileText,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { ProductQuickViewModal, ModalProduct } from "@/components/shop/ProductQuickViewModal";
import { IngredientMarquee } from "@/components/sections/IngredientMarquee";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  compareAtPrice?: string | null;
  shortDescription?: string;
  category?: { name: string; slug: string };
  images?: { url: string; alt?: string }[];
  rating?: number;
}

const CATEGORIES = [
  { id: "all", label: "All Curations" },
  { id: "supplements", label: "Sacred Adaptogens" },
  { id: "wellness", label: "Pure Superfoods & Oils" },
  { id: "books", label: "Clinical Literature" },
];

export function FormulationsPageClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState<ModalProduct | null>(null);
  const { addItem, setIsOpen } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
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
    <div className="bg-[#FAFBF8] text-[#14221A] pt-24 sm:pt-28">
      {/* ─── Hero Section ─── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#EEF2ED]/60 via-[#FAFBF8] to-[#FAFBF8] border-b border-[#B39868]/20 relative overflow-hidden">
        <div className="container-app relative z-10 text-center max-w-4xl mx-auto">
          {/* Breadcrumb / Eyebrow */}
          <div className="mb-4 flex items-center justify-center gap-2 text-[10.5px] font-body tracking-[0.24em] uppercase text-[#B39868]">
            <Link href="/" className="hover:text-[#14221A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#14221A] font-semibold">Botanical Formulations</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#14221A] leading-[1.05] tracking-tight">
            Small-Batch Botanicals, <br />
            <span className="italic text-[#B39868]">Verified in Dhaka.</span>
          </h1>

          <p className="font-body text-[#14221A]/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mt-4 sm:mt-6">
            Every botanical extract is independently screened for bio-potency and toxic heavy metals before nitrogen-sealed packaging in dark amber apothecary glass.
          </p>

          {/* Hairline trust markers */}
          <div className="pt-8 mt-8 border-t border-[#B39868]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[10.5px] font-body tracking-[0.16em] uppercase text-[#14221A]/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B39868]" />
              <span>100% Heavy-Metal Lab Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B39868]" />
              <span>Full-Spectrum Bioavailability</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#B39868]" />
              <span>Third-Party Batch COA Enclosed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Ticker Marquee ─── */}
      <IngredientMarquee />

      {/* ─── Catalog Section ─── */}
      <section className="py-16 sm:py-24 bg-[#FAFBF8]">
        <div className="container-app">
          {/* Controls Bar: Category Filters & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#B39868]/20 mb-10">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-body tracking-[0.18em] uppercase transition-all shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-[#14221A] text-white shadow-sm"
                      : "bg-white border border-[#B39868]/30 text-[#14221A]/70 hover:border-[#B39868] hover:text-[#14221A]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-body tracking-wider uppercase text-[#14221A]/60 shrink-0">
              Showing {filtered.length} Curated Formulations
            </span>
          </div>

          {/* Product Cards Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <AnimatePresence>
              {filtered.map((product, i) => {
                const isAdded = addedId === product.id;
                const img =
                  product.images?.[0]?.url ??
                  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80";

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="group relative flex flex-col justify-between"
                  >
                    <div className="relative arch-card border border-[#B39868]/30 bg-white p-4 pb-6 transition-all duration-500 hover:border-[#B39868] hover:shadow-[0_20px_50px_rgba(20,34,26,0.08)] flex flex-col justify-between h-full">
                      {/* Image Window */}
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

                        {/* Quick View Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setQuickViewProduct(product);
                          }}
                          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 border border-[#B39868]/40 flex items-center justify-center text-[#14221A] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-[#14221A] hover:text-white"
                          title="Quick View Formulation"
                          aria-label="Quick View Formulation"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Desktop Hover Add to Bag */}
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

                      {/* Product Narrative */}
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

                          {/* Mobile Touch Add Button */}
                          <button
                            onClick={(e) => handleQuickAdd(e, product)}
                            className="sm:hidden w-9 h-9 rounded-full border border-[#B39868] bg-[#14221A] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
                            aria-label="Add to bag"
                          >
                            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
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

          {/* Need Clinical Guidance Banner */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#14221A] to-[#1F2B25] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[10px] font-body tracking-[0.24em] uppercase text-[#B39868] block mb-1">
                ✦ Unsure Which Formulation Fits Your Physiology?
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-light">
                Consult with Our Functional Nutritionist
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/70 max-w-xl mt-2 font-light">
                Book a 45-minute tele-nutrition discovery session to analyze your symptoms, blood reports, and receive a customized adaptogen prescription.
              </p>
            </div>

            <Link
              href="/consultations"
              className="w-full md:w-auto px-7 py-3.5 rounded-full bg-[#B39868] hover:bg-white text-[#14221A] text-xs font-body tracking-[0.2em] uppercase font-semibold transition-all shadow-md shrink-0 text-center"
            >
              Explore Clinical Consultations
            </Link>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
