"use client";

import React, { useState } from "react";
import { useEcosystem } from "@/lib/ecosystem-context";

export function AdminConsoleSection() {
  const { formatPrice } = useEcosystem();
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(3);

  const revenueWeeks = [
    { week: "Week 1", rev: 310000, visits: 120 },
    { week: "Week 2", rev: 380000, visits: 180 },
    { week: "Week 3", rev: 420000, visits: 240 },
    { week: "Week 4", rev: 482500, visits: 310 },
  ];

  return (
    <section id="admin-preview" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-[#F59E0B] font-black text-xs tracking-widest uppercase block mb-1">
              Internal Operations
            </span>
            <h2 className="text-3xl font-extrabold font-serif-heading">
              Admin Management Console
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Real-time control over products, stock alerts, appointment queues, and earnings.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-8">
          {/* Top Metric Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Monthly Revenue</span>
              <p className="text-2xl font-black text-[#FBBF24] mt-1 font-serif-heading">
                {formatPrice(482500)}
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Consultations Today</span>
              <p className="text-2xl font-black text-[#10B981] mt-1 font-serif-heading">
                32 Visits
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Orders Processing</span>
              <p className="text-2xl font-black text-blue-400 mt-1 font-serif-heading">
                18 Shipments
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Low Stock Alerts</span>
              <p className="text-2xl font-black text-red-400 mt-1 font-serif-heading">
                2 Items
              </p>
            </div>
          </div>

          {/* Analytics Visualizer Chart */}
          <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase">
                Revenue &amp; Consultation Trajectory (2026)
              </h4>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Revenue (BDT)
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Consultations
                </span>
              </div>
            </div>

            {/* Responsive SVG Chart */}
            <div className="w-full h-56 relative flex flex-col justify-end">
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Subtle Horizontal grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="#334155" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#334155" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeDasharray="3 3" opacity="0.5" />

                {/* Revenue Area & Curve */}
                <path
                  d="M 20 85 Q 120 55, 180 40 T 380 15 L 380 115 L 20 115 Z"
                  fill="url(#revGrad)"
                />
                <path
                  d="M 20 85 Q 120 55, 180 40 T 380 15"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />

                {/* Consultations Area & Curve */}
                <path
                  d="M 20 95 Q 120 80, 180 65 T 380 35 L 380 115 L 20 115 Z"
                  fill="url(#visitGrad)"
                />
                <path
                  d="M 20 95 Q 120 80, 180 65 T 380 35"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                {[
                  { cx: 20, cyRev: 85, cyVis: 95 },
                  { cx: 140, cyRev: 55, cyVis: 80 },
                  { cx: 260, cyRev: 35, cyVis: 60 },
                  { cx: 380, cyRev: 15, cyVis: 35 },
                ].map((pt, idx) => (
                  <g key={idx}>
                    <circle
                      cx={pt.cx}
                      cy={pt.cyRev}
                      r="4"
                      fill="#10B981"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() => setHoveredPoint(idx)}
                    />
                    <circle
                      cx={pt.cx}
                      cy={pt.cyVis}
                      r="4"
                      fill="#F59E0B"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() => setHoveredPoint(idx)}
                    />
                  </g>
                ))}
              </svg>

              {/* X-Axis labels */}
              <div className="flex justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-700/60">
                {revenueWeeks.map((w, idx) => (
                  <span
                    key={w.week}
                    className={`cursor-pointer transition-colors ${
                      hoveredPoint === idx ? "text-[#FBBF24] font-bold" : ""
                    }`}
                    onMouseEnter={() => setHoveredPoint(idx)}
                  >
                    {w.week}
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic summary pill of selected week */}
            {hoveredPoint !== null && (
              <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-700/70 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">
                  {revenueWeeks[hoveredPoint].week} Metrics:
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-[#10B981] font-bold">
                    Revenue: {formatPrice(revenueWeeks[hoveredPoint].rev)}
                  </span>
                  <span className="text-[#F59E0B] font-bold">
                    Visits: {revenueWeeks[hoveredPoint].visits}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
