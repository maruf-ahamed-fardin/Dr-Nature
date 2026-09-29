"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Menu, X, ChevronDown, Leaf,
  User, Search, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Consultation", href: "/booking" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHeroPage = pathname === "/" || pathname === "/booking" || pathname === "/blog";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isHeroPage
            ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-app">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                scrolled || !isHeroPage
                  ? "bg-primary shadow-md shadow-primary/25"
                  : "bg-white/20 backdrop-blur-sm"
              )}>
                <Leaf className={cn(
                  "w-4.5 h-4.5",
                  scrolled || !isHeroPage ? "text-white" : "text-white"
                )} />
              </div>
              <div>
                <span className={cn(
                  "font-bold text-lg leading-none block transition-colors",
                  scrolled || !isHeroPage ? "text-foreground" : "text-white"
                )}>
                  Dr Natures
                </span>
                <span className={cn(
                  "text-[10px] font-medium leading-none tracking-wider uppercase transition-colors",
                  scrolled || !isHeroPage ? "text-muted-foreground" : "text-white/70"
                )}>
                  Healthcare
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? scrolled || !isHeroPage
                        ? "bg-primary/10 text-primary"
                        : "bg-white/20 text-white"
                      : scrolled || !isHeroPage
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link href="/cart" className="relative">
                <button className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  scrolled || !isHeroPage
                    ? "hover:bg-muted text-foreground"
                    : "hover:bg-white/10 text-white"
                )}>
                  <ShoppingCart className="w-4.5 h-4.5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Account */}
              <Link href="/account" className="hidden md:block">
                <button className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  scrolled || !isHeroPage
                    ? "hover:bg-muted text-foreground"
                    : "hover:bg-white/10 text-white"
                )}>
                  <User className="w-4.5 h-4.5" />
                </button>
              </Link>

              {/* Book CTA */}
              <Button
                variant={scrolled || !isHeroPage ? "default" : "white"}
                size="sm"
                className="hidden md:inline-flex"
                asChild
              >
                <Link href="/booking">Book Consultation</Link>
              </Button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  scrolled || !isHeroPage
                    ? "hover:bg-muted text-foreground"
                    : "hover:bg-white/10 text-white"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute top-[68px] left-0 right-0 bg-white border-b border-border shadow-xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="container-app py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 pb-1 flex flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link href="/booking">Book Consultation</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
