"use client";

import React from "react";
import { useEcosystem } from "@/lib/ecosystem-context";

export function CustomerPortalSection() {
  const { formatPrice, showToast } = useEcosystem();

  return (
    <section id="portal" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#047857] font-black text-xs tracking-widest uppercase block mb-1">
            Single Dashboard
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif-heading">
            My Dr Natures Account
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-[#0D4035] text-white font-black text-xl flex items-center justify-center shrink-0">
                TH
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tanvir Hossain</h3>
                <p className="text-xs text-slate-500">
                  Patient ID: #DN-88421 • dhaka.user@gmail.com
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 bg-[#ECFDF5] text-[#0D4035] text-xs font-bold rounded-full">
              Active Care Member
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Orders Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase flex items-center">
                  <i className="fa-solid fa-box text-[#F59E0B] mr-1.5" /> Recent Orders
                </h4>
                <span className="text-[10px] text-[#047857] font-bold">1 Active</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Order #ORD-9921</span>
                  <span className="text-[#0D4035]">{formatPrice(1340)}</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Items: Black Seed Oil, PCOS Guide Book
                </p>
                <span className="inline-block px-2 py-0.5 bg-amber-50 text-[#F59E0B] font-bold text-[10px] rounded">
                  In Transit via RedX
                </span>
              </div>
            </div>

            {/* Recent Appointments Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase flex items-center">
                  <i className="fa-solid fa-calendar text-[#0D4035] mr-1.5" /> Upcoming Appointment
                </h4>
                <span className="text-[10px] text-[#047857] font-bold">Confirmed</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Dr. Farhana Ahmed</span>
                  <span className="text-[#F59E0B]">Online</span>
                </div>
                <p className="text-slate-500 text-[11px]">Tomorrow • 08:00 PM (GMT+6)</p>
                <button
                  onClick={() => showToast("Downloading Clinical Diet Plan PDF...")}
                  className="inline-block text-[10px] text-[#047857] font-bold hover:underline cursor-pointer"
                >
                  Download Diet Plan PDF -&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
