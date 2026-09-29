"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ShieldCheck, Sparkles, Check, Plus, Minus, ArrowUpRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export interface ModalProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  compareAtPrice?: string | null;
  shortDescription?: string;
  category?: { name: string; slug: string };
  images?: { url: string; alt?: string }[];
  purityNotes?: string;
  dosage?: string;
  origin?: string;
}

interface ProductQuickViewModalProps {
  product: ModalProduct | null;
  onClose: () => void;
}

export function ProductQuickViewModal({ product, onClose }: ProductQuickViewModalProps) {
  const { addItem, setIsOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const img = product.images?.[0]?.url ?? "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80";

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setIsOpen(true);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#14221A]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#FAFBF8] border border-[#B39868]/40 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#B39868]/30 flex items-center justify-center text-[#14221A] hover:bg-[#14221A] hover:text-white transition-colors z-20"
            aria-label="Close product preview"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Arch Image Window */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] aspect-[3/4] arch-card border border-[#B39868]/30 overflow-hidden bg-gradient-to-b from-[#EEF2ED] to-[#D8E2DC]/30 shadow-md">
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-[#FAFBF8]/95 border border-[#B39868]/30 text-[9px] font-body tracking-[0.2em] uppercase text-[#14221A] shadow-sm">
                    Lab-Verified Purity
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Product Narrative & Purity Specs */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] font-medium block mb-1">
                  {product.category?.name ?? "Botanical Apothecary Formulation"}
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#14221A] font-light leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-editorial text-3xl text-[#14221A] font-light">
                    ৳{parseFloat(product.price).toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-[#14221A]/40 line-through font-body">
                      ৳{parseFloat(product.compareAtPrice).toLocaleString()}
                    </span>
                  )}
                  <span className="text-[10px] tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    In Stock · Dhaka Ready
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#14221A]/75 font-body leading-relaxed">
                {product.shortDescription ??
                  "Formulated strictly with whole-plant bioactives, cold-extracted under inert atmosphere to protect delicate therapeutic compounds. Rigorously tested for heavy metals and pesticide residues."}
              </p>

              {/* Lab Certification Box */}
              <div className="p-3.5 rounded-2xl bg-[#EEF2ED] border border-[#B39868]/20 space-y-1.5 text-xs font-body">
                <div className="flex items-center gap-2 font-medium text-[#14221A]">
                  <ShieldCheck className="w-4 h-4 text-[#B39868]" />
                  <span>Clinical Certificate of Analysis (COA)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#14221A]/70 pt-1">
                  <div>✦ Lead & Arsenic: &lt; 0.01 ppm</div>
                  <div>✦ Microbial Pathogens: Zero</div>
                  <div>✦ Active Standardization: 100%</div>
                  <div>✦ Solvents / Fillers: None</div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pt-2 flex items-center gap-4">
                <div className="flex items-center gap-2.5 border border-[#B39868]/40 rounded-full px-3 py-1.5 bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#14221A] hover:bg-[#EEF2ED]"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-body font-medium w-4 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#14221A] hover:bg-[#EEF2ED]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase font-medium hover:bg-[#B39868] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? "Added to Bag!" : `Add to Bag · ৳${(parseFloat(product.price) * qty).toLocaleString()}`}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
