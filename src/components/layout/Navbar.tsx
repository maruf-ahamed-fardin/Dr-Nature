"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Sparkles,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BookingModal } from "@/components/booking/BookingModal";
import { CartDrawer } from "@/components/shop/CartDrawer";

const NAV_LINKS = [
  { label: "Curations", href: "#formulations" },
  { label: "Remedy Finder", href: "#quiz", badge: "✦ AI Protocol" },
  { label: "Consultations", href: "#consultations" },
  { label: "Purity & Lab", href: "#purity" },
  { label: "Transformations", href: "#testimonials" },
  { label: "Journal", href: "#journal" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { itemCount, subtotal, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ─── Top Micro-Banner (Status Ribbon) ─── */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#14221A] text-[#FAFBF8] border-b border-[#B39868]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[10px] font-body tracking-[0.2em] uppercase">
          {/* Left: Clinic Live Status */}
          <div className="hidden md:flex items-center gap-2 text-[#FAFBF8]/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium text-[#FAFBF8]">Clinical Nutritionists Online</span>
            <span className="text-[#B39868]">·</span>
            <span className="text-[#FAFBF8]/60 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-[#B39868]" /> Banani 11, Dhaka
            </span>
          </div>

          {/* Center: Nationwide Free Express Delivery */}
          <div className="mx-auto md:mx-0 flex items-center gap-2 font-medium text-[#FAFBF8]">
            <span className="text-[#B39868]">✦</span>
            <span>Complimentary Nationwide Express on Orders Over ৳1,500</span>
            <span className="text-[#B39868]">✦</span>
          </div>

          {/* Right: Quick Direct Hotline */}
          <div className="hidden lg:flex items-center gap-4 text-[#FAFBF8]/80">
            <a
              href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
            <span className="text-[#B39868]/40">|</span>
            <a
              href="tel:+8801700000000"
              className="hover:text-[#B39868] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#B39868]" />
              <span>+880 1700-000000</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Floating Island Glassmorphism Navbar ─── */}
      <header className="fixed top-7 sm:top-8 inset-x-0 z-40 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none transition-all duration-400">
        <div
          className={`pointer-events-auto rounded-2xl sm:rounded-full transition-all duration-500 ease-[0.16,1,0.3,1] ${
            scrolled
              ? "bg-[#FAFBF8]/92 backdrop-blur-2xl border border-[#B39868]/40 shadow-[0_16px_50px_rgba(20,34,26,0.12),0_1px_3px_rgba(0,0,0,0.06)] py-2.5 px-4 sm:px-6 ring-1 ring-white/80"
              : "bg-[#FAFBF8]/85 backdrop-blur-xl border border-[#B39868]/25 shadow-[0_10px_35px_rgba(20,34,26,0.06),0_1px_2px_rgba(0,0,0,0.03)] py-3 sm:py-3.5 px-4 sm:px-7 ring-1 ring-white/60"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* ─── 1. Brand Logo & Typography (Official Emblem) ─── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              {/* Circular Emblem with Gradient Hairline */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[1.5px] bg-gradient-to-br from-[#126336] via-[#B39868] to-[#14221A] shadow-[0_2px_10px_rgba(18,99,54,0.18)] group-hover:shadow-[0_4px_16px_rgba(18,99,54,0.3)] transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Dr. Natures Emblem"
                    width={44}
                    height={44}
                    priority
                    className="object-contain w-full h-full scale-[1.08] group-hover:scale-115 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Brand Titles */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-[#14221A] group-hover:text-[#126336] transition-colors leading-none">
                    DR. NATURES
                  </span>
                </div>
                <span className="text-[7.5px] sm:text-[8.5px] font-body tracking-[0.24em] uppercase text-[#126336] font-semibold leading-tight mt-0.5 whitespace-nowrap">
                  Art of Living Without Medicine
                </span>
              </div>
            </Link>

            {/* ─── 2. Center: Desktop Navigation Links with Capsule Hover ─── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative px-3.5 py-1.5 text-[11px] xl:text-xs font-body tracking-[0.16em] uppercase font-medium text-[#14221A]/80 hover:text-[#126336] transition-colors rounded-full flex items-center gap-1.5"
                  >
                    {/* Animated hover background pill */}
                    {isHovered && (
                      <motion.span
                        layoutId="navHoverPill"
                        className="absolute inset-0 bg-[#126336]/8 border border-[#126336]/15 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {link.badge && (
                      <span className="relative z-10 px-1.5 py-0.5 rounded-full bg-[#B39868]/20 text-[#B39868] text-[8px] font-semibold tracking-wider uppercase border border-[#B39868]/40">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* ─── 3. Right: Action Controls ─── */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* WhatsApp Quick Trigger (Desktop & Tablet) */}
              <a
                href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Clinical Specialist on WhatsApp"
                className="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-emerald-600/30 bg-emerald-50/70 text-[#126336] hover:bg-[#126336] hover:text-white transition-all items-center justify-center shadow-sm hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Cart Drawer Trigger with Dynamic Live Counter & Price */}
              <button
                onClick={() => setIsOpen(true)}
                className="group relative h-9 sm:h-10 px-3 sm:px-3.5 rounded-full border border-[#B39868]/40 bg-white/90 hover:bg-[#FAFBF8] hover:border-[#126336] flex items-center gap-2 text-[#14221A] transition-all shadow-sm hover:shadow"
                aria-label={`Open apothecary bag (${itemCount} items)`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 stroke-[1.7] text-[#14221A] group-hover:text-[#126336] transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#126336] text-white text-[9px] font-body font-bold flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                      {itemCount}
                    </span>
                  )}
                </div>

                {itemCount > 0 ? (
                  <span className="hidden sm:inline text-[11px] font-editorial font-semibold text-[#126336] tracking-tight">
                    ৳{subtotal.toLocaleString()}
                  </span>
                ) : (
                  <span className="hidden sm:inline text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/60 group-hover:text-[#14221A] font-medium">
                    Bag
                  </span>
                )}
              </button>

              {/* "Book Consultation" Primary Button with Luxury Gradient */}
              <button
                onClick={() => setBookingOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#126336] via-[#1a4e32] to-[#14221A] text-white text-[11px] font-body tracking-[0.2em] uppercase font-semibold border border-[#B39868]/50 shadow-[0_4px_16px_rgba(18,99,54,0.22)] hover:shadow-[0_8px_24px_rgba(18,99,54,0.35)] hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B39868] group-hover:rotate-12 transition-transform" />
                <span>Book Consult</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#B39868]/40 bg-white/95 flex items-center justify-center text-[#14221A] hover:bg-[#126336] hover:text-white transition-colors shadow-sm"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Fullscreen Frosted Drawer (Award-winning UI/UX) ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#14221A]/70 backdrop-blur-md"
            />

            {/* Slide-Down Glass Panel */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 top-20 bg-[#FAFBF8] border border-[#B39868]/40 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            >
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#B39868]/25 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-[#126336] via-[#B39868] to-[#14221A] overflow-hidden">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
                      <Image
                        src="/images/logo.png"
                        alt="Dr. Natures Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-editorial text-xl text-[#14221A] font-semibold leading-tight">
                      DR. NATURES
                    </h4>
                    <p className="text-[8px] font-body tracking-[0.2em] uppercase text-[#126336] font-semibold">
                      Art of Living Without Medicine
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#B39868]/40 flex items-center justify-center text-[#14221A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links Grid */}
              <div className="grid gap-2 mb-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#126336]/8 text-[#14221A] hover:text-[#126336] transition-colors group"
                  >
                    <span className="font-editorial text-xl font-normal group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                    {link.badge ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#B39868]/20 text-[#B39868] text-[9px] font-semibold uppercase tracking-wider">
                        {link.badge}
                      </span>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-[#B39868] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </a>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#B39868]/25">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#126336] via-[#1a4e32] to-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#B39868]" />
                  <span>Book Consultation Session</span>
                </button>

                <a
                  href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-emerald-600/40 bg-emerald-50 text-[#126336] text-xs font-body tracking-[0.16em] uppercase font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#126336]" />
                  <span>WhatsApp Clinical Hotline</span>
                </a>
              </div>

              {/* Clinic Address & Hours */}
              <div className="mt-6 p-4 rounded-2xl bg-[#EEF2ED]/70 border border-[#B39868]/20 text-center text-xs font-body text-[#14221A]/70 space-y-1">
                <p className="font-medium text-[#14221A]">House 14, Road 11, Banani, Dhaka</p>
                <p className="text-[11px] text-[#126336] font-semibold">+880 1700-000000 · Daily 9am – 8:30pm</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
