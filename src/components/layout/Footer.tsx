"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Sparkles, Check, MessageSquare } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";
import { LabCOAModal } from "@/components/sections/LabCOAModal";

const FOOTER_COLUMNS = {
  Formulations: [
    { label: "Lab-Tested Adaptogens", href: "#formulations" },
    { label: "Himalayan Shilajit Resin", href: "#formulations" },
    { label: "KSM-66 Ashwagandha", href: "#formulations" },
    { label: "Organic Moringa Powder", href: "#formulations" },
    { label: "Cold-Pressed Kalonji Oil", href: "#formulations" },
  ],
  Consultations: [
    { label: "Private Tele-Nutrition", href: "#consultations" },
    { label: "Dhaka In-Clinic Visit", href: "#consultations" },
    { label: "4-Week Microbiome Protocol", href: "#consultations" },
    { label: "Certified Nutritionist Panel", href: "#consultations" },
    { label: "Intelligent Remedy Matcher", href: "#quiz" },
  ],
  Science: [
    { label: "Ancestral Manifesto", href: "#manifesto" },
    { label: "Seed-to-Bottle Purity", href: "#purity" },
    { label: "Clinical Journal Studies", href: "#journal" },
    { label: "Patient Transformations", href: "#testimonials" },
    { label: "Frequently Inquired FAQ", href: "#faq" },
  ],
};

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [coaOpen, setCoaOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 4000);
  };

  return (
    <footer className="bg-[#14221A] text-[#FAFBF8] border-t border-[#B39868]/30 relative overflow-hidden">
      {/* Delicate background illumination */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#B39868]/8 blur-3xl pointer-events-none" />

      {/* Top Banner: Newsletter Dispatch */}
      <div className="border-b border-[#B39868]/20 py-14">
        <div className="container-app">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium block mb-2">
                ✦ The Dr Natures Dispatch
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAFBF8] font-light leading-snug">
                Receive ancestral botanical wisdom and <br className="hidden sm:inline" />
                <span className="italic text-[#B39868]">clinical nutrition insights</span> in your inbox.
              </h3>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-[#B39868]/15 border border-[#B39868]/40 text-[#FAFBF8]">
                  <Check className="w-4 h-4 text-[#B39868]" />
                  <span className="text-xs font-body tracking-[0.16em] uppercase">
                    Thank you. You are enrolled in the apothecary dispatch.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 rounded-full bg-white/5 border border-[#B39868]/30 text-sm text-[#FAFBF8] placeholder:text-[#FAFBF8]/40 focus:outline-none focus:border-[#B39868] transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-6 py-3.5 rounded-full bg-[#B39868] hover:bg-[#FAFBF8] text-[#14221A] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-md font-body"
                  >
                    Join
                  </button>
                </form>
              )}
              <p className="text-[10px] text-[#FAFBF8]/50 mt-2 font-body tracking-wider uppercase">
                Zero spam. Only peer-reviewed nutritional essays and seasonal harvest updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-app py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Address Column */}
          <div className="col-span-2 md:col-span-4 space-y-6">
            <a href="#" className="inline-block">
              <div className="flex items-baseline gap-2">
                <span className="font-editorial text-3xl tracking-wide text-[#FAFBF8]">
                  Dr Natures
                </span>
                <span className="font-editorial text-xl italic text-[#B39868]">
                  Apothecary
                </span>
              </div>
              <span className="text-[9px] font-body tracking-[0.3em] uppercase text-[#FAFBF8]/50 block mt-1">
                Dhaka · Pure Botanical Healthcare
              </span>
            </a>

            <p className="font-body text-xs text-[#FAFBF8]/65 leading-relaxed max-w-sm font-light">
              Pioneering botanical apothecary traditions in Bangladesh. Laboratory-verified adaptogens, functional nutrition consultations, and evidence-based wellness literature.
            </p>

            <div className="space-y-2.5 text-xs font-body text-[#FAFBF8]/75">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#B39868] shrink-0" />
                <span>House 14, Road 11, Banani, Dhaka-1213</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#B39868] shrink-0" />
                <span>+880 1700-000000 · Daily 9am – 8pm</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#B39868] shrink-0" />
                <span>care@drnatures.com</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-body tracking-wider uppercase hover:bg-emerald-900 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Clinic Chat</span>
              </a>

              <button
                onClick={() => setCoaOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-[#B39868]/40 text-[#B39868] text-[11px] font-body tracking-wider uppercase hover:bg-white/10 transition-colors"
              >
                <span>Inspect Lab COA</span>
              </button>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_COLUMNS).map(([title, links]) => (
            <div key={title} className="col-span-1 md:col-span-2">
              <h4 className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] font-medium mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs font-body text-[#FAFBF8]/65 hover:text-[#B39868] transition-colors leading-relaxed block font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Direct CTA Column */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <h4 className="text-[10px] font-body tracking-[0.25em] uppercase text-[#B39868] font-medium mb-5">
              Clinical Care
            </h4>
            <p className="text-xs font-body text-[#FAFBF8]/60 font-light leading-relaxed">
              Book a 1-on-1 private video or in-person consultation with our certified nutritionists.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full py-2.5 px-4 rounded-full bg-[#B39868] text-[#14221A] text-[10px] font-body font-semibold tracking-[0.18em] uppercase hover:bg-white transition-colors"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#B39868]/20 py-6">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-body text-[#FAFBF8]/50 tracking-[0.16em] uppercase">
          <p>© {new Date().getFullYear()} Dr Natures Healthcare Ltd · Pure by Nature · Dhaka, Bangladesh</p>
          <div className="flex items-center gap-6">
            <a href="#manifesto" className="hover:text-[#B39868] transition-colors">
              Manifesto
            </a>
            <a href="#purity" className="hover:text-[#B39868] transition-colors">
              Purity Guarantee
            </a>
            <a href="#faq" className="hover:text-[#B39868] transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* Lab COA Modal */}
      <LabCOAModal
        isOpen={coaOpen}
        onClose={() => setCoaOpen(false)}
      />
    </footer>
  );
}
