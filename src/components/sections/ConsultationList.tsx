"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Video, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

interface ServiceRow {
  number: string;
  title: string;
  category: string;
  desc: string;
  duration: string;
  format: string;
  price: string;
  badge?: string;
}

const CONSULTATIONS: ServiceRow[] = [
  {
    number: "01",
    title: "Private Tele-Nutrition Consultation",
    category: "Virtual Clinical Care",
    desc: "A 45-minute clinical diagnostic via encrypted HD video. Review of medical history, blood markers, and creation of a tailored adaptogen & nutritional regimen.",
    duration: "45 Minutes",
    format: "Video Consultation",
    price: "৳800",
    badge: "Most Popular",
  },
  {
    number: "02",
    title: "In-Clinic Functional Assessment",
    category: "Direct In-Person Diagnostic",
    desc: "Comprehensive 60-minute face-to-face consultation at our Banani, Dhaka apothecary clinic. Detailed body composition analysis, tongue & pulse assessment, and personalized herbal guidance.",
    duration: "60 Minutes",
    format: "Dhaka Clinic",
    price: "৳1,500",
  },
  {
    number: "03",
    title: "4-Week Custom Microbiome & Diet Protocol",
    category: "Transformative Program",
    desc: "Complete gut restoration journey: 2 one-on-one consultations, bespoke 28-day meal blueprint, customized supplement stack, and direct nutritionist WhatsApp support.",
    duration: "28 Days",
    format: "Full Program",
    price: "৳2,500",
    badge: "Clinically Proven",
  },
  {
    number: "04",
    title: "Corporate Vitality & Executive Health Audit",
    category: "Institutional Wellness",
    desc: "Tailored institutional wellness audits, stress-resilience workshops, and biochemical vitality screenings for leadership teams and growing enterprises.",
    duration: "Multi-Session",
    format: "On-site / Hybrid",
    price: "Bespoke",
  },
];

export function ConsultationList() {
  const [bookingIndex, setBookingIndex] = useState<number | null>(null);

  return (
    <section id="consultations" className="py-28 md:py-36 bg-[#FAFBF8] relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-10 right-0 w-[450px] h-[450px] rounded-full bg-[#EEF2ED]/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-[#E8EEF5]/40 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium block mb-3">
              ✦ Certified Nutritionist Consultations · Dhaka Clinic
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light leading-[1.05]">
              Personalized Guidance, <br />
              <span className="italic text-[#B39868]">Rooted in Biochemistry.</span>
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-base font-light mt-4 leading-relaxed">
              Every body possesses a unique metabolic signature. Our licensed clinical nutritionists formulate individualized botanical therapies and dietary frameworks to re-establish physiological harmony.
            </p>
          </div>

          <div className="self-start md:self-auto">
            <button
              onClick={() => setBookingIndex(0)}
              className="inline-flex items-center gap-2 text-xs font-body tracking-[0.22em] uppercase text-[#14221A] hover:text-[#B39868] transition-colors pb-1 border-b border-[#B39868]/40"
            >
              <span>Schedule Direct Session</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868]" />
            </button>
          </div>
        </div>

        {/* Hairline Consultation Rows */}
        <div className="border-t border-[#B39868]/30">
          {CONSULTATIONS.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                onClick={() => setBookingIndex(index)}
                className="group block relative border-b border-[#B39868]/25 py-8 sm:py-10 px-4 sm:px-8 transition-all duration-500 hover:bg-[#EEF2ED]/60 rounded-xl cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Number & Classification */}
                  <div className="lg:col-span-4 flex items-baseline gap-4 sm:gap-6">
                    <span className="font-editorial text-2xl sm:text-3xl italic text-[#B39868] font-light group-hover:text-[#14221A] transition-colors shrink-0">
                      {service.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] font-medium">
                          {service.category}
                        </span>
                        {service.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-[#14221A] text-[#FAFBF8] text-[9px] font-body tracking-[0.18em] uppercase">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#14221A] font-light group-hover:translate-x-1.5 transition-transform duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Middle Column: Clinical Narrative Description */}
                  <div className="lg:col-span-5">
                    <p className="text-xs sm:text-sm text-[#14221A]/70 font-body leading-relaxed max-w-xl font-light">
                      {service.desc}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-[11px] font-body tracking-[0.16em] uppercase text-[#14221A]/50">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#B39868]" />
                        {service.duration}
                      </span>
                      <span>·</span>
                      <span>{service.format}</span>
                    </div>
                  </div>

                  {/* Right Column: Price & Interactive Action */}
                  <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-6 pt-2 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/50 block">
                        Consultation Fee
                      </span>
                      <span className="font-editorial text-2xl sm:text-3xl text-[#14221A] font-light">
                        {service.price}
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-full border border-[#B39868]/40 bg-white flex items-center justify-center text-[#14221A] group-hover:bg-[#14221A] group-hover:text-white group-hover:border-[#14221A] transition-all duration-300 shadow-sm shrink-0">
                      <ArrowUpRight className="w-4 h-4 text-[#B39868] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 pt-8 border-t border-[#B39868]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-[#14221A]/60 tracking-[0.16em] uppercase">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B39868]" />
            <span>Includes 7-day post-consultation inquiry window via WhatsApp</span>
          </div>
          <button
            onClick={() => setBookingIndex(0)}
            className="text-[#14221A] font-medium hover:text-[#B39868] transition-colors underline underline-offset-4"
          >
            Check Available Clinical Time Slots →
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingIndex !== null}
        onClose={() => setBookingIndex(null)}
        defaultServiceIndex={bookingIndex ?? 0}
      />
    </section>
  );
}
