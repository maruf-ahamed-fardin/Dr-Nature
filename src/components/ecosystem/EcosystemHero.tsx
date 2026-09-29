"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useEcosystem } from "@/lib/ecosystem-context";

export function EcosystemHero() {
  const [searchInput, setSearchInput] = useState("");
  const { toggleSearch } = useEcosystem();

  const handleHeroSearch = (term?: string) => {
    const q = term !== undefined ? term : searchInput;
    toggleSearch();
    // Pre-populate global search input after a tick
    setTimeout(() => {
      const input = document.getElementById("global-search-input") as HTMLInputElement | null;
      if (input) {
        input.value = q;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, 150);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#FDFBF7] via-white to-[#ECFDF5]/30 overflow-hidden">
      {/* Floating Ambient Glows */}
      <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-[#ECFDF5]/60 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[450px] h-[450px] bg-amber-100/60 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#0D4035] text-xs font-bold tracking-wide border border-[#10B981]/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] mr-2 animate-ping" />
              Integrated Healthcare &amp; E-Commerce Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-serif-heading">
              Personalized Care, <br />
              <span className="text-gradient-emerald">Natural Wellness,</span> <br />
              One Connected Platform.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              Consult Bangladesh&apos;s top clinical doctors &amp; nutritionists, order certified organic supplements &amp; medical books, and monitor your personal care journey in one unified portal.
            </p>

            {/* Interactive Quick Launcher Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-soft border border-slate-100 max-w-xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                  <input
                    type="text"
                    id="hero-search-input"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleHeroSearch();
                    }}
                    placeholder="Search doctor, PCOS book, black seed oil..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
                  />
                </div>
                <button
                  onClick={() => handleHeroSearch()}
                  className="px-6 py-2.5 bg-[#0D4035] hover:bg-[#06261E] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Explore All
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3 px-1 text-[11px] font-bold text-slate-400 flex-wrap">
                <span>Popular:</span>
                <button
                  onClick={() => handleHeroSearch("PCOS")}
                  className="hover:text-[#047857] text-slate-600 cursor-pointer"
                >
                  #PCOS
                </button>
                <button
                  onClick={() => handleHeroSearch("Diabetes")}
                  className="hover:text-[#047857] text-slate-600 cursor-pointer"
                >
                  #Diabetes
                </button>
                <button
                  onClick={() => handleHeroSearch("Honey")}
                  className="hover:text-[#047857] text-slate-600 cursor-pointer"
                >
                  #Organic Honey
                </button>
                <button
                  onClick={() => handleHeroSearch("Supplements")}
                  className="hover:text-[#047857] text-slate-600 cursor-pointer"
                >
                  #Supplements
                </button>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="pt-4 grid grid-cols-3 gap-6 max-w-lg border-t border-slate-200/80">
              <div>
                <p className="text-2xl font-black text-[#06261E] font-serif-heading">25,000+</p>
                <p className="text-xs font-semibold text-slate-500">Patients Treated</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#06261E] font-serif-heading">4.9/5.0</p>
                <p className="text-xs font-semibold text-slate-500">Service Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#06261E] font-serif-heading">100%</p>
                <p className="text-xs font-semibold text-slate-500">Authentic Products</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Right */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&h=1000&auto=format&fit=crop"
                alt="Doctor Consultation"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06261E]/80 via-transparent to-transparent" />

              {/* Live Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-2.5 py-1 bg-[#10B981] text-[#06261E] text-[10px] font-black uppercase rounded-md tracking-wider mb-2 inline-block">
                  Online Doctor Available
                </span>
                <h4 className="font-extrabold text-lg leading-tight font-serif-heading">
                  Dr. Farhana Ahmed
                </h4>
                <p className="text-xs text-slate-300">Clinical Nutritionist • M.Sc Nutrition (DU)</p>
              </div>
            </div>

            {/* Floating Card Badge 1 */}
            <div className="absolute -top-6 -left-6 glass-card p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-white">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-md">
                <i className="fa-solid fa-award" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800">Certified Care</p>
                <p className="text-[10px] font-semibold text-slate-500">BMDC Registered Docs</p>
              </div>
            </div>

            {/* Floating Card Badge 2 */}
            <div className="absolute -bottom-6 -right-4 glass-card p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-white">
              <div className="w-10 h-10 rounded-xl bg-[#0D4035] text-white flex items-center justify-center text-lg shadow-md">
                <i className="fa-solid fa-truck-ramp-box" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800">Fast Shipping</p>
                <p className="text-[10px] font-semibold text-slate-500">24-48h Delivery BD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
