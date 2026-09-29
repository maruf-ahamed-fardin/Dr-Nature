"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  protocol: string;
  metric: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Himalayan Shilajit and KSM-66 adaptogen stack completely reset my deep sleep latency and daytime cognitive endurance. In less than three weeks, the chronic brain fog that plagued my workday dissipated entirely. It is rare to find a Bangladeshi brand that upholds such uncompromising botanical purity.",
    name: "Dr. Tariqul Islam",
    role: "Clinical Researcher & Physician",
    location: "Gulshan, Dhaka",
    protocol: "Pure Shilajit Resin + KSM-66 Ashwagandha",
    metric: "Deep Sleep increased by 42%",
    rating: 5,
  },
  {
    quote:
      "After years of wrestling with persistent gut inflammation and irregular digestion, the 4-week personalized microbiome roadmap designed by Dr Natures was transformative. Dr. Nadia investigated my biochemical markers instead of just recommending superficial fixes. I finally feel light, grounded, and energetic.",
    name: "Farhana Chowdhury",
    role: "Architect & Educator",
    location: "Chittagong",
    protocol: "4-Week Custom Microbiome Protocol",
    metric: "8kg sustained healthy metabolic reset",
    rating: 5,
  },
  {
    quote:
      "Finding genuine, lab-certified Moringa Oleifera and Cold-Pressed Black Seed Oil in Bangladesh was nearly impossible until Dr Natures. The packaging feels like an ancient apothecary revived for modern life, and the third-party purity certificates give absolute peace of mind.",
    name: "Kazi Mahfuzur Rahman",
    role: "Tech Executive & Marathoner",
    location: "Sylhet",
    protocol: "Organic Moringa + Nigella Sativa Oil",
    metric: "Recovery biomarkers normalized in 14 days",
    rating: 5,
  },
];

export function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-36 bg-[#FAFBF8] border-t border-[#B39868]/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#EEF2ED]/70 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 max-w-5xl">
        {/* Section Header Eyebrow */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#B39868] font-medium inline-flex items-center gap-2">
            <span>✦</span>
            <span>Documented Transformations</span>
            <span>✦</span>
          </span>
        </div>

        {/* Editorial Testimonial Frame */}
        <div className="relative border border-[#B39868]/30 rounded-3xl p-6 sm:p-12 lg:p-16 bg-white/70 backdrop-blur-md shadow-[0_20px_60px_rgba(31,43,37,0.05)]">
          {/* Oversized Decorative Quotation Mark */}
          <div className="absolute top-4 left-5 sm:top-8 sm:left-12 font-editorial text-6xl sm:text-8xl lg:text-9xl text-[#B39868]/15 leading-none select-none pointer-events-none">
            “
          </div>

          {/* Testimonial Content Transition */}
          <div className="relative min-h-[340px] sm:min-h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Star rating & protocol badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B39868] text-[#B39868]" />
                    ))}
                    <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#1F2B25]/60 ml-2">
                      Verified Clinical Experience
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full border border-[#B39868]/30 bg-[#EEF2ED]/60 text-[9px] sm:text-[10px] font-body tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#1F2B25]/80">
                    {item.protocol}
                  </span>
                </div>

                {/* Editorial Quote */}
                <blockquote className="font-editorial text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#1F2B25] font-light italic leading-relaxed sm:leading-snug">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Patient Credentials & Verified Shift */}
                <div className="pt-6 border-t border-[#B39868]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h4 className="font-editorial text-xl sm:text-2xl text-[#1F2B25] font-normal leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#1F2B25]/60 font-body tracking-wider uppercase mt-1">
                      {item.role} · <span className="text-[#B39868]">{item.location}</span>
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EEF2ED] border border-[#B39868]/25 text-xs text-[#1F2B25] font-body font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#B39868]" />
                    <span>{item.metric}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-10 pt-6 border-t border-[#B39868]/15 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrent(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === idx ? "w-8 bg-[#B39868]" : "w-2 bg-[#B39868]/30 hover:bg-[#B39868]/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Hairline circle arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#B39868]/40 bg-white/80 hover:bg-[#1F2B25] hover:text-white hover:border-[#1F2B25] text-[#1F2B25] flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#B39868]/40 bg-white/80 hover:bg-[#1F2B25] hover:text-white hover:border-[#1F2B25] text-[#1F2B25] flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
