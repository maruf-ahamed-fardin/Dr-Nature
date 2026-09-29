"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Video,
  CheckCircle2,
  TrendingUp,
  Activity,
  Heart,
  Calendar,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Award,
} from "lucide-react";
import { ClientVideoReviews } from "@/components/sections/ClientVideoReviews";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { BookingModal } from "@/components/booking/BookingModal";

interface CaseStudy {
  id: string;
  patientInitials: string;
  ageGender: string;
  profession: string;
  chiefComplaint: string;
  duration: string;
  protocolAssigned: string;
  timeline: string;
  biomarkerBefore: string;
  biomarkerAfter: string;
  primaryResult: string;
  doctorNotes: string;
}

const CLINICAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    patientInitials: "T. I.",
    ageGender: "42 y/o Male",
    profession: "Senior Managing Director, Financial Services",
    chiefComplaint: "Adrenal burnout, morning lethargy, erratic 3 PM crashes, elevated resting heart rate.",
    duration: "18 months ongoing",
    protocolAssigned: "Purified Himalayan Shilajit Resin (350mg) + KSM-66 Ashwagandha (600mg) + Circadian Hydration Reset",
    timeline: "28 Days",
    biomarkerBefore: "Serum Cortisol: 26.8 µg/dL (elevated evening spike)",
    biomarkerAfter: "Serum Cortisol: 13.2 µg/dL (balanced circadian curve)",
    primaryResult: "100% elimination of afternoon crash, sustained cognitive focus, REM sleep increased by 42%.",
    doctorNotes: "Adrenal axis demonstrated remarkable rebound once fulvic acid transport stabilized cellular mitochondrial respiration.",
  },
  {
    id: "case-2",
    patientInitials: "S. K.",
    ageGender: "34 y/o Female",
    profession: "Dental Surgeon & Mother",
    chiefComplaint: "Severe postprandial bloating, chronic acid reflux, non-responsive to conventional PPIs.",
    duration: "4 years",
    protocolAssigned: "Cold-Pressed Kalonji (Nigella Sativa) Oil + Organic Moringa Leaf Matrix + 4-Week Anti-Inflammatory Dietary Protocol",
    timeline: "30 Days",
    biomarkerBefore: "Gastrointestinal Permeability Score: 8.4/10 (High intestinal distress)",
    biomarkerAfter: "Gastrointestinal Permeability Score: 1.2/10 (Optimal gut mucosa)",
    primaryResult: "Acid reflux resolved within 12 days; total freedom from bloating after meals.",
    doctorNotes: "Mucosal epithelial restoration achieved without reliance on synthetic acid suppressants.",
  },
  {
    id: "case-3",
    patientInitials: "R. M.",
    ageGender: "29 y/o Male",
    profession: "Lead Software Architect",
    chiefComplaint: "Chronic sleep latency (taking 2+ hours to fall asleep), racing thoughts, nervous tension.",
    duration: "2 years",
    protocolAssigned: "Dual Adaptogen Protocol: KSM-66 Ashwagandha + Magnesium L-Threonate + 9 PM Blue Light Cessation",
    timeline: "21 Days",
    biomarkerBefore: "Sleep Onset Latency: 110–135 minutes per night",
    biomarkerAfter: "Sleep Onset Latency: 14–18 minutes per night",
    primaryResult: "Fell asleep naturally; waking with zero daytime grogginess or dependence on sleeping aids.",
    doctorNotes: "GABAergic pathway stimulation via standardized withanolides safely modulated over-stimulated sympathetic tone.",
  },
];

export function ReviewsPageClient() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAFBF8] min-h-screen text-[#14221A]">
      {/* ─── Hero Header Banner ─── */}
      <section className="relative py-12 sm:py-20 bg-[#EEF2ED]/60 border-b border-[#B39868]/25 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#B39868]/10 blur-3xl pointer-events-none" />

        <div className="container-app relative z-10 max-w-5xl text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-body tracking-[0.2em] uppercase text-[#14221A]/60 mb-4">
            <Link href="/" className="hover:text-[#126336] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#126336] font-semibold">Client Reviews & Evidence</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#126336]/10 border border-[#126336]/25 text-[#126336] text-xs font-body tracking-[0.2em] uppercase font-semibold mb-6">
            <Video className="w-3.5 h-3.5 text-[#B39868]" />
            <span>Real Patients · Authentic Journeys</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light tracking-tight leading-[1.1] mb-6">
            Documented Healing, <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#126336]">
              Verified in Real Lives
            </span>
          </h1>

          <p className="font-body text-[#14221A]/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Real stories from corporate leaders, physicians, and families across Bangladesh
            who restored their cellular energy, sleep, gut lining, and metabolic vitality with Dr Natures.
          </p>

          {/* Social Proof Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-[#B39868]/30 rounded-2xl p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-[#B39868] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#B39868]" />
                ))}
              </div>
              <div className="font-editorial text-2xl font-bold text-[#14221A]">4.98 / 5.0</div>
              <p className="text-[10px] font-body uppercase tracking-[0.16em] text-[#14221A]/60 mt-0.5">
                Clinical Satisfaction
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-[#B39868]/30 rounded-2xl p-4 text-center shadow-sm">
              <div className="font-editorial text-2xl font-bold text-[#126336]">1,400+</div>
              <p className="text-[10px] font-body uppercase tracking-[0.16em] text-[#14221A]/60 mt-0.5">
                Patients Restored
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-[#B39868]/30 rounded-2xl p-4 text-center shadow-sm">
              <div className="font-editorial text-2xl font-bold text-[#14221A]">94%</div>
              <p className="text-[10px] font-body uppercase tracking-[0.16em] text-[#14221A]/60 mt-0.5">
                Symptom Reduction Rate
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-[#B39868]/30 rounded-2xl p-4 text-center shadow-sm">
              <div className="font-editorial text-2xl font-bold text-[#126336]">100%</div>
              <p className="text-[10px] font-body uppercase tracking-[0.16em] text-[#14221A]/60 mt-0.5">
                Verified Video Accounts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Client Video Reviews Component (Interactive YouTube Modal Player) ─── */}
      <ClientVideoReviews />

      {/* ─── Documented Clinical Biomarker Case Studies ─── */}
      <section className="py-16 sm:py-24 bg-[#FAFBF8] border-t border-[#B39868]/20">
        <div className="container-app max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-body tracking-[0.25em] uppercase text-[#126336] font-semibold block mb-2">
              ✦ Clinical Case Archives
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#14221A] font-light">
              Biomarker Before &amp; After:{" "}
              <span className="italic text-[#126336]">Documented Medical Files</span>
            </h2>
            <p className="font-body text-[#14221A]/70 text-sm sm:text-base mt-3 leading-relaxed">
              We track physiological outcomes rather than superficial feelings. Here are anonymized clinical profiles
              demonstrating hormonal balance and intestinal restoration under our supervised regimens.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {CLINICAL_CASE_STUDIES.map((study) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-[#B39868]/30 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Case Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#B39868]/20 mb-4">
                    <div>
                      <span className="text-[11px] font-body font-bold text-[#126336] uppercase tracking-wider">
                        Patient #{study.patientInitials}
                      </span>
                      <p className="text-xs text-[#14221A]/60">{study.ageGender}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#126336]/10 text-[#126336] text-[10px] font-body tracking-wider uppercase font-semibold">
                      {study.timeline} Protocol
                    </span>
                  </div>

                  <p className="text-xs font-body text-[#14221A]/70 italic mb-4">
                    &ldquo;{study.chiefComplaint}&rdquo;
                  </p>

                  {/* Biomarker Comparison Box */}
                  <div className="p-3.5 rounded-2xl bg-[#EEF2ED]/60 border border-[#B39868]/25 space-y-2 mb-4 text-xs font-body">
                    <div>
                      <span className="text-[10px] font-semibold text-rose-800 uppercase tracking-wider block">
                        Baseline Biomarker:
                      </span>
                      <p className="text-[#14221A]/80">{study.biomarkerBefore}</p>
                    </div>
                    <div className="pt-1.5 border-t border-[#B39868]/20">
                      <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-700" /> Outcome at {study.timeline}:
                      </span>
                      <p className="text-[#126336] font-medium">{study.biomarkerAfter}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-xs font-body">
                    <div>
                      <span className="text-[10px] font-semibold text-[#14221A]/60 uppercase tracking-wider">
                        Protocol Administered:
                      </span>
                      <p className="text-[#14221A]/85 mt-0.5">{study.protocolAssigned}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-[#14221A]/60 uppercase tracking-wider">
                        Clinical Finding:
                      </span>
                      <p className="text-[#126336] font-medium mt-0.5">{study.primaryResult}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#B39868]/20 text-[11px] font-body text-[#14221A]/60 italic">
                  Note: {study.doctorNotes}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comprehensive Written Patient Testimonials ─── */}
      <TestimonialSection />

      {/* ─── Share Your Story / Community Invitation ─── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#126336] to-[#14221A] text-white">
        <div className="container-app max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FAFBF8] text-xs font-body tracking-[0.2em] uppercase font-semibold mb-6">
            <Heart className="w-3.5 h-3.5 text-[#B39868]" />
            <span>Dr Natures Patient Circle</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-white mb-5 leading-tight">
            Have You Experienced the Shift? <br />
            <span className="italic text-[#B39868]">Send Us Your Honest Video Review</span>
          </h2>

          <p className="font-body text-[#FAFBF8]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Help other Bengalis free themselves from chronic medication dependency. Send a short 60-second video
            or voice note detailing your experience, and receive a curated seasonal botanical gift from our apothecary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/8801700000000?text=Hi%20Dr%20Natures%20Team,%20I%20would%20like%20to%20submit%20my%20patient%20review%20or%20video%20testimonial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B39868] hover:bg-white text-[#14221A] text-xs font-body tracking-[0.18em] uppercase font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#14221A]" />
              <span>Send Review via WhatsApp</span>
            </a>

            <button
              onClick={() => setBookingOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs font-body tracking-[0.18em] uppercase font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#B39868]" />
              <span>Book Your Own Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
