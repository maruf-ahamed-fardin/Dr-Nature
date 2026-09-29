"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState(false);

  // Cursor-following gold glow
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springConfig = { damping: 28, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-32 pb-24 overflow-hidden apothecary-hero-bg">
      {/* Interactive Cursor Ambient Glow */}
      <motion.div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(179,152,104,0.12)_0%,rgba(238,242,237,0.05)_50%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block"
        style={{ left: smoothX, top: smoothY }}
      />

      {/* Decorative background atmospheric blur patches */}
      <div className="absolute top-20 right-10 w-[420px] h-[420px] rounded-full bg-[#D8E2DC]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] rounded-full bg-[#E8EEF5]/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#F7EBE8]/30 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Apothecary Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#B39868]/30 bg-[#FAFBF8]/80 backdrop-blur-sm text-[11px] font-medium tracking-[0.25em] uppercase text-[#1F2B25]/80 shadow-[0_2px_10px_rgba(179,152,104,0.06)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B39868] animate-pulse" />
              <span>Natural Medicine · Lab-Verified · Dhaka</span>
            </motion.div>

            {/* Giant Overlapping Headline */}
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-light text-[#1F2B25] leading-[0.98] tracking-tight">
                Pure <br />
                <span className="italic font-light text-[#B39868]">
                  by nature.
                </span>
              </h1>
            </motion.div>

            {/* Subtitle / Philosophy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-[#1F2B25]/75 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Grounded in ancestral botanical wisdom and verified by modern clinical biochemistry. We craft organic adaptogens and personalized clinical nutrition protocols for enduring vitality.
            </motion.p>

            {/* Actions & Proof line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#formulations"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#14221A] text-[#FAFBF8] text-xs font-medium tracking-[0.22em] uppercase hover:bg-[#B39868] transition-all duration-300 shadow-[0_8px_24px_rgba(20,34,26,0.14)] group"
              >
                <span>Explore Formulations</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:text-white transition-colors" />
              </a>

              <button
                onClick={() => setBookingOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#B39868]/60 bg-[#FAFBF8]/70 backdrop-blur-sm text-[#14221A] text-xs font-medium tracking-[0.22em] uppercase hover:border-[#14221A] hover:bg-white transition-all duration-300 shadow-sm"
              >
                <span>Book Consultation</span>
              </button>
            </motion.div>

            {/* Hairline trust markers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="pt-6 border-t border-[#B39868]/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[11px] tracking-[0.16em] uppercase text-[#1F2B25]/60"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#B39868]">✦</span>
                <span>Heavy-Metal Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#B39868]">✦</span>
                <span>Certified Nutritionists</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#B39868]">✦</span>
                <span>Nationwide Express</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Arch-shaped Window with Animated Botanical Line Drawing */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Rotating Circular Text Seal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute -top-8 -right-4 sm:-top-10 sm:-right-8 z-30 pointer-events-none"
            >
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full spin-seal"
                >
                  <path
                    id="circlePath"
                    d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
                    fill="none"
                  />
                  <text
                    fontSize="13"
                    fontFamily="Jost"
                    letterSpacing="3.5"
                    fill="#B39868"
                    fontWeight="400"
                    className="uppercase"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      ✦ DR NATURES HEALTHCARE ✦ PURE BOTANICAL APOTHECARY ·
                    </textPath>
                  </text>
                </svg>
                {/* Center stamp emblem */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-[#B39868]/40 bg-[#FAFBF8]/95 flex items-center justify-center text-[#B39868] shadow-sm">
                    <span className="font-editorial text-lg italic">DN</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Arch-shaped Window Container */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] arch-hero border border-[#B39868]/35 bg-gradient-to-b from-[#EEF2ED] via-[#FAFBF8] to-[#D8E2DC]/50 p-3 shadow-[0_24px_60px_rgba(31,43,37,0.08)] overflow-hidden group"
            >
              {/* Inner Arch Frame with subtle double-hairline border */}
              <div className="w-full h-full arch-hero border border-[#B39868]/25 relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 bg-[#FAFBF8]/60 backdrop-blur-sm">
                
                {/* Top Subtle Label inside arch */}
                <div className="flex items-center justify-between z-20">
                  <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#1F2B25]/60">
                    Apothecary N° 01
                  </span>
                  <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868]">
                    Dhaka · 2026
                  </span>
                </div>

                {/* Animated Botanical Branch Line Drawing (SVG) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <svg
                    viewBox="0 0 400 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[90%] h-[90%] opacity-85"
                  >
                    {/* Main Curved Stem */}
                    <motion.path
                      d="M200 460 C200 380 180 300 210 220 C230 160 210 100 200 40"
                      stroke="#1F2B25"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Branch 1 - Right Leaf cluster */}
                    <motion.path
                      d="M205 340 C240 330 270 340 290 320 C260 305 230 320 205 340"
                      stroke="#B39868"
                      strokeWidth="1.2"
                      fill="rgba(179, 152, 104, 0.08)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Branch 2 - Left Leaf cluster */}
                    <motion.path
                      d="M195 280 C160 260 130 270 110 245 C140 235 170 255 195 280"
                      stroke="#1F2B25"
                      strokeWidth="1.2"
                      fill="rgba(31, 43, 37, 0.05)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Branch 3 - Upper Right Leaf cluster */}
                    <motion.path
                      d="M210 200 C245 180 275 190 295 165 C265 155 235 175 210 200"
                      stroke="#B39868"
                      strokeWidth="1.2"
                      fill="rgba(179, 152, 104, 0.08)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Branch 4 - Upper Left Leaf cluster */}
                    <motion.path
                      d="M205 130 C175 110 150 120 135 95 C160 90 185 105 205 130"
                      stroke="#1F2B25"
                      strokeWidth="1.2"
                      fill="rgba(31, 43, 37, 0.05)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Terminal Bud / Flower */}
                    <motion.path
                      d="M200 40 C190 20 210 20 200 40"
                      stroke="#B39868"
                      strokeWidth="1.5"
                      fill="#B39868"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                    />

                    {/* Delicate pollen dots */}
                    <circle cx="280" cy="315" r="2.5" fill="#B39868" opacity="0.6" />
                    <circle cx="120" cy="240" r="2.5" fill="#B39868" opacity="0.6" />
                    <circle cx="285" cy="160" r="2.5" fill="#B39868" opacity="0.6" />
                  </svg>
                </div>

                {/* Bottom Card Inside Arch */}
                <div className="z-20 pt-16">
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#B39868]/30 shadow-sm text-center space-y-1 transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868] block">
                      Ancestral Remedies · Modern Purity
                    </span>
                    <h3 className="font-editorial text-lg text-[#1F2B25] font-normal leading-snug">
                      Himalayan Shilajit & KSM-66 Ashwagandha
                    </h3>
                    <p className="text-[11px] text-[#1F2B25]/60 font-body">
                      Standardized for verified bio-availability.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
