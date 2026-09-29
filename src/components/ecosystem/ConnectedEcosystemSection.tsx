"use client";

import React from "react";

export function ConnectedEcosystemSection() {
  return (
    <section className="py-20 bg-[#0D4035] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#FBBF24] text-xs font-black tracking-widest uppercase mb-2 block">
            Integrated Healthcare Model
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-heading">
            Why Dr Natures is Different
          </h2>
          <p className="text-slate-300 text-sm mt-3">
            Unlike static e-commerce shops or separate consultation clinics, our platform connects education, medical advice, and products into one unified recovery loop.
          </p>
        </div>

        {/* 4-Step Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="glass-dark p-6 rounded-3xl border border-white/10 hover:border-[#F59E0B] transition-all group">
            <div className="w-12 h-12 bg-white/10 text-[#FBBF24] rounded-2xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-book-medical" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
              Step 01
            </span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">1. Health Education</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Read clinical articles on PCOS, Diabetes, and Lifestyle medicine written by registered medical practitioners.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-dark p-6 rounded-3xl border border-white/10 hover:border-[#F59E0B] transition-all group">
            <div className="w-12 h-12 bg-white/10 text-[#FBBF24] rounded-2xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-calculator" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
              Step 02
            </span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">2. Self Assessment</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Run your numbers through our BMI, Calorie, and PCOS Risk screening calculators for objective baseline data.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-dark p-6 rounded-3xl border border-white/10 hover:border-[#F59E0B] transition-all group">
            <div className="w-12 h-12 bg-white/10 text-[#FBBF24] rounded-2xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-user-doctor" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
              Step 03
            </span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">3. Doctor Consultation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Book video or clinic appointments with specialized nutritionists who build individualized treatment protocols.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-dark p-6 rounded-3xl border border-white/10 hover:border-[#F59E0B] transition-all group">
            <div className="w-12 h-12 bg-white/10 text-[#FBBF24] rounded-2xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-kit-medical" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
              Step 04
            </span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">4. Natural Remedy &amp; Track</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get authentic herbal supplements, guidebooks, and prescriptions delivered to your door and trackable online.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
