"use client";

import React from "react";
import { useEcosystem } from "@/lib/ecosystem-context";

export function ConsultationPackagesSection() {
  const { formatPrice, openBooking } = useEcosystem();

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#F59E0B] font-extrabold text-xs tracking-widest uppercase block mb-1">
            Comprehensive Programs
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif-heading">
            Specialized Healthcare Packages
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Structured 30 to 90-day reversal and management protocols combining doctor visits, diet plans, and natural supplements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Package 1 */}
          <div className="border border-slate-200 rounded-3xl p-6 bg-slate-50 hover:bg-white hover:shadow-soft transition-all relative flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 bg-[#ECFDF5] text-[#0D4035] text-[10px] font-extrabold uppercase rounded-md mb-4 inline-block">
                30 Days
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">PCOS Reversal Protocol</h3>
              <p className="text-xs text-slate-500 mb-6">
                Designed for hormonal balancing, weight regulation, and menstrual cycle health.
              </p>

              <div className="text-3xl font-extrabold text-[#06261E] mb-6 font-serif-heading">
                {formatPrice(3500)}
              </div>

              <ul className="space-y-3 text-xs text-slate-600 font-semibold mb-8">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> 2 Video Consultations with Nutritionist
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Personalized Weekly Meal Plan
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> 1x Organic Black Seed Oil Bottle
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Printed PCOS Lifestyle Guidebook
                </li>
              </ul>
            </div>
            <button
              onClick={() => openBooking("PCOS Reversal Protocol", "Comprehensive 30-Day Package", 3500)}
              className="w-full py-3 bg-slate-900 hover:bg-[#0D4035] text-white rounded-2xl font-bold text-xs transition-colors cursor-pointer"
            >
              Select Package
            </button>
          </div>

          {/* Package 2 (Featured) */}
          <div className="border-2 border-[#0D4035] rounded-3xl p-6 bg-white shadow-soft relative flex flex-col justify-between transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-[#06261E] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            <div>
              <span className="px-3 py-1 bg-amber-50 text-[#F59E0B] text-[10px] font-extrabold uppercase rounded-md mb-4 inline-block">
                60 Days
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Diabetes &amp; Metabolic Shield</h3>
              <p className="text-xs text-slate-500 mb-6">
                Natural insulin resistance reduction and glycemic control plan.
              </p>

              <div className="text-3xl font-extrabold text-[#06261E] mb-6 font-serif-heading">
                {formatPrice(5800)}
              </div>

              <ul className="space-y-3 text-xs text-slate-600 font-semibold mb-8">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> 4 Comprehensive Doctor Sessions
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Daily Glucose Tracking &amp; Feedback
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Sundarban Raw Honey + Metabolic Tea
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Direct WhatsApp Assistant Support
                </li>
              </ul>
            </div>
            <button
              onClick={() => openBooking("Diabetes & Metabolic Shield", "Comprehensive 60-Day Package", 5800)}
              className="w-full py-3 bg-[#0D4035] hover:bg-[#06261E] text-white rounded-2xl font-bold text-xs transition-colors shadow-md cursor-pointer"
            >
              Select Package
            </button>
          </div>

          {/* Package 3 */}
          <div className="border border-slate-200 rounded-3xl p-6 bg-slate-50 hover:bg-white hover:shadow-soft transition-all relative flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase rounded-md mb-4 inline-block">
                90 Days
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Total Body Transformation</h3>
              <p className="text-xs text-slate-500 mb-6">
                Complete lifestyle overhaul for sustainable weight loss and gut rejuvenation.
              </p>

              <div className="text-3xl font-extrabold text-[#06261E] mb-6 font-serif-heading">
                {formatPrice(8500)}
              </div>

              <ul className="space-y-3 text-xs text-slate-600 font-semibold mb-8">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Unlimited Doctor Follow-ups
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Full Supplement Care Box
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Customized Exercise Coaching Plan
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-[#10B981] mr-2.5" /> Complete Medical Report Analysis
                </li>
              </ul>
            </div>
            <button
              onClick={() => openBooking("Total Body Transformation", "Comprehensive 90-Day Package", 8500)}
              className="w-full py-3 bg-slate-900 hover:bg-[#0D4035] text-white rounded-2xl font-bold text-xs transition-colors cursor-pointer"
            >
              Select Package
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
