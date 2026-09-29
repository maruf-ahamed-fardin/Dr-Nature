"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";
import {
  UserCheck,
  Video,
  ShieldCheck,
  Check,
  CheckCircle2,
  Building2,
  ArrowUpRight,
  Sparkles,
  Mic,
  Maximize2,
  Lock,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

interface StepItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof UserCheck;
}

const STEPS: StepItem[] = [
  {
    step: "STEP 01",
    title: "Find a clinical dietitian",
    subtitle: "Select your functional medicine practitioner",
    description:
      "Choose from licensed clinical nutritionists and functional medicine specialists based on your health goals — metabolic balance, gut health, hormonal equilibrium, or therapeutic fasting.",
    icon: UserCheck,
  },
  {
    step: "STEP 02",
    title: "Meet online or in-person",
    subtitle: "Encrypted HD video or Banani clinic",
    description:
      "Connect from the comfort of home via secure video call with direct lab report review, or visit our serene flagship apothecary clinic on Road 11, Banani, Dhaka.",
    icon: Video,
  },
  {
    step: "STEP 03",
    title: "Bespoke protocol & guarantee",
    subtitle: "100% transparent clinical care",
    description:
      "Receive a bio-individual nutrition plan, milligram-precise adaptogen dosages, and a 7-day post-consultation inquiry window with Dr. Natures clinical satisfaction guarantee.",
    icon: ShieldCheck,
  },
];

export function CareProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"video" | "clinic">("video");
  const [selectedSlot, setSelectedSlot] = useState("04:30 PM");

  // Track scroll position within this scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for fluid line movement without jumping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Continuous height for the vertical timeline line
  const progressHeight = useTransform(smoothProgress, [0, 0.45, 0.9], ["25%", "65%", "100%"]);

  // Switch step dynamically with clean thresholds
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      if (activeStep !== 0) setActiveStep(0);
    } else if (latest < 0.67) {
      if (activeStep !== 1) setActiveStep(1);
    } else {
      if (activeStep !== 2) setActiveStep(2);
    }
  });

  // Smooth scroll when a user clicks a specific step or dock icon
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const targetRatio = index === 0 ? 0.12 : index === 1 ? 0.50 : 0.88;
        window.scrollTo({
          top: scrollTop + scrollableDistance * targetRatio,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="how-it-works"
      className="relative h-[240vh] sm:h-[270vh] bg-[#FAFBF8] border-t border-[#B39868]/20"
    >
      {/* ─── Sticky Viewport Container ─── */}
      <div className="sticky top-14 sm:top-18 lg:top-20 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden">
        {/* Subtle Atmospheric Gradients */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#EEF2ED]/60 blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-[#FAF5EE]/70 blur-3xl pointer-events-none -z-0" />

        <div className="container-app relative z-10 w-full py-4 sm:py-6 lg:py-8 max-h-full overflow-y-auto lg:overflow-visible">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8 lg:mb-10">
            <span className="text-[9.5px] sm:text-[11px] font-body tracking-[0.24em] uppercase text-[#B39868] font-semibold block mb-1.5 sm:mb-2">
              ✦ SEAMLESS CLINICAL CARE
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#14221A] font-light leading-tight tracking-tight">
              Care that <span className="italic font-light text-[#B39868]">starts today</span>
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-1.5 sm:mt-2 max-w-lg mx-auto">
              Book an appointment with a verified functional dietitian in less than 3 minutes.
            </p>
          </div>

          {/* Two-Column Process Layout */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Vertical Interactive Step Timeline */}
            <div className="lg:col-span-5 relative">
              {/* Continuous Vertical Connecting Track */}
              <div className="absolute left-[15px] sm:left-[19px] top-6 bottom-6 w-[2px] bg-[#B39868]/20 rounded-full overflow-hidden">
                {/* Smooth fluid fill line bound to scroll */}
                <motion.div
                  className="w-full bg-[#126336] rounded-full origin-top"
                  style={{ height: progressHeight }}
                />
              </div>

              <div className="space-y-4 sm:space-y-6 relative">
                {STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const IconComponent = step.icon;

                  return (
                    <div
                      key={step.step}
                      onClick={() => handleStepClick(idx)}
                      className={`group cursor-pointer relative pl-10 sm:pl-12 transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-55 hover:opacity-85"
                      }`}
                    >
                      {/* Node Dot on Timeline */}
                      <div
                        className={`absolute left-0 top-0.5 sm:top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#126336] text-white shadow-[0_4px_14px_rgba(18,99,54,0.35)] scale-105 ring-4 ring-[#126336]/15"
                            : "bg-white border border-[#B39868]/40 text-[#14221A]/70 group-hover:border-[#B39868]"
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                      </div>

                      {/* Step Content */}
                      <div className="pt-0.5">
                        <span
                          className={`text-[9px] sm:text-[10px] font-body tracking-[0.2em] uppercase font-bold block mb-0.5 sm:mb-1 transition-colors ${
                            isActive ? "text-[#126336]" : "text-[#B39868]"
                          }`}
                        >
                          {step.step}
                        </span>

                        <h3
                          className={`font-editorial text-lg sm:text-2xl font-medium tracking-tight transition-colors ${
                            isActive ? "text-[#14221A]" : "text-[#14221A]/80"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Expandable Description */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            isActive ? "max-h-36 opacity-100 mt-1.5 sm:mt-2" : "max-h-0 opacity-0 mt-0"
                          }`}
                        >
                          <p className="font-body text-[#14221A]/75 text-xs sm:text-sm font-light leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Action Button under timeline */}
              <div className="pt-4 sm:pt-6 pl-10 sm:pl-12">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#14221A] text-white text-[11px] sm:text-xs font-body tracking-[0.18em] uppercase font-medium hover:bg-[#126336] transition-all shadow-[0_6px_20px_rgba(20,34,26,0.12)] group"
                >
                  <span>Book Appointment Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Visual Stage Container */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-[#B39868]/35 bg-gradient-to-br from-[#E8EEF5]/75 via-[#EEF2ED] to-[#E3EAE4] p-4 sm:p-6 lg:p-8 shadow-[0_20px_50px_rgba(20,34,26,0.08)] min-h-[460px] sm:min-h-[510px] flex flex-col justify-between items-center overflow-hidden">
                {/* Soft decorative background circles */}
                <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-[#FAFBF8]/80 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-[#D8E2DC]/50 blur-2xl pointer-events-none" />

                {/* ─── Stacked Crossfade Cards Container (CSS Grid for zero layout shift & seamless crossfade) ─── */}
                <div className="w-full max-w-[440px] my-auto grid grid-cols-1 grid-rows-1 items-center justify-items-center relative z-10">
                  {/* ─── STAGE 1: Specialist Selection Card ─── */}
                  <motion.div
                    className="col-start-1 row-start-1 w-full"
                    initial={false}
                    animate={{
                      opacity: activeStep === 0 ? 1 : 0,
                      y: activeStep === 0 ? 0 : activeStep > 0 ? -12 : 12,
                      scale: activeStep === 0 ? 1 : 0.96,
                      pointerEvents: activeStep === 0 ? "auto" : "none",
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="rounded-3xl bg-[#FAFBF8]/95 backdrop-blur-xl border border-[#B39868]/45 p-4 sm:p-6 shadow-[0_16px_40px_rgba(20,34,26,0.12)] text-left space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#126336]/10 text-[#126336] text-[10px] font-body tracking-[0.16em] uppercase font-bold">
                          <Sparkles className="w-3 h-3 text-[#B39868]" />
                          <span>Matched Dietitian</span>
                        </span>
                        <span className="text-[10px] sm:text-[10.5px] font-body text-[#126336] font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#126336] animate-pulse" />
                          <span>Available Today</span>
                        </span>
                      </div>

                      {/* Doctor Profile Banner */}
                      <div className="flex items-start gap-3.5 pt-1">
                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-[#B39868]/40 shrink-0 shadow-sm">
                          <Image
                            src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80"
                            alt="Dr. Nadia Islam - Clinical Dietitian"
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-editorial text-lg sm:text-xl text-[#14221A] font-bold leading-tight">
                              Dr. Nadia Islam
                            </h4>
                            <Award className="w-3.5 h-3.5 text-[#B39868] shrink-0" />
                          </div>
                          <p className="text-[11px] sm:text-xs font-body text-[#126336] font-medium leading-snug mt-0.5">
                            Lead Clinical Nutritionist &amp; Dietitian
                          </p>
                          <p className="text-[10px] font-body text-[#14221A]/60 mt-0.5">
                            M.Sc (Nutr), PGD Functional Medicine
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-[10.5px] font-body text-[#14221A]/70">
                            <span className="text-[#B39868] font-bold">★ 4.95 (1,240+)</span>
                            <span>•</span>
                            <span>12+ Yrs Exp</span>
                          </div>
                        </div>
                      </div>

                      {/* Clinical Focus Badges */}
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#14221A]/60 font-semibold block mb-1">
                          Clinical Expertise:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {["Metabolic Health", "PCOS & Hormones", "Gut Protocol", "Therapeutic Fasting"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full bg-white border border-[#B39868]/30 text-[9.5px] sm:text-[10px] font-body text-[#14221A]/85 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Diagnostic Fee Bar */}
                      <div className="pt-2.5 border-t border-[#B39868]/20 flex items-center justify-between text-xs font-body">
                        <div>
                          <span className="text-[#14221A]/70 text-[10.5px] sm:text-[11px] block">Initial Diagnostic Session</span>
                          <span className="text-[9.5px] text-[#126336] font-medium">Includes 7-day diet chart</span>
                        </div>
                        <span className="font-editorial text-lg sm:text-xl font-bold text-[#126336]">
                          ৳800 <span className="text-[10px] font-body font-normal text-[#14221A]/60">/ 45 min</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ─── STAGE 2: Format & Slot Picker with Live Imagery (User's Point of Focus) ─── */}
                  <motion.div
                    className="col-start-1 row-start-1 w-full"
                    initial={false}
                    animate={{
                      opacity: activeStep === 1 ? 1 : 0,
                      y: activeStep === 1 ? 0 : activeStep > 1 ? -12 : 12,
                      scale: activeStep === 1 ? 1 : 0.96,
                      pointerEvents: activeStep === 1 ? "auto" : "none",
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="rounded-3xl bg-[#FAFBF8]/95 backdrop-blur-xl border border-[#B39868]/45 p-4 sm:p-5 shadow-[0_16px_40px_rgba(20,34,26,0.12)] text-left space-y-3">
                      {/* Step Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] sm:text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868] font-bold">
                          Step 2 · Consultation Mode
                        </span>
                        <span className="text-[9.5px] sm:text-[10px] font-body text-[#14221A]/60 font-medium">
                          Today, Oct 24
                        </span>
                      </div>

                      {/* Format Toggle */}
                      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#EEF2ED]/80 border border-[#B39868]/25">
                        <button
                          onClick={() => setSelectedFormat("video")}
                          className={`py-1.5 px-2 rounded-xl text-xs font-body font-medium flex items-center justify-center gap-1.5 transition-all ${
                            selectedFormat === "video"
                              ? "bg-white text-[#126336] shadow-sm font-semibold"
                              : "text-[#14221A]/70 hover:text-[#14221A]"
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>HD Video Call</span>
                        </button>
                        <button
                          onClick={() => setSelectedFormat("clinic")}
                          className={`py-1.5 px-2 rounded-xl text-xs font-body font-medium flex items-center justify-center gap-1.5 transition-all ${
                            selectedFormat === "clinic"
                              ? "bg-white text-[#126336] shadow-sm font-semibold"
                              : "text-[#14221A]/70 hover:text-[#14221A]"
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Banani Clinic</span>
                        </button>
                      </div>

                      {/* ─── LIVE CONSULTATION VISUAL PREVIEW BANNER (NEW RICH IMAGE) ─── */}
                      <div className="relative h-28 sm:h-32 w-full rounded-2xl overflow-hidden border border-[#B39868]/30 shadow-inner group">
                        {selectedFormat === "video" ? (
                          <>
                            <Image
                              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                              alt="Encrypted HD Telehealth Video Consultation"
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Dark gradient overlay for contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#14221A]/85 via-[#14221A]/35 to-transparent" />

                            {/* Top Badges */}
                            <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-body text-white">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#126336]/90 backdrop-blur-md font-semibold tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                1080p Telehealth
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md">
                                <Lock className="w-2.5 h-2.5 text-[#B39868]" />
                                Encrypted
                              </span>
                            </div>

                            {/* Bottom Controls Overlay */}
                            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-body">
                              <div>
                                <span className="font-semibold block leading-tight">Dr. Nadia Islam</span>
                                <span className="text-[9px] text-[#FAFBF8]/80">Lab report live review ready</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                                <Mic className="w-3 h-3 text-white" />
                                <Video className="w-3 h-3 text-white" />
                                <Maximize2 className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <Image
                              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                              alt="Dr Natures Banani Flagship Apothecary Suite"
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#14221A]/85 via-[#14221A]/35 to-transparent" />

                            {/* Top Badges */}
                            <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-body text-white">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B39868]/90 backdrop-blur-md font-semibold tracking-wider uppercase">
                                <MapPin className="w-2.5 h-2.5 text-white" />
                                Road 11, Banani
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md">
                                Suite #4B, Dhaka
                              </span>
                            </div>

                            {/* Bottom Location Info */}
                            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-body">
                              <div>
                                <span className="font-semibold block leading-tight">Dr. Natures Apothecary Lounge</span>
                                <span className="text-[9px] text-[#FAFBF8]/80">Complimentary herbal infusion included</span>
                              </div>
                              <span className="text-[9.5px] font-medium text-[#B39868] bg-black/40 px-2 py-0.5 rounded-md">
                                In-Person
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Slot Grid */}
                      <div>
                        <span className="text-[9.5px] sm:text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/60 block mb-1 font-medium">
                          Select Preferred Time Slot:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {["11:00 AM", "02:30 PM", "04:30 PM", "06:00 PM", "07:30 PM", "08:30 PM"].map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-1.5 px-2 rounded-xl text-[10.5px] sm:text-[11px] font-body transition-all border ${
                                  isSelected
                                    ? "bg-[#126336] text-white border-[#126336] font-semibold shadow-sm"
                                    : "bg-white/80 border-[#B39868]/30 text-[#14221A]/80 hover:border-[#126336]"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-0.5 text-[10px] sm:text-[10.5px] font-body text-[#126336] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#126336] shrink-0" />
                        <span>Instant calendar invite sent with WhatsApp reminder</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ─── STAGE 3: Price Guarantee & Care Coverage (Echoing Reference Card) ─── */}
                  <motion.div
                    className="col-start-1 row-start-1 w-full"
                    initial={false}
                    animate={{
                      opacity: activeStep === 2 ? 1 : 0,
                      y: activeStep === 2 ? 0 : 12,
                      scale: activeStep === 2 ? 1 : 0.96,
                      pointerEvents: activeStep === 2 ? "auto" : "none",
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="rounded-3xl bg-[#FAFBF8]/95 backdrop-blur-xl border border-[#B39868]/45 p-5 sm:p-7 shadow-[0_20px_50px_rgba(20,34,26,0.14)] text-center space-y-3.5 relative overflow-hidden">
                      {/* Botanical Crest Watermark in background */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-8 border-[#B39868]/10 pointer-events-none" />

                      {/* Top Checkmark Badge */}
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#126336] to-[#14221A] text-white shadow-[0_8px_20px_rgba(18,99,54,0.3)] mx-auto">
                        <Check className="w-6 h-6 stroke-[2.5]" />
                      </div>

                      <div>
                        <span className="text-[10px] sm:text-[11px] font-body tracking-[0.2em] uppercase text-[#126336] font-bold block mb-1">
                          Care Guarantee
                        </span>
                        <h4 className="font-editorial text-2xl sm:text-3xl text-[#14221A] font-bold leading-tight">
                          You&apos;re in expert hands
                        </h4>
                      </div>

                      {/* Giant Price Point */}
                      <div className="py-1 flex flex-col items-center">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="font-editorial text-3xl sm:text-4xl text-[#B39868] font-light">৳</span>
                          <span className="font-editorial text-5xl sm:text-6xl font-light text-[#14221A] leading-none">0</span>
                        </div>
                        <span className="block text-[10.5px] sm:text-xs font-body text-[#14221A]/70 uppercase tracking-widest mt-1 font-medium">
                          Hidden Consultation Fees
                        </span>
                      </div>

                      {/* Guarantee Capsule Pill */}
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#126336]/10 border border-[#126336]/30 text-[#126336] text-[11px] sm:text-xs font-body font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Dr. Natures Quality Guarantee</span>
                      </div>

                      <p className="text-[10.5px] sm:text-[11px] font-body text-[#14221A]/75 font-light leading-snug max-w-xs mx-auto pt-0.5">
                        If you are not 100% satisfied with your dietary assessment and practitioner guidance, we reschedule a follow-up at zero charge.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Floating Control Dock (3 Icons like the reference design) */}
                <div className="relative z-10 mt-3 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#B39868]/40 shadow-md flex items-center gap-1">
                  {STEPS.map((s, i) => {
                    const IconComp = s.icon;
                    const isCur = activeStep === i;
                    return (
                      <button
                        key={s.step}
                        onClick={() => handleStepClick(i)}
                        title={s.title}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                          isCur
                            ? "bg-[#126336] text-white shadow-sm scale-105"
                            : "text-[#14221A]/60 hover:text-[#126336] hover:bg-[#EEF2ED]"
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    );
                  })}
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
    </div>
  );
}
