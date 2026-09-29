"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Microscope,
  FlaskConical,
  Mountain,
  Box,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { PurityProcessSection } from "@/components/sections/PurityProcessSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { LabCOAModal } from "@/components/sections/LabCOAModal";

const HEAVY_METAL_COMPARISON = [
  {
    parameter: "Lead (Pb) Spectrometry",
    whoStandard: "< 10.0 ppm",
    uspStandard: "< 3.0 ppm",
    drNaturesAssay: "0.0018 ppm",
    status: "99.9% Purer than USP limit",
  },
  {
    parameter: "Arsenic (As) Spectrometry",
    whoStandard: "< 5.0 ppm",
    uspStandard: "< 1.5 ppm",
    drNaturesAssay: "< 0.0010 ppm",
    status: "Undetectable / Zero Risk",
  },
  {
    parameter: "Cadmium (Cd) Spectrometry",
    whoStandard: "< 0.3 ppm",
    uspStandard: "< 0.5 ppm",
    drNaturesAssay: "< 0.0008 ppm",
    status: "100% Pass",
  },
  {
    parameter: "Mercury (Hg) Spectrometry",
    whoStandard: "< 0.2 ppm",
    uspStandard: "< 0.1 ppm",
    drNaturesAssay: "< 0.0005 ppm",
    status: "100% Pass",
  },
  {
    parameter: "Active Bioavailable Compounds",
    whoStandard: "Not Monitored",
    uspStandard: "> 50% w/w",
    drNaturesAssay: "74.8% Fulvic / 5.4% Withanolides",
    status: "Maximum Therapeutic Grade",
  },
];

export function SciencePageClient() {
  const [coaOpen, setCoaOpen] = useState(false);

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
            <span className="text-[#14221A] font-semibold">Botanical Science & Testing</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#14221A] leading-[1.05] tracking-tight">
            From Sacred Earth <br />
            <span className="italic text-[#B39868]">to Clinical Potency.</span>
          </h1>

          <p className="font-body text-[#14221A]/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mt-4 sm:mt-6">
            We reject the shortcuts of industrial mass supplementation. Discover the clinical laboratory standards, heavy-metal chromatography, and ancestral sourcing that define every Dr Natures botanical formulation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setCoaOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase font-semibold hover:bg-[#B39868] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#B39868]" />
              <span>Inspect Batch Certificate of Analysis</span>
            </button>

            <Link
              href="/formulations"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#B39868]/60 bg-white text-[#14221A] text-xs font-body tracking-[0.18em] uppercase font-semibold hover:border-[#14221A] transition-colors text-center"
            >
              View Tested Formulations
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Manifesto Section ─── */}
      <PhilosophySection />

      {/* ─── 4 Pillars of Science Process ─── */}
      <PurityProcessSection />

      {/* ─── Heavy Metal Safety Standard Benchmark ─── */}
      <section className="py-16 sm:py-24 bg-[#FAFBF8] border-t border-[#B39868]/20">
        <div className="container-app max-w-5xl">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] uppercase text-[#B39868] font-medium block mb-2">
              ✦ ICP-MS Heavy Metal Spectrometry
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#14221A] font-light leading-tight">
              Safety Thresholds vs. Observed Assay
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-3 max-w-lg mx-auto">
              How Dr Natures small-batch botanical standards compare to international WHO & United States Pharmacopeia (USP) limits.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#B39868]/30 rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-[#14221A] text-white uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-4 px-5">Toxin / Parameter</th>
                  <th className="py-4 px-5">WHO Standard</th>
                  <th className="py-4 px-5">USP Safe Limit</th>
                  <th className="py-4 px-5 text-[#B39868] font-semibold">Dr Natures Observed Assay</th>
                  <th className="py-4 px-5 text-right">Laboratory Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B39868]/15">
                {HEAVY_METAL_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-[#EEF2ED]/40 transition-colors">
                    <td className="py-4 px-5 font-medium text-[#14221A]">{row.parameter}</td>
                    <td className="py-4 px-5 text-[#14221A]/60">{row.whoStandard}</td>
                    <td className="py-4 px-5 text-[#14221A]/60">{row.uspStandard}</td>
                    <td className="py-4 px-5 font-editorial text-base text-[#126336] font-semibold">
                      {row.drNaturesAssay}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-600/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-body text-[#14221A]/60 gap-3">
            <span>* Tested independently by ISO/IEC 17025 accredited analytical laboratories in Dhaka.</span>
            <button
              onClick={() => setCoaOpen(true)}
              className="text-[#14221A] font-medium underline underline-offset-4 hover:text-[#B39868] transition-colors"
            >
              Open Full Certificate of Analysis &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <StatsSection />

      {/* Lab COA Modal */}
      <LabCOAModal isOpen={coaOpen} onClose={() => setCoaOpen(false)} />
    </div>
  );
}
