"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Purity & Quality",
    question: "How do I know Dr Natures supplements are genuinely pure and free of heavy metals?",
    answer:
      "Unlike ordinary market herbs, every single batch of Dr Natures adaptogens undergoes third-party ICP-MS spectroscopy and HPLC testing in ISO/IEC 17025 accredited laboratories. We test for Lead, Arsenic, Cadmium, Mercury, aflatoxins, and pesticide residues. Every product bottle features a batch QR code that links directly to the independent laboratory Certificate of Analysis (COA).",
  },
  {
    category: "Consultations",
    question: "How does the private nutritionist consultation work?",
    answer:
      "Upon scheduling your session, you will receive an encrypted WhatsApp invitation and a brief clinical intake questionnaire to document your medical history and current symptoms. During the 45-minute video call (or 60-minute in-person Banani clinic session), our certified functional nutritionist reviews your biochemical biomarkers and crafts a bio-individual adaptogenic protocol and dietary roadmap.",
  },
  {
    category: "Delivery & Logistics",
    question: "What are delivery timelines across Dhaka and the 64 districts of Bangladesh?",
    answer:
      "Orders placed before 2:00 PM within Dhaka City are dispatched for same-day or next-day delivery via climate-controlled courier. Deliveries across all other 64 districts in Bangladesh typically arrive within 48 to 72 hours. All orders above ৳1,500 receive complimentary express shipping.",
  },
  {
    category: "Safety & Medicine",
    question: "Can I take Dr Natures adaptogens alongside conventional prescription medications?",
    answer:
      "Most adaptogens like KSM-66 Ashwagandha and Moringa are well-tolerated food-state botanicals. However, if you are currently taking thyroid medications, sedatives, immunosuppressants, or blood thinners, we strongly recommend booking an introductory consultation so our nutritionist can cross-check therapeutic herb-drug compatibility.",
  },
  {
    category: "Flagship Clinic",
    question: "Where is the Dr Natures clinic located, and do you accept walk-in patients?",
    answer:
      "Our flagship botanical apothecary and consultation clinic is located at House 14, Road 11, Banani, Dhaka-1213. While you are welcome to visit our apothecary bar to purchase formulations daily from 9:00 AM to 8:00 PM, diagnostic consultations with clinical nutritionists require prior appointment booking to ensure unhurried, dedicated care.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 md:py-36 bg-[#EEF2ED]/40 border-t border-[#B39868]/20 relative overflow-hidden">
      <div className="container-app relative z-10 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium block mb-3">
            ✦ Clinical Answers & Reassurance ✦
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light leading-none">
            Frequently Inquired <span className="italic text-[#B39868]">Questions</span>
          </h2>
          <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-4 max-w-md mx-auto">
            Everything you need to know about our sourcing, clinical consultations, lab verification, and delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl border border-[#B39868]/30 bg-[#FAFBF8] overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="text-[9px] font-body tracking-[0.22em] uppercase text-[#B39868] block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#14221A] font-light leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[#B39868]/40 bg-white flex items-center justify-center text-[#14221A] shrink-0 mt-1">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#B39868]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-[#14221A]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm font-body text-[#14221A]/75 leading-relaxed border-t border-[#B39868]/15 pt-4 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions? hotline banner */}
        <div className="mt-12 text-center text-xs font-body text-[#14221A]/70">
          <span>Need personalized guidance? Speak with our clinic apothecary desk at </span>
          <a
            href="tel:+8801700000000"
            className="font-medium text-[#14221A] underline underline-offset-4 hover:text-[#B39868] transition-colors"
          >
            +880 1700-000000
          </a>
          <span> (Daily 9:00 AM – 8:00 PM)</span>
        </div>
      </div>
    </section>
  );
}
