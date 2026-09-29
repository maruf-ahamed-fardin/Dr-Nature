"use client";

import React from "react";
import { useEcosystem } from "@/lib/ecosystem-context";

export function TopAnnouncementBar() {
  const { currency, setCurrency } = useEcosystem();

  return (
    <div className="bg-[#06261E] text-white py-2 text-xs font-semibold border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <a
            href="tel:+8801700000000"
            className="inline-flex items-center text-[#FBBF24] hover:text-white transition-colors"
          >
            <i className="fa-solid fa-phone-volume mr-2 animate-pulse" />
            <span>Helpline: +880 1700-000000</span>
          </a>
          <span className="hidden md:inline-flex items-center text-slate-300">
            <i className="fa-solid fa-clock mr-1.5 text-[#10B981]" />
            <span>Consultation Hours: 09:00 AM - 10:00 PM</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Currency Toggle */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/10">
            <button
              id="curr-bdt"
              onClick={() => setCurrency("BDT")}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                currency === "BDT"
                  ? "bg-[#F59E0B] text-[#06261E]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              BDT ৳
            </button>
            <button
              id="curr-usd"
              onClick={() => setCurrency("USD")}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                currency === "USD"
                  ? "bg-[#F59E0B] text-[#06261E]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              USD $
            </button>
          </div>
          <a
            href="#portal"
            className="hover:text-[#FBBF24] transition-colors hidden sm:inline-flex items-center text-slate-200"
          >
            <i className="fa-solid fa-shield-heart mr-1.5 text-[#F59E0B]" />
            <span>Patient Portal</span>
          </a>
        </div>
      </div>
    </div>
  );
}
