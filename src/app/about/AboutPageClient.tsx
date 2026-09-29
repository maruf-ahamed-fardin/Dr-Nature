"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Stethoscope,
  Microscope,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  Sparkles,
  HeartHandshake,
  Building2,
  Phone,
  Mail,
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";
import { LabCOAModal } from "@/components/sections/LabCOAModal";

const TEAM_MEMBERS = [
  {
    name: "Dr. Nadia Islam",
    role: "Lead Functional Nutritionist & Clinical Dietitian",
    specialization: "Functional Nutrition & Metabolic Health",
    credentials: "MSc Clinical Nutrition (DU) · Certified Functional Medicine Practitioner (IFM) · BMDC Reg.",
    experience: "12+ Years Clinical Practice",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    bio: "Pioneering functional biochemistry and adaptogenic therapies in Bangladesh. Dr. Nadia specializes in adrenal fatigue, thyroid hormone balancing, and chronic metabolic syndrome reversal through bio-individual nutrition frameworks.",
    quote: "Chronic illness is not an inevitable fate; it is often a silent cellular cry for real, bioavailable nutrients and endocrine balance.",
  },
  {
    name: "Dr. Farhan Ahmed",
    role: "Clinical Herbalist & Gut Microbiome Researcher",
    specialization: "Ayurvedic Medicine & Gastrointestinal Permeability",
    credentials: "BAMS (Ayurvedic Medicine & Surgery) · Certified Herbal Pharmacognosist",
    experience: "10+ Years Practice",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    bio: "Specializing in gut-brain axis pharmacology, IBS, and mucosal re-epithelialization. Dr. Farhan blends classical Ayurvedic pulse & tongue diagnosis with modern stool microbiome spectrometry to restore compromised digestive tracts.",
    quote: "When the enteric lining heals, systemic neuro-inflammation settles, and clear mental energy naturally rebounds.",
  },
  {
    name: "Sadia Khan",
    role: "Sports Nutritionist & Wellness Coach",
    specialization: "Sports Performance, Fasting & Circadian Biology",
    credentials: "BSc Food & Nutrition · Certified Sports Nutrition Specialist (ISSN)",
    experience: "8+ Years Practice",
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
    bio: "Guiding high-performing executives, athletes, and busy professionals to peak metabolic stamina. Sadia designs circadian nutrition plans, intermittent fasting schedules, and electrolyte preservation regimens tailored to Bangladeshi lifestyle demands.",
    quote: "True peak performance does not depend on synthetic stimulants, but on synchronized circadian habits and mitochondrial vitality.",
  },
];

const CLINICAL_VALUES = [
  {
    title: "Root Cause Over Symptom Suppression",
    desc: "We do not mask discomfort with synthetic sedatives or acid inhibitors. We investigate biochemical markers and heal underlying cellular distress.",
  },
  {
    title: "100% Heavy-Metal Verified Purity",
    desc: "Every batch of Himalayan Shilajit and Ashwagandha is tested via ICP-MS spectrometry in accredited laboratories for zero lead, arsenic, or microbial toxins.",
  },
  {
    title: "Ancestral Wisdom, Modern Proof",
    desc: "We harmonize centuries-tested Ayurvedic traditions with modern randomized double-blind clinical literature and peer-reviewed pharmacology.",
  },
];

export function AboutPageClient() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [coaOpen, setCoaOpen] = useState(false);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAFBF8] min-h-screen text-[#14221A]">
      {/* ─── Hero Header ─── */}
      <section className="relative py-12 sm:py-20 bg-[#EEF2ED]/60 border-b border-[#B39868]/25 overflow-hidden">
        <div className="container-app relative z-10 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-body tracking-[0.2em] uppercase text-[#14221A]/60 mb-4">
            <Link href="/" className="hover:text-[#126336] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#126336] font-semibold">About Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#126336]/10 border border-[#126336]/25 text-[#126336] text-xs font-body tracking-[0.2em] uppercase font-semibold mb-6">
            <Award className="w-3.5 h-3.5 text-[#B39868]" />
            <span>Medical Team &amp; Botanical Standards</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light tracking-tight leading-[1.1] mb-6">
            The Art of Living <br />
            <span className="italic font-normal text-[#126336]">Without Medicine</span>
          </h1>

          <p className="font-body text-[#14221A]/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Dr Natures was founded to restore authentic botanical healing and certified functional nutrition in Bangladesh.
            We believe natural healthcare should be as rigorous, pure, and scientifically verified as any modern medical discipline.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="px-7 py-3 rounded-full bg-[#126336] hover:bg-[#14221A] text-white text-xs font-body tracking-[0.16em] uppercase font-semibold transition-all shadow-sm flex items-center gap-2"
            >
              <span>Consult Our Medical Team</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B39868]" />
            </Link>

            <button
              onClick={() => setCoaOpen(true)}
              className="px-6 py-3 rounded-full border border-[#B39868]/40 hover:border-[#126336] text-[#14221A] text-xs font-body tracking-[0.16em] uppercase font-medium transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#B39868]" />
              <span>Inspect Lab COA</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Medical Faculty & Practitioner Qualifications (User Diagram Highlight) ─── */}
      <section className="py-16 sm:py-24">
        <div className="container-app max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-body tracking-[0.25em] uppercase text-[#126336] font-semibold block mb-2">
              ✦ Clinical Faculty &amp; Qualifications
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#14221A] font-light">
              Meet the Physicians Behind <span className="italic text-[#126336]">Your Protocol</span>
            </h2>
            <p className="font-body text-[#14221A]/70 text-sm sm:text-base mt-3 leading-relaxed">
              Every dietary framework and adaptogen formulation is supervised by licensed clinical nutritionists,
              registered dietitians, and experienced herbal medicine practitioners.
            </p>
          </div>

          <div className="space-y-12">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-[#B39868]/30 p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow grid lg:grid-cols-12 gap-8 items-center"
              >
                {/* Doctor Portrait */}
                <div className="lg:col-span-4 relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#B39868]/30 shadow-md">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#126336] border border-[#B39868]/30 text-[10px] font-body tracking-wider uppercase font-semibold">
                      {member.experience}
                    </span>
                  </div>
                </div>

                {/* Doctor Credentials & Bio */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#126336] font-semibold">
                      ✦ {member.specialization}
                    </span>
                    <h3 className="font-editorial text-3xl text-[#14221A] font-medium">
                      {member.name}
                    </h3>
                    <p className="text-xs font-body text-[#B39868] font-medium">
                      {member.role}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EEF2ED] border border-[#B39868]/20 text-xs font-body text-[#14221A]/80">
                    <span className="font-semibold block text-[#14221A] mb-0.5">Qualifications &amp; Credentials:</span>
                    {member.credentials}
                  </div>

                  <p className="font-body text-[#14221A]/75 text-sm sm:text-base font-light leading-relaxed">
                    {member.bio}
                  </p>

                  <blockquote className="font-editorial text-base sm:text-lg italic text-[#126336] border-l-2 border-[#126336] pl-4 my-2">
                    &ldquo;{member.quote}&rdquo;
                  </blockquote>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href="/appointment"
                      className="px-6 py-2.5 rounded-full bg-[#126336] hover:bg-[#14221A] text-white text-xs font-body tracking-[0.16em] uppercase font-semibold transition-colors flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#B39868]" />
                      <span>Book Consultation with {member.name.split(" ")[1]}</span>
                    </Link>

                    <a
                      href={`https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20with%20${encodeURIComponent(
                        member.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full border border-emerald-600/30 bg-emerald-50 text-[#126336] text-xs font-body tracking-[0.14em] uppercase font-semibold hover:bg-emerald-100 transition-colors"
                    >
                      WhatsApp Desk
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Philosophy & Core Principles ─── */}
      <section className="py-16 sm:py-24 bg-[#EEF2ED]/60 border-t border-[#B39868]/25">
        <div className="container-app max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-body tracking-[0.25em] uppercase text-[#126336] font-semibold block mb-2">
              ✦ The Dr Natures Standard
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#14221A] font-light">
              Our Clinical <span className="italic text-[#126336]">Foundational Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CLINICAL_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="bg-white rounded-3xl border border-[#B39868]/30 p-8 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#126336]/10 text-[#126336] flex items-center justify-center font-editorial font-bold text-lg">
                  0{idx + 1}
                </div>
                <h4 className="font-editorial text-2xl text-[#14221A] font-semibold">
                  {val.title}
                </h4>
                <p className="font-body text-xs sm:text-sm text-[#14221A]/70 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Dhaka Flagship Location & Contact ─── */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#B39868]/20">
        <div className="container-app max-w-5xl">
          <div className="bg-[#FAFBF8] rounded-3xl border border-[#B39868]/35 p-8 sm:p-12 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-body tracking-[0.24em] uppercase text-[#126336] font-semibold block">
                ✦ Flagship Apothecary &amp; Consultation Suites
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#14221A] font-medium leading-tight">
                Visit Us in Banani, Dhaka
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#14221A]/70 leading-relaxed font-light">
                Experience our herbal dispensary in person. Meet our nutrition desk, test authentic botanical tinctures,
                and pick up freshly harvested Shilajit resin and cold-pressed Nigella sativa oils.
              </p>

              <div className="space-y-2.5 pt-2 text-xs font-body text-[#14221A]/80">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#B39868] shrink-0" />
                  <span>House 14, Road 11, Block D, Banani, Dhaka-1213</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#B39868] shrink-0" />
                  <span>Open Daily: 9:00 AM – 8:00 PM (Appointments Preferred)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B39868] shrink-0" />
                  <span>Hotline: +880 1700-000000</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="/appointment"
                className="w-full py-3.5 rounded-full bg-[#126336] hover:bg-[#14221A] text-white text-xs font-body tracking-[0.18em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 text-center shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#B39868]" />
                <span>Book In-Clinic Visit</span>
              </Link>

              <a
                href="https://wa.me/8801700000000?text=Hi%20Dr%20Natures%20Banani%20Clinic,%20I%20would%20like%20directions%20and%20clinic%20timings"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-emerald-600/40 bg-emerald-50 text-[#126336] text-xs font-body tracking-[0.16em] uppercase font-semibold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>WhatsApp Care Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lab COA Modal */}
      <LabCOAModal isOpen={coaOpen} onClose={() => setCoaOpen(false)} />
    </div>
  );
}
