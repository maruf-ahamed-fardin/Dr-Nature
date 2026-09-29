"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-14 sm:pb-20 lg:py-24 overflow-hidden apothecary-hero-bg">
      {/* Interactive Cursor Ambient Glow */}
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(179,152,104,0.12)_0%,rgba(238,242,237,0.05)_50%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block transition-all duration-300 ease-out"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Atmospheric Soft Lighting Accents */}
      <div className="absolute top-16 right-10 w-[420px] h-[420px] rounded-full bg-[#D8E2DC]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] rounded-full bg-[#E8EEF5]/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#F7EBE8]/30 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Apothecary Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#B39868]/40 bg-[#FAFBF8]/90 backdrop-blur-md text-[9.5px] sm:text-[11px] font-body tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#1F2B25] shadow-sm max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#126336] animate-pulse shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">Clinical Apothecary · Dhaka</span>
                <span className="hidden sm:inline">Clinical Botanical Apothecary · Banani, Dhaka</span>
              </span>
            </div>

            {/* Giant Crisp Editorial Headline */}
            <div>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-light text-[#1F2B25] leading-[1.04] tracking-tight">
                Pure <br />
                <span className="italic font-light text-[#B39868]">
                  by nature.
                </span>
              </h1>
            </div>

            {/* Subtitle / Philosophy */}
            <p className="font-body text-[#1F2B25]/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Grounded in ancestral botanical wisdom, verified by modern clinical biochemistry. We craft lab-tested adaptogens, sacred Himalayan resins, and tailored clinical nutrition protocols for enduring vitality.
            </p>

            {/* Actions & Proof line */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#14221A] text-[#FAFBF8] text-xs font-body font-medium tracking-[0.22em] uppercase hover:bg-[#126336] hover:shadow-[0_12px_30px_rgba(18,99,54,0.25)] transition-all duration-300 shadow-[0_8px_24px_rgba(20,34,26,0.16)] group"
              >
                <span>Explore Formulations</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:text-white transition-colors" />
              </Link>

              <button
                onClick={() => setBookingOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#B39868]/60 bg-[#FAFBF8]/80 backdrop-blur-sm text-[#14221A] text-xs font-body font-medium tracking-[0.22em] uppercase hover:border-[#126336] hover:bg-white hover:text-[#126336] transition-all duration-300 shadow-sm"
              >
                <span>Book Consultation</span>
              </button>
            </div>

            {/* Hairline Trust Markers */}
            <div className="pt-5 border-t border-[#B39868]/25 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-6 text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#1F2B25]/70 font-body">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[#B39868]">✦</span>
                <span>Heavy-Metal Tested (ICP-MS)</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[#B39868]">✦</span>
                <span>Registered Clinical Nutritionists</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[#B39868]">✦</span>
                <span>Nationwide Express Logistics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Arch-shaped Window with Doctor Image & Rotating Seal */}
          <div className="lg:col-span-5 flex justify-center relative mt-6 lg:mt-0">
            {/* Rotating Circular Text Seal (Cleanly positioned on desktop & tablet) */}
            <div className="absolute -top-6 -right-2 sm:-top-8 sm:-right-4 lg:-top-9 lg:-right-6 z-20 pointer-events-none hidden sm:block">
              <div className="relative w-28 h-28 sm:w-34 sm:h-34 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full spin-seal"
                >
                  <path
                    id="circlePath"
                    d="M 100, 100 m -68, 0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
                    fill="none"
                  />
                  <text
                    fontSize="11.5"
                    fontFamily="Jost, sans-serif"
                    letterSpacing="2.8"
                    fill="#B39868"
                    fontWeight="500"
                    className="uppercase"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      ✦ DR NATURES HEALTHCARE ✦ BOTANICAL APOTHECARY ·
                    </textPath>
                  </text>
                </svg>
                {/* Center stamp emblem */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#B39868]/50 bg-[#FAFBF8]/95 flex items-center justify-center text-[#B39868] shadow-sm">
                    <span className="font-editorial text-base sm:text-lg italic font-bold">DN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge on Left Edge */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-5 z-20 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#B39868]/45 shadow-[0_10px_25px_rgba(20,34,26,0.1)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#126336]" />
              <span className="text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A] font-medium">
                Verified Lab Protocols
              </span>
            </div>

            {/* Arch-shaped Window Container */}
            <div className="relative w-full max-w-[330px] sm:max-w-[390px] lg:max-w-[420px] aspect-[4/5] sm:aspect-[3/4] arch-hero border border-[#B39868]/45 bg-gradient-to-b from-[#EEF2ED] via-[#FAFBF8] to-[#E3EAE4] p-2.5 sm:p-3 shadow-[0_28px_75px_rgba(20,34,26,0.14)] overflow-hidden group">
              {/* Inner Arch Frame with subtle double-hairline border */}
              <div className="w-full h-full arch-hero border border-[#B39868]/35 relative overflow-hidden flex flex-col justify-end bg-gradient-to-b from-[#FAFBF8] to-[#EEF2ED]">
                {/* Professional Doctor Portrait via Next.js Image with Headroom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=90"
                    alt="Dr. Nadia Islam - Lead Clinical Nutritionist & Functional Medicine Practitioner"
                    fill
                    priority
                    sizes="(max-width: 640px) 330px, (max-width: 1024px) 390px, 420px"
                    style={{ objectPosition: "center 22%" }}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                  />

                  {/* Soft Luxury Vignette: Clear facial visibility while highlighting bottom credentials card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14221A]/90 via-[#14221A]/15 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Floating Doctor Credentials Card */}
                <div className="relative z-10 p-3 sm:p-4">
                  <div
                    onClick={() => setBookingOpen(true)}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#FAFBF8]/95 backdrop-blur-md border border-[#B39868]/50 shadow-[0_12px_32px_rgba(20,34,26,0.16)] text-left space-y-1.5 transition-all duration-300 group-hover:-translate-y-1 cursor-pointer hover:border-[#126336] hover:shadow-[0_16px_40px_rgba(18,99,54,0.18)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] sm:text-[9.5px] font-body tracking-[0.22em] uppercase text-[#126336] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#B39868]" />
                        <span>Lead Medical Faculty</span>
                      </span>
                      <span className="text-[9.5px] font-body text-[#14221A]/70 font-semibold bg-[#EEF2ED] px-2 py-0.5 rounded-full">
                        12+ Yrs Exp
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-editorial text-lg sm:text-xl text-[#14221A] font-bold leading-tight">
                        Dr. Nadia Islam
                      </h3>
                      <span className="text-[10px] font-body text-[#B39868] font-medium flex items-center gap-1">
                        <span className="text-amber-500">★</span> 4.9 (1,240+)
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#14221A]/80 font-body leading-tight">
                      Registered Dietitian &amp; Functional Nutritionist
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[10px] font-body border-t border-[#B39868]/20 mt-1">
                      <span className="text-[#126336] font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#126336]" />
                        In-Clinic &amp; Video Sessions
                      </span>
                      <span className="text-[#14221A] font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:text-[#126336] transition-colors">
                        <span>Book Consult</span>
                        <ArrowUpRight className="w-3 h-3 text-[#B39868] group-hover:text-[#126336]" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
