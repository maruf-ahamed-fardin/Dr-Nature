"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Mountain, Microscope, FlaskConical, Box, Sparkles, CheckCircle2, FileText, ArrowUpRight } from "lucide-react";
import { LabCOAModal } from "./LabCOAModal";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Ancestral Wild Sourcing",
    tagline: "High Altitudes & Pristine Flora",
    icon: Mountain,
    desc: "We harvest only from indigenous ecosystems where adaptogens synthesize their highest therapeutic densities — from 16,000-ft Himalayan rock faces to remote organic Sundarbans forest reserves.",
    highlight: "100% Wild-Harvested & Organic",
  },
  {
    step: "02",
    title: "Quadruple Lab Screening",
    tagline: "ICP-MS & HPLC Chromatography",
    icon: Microscope,
    desc: "Every single harvest batch is subjected to rigorous independent testing: heavy metal spectrometry (Lead, Arsenic, Cadmium <0.01 ppm), microbial screening, and active compound quantification.",
    highlight: "Zero Toxic Contaminants",
  },
  {
    step: "03",
    title: "Cold Bio-Extraction",
    tagline: "Solvent-Free Phytonutrient Preservation",
    icon: FlaskConical,
    desc: "Traditional heat processes destroy sensitive plant enzymes. We utilize proprietary low-temperature water-ethanol and cold-press extraction to ensure 100% molecular bioavailability.",
    highlight: "Full-Spectrum Bioactivity",
  },
  {
    step: "04",
    title: "Amber Miron Preservation",
    tagline: "Photonic Barrier & Nitrogen Purge",
    icon: Box,
    desc: "Packaged in specialized apothecary-grade dark amber containers with inert nitrogen flushes. This creates an impenetrable barrier against sunlight and oxidation, preserving vitality for 2+ years.",
    highlight: "24-Month Guaranteed Potency",
  },
];

export function PurityProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [coaModalOpen, setCoaModalOpen] = useState(false);

  return (
    <section id="purity" className="py-28 md:py-36 bg-[#FAFBF8] border-t border-[#B39868]/20 relative overflow-hidden">
      {/* Decorative subtle ambient circles */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] rounded-full bg-[#EEF2ED]/80 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-[#E8EEF5]/40 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium inline-flex items-center gap-2 mb-3">
            <span>✦</span>
            <span>Uncompromising Botanical Science</span>
            <span>✦</span>
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light leading-[1.08]">
            From Sacred Earth <br />
            <span className="italic text-[#B39868]">to Clinical Potency.</span>
          </h2>
          <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-4 leading-relaxed max-w-lg mx-auto">
            We reject the shortcuts of industrial mass production. Discover the four clinical pillars that define every Dr Natures botanical formulation.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeStep === index;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveStep(index)}
                className={`relative arch-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer ${
                  isSelected
                    ? "bg-[#EEF2ED] border-2 border-[#B39868] shadow-[0_20px_50px_rgba(20,34,26,0.07)]"
                    : "bg-white/80 border border-[#B39868]/30 hover:border-[#B39868]/70 hover:bg-[#EEF2ED]/50"
                }`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-editorial text-3xl italic text-[#B39868] font-light">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-[#B39868]/30 bg-white flex items-center justify-center text-[#14221A] shadow-sm">
                      <Icon className="w-5 h-5 text-[#B39868] stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Tagline */}
                  <span className="text-[10px] font-body tracking-[0.22em] uppercase text-[#B39868] font-medium block mb-2">
                    {item.tagline}
                  </span>

                  {/* Title */}
                  <h3 className="font-editorial text-2xl text-[#14221A] font-light leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#14221A]/70 font-body leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Highlight Badge */}
                <div className="mt-8 pt-4 border-t border-[#B39868]/20 flex items-center gap-2 text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/80 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B39868] shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Certificate Verification Guarantee */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#EEF2ED]/80 border border-[#B39868]/30 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#14221A] text-[#B39868] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-editorial text-xl text-[#14221A] font-normal leading-snug">
                Every Jar Encloses a Batch COA Report
              </h4>
              <p className="text-xs text-[#14221A]/60 font-body mt-0.5">
                Scan the QR code printed on your product bottle to view real-time laboratory chromatography data.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setCoaModalOpen(true)}
              className="px-6 py-3 rounded-full border border-[#B39868] bg-white text-[#14221A] text-xs font-body tracking-[0.2em] uppercase hover:bg-[#14221A] hover:text-white transition-all shadow-sm flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#B39868]" />
              <span>Inspect Lab COA</span>
            </button>
            <a
              href="#formulations"
              className="px-6 py-3 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase hover:bg-[#B39868] transition-colors"
            >
              Explore Formulations
            </a>
          </div>
        </div>
      </div>

      {/* Lab Certificate of Analysis Modal */}
      <LabCOAModal
        isOpen={coaModalOpen}
        onClose={() => setCoaModalOpen(false)}
      />
    </section>
  );
}
