"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  desc: string;
}

const STATS: StatItem[] = [
  {
    value: "100%",
    label: "Purity & Heavy-Metal Tested",
    desc: "Independent 3rd-party lab verification for zero arsenic, lead, or toxins.",
  },
  {
    value: "3,400+",
    label: "Clinical Consultations",
    desc: "Personalized nutritional roadmaps restoring vitality across Bangladesh.",
  },
  {
    value: "64",
    label: "Districts Express Dispatched",
    desc: "Secure temperature-conscious delivery direct to your doorstep nationwide.",
  },
  {
    value: "4.9",
    suffix: "/ 5",
    label: "Practitioner & Client Rating",
    desc: "Over 1,200+ documented positive patient transformations.",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFBF8] border-y border-[#B39868]/30 relative overflow-hidden">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(238,242,237,0.8)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-app relative z-10">
        {/* Subtle Section Label */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium">
            ✦ Clinical Rigor · Proven Efficacy ✦
          </span>
        </div>

        {/* Thin-Line Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#B39868]/30 border-y sm:border-y-0 border-[#B39868]/30">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-10 px-6 lg:px-8 text-center sm:text-left flex flex-col justify-between group hover:bg-[#EEF2ED]/40 transition-colors duration-500"
            >
              <div>
                {/* Large Cormorant Garamond Light Figure */}
                <div className="flex items-baseline justify-center sm:justify-start gap-1 mb-3">
                  <span className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-light text-[#1F2B25] tracking-tight group-hover:text-[#B39868] transition-colors duration-300">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="font-editorial text-2xl sm:text-3xl text-[#B39868] font-light">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Jost Light Uppercase Label */}
                <h4 className="text-[11px] font-body tracking-[0.22em] uppercase text-[#1F2B25] font-medium mb-2.5">
                  {stat.label}
                </h4>

                {/* Refined Descriptive Subtext */}
                <p className="text-xs text-[#1F2B25]/65 font-body leading-relaxed max-w-xs mx-auto sm:mx-0">
                  {stat.desc}
                </p>
              </div>

              {/* Bottom hairline accent indicator */}
              <div className="mt-6 pt-4 border-t border-[#B39868]/15 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#B39868]">
                <span>N° 0{i + 1}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">✦ Certified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
