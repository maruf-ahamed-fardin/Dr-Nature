"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PHILOSOPHY_PARAGRAPH =
  "We believe healthcare should never begin with a symptom suppressor, but with the soil. Grounded in timeless botanical wisdom and verified by modern clinical biochemistry, Dr Natures formulates pure, heavy-metal tested adaptogens and bespoke functional protocols that awaken your body's innate ability to heal from within.";

export function PhilosophySection() {
  const words = PHILOSOPHY_PARAGRAPH.split(" ");

  return (
    <section id="manifesto" className="py-28 md:py-36 bg-[#FAFBF8] relative overflow-hidden">
      {/* Delicate background ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#EEF2ED]/60 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10 max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium inline-flex items-center gap-2">
            <span>✦</span>
            <span>The Apothecary Manifesto</span>
            <span>✦</span>
          </span>
        </motion.div>

        {/* Scroll-revealed / highlighted paragraph */}
        <div className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-light leading-[1.3] text-[#1F2B25] text-balance">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0.2, filter: "blur(2px)", y: 6 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.018,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Signature & Provenance line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 pt-8 border-t border-[#B39868]/20 max-w-md mx-auto flex items-center justify-center gap-4 text-xs tracking-[0.2em] uppercase text-[#1F2B25]/60"
        >
          <span className="font-editorial text-lg italic text-[#B39868]">DN</span>
          <span>·</span>
          <span>Apothecary & Functional Medicine Board</span>
        </motion.div>
      </div>
    </section>
  );
}
