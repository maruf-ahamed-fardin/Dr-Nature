"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, ArrowUpRight, ShieldCheck, HeartPulse, Moon, Zap, Activity } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { BookingModal } from "@/components/booking/BookingModal";

interface QuizOption {
  id: string;
  label: string;
  desc: string;
  icon: any;
}

const GOAL_OPTIONS: QuizOption[] = [
  {
    id: "energy",
    label: "Cellular Energy & Stamina",
    desc: "Overcome persistent midday fatigue and boost mitochondrial ATP production naturally.",
    icon: Zap,
  },
  {
    id: "stress",
    label: "Stress Relief & Deep Restful Sleep",
    desc: "Balance elevated cortisol levels, quiet racing thoughts, and support REM sleep cycles.",
    icon: Moon,
  },
  {
    id: "gut",
    label: "Gut Microbiome & Digestion",
    desc: "Eliminate chronic bloating, optimize nutrient assimilation, and reseed beneficial microflora.",
    icon: Activity,
  },
  {
    id: "immunity",
    label: "Immune Shield & Longevity",
    desc: "Fortify cellular defense against urban environmental toxins and seasonal infections.",
    icon: HeartPulse,
  },
];

const PREFERENCE_OPTIONS: QuizOption[] = [
  {
    id: "resin",
    label: "Ancient Resins & Sublingual Extracts",
    desc: "Fastest bio-cellular absorption with raw mineral fulvic complexes.",
    icon: Sparkles,
  },
  {
    id: "capsule",
    label: "Standardized Daily Capsules",
    desc: "Precise milligram therapeutic dosage for effortless busy routines.",
    icon: ShieldCheck,
  },
  {
    id: "oil",
    label: "Cold-Pressed Superfood Oils & Powders",
    desc: "Whole-plant unadulterated botanical oils and organic nutrient powders.",
    icon: HeartPulse,
  },
];

export function RemedyQuizSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>("energy");
  const [selectedPreference, setSelectedPreference] = useState<string>("resin");
  const [bookingOpen, setBookingOpen] = useState(false);
  const { addItem, setIsOpen } = useCart();
  const [added, setAdded] = useState(false);

  // Determine recommendation based on choices
  let recommendedProduct = DEMO_PRODUCTS[1]; // default Shilajit
  let clinicalRationale = "Rich in 85+ ionic trace minerals and 74% active fulvic acid to catalyze intracellular ATP synthesis without caffeine jitters.";
  let protocolDosage = "Dissolve pea-sized portion (300mg-500mg) in warm pure water or raw milk every morning.";

  if (selectedGoal === "stress") {
    recommendedProduct = DEMO_PRODUCTS[0]; // Ashwagandha
    clinicalRationale = "Standardized KSM-66 extract proven in double-blind trials to reduce serum cortisol by up to 27.9% and modulate GABA-A neurotransmission.";
    protocolDosage = "Take 1 capsule (600mg) 30 minutes before sleep or with your evening nourishment.";
  } else if (selectedGoal === "gut") {
    recommendedProduct = DEMO_PRODUCTS[6]; // Probiotic
    clinicalRationale = "12 clinically documented strains with 50 billion CFU survival guarantee through gastric acid to repopulate the ileum and colon.";
    protocolDosage = "Take 1 capsule on an empty stomach 20 minutes prior to first morning meal.";
  } else if (selectedGoal === "immunity") {
    if (selectedPreference === "oil") {
      recommendedProduct = DEMO_PRODUCTS[4]; // Kalonji Black Seed Oil
      clinicalRationale = "First cold-press Nigella sativa yields over 2.4% thymoquinone to downregulate inflammatory cytokines and activate natural killer cells.";
      protocolDosage = "Ingest 1 teaspoon (5ml) directly or blend with raw honey each morning.";
    } else {
      recommendedProduct = DEMO_PRODUCTS[2]; // Moringa
      clinicalRationale = "Gently shade-dried organic Moringa leaves retaining 7x more Vitamin C than oranges and 4x more calcium than milk.";
      protocolDosage = "Mix 1 scoop (5g) into morning green smoothies, warm water, or fresh yogurt.";
    }
  }

  const handleAddRecommendation = () => {
    addItem(recommendedProduct, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsOpen(true);
    }, 500);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedGoal("energy");
    setSelectedPreference("resin");
  };

  return (
    <section id="quiz" className="py-16 sm:py-24 md:py-36 bg-[#14221A] text-[#FAFBF8] relative overflow-hidden">
      {/* Decorative botanical ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#B39868]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-[#EEF2ED]/5 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#B39868] font-medium inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span>✦</span>
            <span>Intelligent Formulation Matcher</span>
            <span>✦</span>
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-light leading-none">
            Find Your <span className="italic text-[#B39868]">Botanical Protocol</span>
          </h2>
          <p className="font-body text-[#FAFBF8]/70 text-xs sm:text-sm font-light mt-3 max-w-lg mx-auto">
            Answer two quick clinical questions to identify the exact adaptogen formulation tailored to your physiological constitution.
          </p>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? "w-10 bg-[#B39868]" : "w-4 bg-white/20"}`} />
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? "w-10 bg-[#B39868]" : "w-4 bg-white/20"}`} />
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? "w-10 bg-[#B39868]" : "w-4 bg-white/20"}`} />
          </div>
        </div>

        {/* Dynamic Card Steps */}
        <div className="bg-[#1F2B25]/80 border border-[#B39868]/35 rounded-3xl p-5 sm:p-10 backdrop-blur-md shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left mb-6">
                  <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868]">Question 01 of 02</span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-white font-light mt-1">
                    What is your primary wellness aspiration?
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {GOAL_OPTIONS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedGoal === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedGoal(item.id)}
                        className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                          isSelected
                            ? "bg-[#B39868]/15 border-[#B39868] shadow-[0_0_20px_rgba(179,152,104,0.15)]"
                            : "bg-white/5 border-white/10 hover:border-[#B39868]/50 hover:bg-white/10"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSelected ? "bg-[#B39868] text-[#14221A]" : "bg-white/10 text-[#B39868]"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-editorial text-lg text-white font-medium">{item.label}</h4>
                          <p className="text-xs text-[#FAFBF8]/60 font-body mt-1 font-light leading-relaxed">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 sm:pt-6 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B39868] text-[#14221A] text-xs font-body tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors"
                  >
                    <span>Proceed to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left mb-6">
                  <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868]">Question 02 of 02</span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-white font-light mt-1">
                    What format aligns best with your daily routine?
                  </h3>
                </div>

                <div className="grid gap-4">
                  {PREFERENCE_OPTIONS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedPreference === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedPreference(item.id)}
                        className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                          isSelected
                            ? "bg-[#B39868]/15 border-[#B39868] shadow-[0_0_20px_rgba(179,152,104,0.15)]"
                            : "bg-white/5 border-white/10 hover:border-[#B39868]/50 hover:bg-white/10"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSelected ? "bg-[#B39868] text-[#14221A]" : "bg-white/10 text-[#B39868]"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-editorial text-lg text-white font-medium">{item.label}</h4>
                          <p className="text-xs text-[#FAFBF8]/60 font-body mt-1 font-light leading-relaxed">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 sm:pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-body tracking-wider uppercase text-[#FAFBF8]/60 hover:text-white transition-colors py-2"
                  >
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B39868] text-[#14221A] text-xs font-body tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors"
                  >
                    <span>Calculate Botanical Match</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Result Eyebrow */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
                  <div>
                    <span className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] font-medium block">
                      ✦ Your Prescribed Clinical Remedy Match
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl text-white font-light">
                      Targeted Bioactive Protocol
                    </h3>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-[11px] font-body tracking-wider uppercase text-[#FAFBF8]/60 hover:text-[#B39868] transition-colors self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Matcher</span>
                  </button>
                </div>

                {/* Match Box */}
                <div className="grid md:grid-cols-12 gap-8 items-center bg-white/5 border border-[#B39868]/30 rounded-2xl p-6 sm:p-8">
                  {/* Product Visual */}
                  <div className="md:col-span-4 relative aspect-square rounded-xl overflow-hidden bg-[#FAFBF8] border border-[#B39868]/20">
                    <Image
                      src={recommendedProduct.images[0].url}
                      alt={recommendedProduct.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#14221A]/80 backdrop-blur-md text-[9px] font-body tracking-wider uppercase text-[#B39868] border border-[#B39868]/30">
                      98.4% Match
                    </div>
                  </div>

                  {/* Scientific Details */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868]">
                        {recommendedProduct.category.name}
                      </span>
                      <h4 className="font-editorial text-2xl sm:text-3xl text-white font-light">
                        {recommendedProduct.name}
                      </h4>
                      <p className="text-xl font-editorial text-[#B39868] mt-1">
                        ৳{parseFloat(recommendedProduct.price).toLocaleString()} BDT
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-body space-y-1.5">
                      <strong className="text-[#B39868] block uppercase text-[10px] tracking-wider">
                        Clinical Bio-Mechanism:
                      </strong>
                      <p className="text-[#FAFBF8]/80 leading-relaxed font-light">
                        {clinicalRationale}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-body space-y-1.5">
                      <strong className="text-[#B39868] block uppercase text-[10px] tracking-wider">
                        Recommended Daily Dosage:
                      </strong>
                      <p className="text-[#FAFBF8]/80 leading-relaxed font-light">
                        {protocolDosage}
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={handleAddRecommendation}
                        className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-body tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                          added
                            ? "bg-white text-[#14221A]"
                            : "bg-[#B39868] text-[#14221A] hover:bg-white shadow-lg"
                        }`}
                      >
                        {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 stroke-[1.8]" />}
                        <span>{added ? "Added to Bag" : "Add Protocol to Bag"}</span>
                      </button>

                      <button
                        onClick={() => setBookingOpen(true)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#B39868]/60 bg-transparent hover:bg-white/10 text-white text-xs font-body tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Discuss with Nutritionist</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868]" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
