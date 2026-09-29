"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowUpRight, Phone, Sparkles, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BookingModal } from "@/components/booking/BookingModal";
import { CartDrawer } from "@/components/shop/CartDrawer";

const NAV_LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Formulations", href: "#formulations" },
  { label: "Remedy Finder", href: "#quiz" },
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
  const { itemCount, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-[#14221A] text-[#FAFBF8] border-b border-[#B39868]/30 py-2 px-4 text-center overflow-hidden">
          <div className="container-app flex items-center justify-between text-[10px] font-body tracking-[0.22em] uppercase">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#FAFBF8]/75">
              <MapPin className="w-3 h-3 text-[#B39868]" />
              <span>Flagship Clinic: Banani 11, Dhaka</span>
            </span>

            <span className="mx-auto md:mx-0 text-[#FAFBF8] font-medium flex items-center gap-2">
              <span className="text-[#B39868]">✦</span>
              <span>Complimentary Nationwide Express Shipping on Orders Over ৳1,500</span>
              <span className="text-[#B39868]">✦</span>
            </span>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-[#FAFBF8]/75">
              <Phone className="w-3 h-3 text-[#B39868]" />
              <span>+880 1700-000000</span>
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-[#FAFBF8]/95 backdrop-blur-md border-b border-[#B39868]/25 shadow-[0_4px_24px_rgba(20,34,26,0.04)] py-3.5"
              : "bg-[#FAFBF8]/80 backdrop-blur-sm border-b border-[#B39868]/15 py-4 sm:py-5"
          }`}
        >
          <div className="container-app flex items-center justify-between">
            {/* Left: Brand Monogram & Title */}
            <Link href="/" className="flex items-baseline gap-2.5 group">
              <span className="font-editorial text-2xl sm:text-3xl text-[#14221A] tracking-tight font-normal group-hover:text-[#B39868] transition-colors">
                Dr Natures
              </span>
              <span className="font-editorial text-lg sm:text-xl italic text-[#B39868] font-light">
                Apothecary
              </span>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] font-body tracking-[0.22em] uppercase text-[#14221A]/75 hover:text-[#B39868] transition-colors font-medium relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#B39868] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Book Consultation Pill */}
              <button
                onClick={() => setBookingOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B39868]/60 bg-white/80 hover:bg-[#14221A] hover:text-white hover:border-[#14221A] text-[#14221A] text-[11px] font-body tracking-[0.2em] uppercase font-medium transition-all duration-300 shadow-sm"
              >
                <span>Book Consult</span>
                <ArrowUpRight className="w-3 h-3 text-[#B39868]" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative w-10 h-10 rounded-full border border-[#B39868]/40 bg-white flex items-center justify-center text-[#14221A] hover:border-[#B39868] hover:bg-[#EEF2ED] transition-colors shadow-sm"
                aria-label={`Open shopping bag (${itemCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#14221A] text-white text-[10px] font-body font-medium flex items-center justify-center border border-[#B39868] shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full border border-[#B39868]/40 bg-white flex items-center justify-center text-[#14221A]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[88px] z-30 bg-[#FAFBF8] border-b border-[#B39868]/30 shadow-2xl p-6 sm:p-8 lg:hidden"
          >
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-editorial text-2xl text-[#14221A] hover:text-[#B39868] transition-colors py-1 border-b border-[#B39868]/15"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase font-medium hover:bg-[#B39868] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book Consultation Session</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868]" />
                </button>

                <div className="text-center pt-2 text-xs font-body text-[#14221A]/60 space-y-1">
                  <p>House 14, Road 11, Banani, Dhaka</p>
                  <p className="text-[#B39868] font-medium">+880 1700-000000</p>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cart Drawer */}
      <CartDrawer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
