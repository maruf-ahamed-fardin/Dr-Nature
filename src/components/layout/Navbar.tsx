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
import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/shop/CartDrawer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Appointment", href: "/appointment" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
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

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ─── Ultra-Premium Floating Island Navbar ─── */}
      <header className="fixed top-2 sm:top-4 inset-x-2.5 sm:inset-x-6 mx-auto z-40 max-w-[1360px] transition-all duration-500 ease-[0.16,1,0.3,1]">
        <div
          className={`w-full rounded-full transition-all duration-400 ease-[0.16,1,0.3,1] ${
            scrolled
              ? "bg-[#FAFBF8]/95 backdrop-blur-2xl border border-[#B39868]/45 shadow-[0_16px_45px_rgba(20,34,26,0.12),0_1px_3px_rgba(0,0,0,0.04)] py-1.5 sm:py-2.5 px-3 sm:px-6 ring-1 ring-white/90"
              : "bg-[#FAFBF8]/88 backdrop-blur-xl border border-[#B39868]/30 shadow-[0_10px_35px_rgba(20,34,26,0.06),0_1px_2px_rgba(0,0,0,0.02)] py-2 sm:py-3.5 px-3 sm:px-7 ring-1 ring-white/70"
          }`}
        >
          <div className="flex items-center justify-between gap-1.5 sm:gap-4 w-full">
            {/* ─── Left: Brand Logo & Typography ─── */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 pl-0.5 sm:pl-1">
              {/* Circular Emblem Frame */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full p-[1.5px] bg-gradient-to-br from-[#126336] via-[#B39868] to-[#126336] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Dr. Natures Emblem"
                    width={36}
                    height={36}
                    priority
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span className="font-editorial text-base sm:text-xl font-bold tracking-tight text-[#14221A] group-hover:text-[#126336] transition-colors leading-none">
                  DR. NATURES
                </span>
                <span className="hidden sm:inline-block text-[7px] sm:text-[7.5px] font-body tracking-[0.24em] uppercase text-[#126336] font-semibold leading-tight mt-0.5 whitespace-nowrap">
                  Art of Living Without Medicine
                </span>
              </div>
            </Link>

            {/* ─── Center: Sleek Desktop Navigation Links ─── */}
            <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 px-2">
              {NAV_LINKS.map((link) => {
                const isHovered = hoveredNav === link.label;
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(link.href) ||
                      (link.href === "/services" && pathname.startsWith("/consultations")) ||
                      (link.href === "/shop" && pathname.startsWith("/formulations")) ||
                      (link.href === "/blog" && pathname.startsWith("/journal"));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredNav(link.label)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`relative px-3.5 xl:px-4 py-1.5 text-[11px] xl:text-[11.5px] font-body tracking-[0.14em] uppercase transition-colors rounded-full flex items-center whitespace-nowrap ${
                      isActive
                        ? "text-[#126336] font-semibold"
                        : "text-[#14221A]/80 hover:text-[#126336] font-medium"
                    }`}
                  >
                    {/* Animated Sliding Pill Highlight */}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="floatingNavPill"
                        className="absolute inset-0 bg-[#126336]/8 border border-[#126336]/15 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <span className="absolute inset-0 bg-[#126336]/10 border border-[#126336]/25 rounded-full z-0" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ─── Right: Interactive Controls & Mobile Toggle ─── */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* WhatsApp Quick Direct Hotline (Desktop) */}
              <a
                href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
                target="_blank"
                rel="noopener noreferrer"
                title="Direct Consultation on WhatsApp"
                className="hidden md:flex w-9 h-9 rounded-full border border-emerald-600/30 bg-emerald-50/80 text-[#126336] hover:bg-[#126336] hover:text-white transition-all items-center justify-center shadow-sm hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Apothecary Bag (Cart Trigger) */}
              <button
                onClick={() => setIsOpen(true)}
                className="group relative h-8 sm:h-9.5 px-2.5 sm:px-3.5 rounded-full border border-[#B39868]/40 bg-white/90 hover:bg-[#FAFBF8] hover:border-[#126336] flex items-center gap-1.5 sm:gap-2 text-[#14221A] transition-all shadow-sm"
                aria-label={`Open apothecary bag (${itemCount} items)`}
              >
                <div className="relative">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8] text-[#14221A] group-hover:text-[#126336] transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#126336] text-white text-[8.5px] font-body font-bold flex items-center justify-center border-2 border-white shadow-sm">
                      {itemCount}
                    </span>
                  )}
                </div>

                {itemCount > 0 ? (
                  <span className="hidden sm:inline text-[11px] font-editorial font-bold text-[#126336] tracking-tight">
                    ৳{subtotal.toLocaleString()}
                  </span>
                ) : (
                  <span className="hidden sm:inline text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/70 group-hover:text-[#14221A] font-semibold">
                    Bag
                  </span>
                )}
              </button>

              {/* Primary "Book Consult" Button (Visible on sm+ screens) */}
              <button
                onClick={() => setBookingOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-2 sm:py-2 rounded-full bg-gradient-to-r from-[#126336] to-[#14221A] text-white text-[10.5px] sm:text-[11px] font-body tracking-[0.18em] uppercase font-semibold border border-[#B39868]/50 shadow-[0_4px_16px_rgba(18,99,54,0.22)] hover:shadow-[0_8px_24px_rgba(18,99,54,0.32)] hover:-translate-y-0.5 transition-all duration-300 group whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B39868] hidden sm:inline group-hover:rotate-12 transition-transform" />
                <span>Book Consult</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Mobile Sidebar Hamburger Toggle (Always visible on mobile) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#B39868]/45 bg-white/95 flex items-center justify-center text-[#14221A] hover:bg-[#126336] hover:text-white transition-colors shadow-sm"
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Luxury Slide-Over Sidebar Drawer ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Dimmed Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Sidebar from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] sm:w-[350px] max-w-[85vw] h-full bg-[#FAFBF8] border-l border-[#B39868]/40 shadow-2xl flex flex-col justify-between p-6 z-50 overflow-y-auto"
            >
              {/* Sidebar Top: Logo + Close Button */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#B39868]/25 mb-6">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-br from-[#126336] via-[#B39868] to-[#126336] overflow-hidden">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
                        <Image
                          src="/images/logo-emblem.png"
                          alt="Dr. Natures Emblem"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-editorial text-lg text-[#14221A] font-bold leading-tight">
                        DR. NATURES
                      </h4>
                      <p className="text-[7.5px] font-body tracking-[0.2em] uppercase text-[#126336] font-semibold">
                        Apothecary &amp; Nutrition
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full border border-[#B39868]/45 bg-white flex items-center justify-center text-[#14221A] hover:bg-[#14221A] hover:text-white transition-colors"
                    aria-label="Close sidebar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                  <span className="text-[9.5px] font-body tracking-[0.22em] uppercase text-[#B39868] font-semibold block mb-2 px-3">
                    ✦ Navigation
                  </span>
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname === link.href ||
                          pathname.startsWith(link.href) ||
                          (link.href === "/services" && pathname.startsWith("/consultations")) ||
                          (link.href === "/shop" && pathname.startsWith("/formulations")) ||
                          (link.href === "/blog" && pathname.startsWith("/journal"));
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 group ${
                          isActive
                            ? "bg-[#126336]/12 text-[#126336] font-semibold border border-[#126336]/25 shadow-sm"
                            : "text-[#14221A]/80 hover:bg-[#126336]/6 hover:text-[#126336]"
                        }`}
                      >
                        <span className="font-editorial text-xl font-medium tracking-tight group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          className={`w-4 h-4 transition-all ${
                            isActive
                              ? "text-[#126336] opacity-100"
                              : "text-[#B39868] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Bottom: Direct Booking & Contact Details */}
              <div className="pt-6 border-t border-[#B39868]/25 space-y-3 mt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#126336] to-[#14221A] text-white text-xs font-body tracking-[0.18em] uppercase font-semibold shadow-[0_8px_20px_rgba(18,99,54,0.22)] flex items-center justify-center gap-2 hover:opacity-95 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#B39868]" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures%20Clinic,%20I%20would%20like%20to%20consult%20about%20botanical%20remedies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-emerald-600/40 bg-emerald-50/70 text-[#126336] text-xs font-body tracking-[0.16em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-[#126336] hover:text-white transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>

                <div className="pt-3 text-center space-y-1">
                  <p className="text-[10px] font-body text-[#14221A]/70 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B39868]" />
                    <span>House 42, Road 11, Banani, Dhaka</span>
                  </p>
                  <p className="text-[9.5px] font-body text-[#14221A]/50 tracking-wider uppercase">
                    Open Daily · 9:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer & Booking Modal */}
      <CartDrawer />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
