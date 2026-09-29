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
  MessageSquare,
  Sparkles,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BookingModal } from "@/components/booking/BookingModal";
import { CartDrawer } from "@/components/shop/CartDrawer";

const NAV_LINKS = [
  { label: "Formulations", href: "#formulations" },
  { label: "Remedy Finder", href: "#quiz", isHighlight: true },
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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
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
      {/* ─── Ultra-Premium Centered Floating Island Navbar (Always Sticky on Scroll) ─── */}
      <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-500 ease-[0.16,1,0.3,1]">
        <div
          className={`w-full rounded-full transition-all duration-400 ease-[0.16,1,0.3,1] ${
            scrolled
              ? "bg-[#FAFBF8]/95 backdrop-blur-2xl border border-[#B39868]/45 shadow-[0_16px_45px_rgba(20,34,26,0.12),0_1px_3px_rgba(0,0,0,0.04)] py-2 sm:py-2.5 px-3.5 sm:px-5 ring-1 ring-white/90"
              : "bg-[#FAFBF8]/88 backdrop-blur-xl border border-[#B39868]/30 shadow-[0_10px_35px_rgba(20,34,26,0.06),0_1px_2px_rgba(0,0,0,0.02)] py-2.5 sm:py-3 px-3.5 sm:px-6 ring-1 ring-white/70"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* ─── Left: Brand Logo & Typography (Crisp, Perfectly Proportionate) ─── */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 pl-1">
              {/* Circular Emblem Frame */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[1.5px] bg-gradient-to-br from-[#126336] via-[#B39868] to-[#126336] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Dr. Natures Emblem"
                    width={40}
                    height={40}
                    priority
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#14221A] group-hover:text-[#126336] transition-colors leading-none">
                  DR. NATURES
                </span>
                <span className="text-[7px] sm:text-[7.5px] font-body tracking-[0.24em] uppercase text-[#126336] font-semibold leading-tight mt-0.5 whitespace-nowrap">
                  Art of Living Without Medicine
                </span>
              </div>
            </Link>

            {/* ─── Center: Sleek Navigation Links with Sliding Pill Indicator ─── */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => {
                const isHovered = hoveredNav === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredNav(link.label)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative px-3 py-1.5 text-[11px] xl:text-[11.5px] font-body tracking-[0.14em] uppercase font-medium text-[#14221A]/80 hover:text-[#126336] transition-colors rounded-full flex items-center gap-1.5"
                  >
                    {/* Animated Sliding Pill Highlight */}
                    {isHovered && (
                      <motion.span
                        layoutId="floatingNavPill"
                        className="absolute inset-0 bg-[#126336]/8 border border-[#126336]/15 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {link.isHighlight && (
                      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#B39868] animate-pulse" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* ─── Right: Interactive Controls & CTAs ─── */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* WhatsApp Quick Direct Hotline */}
              <a
                href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
                target="_blank"
                rel="noopener noreferrer"
                title="Direct Consultation on WhatsApp"
                className="hidden sm:flex w-9 h-9 rounded-full border border-emerald-600/30 bg-emerald-50/80 text-[#126336] hover:bg-[#126336] hover:text-white transition-all items-center justify-center shadow-sm hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Apothecary Bag (Cart Trigger) */}
              <button
                onClick={() => setIsOpen(true)}
                className="group relative h-9 sm:h-9.5 px-3 sm:px-3.5 rounded-full border border-[#B39868]/40 bg-white/90 hover:bg-[#FAFBF8] hover:border-[#126336] flex items-center gap-2 text-[#14221A] transition-all shadow-sm"
                aria-label={`Open apothecary bag (${itemCount} items)`}
              >
                <div className="relative">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8] text-[#14221A] group-hover:text-[#126336] transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#126336] text-white text-[9px] font-body font-bold flex items-center justify-center border-2 border-white shadow-sm">
                      {itemCount}
                    </span>
                  )}
                </div>

                {itemCount > 0 ? (
                  <span className="text-[11px] font-editorial font-bold text-[#126336] tracking-tight">
                    ৳{subtotal.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/70 group-hover:text-[#14221A] font-semibold">
                    Bag
                  </span>
                )}
              </button>

              {/* Primary "Book Consult" Button */}
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 sm:py-2 rounded-full bg-gradient-to-r from-[#126336] to-[#14221A] text-white text-[10.5px] sm:text-[11px] font-body tracking-[0.18em] uppercase font-semibold border border-[#B39868]/50 shadow-[0_4px_16px_rgba(18,99,54,0.22)] hover:shadow-[0_8px_24px_rgba(18,99,54,0.32)] hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B39868] hidden sm:inline group-hover:rotate-12 transition-transform" />
                <span>Book Consult</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-full border border-[#B39868]/40 bg-white/95 flex items-center justify-center text-[#14221A] hover:bg-[#126336] hover:text-white transition-colors shadow-sm ml-1"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Frosted Glass Drawer ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#14221A]/70 backdrop-blur-md"
            />

            {/* Slide-Down Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 top-16 bg-[#FAFBF8] border border-[#B39868]/40 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#B39868]/25 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-br from-[#126336] via-[#B39868] to-[#126336] overflow-hidden">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
                      <Image
                        src="/images/logo-emblem.png"
                        alt="Dr. Natures Emblem"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg text-[#14221A] font-bold leading-tight">
                      DR. NATURES
                    </h4>
                    <p className="text-[7.5px] font-body tracking-[0.2em] uppercase text-[#126336] font-semibold">
                      Art of Living Without Medicine
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#B39868]/40 flex items-center justify-center text-[#14221A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <div className="grid gap-1 mb-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#126336]/8 text-[#14221A] hover:text-[#126336] transition-colors group"
                  >
                    <span className="font-editorial text-lg font-normal group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                    {link.isHighlight ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#B39868]/20 text-[#B39868] text-[9px] font-semibold uppercase tracking-wider">
                        ✦ Quiz
                      </span>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-[#B39868] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </a>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-3 border-t border-[#B39868]/25">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#126336] to-[#14221A] text-white text-xs font-body tracking-[0.18em] uppercase font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#B39868]" />
                  <span>Book Consultation Session</span>
                </button>

                <a
                  href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full border border-emerald-600/40 bg-emerald-50 text-[#126336] text-xs font-body tracking-[0.16em] uppercase font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#126336]" />
                  <span>WhatsApp Clinical Hotline</span>
                </a>
              </div>

              {/* Address */}
              <div className="mt-4 p-3 rounded-xl bg-[#EEF2ED]/70 border border-[#B39868]/20 text-center text-xs font-body text-[#14221A]/70 space-y-0.5">
                <p className="font-medium text-[#14221A]">House 14, Road 11, Banani, Dhaka</p>
                <p className="text-[10px] text-[#126336] font-semibold">+880 1700-000000 · Daily 9am – 8:30pm</p>
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
