"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Download, Award, FileText, CheckCircle2, Sparkles } from "lucide-react";

interface LabCOAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LAB_METRICS = [
  { parameter: "Lead (Pb) Spectrometry", method: "ICP-MS", specification: "< 3.0 ppm", result: "0.0018 ppm", status: "PASS" },
  { parameter: "Arsenic (As) Spectrometry", method: "ICP-MS", specification: "< 1.5 ppm", result: "< 0.0010 ppm", status: "PASS" },
  { parameter: "Cadmium (Cd) Spectrometry", method: "ICP-MS", specification: "< 0.5 ppm", result: "< 0.0008 ppm", status: "PASS" },
  { parameter: "Mercury (Hg) Spectrometry", method: "ICP-MS", specification: "< 0.1 ppm", result: "< 0.0005 ppm", status: "PASS" },
  { parameter: "Purified Fulvic Acid Content", method: "HPLC UV-254", specification: "> 70.0% w/w", result: "74.80% w/w", status: "OPTIMAL" },
  { parameter: "Total Bioactive Withanolides", method: "HPLC-PDA", specification: "> 5.0% w/w", result: "5.45% w/w", status: "OPTIMAL" },
  { parameter: "Aerobic Microbial Colony Count", method: "USP 61", specification: "< 1,000 CFU/g", result: "< 10 CFU/g", status: "PASS" },
  { parameter: "Pathogenic E. Coli & Salmonella", method: "USP 62", specification: "Absent / 25g", result: "Negative", status: "PASS" },
];

export function LabCOAModal({ isOpen, onClose }: LabCOAModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#14221A]/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#FAFBF8] border border-[#B39868]/40 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] z-10 my-4 sm:my-8"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 bg-[#14221A] text-[#FAFBF8] border-b border-[#B39868]/40 flex items-start justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-[#B39868]" />
                  <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] font-medium">
                    Independent Certificate of Analysis (COA)
                  </span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white font-light">
                  Batch Assay: <span className="italic text-[#B39868]">DN-2026-H04</span>
                </h3>
                <p className="text-xs text-[#FAFBF8]/70 font-body mt-1">
                  High-Altitude Grade-A Shilajit Resin & KSM-66 Full-Spectrum Extract · Dhaka Central Lab
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Batch Metadata Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#EEF2ED] border border-[#B39868]/20 text-xs font-body">
                <div>
                  <span className="text-[#14221A]/50 block text-[10px] tracking-wider uppercase">Sample Origin</span>
                  <strong className="text-[#14221A] font-medium">Himalayas (16,400 ft)</strong>
                </div>
                <div>
                  <span className="text-[#14221A]/50 block text-[10px] tracking-wider uppercase">Harvest Date</span>
                  <strong className="text-[#14221A] font-medium">January 2026</strong>
                </div>
                <div>
                  <span className="text-[#14221A]/50 block text-[10px] tracking-wider uppercase">Screening Lab</span>
                  <strong className="text-[#14221A] font-medium">Dhaka Analytical Center</strong>
                </div>
                <div>
                  <span className="text-[#14221A]/50 block text-[10px] tracking-wider uppercase">Batch Status</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Certified Pure
                  </span>
                </div>
              </div>

              {/* Table of Metrics */}
              <div className="overflow-x-auto border border-[#B39868]/30 rounded-xl">
                <table className="w-full text-left text-xs font-body">
                  <thead className="bg-[#14221A]/5 text-[#14221A] border-b border-[#B39868]/20 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Analytical Parameter</th>
                      <th className="py-3 px-4">Testing Method</th>
                      <th className="py-3 px-4">Strict Specification</th>
                      <th className="py-3 px-4">Observed Assay</th>
                      <th className="py-3 px-4 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B39868]/15">
                    {LAB_METRICS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/60 transition-colors">
                        <td className="py-3 px-4 font-medium text-[#14221A]">{row.parameter}</td>
                        <td className="py-3 px-4 text-[#14221A]/70">{row.method}</td>
                        <td className="py-3 px-4 text-[#14221A]/70">{row.specification}</td>
                        <td className="py-3 px-4 font-semibold text-[#14221A]">{row.result}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Certification Signoff */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#B39868]/20 text-xs font-body text-[#14221A]/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#B39868]/40 bg-white flex items-center justify-center text-[#B39868]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[#14221A]">Verified by Dr. T. Islam, PhD</p>
                    <p className="text-[10px] text-[#14221A]/60">Chief Analytical Biochemist · ISO 17025 Accredited</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert("Official Batch COA certificate (PDF) downloaded to your device.");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14221A] hover:bg-[#B39868] text-white text-xs font-body tracking-[0.18em] uppercase transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#B39868]" />
                  <span>Download Lab Spec (PDF)</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
