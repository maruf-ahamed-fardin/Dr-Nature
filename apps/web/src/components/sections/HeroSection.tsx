"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurText, FadeUp, ShimmerButton } from "@/components/ui/animations";

const HERO_PILLS = ["🌿 100% Natural", "✅ Lab Tested", "🚚 Fast Delivery", "⭐ 4.9/5 Rating"];

export function HeroSection() {
  return (
    <section className="hero-bg min-h-[92vh] flex items-center relative">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 bg-green-400 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/6 w-64 h-64 rounded-full opacity-8 bg-green-300 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-green-300 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              Bangladesh&apos;s #1 Natural Healthcare Platform
            </span>
          </motion.div>

          {/* Headline */}
          <BlurText
            text="A healthier life starts with informed choices."
            className="text-white font-bold text-balance block font-display"
            as="h1"
            delay={0.1}
          />

          <FadeUp delay={0.5} className="mt-5 mb-8">
            <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-xl">
              Discover lab-tested natural supplements, book expert nutrition consultations, 
              and access evidence-based wellness education — all in one place.
            </p>
          </FadeUp>

          {/* Pills */}
          <FadeUp delay={0.65} className="flex flex-wrap gap-2 mb-8">
            {HERO_PILLS.map((pill, i) => (
              <span
                key={pill}
                className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-medium"
              >
                {pill}
              </span>
            ))}
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.75} className="flex flex-col sm:flex-row gap-3">
            <ShimmerButton
              className="text-sm font-semibold px-7 py-3.5 rounded-xl"
              onClick={() => window.location.href = "/booking"}
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 ml-1 inline" />
            </ShimmerButton>

            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50" asChild>
              <Link href="/shop">
                Explore Products
              </Link>
            </Button>

            <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors sm:ml-2">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center border border-white/20 hover:bg-white/25 transition-colors">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
              Watch story
            </button>
          </FadeUp>
        </div>

        {/* Floating stats cards */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {[
            { value: "3,400+", label: "Happy customers", icon: "😊" },
            { value: "48", label: "Natural products", icon: "🌿" },
            { value: "4.9★", label: "Average rating", icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[180px]">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
