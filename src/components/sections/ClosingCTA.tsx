"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export function ClosingCTA() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="py-16 sm:py-24 md:py-36 bg-[#EEF2ED]/60 relative overflow-hidden">
      {/* Decorative ambient color spots */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D8E2DC]/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E8EEF5]/40 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 max-w-5xl">
        {/* Arch Pavilion Container */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative arch-card border border-[#B39868]/40 bg-gradient-to-b from-[#FAFBF8] via-[#FAFBF8] to-[#EEF2ED] p-6 sm:p-14 lg:p-20 text-center shadow-[0_24px_70px_rgba(20,34,26,0.06)] overflow-hidden"
        >
          {/* Subtle inner double border arch */}
          <div className="absolute inset-3 arch-card border border-[#B39868]/20 pointer-events-none" />

          {/* Top Apothecary Seal & Eyebrow */}
          <div className="relative z-10 space-y-3 mb-6">
            <div className="w-12 h-12 rounded-full border border-[#B39868]/40 bg-[#FAFBF8] mx-auto flex items-center justify-center text-[#B39868] shadow-sm mb-4">
              <span className="font-editorial text-lg italic">DN</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#B39868] font-medium block">
              ✦ The Journey to Vitality Begins Here ✦
            </span>
          </div>

          {/* Main Headline */}
          <div className="relative z-10 max-w-3xl mx-auto mb-6">
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#14221A] font-light leading-[1.08] tracking-tight">
              Pure by nature. <br />
              <span className="italic font-light text-[#B39868]">
                Restored by clinical intention.
              </span>
            </h2>
          </div>

          {/* Narrative Body */}
          <div className="relative z-10 max-w-xl mx-auto mb-10">
            <p className="font-body text-[#14221A]/75 text-xs sm:text-base font-light leading-relaxed">
              Connect with certified clinical nutritionists for a dedicated 45-minute discovery consultation, or explore our laboratory-certified small-batch adaptogenic formulations.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#14221A] text-[#FAFBF8] text-xs font-medium tracking-[0.22em] uppercase hover:bg-[#B39868] transition-all duration-300 shadow-[0_8px_24px_rgba(20,34,26,0.12)] group"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:text-white transition-colors" />
            </button>

            <a
              href="#formulations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#B39868]/60 bg-[#FAFBF8]/80 text-[#14221A] text-xs font-medium tracking-[0.22em] uppercase hover:border-[#14221A] hover:bg-white transition-all duration-300"
            >
              <span>Explore Formulations</span>
            </a>
          </div>

          {/* Bottom Hairline Assurance */}
          <div className="relative z-10 pt-8 border-t border-[#B39868]/25 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[11px] font-body tracking-[0.18em] uppercase text-[#14221A]/60">
            <div className="flex items-center gap-2">
              <span className="text-[#B39868]">✦</span>
              <span>Heavy-Metal Lab Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#B39868]">✦</span>
              <span>Nationwide Safe Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#B39868]">✦</span>
              <span>Direct Practitioner WhatsApp</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
