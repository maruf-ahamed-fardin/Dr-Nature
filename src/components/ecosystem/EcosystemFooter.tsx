"use client";

import React from "react";
import Link from "next/link";

export function EcosystemFooter() {
  return (
    <footer className="bg-[#06261E] text-slate-300 pt-20 pb-10 border-t-4 border-[#0D4035]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#0D4035] rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-leaf text-[#FBBF24] text-xl" />
              </div>
              <span className="text-2xl font-black text-white font-serif-heading">
                Dr Natures
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Integrating medical clinical consultation, authentic herbal products, and lifestyle education for patients across Bangladesh.
            </p>
            <div className="flex space-x-3 text-slate-400">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0D4035] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-facebook-f text-xs" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0D4035] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-instagram text-xs" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0D4035] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-youtube text-xs" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <a href="#services" className="hover:text-[#F59E0B] transition-colors">
                  PCOS Online Consultation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F59E0B] transition-colors">
                  Diabetes Management Plan
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F59E0B] transition-colors">
                  Thyroid &amp; Hormone Care
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F59E0B] transition-colors">
                  In-Person Clinic Visit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
              Apothecary
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <a href="#shop" className="hover:text-[#F59E0B] transition-colors">
                  Medical Health Books
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#F59E0B] transition-colors">
                  Cold-Pressed Black Seed Oil
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#F59E0B] transition-colors">
                  Raw Sundarban Honey
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#F59E0B] transition-colors">
                  Metabolic Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
              Accepted Payment Methods
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Fast nationwide delivery with secure Bangladesh payment gateways.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-white uppercase">
                bKash
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-white uppercase">
                Nagad
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-white uppercase">
                Visa / MC
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-white uppercase">
                Cash on Delivery
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-xs text-slate-500 font-semibold">
          © 2026 Dr Natures Ecosystem. Educational tools are not a substitute for clinical emergency care.
        </div>
      </div>
    </footer>
  );
}
