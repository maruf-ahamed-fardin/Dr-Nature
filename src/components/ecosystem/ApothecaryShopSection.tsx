"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useEcosystem, PRODUCTS_DATA, Product } from "@/lib/ecosystem-context";

export function ApothecaryShopSection() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const { formatPrice, addToCart, openQuickView } = useEcosystem();

  const filteredProducts =
    selectedCat === "All"
      ? PRODUCTS_DATA
      : selectedCat === "Diet"
      ? PRODUCTS_DATA.filter((p) => p.category === "Diet")
      : PRODUCTS_DATA.filter((p) => p.category === selectedCat);

  return (
    <section id="shop" className="py-24 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-[#F59E0B] font-black text-xs tracking-widest uppercase block mb-1">
              Authentic Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
              Dr Natures Apothecary
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Medical books, cold-pressed oils, raw honey, and doctor-approved supplement bundles.
            </p>
          </div>

          {/* Product Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "All", label: "All Products", icon: null },
              { id: "Books", label: "Books", icon: "fa-solid fa-book text-[#F59E0B]" },
              { id: "Supplements", label: "Supplements", icon: "fa-solid fa-pills text-[#10B981]" },
              { id: "Diet", label: "Herbal & Honey", icon: "fa-solid fa-jar text-amber-500" },
              { id: "Bundles", label: "Bundles", icon: "fa-solid fa-box-open text-blue-500" },
            ].map((tab) => {
              const isActive = selectedCat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCat(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center ${
                    isActive
                      ? "bg-[#0D4035] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {tab.icon && <i className={`${tab.icon} mr-1`} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const priceFormatted = formatPrice(prod.priceBDT);
            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-slate-100 p-4 hover:shadow-soft transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-slate-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center p-3">
                    <Image
                      src={prod.img}
                      alt={prod.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => openQuickView(prod)}
                      className="absolute bottom-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm hover:bg-white"
                    >
                      Quick View
                    </button>
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#F59E0B] tracking-wider">
                    {prod.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug mt-1 mb-2">
                    {prod.name}
                  </h4>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-extrabold text-[#0D4035]">
                      {priceFormatted}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(prod.id)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-[#0D4035] text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
