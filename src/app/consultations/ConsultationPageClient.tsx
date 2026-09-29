"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageSquare,
  FileText,
  UserCheck,
  Stethoscope,
  HeartPulse,
  Activity,
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";
import { RemedyQuizSection } from "@/components/sections/RemedyQuizSection";

const CLINICAL_SERVICES = [
  {
    number: "01",
    id: 0,
    title: "Private Tele-Nutrition Consultation",
    category: "Virtual Encrypted Clinical Care",
    badge: "Most Popular",
    fee: "৳800",
    duration: "45 Minutes",
    format: "HD Video Call",
    idealFor: "Busy professionals, remote clients outside Dhaka, and initial dietary assessments.",
    features: [
      "In-depth 45-minute clinical diagnostic with a licensed functional nutritionist",
      "Comprehensive review of recent medical history, lab reports & symptom timeline",
      "Personalized adaptogen regimen with exact milligram dosages & bio-timing",
      "Bio-individual dietary recommendations tailored to your daily schedule",
      "7-day post-consultation inquiry window via encrypted WhatsApp",
    ],
  },
  {
    number: "02",
    id: 1,
    title: "In-Clinic Functional Assessment",
    category: "Direct In-Person Diagnostic Care",
    badge: "Dhaka Flagship",
    fee: "৳1,500",
    duration: "60 Minutes",
    format: "Banani, Dhaka Clinic",
    idealFor: "Patients seeking physical diagnostic mapping, metabolic analysis, and hands-on guidance.",
    features: [
      "Face-to-face 60-minute diagnostic session at our Banani flagship clinic",
      "Advanced body composition mapping & visceral metabolic screening",
      "Traditional tongue & pulse examination integrated with modern clinical pathology",
      "Bespoke herbal adaptogen formulation freshly customized from our apothecary",
      "Direct follow-up consultation scheduling and priority lab assay review",
    ],
  },
  {
    number: "03",
    id: 2,
    title: "4-Week Custom Microbiome & Diet Protocol",
    category: "Comprehensive Health Restoration",
    badge: "Clinically Proven",
    fee: "৳2,500",
    duration: "28 Days Continuous",
    format: "Hybrid (In-Clinic & Virtual)",
    idealFor: "Chronic bloating, IBS, autoimmune inflammation, persistent fatigue, and metabolic reset.",
    features: [
      "Two dedicated one-on-one consultations (Week 1 diagnostic + Week 4 progress review)",
      "Custom 28-day gut restoration dietary roadmap with weekly recipe guides",
      "Targeted probiotic, adaptogen & cold-pressed botanical oil daily regimen",
      "Daily WhatsApp practitioner care and real-time meal digestion feedback",
      "Post-protocol biomarker evaluation and long-term maintenance guidelines",
    ],
  },
  {
    number: "04",
    id: 3,
    title: "Corporate Vitality & Executive Health Audit",
    category: "Institutional & Leadership Wellness",
    fee: "Bespoke",
    duration: "Multi-Session",
    format: "On-Site / Corporate Suite",
    idealFor: "Corporate leadership teams, enterprises, and high-performance executive organizations.",
    features: [
      "Comprehensive executive stress-resilience & adrenal health audit",
      "Biochemical vitality screenings and ergonomic nutritional workshops",
      "Corporate adaptogen wellness bar setup and seasonal preventative kits",
      "1-on-1 confidential tele-nutrition sessions for management teams",
      "Documented health impact metrics and workplace stamina reports",
    ],
  },
];

const CLINICAL_PROCESS = [
  {
    step: "01",
    title: "Confidential Clinical Intake",
    desc: "Complete our secure pre-consultation health questionnaire detailing your health history, symptoms, daily nutrition, and recent laboratory test markers.",
  },
  {
    step: "02",
    title: "Diagnostic Investigation",
    desc: "Your dedicated clinical nutritionist analyzes underlying biochemical imbalances—investigating gut microflora, cortisol rhythms, and nutritional deficiencies.",
  },
  {
    step: "03",
    title: "Bespoke Protocol Creation",
    desc: "Receive your tailored clinical roadmap: exact therapeutic dosages of lab-verified adaptogens, functional meals, and circadian lifestyle adjustments.",
  },
  {
    step: "04",
    title: "Continuous WhatsApp Guidance",
    desc: "We monitor your physiological response throughout your journey. Your nutritionist remains directly accessible via WhatsApp for ongoing questions.",
  },
];

const NUTRITIONISTS = [
  {
    name: "Dr. Nadia Rahman, MSc",
    role: "Lead Functional Nutritionist",
    specialty: "Gut Microbiome & Chronic Fatigue Reversal",
    experience: "12+ Years Clinical Practice",
    credentials: "MSc Clinical Nutrition (DU) · Certified Functional Medicine Practitioner (IFM)",
    image: "https://images.unsplash.com/photo-1594824813583-0570b556b107?w=600&q=80",
    bio: "Specializing in resolving intractable gastrointestinal disorders, metabolic syndrome, and cellular fatigue through evidence-based dietary biochemistry and ancestral botanicals.",
  },
  {
    name: "Dr. Asif Mahmud, MD",
    role: "Clinical Adaptogen Specialist",
    specialty: "Hormonal Balance & Cardiovascular Vitality",
    experience: "10+ Years Practice",
    credentials: "MD Integrative Health · Certified Phytotherapy Specialist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
    bio: "Pioneering therapeutic applications of high-altitude Himalayan Shilajit, KSM-66 Ashwagandha, and clinical botanicals to modulate neuro-endocrine stress axes.",
  },
  {
    name: "Dr. Rubina Yasmin, BAMS",
    role: "Ayurvedic Medicine Consultant",
    specialty: "Ancestral Phytotherapy & Metabolic Detoxification",
    experience: "14+ Years Practice",
    credentials: "BAMS Ayurvedic Medicine & Surgery · Certified Nutritionist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    bio: "Integrating traditional pulse, tongue, and bio-constitutional analysis with modern laboratory spectrometry to tailor synergistic botanical therapeutics.",
  },
];

const CONSULTATION_FAQS = [
  {
    q: "How should I prepare for my first clinical consultation?",
    a: "Please gather any recent blood work or medical test reports from the past 6 to 12 months (e.g. CBC, Lipid Profile, Thyroid Panel, Vitamin D). Having a list of current medications and supplements will help our nutritionist formulate the safest, most synergistic protocol.",
  },
  {
    q: "Can I do the consultation online if I live outside Dhaka?",
    a: "Yes, our Private Tele-Nutrition Consultation is conducted over encrypted HD video via WhatsApp or Google Meet. We consult with clients across all 64 districts in Bangladesh as well as expatriates worldwide.",
  },
  {
    q: "Are the prescribed adaptogens included in the consultation fee?",
    a: "The consultation fee covers your doctor's diagnostic evaluation, protocol design, dietary framework, and 7-day direct WhatsApp follow-up. Any recommended small-batch adaptogens from our apothecary are purchased separately with express delivery to your doorstep.",
  },
  {
    q: "How quickly can I expect to feel improvements?",
    a: "While acute symptoms like midday energy crashes often improve within 7 to 10 days, deep microbiome restoration, thyroid balancing, and metabolic resets typically require 3 to 4 weeks of consistent protocol adherence.",
  },
];

export function ConsultationPageClient({
  consultants,
}: {
  consultants?: any[];
} = {}) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  const handleBook = (index: number) => {
    setSelectedServiceIndex(index);
    setBookingOpen(true);
  };

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
            <span className="text-[#14221A] font-semibold">Clinical Services</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#14221A] leading-[1.05] tracking-tight">
            Personalized Guidance, <br />
            <span className="italic text-[#B39868]">Rooted in Biochemistry.</span>
          </h1>

          <p className="font-body text-[#14221A]/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mt-4 sm:mt-6">
            Every body possesses a unique metabolic signature. Our licensed clinical nutritionists craft bio-individual adaptogenic therapies and dietary roadmaps to reverse chronic imbalances and restore lasting physiological harmony.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => handleBook(0)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase font-semibold hover:bg-[#B39868] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#B39868]" />
              <span>Schedule Direct Consultation</span>
            </button>

            <a
              href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20have%20an%20inquiry%20regarding%20consultations"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-emerald-600/40 bg-emerald-50 text-[#126336] text-xs font-body tracking-[0.18em] uppercase font-semibold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask via WhatsApp</span>
            </a>
          </div>

          {/* Hairline trust markers */}
          <div className="pt-10 mt-10 border-t border-[#B39868]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[10.5px] font-body tracking-[0.16em] uppercase text-[#14221A]/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B39868]" />
              <span>Licensed Clinical Practitioners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B39868]" />
              <span>3,400+ Patients Restored</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B39868]" />
              <span>7-Day WhatsApp Support Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4 Step Clinical Care Process ─── */}
      <section className="py-16 sm:py-24 bg-[#FAFBF8] border-b border-[#B39868]/20">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] uppercase text-[#B39868] font-medium block mb-2">
              ✦ The Consultation Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#14221A] font-light leading-tight">
              How Our Clinical Process Works
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-3">
              A methodical, unhurried healthcare framework designed around your physiology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINICAL_PROCESS.map((proc) => (
              <div
                key={proc.step}
                className="p-6 rounded-2xl border border-[#B39868]/25 bg-white shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="font-editorial text-4xl text-[#B39868] italic font-light block mb-2">
                    {proc.step}
                  </span>
                  <h3 className="font-editorial text-xl text-[#14221A] font-medium mb-2">
                    {proc.title}
                  </h3>
                  <p className="font-body text-xs text-[#14221A]/70 leading-relaxed font-light">
                    {proc.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#B39868]/15 flex items-center gap-1.5 text-[9.5px] font-body text-[#126336] uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Clinical Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Detailed Service Packages ─── */}
      <section id="packages" className="py-16 sm:py-24 bg-[#EEF2ED]/40 border-b border-[#B39868]/20">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] uppercase text-[#B39868] font-medium block mb-2">
              ✦ Dedicated Care Packages
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#14221A] font-light leading-tight">
              Select Your Consultation Format
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-3">
              Clear, transparent consultation pricing with zero hidden costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CLINICAL_SERVICES.map((srv) => (
              <div
                key={srv.number}
                className="p-6 sm:p-8 rounded-3xl border border-[#B39868]/35 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#B39868]/20 mb-4">
                    <span className="font-editorial text-3xl text-[#B39868] italic">
                      {srv.number}
                    </span>
                    {srv.badge && (
                      <span className="px-3 py-1 rounded-full bg-[#14221A] text-white text-[9px] font-body tracking-wider uppercase font-semibold">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-body tracking-[0.22em] uppercase text-[#B39868] font-semibold block mb-1">
                    {srv.category}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#14221A] font-light mb-2">
                    {srv.title}
                  </h3>

                  <div className="flex items-baseline gap-3 my-4">
                    <span className="font-editorial text-4xl text-[#14221A] font-light">
                      {srv.fee}
                    </span>
                    <span className="text-xs font-body text-[#14221A]/60">
                      / {srv.duration}
                    </span>
                  </div>

                  <p className="text-xs text-[#14221A]/75 font-body leading-relaxed mb-6 font-light">
                    <strong>Best for:</strong> {srv.idealFor}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#B39868]/20 mb-8">
                    <span className="text-[10px] font-body tracking-wider uppercase text-[#14221A]/60 font-semibold block">
                      What&apos;s Included:
                    </span>
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-body text-[#14221A]/80 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#126336] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBook(srv.id)}
                  className="w-full py-3.5 rounded-full bg-[#14221A] hover:bg-[#B39868] text-white text-xs font-body tracking-[0.2em] uppercase font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B39868]" />
                  <span>Book This Consultation</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Nutritionist Panel ─── */}
      <section className="py-16 sm:py-24 bg-[#FAFBF8] border-b border-[#B39868]/20">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] uppercase text-[#B39868] font-medium block mb-2">
              ✦ Certified Practitioners
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#14221A] font-light leading-tight">
              Our Clinical Nutritionist Panel
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-3">
              Led by certified clinicians dedicated to root-cause functional medicine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {NUTRITIONISTS.map((doc) => (
              <div
                key={doc.name}
                className="rounded-3xl border border-[#B39868]/30 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EEF2ED] mb-5 border border-[#B39868]/20">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-[#14221A]/90 backdrop-blur-md text-white text-[9.5px] font-body tracking-wider uppercase">
                      {doc.experience}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-[#14221A] font-light">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-[#B39868] font-body tracking-wider uppercase font-medium mt-0.5">
                    {doc.role}
                  </p>

                  <div className="p-3 rounded-xl bg-[#EEF2ED]/60 border border-[#B39868]/20 text-[11px] font-body text-[#14221A]/75 mt-3 space-y-1">
                    <strong className="text-[#14221A] block">Credentials & Specialty:</strong>
                    <p>{doc.credentials}</p>
                    <p className="text-[#126336] font-medium">{doc.specialty}</p>
                  </div>

                  <p className="text-xs text-[#14221A]/70 font-body leading-relaxed font-light mt-3">
                    {doc.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B39868]/15 mt-5">
                  <button
                    onClick={() => handleBook(0)}
                    className="w-full py-2.5 rounded-full border border-[#B39868] hover:bg-[#14221A] hover:text-white text-[#14221A] text-xs font-body tracking-[0.18em] uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request Session with Doctor</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Interactive Remedy Quiz Section Embedded ─── */}
      <RemedyQuizSection />

      {/* ─── Consultation FAQs ─── */}
      <section className="py-16 sm:py-24 bg-[#EEF2ED]/50 border-t border-[#B39868]/20">
        <div className="container-app max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] uppercase text-[#B39868] font-medium block mb-2">
              ✦ Patient Inquiries
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#14221A] font-light">
              Consultation FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {CONSULTATION_FAQS.map((faq, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#B39868]/25 shadow-sm"
              >
                <h4 className="font-editorial text-xl text-[#14221A] font-normal mb-2">
                  {faq.q}
                </h4>
                <p className="font-body text-xs sm:text-sm text-[#14221A]/75 leading-relaxed font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultServiceIndex={selectedServiceIndex}
      />
    </div>
  );
}
