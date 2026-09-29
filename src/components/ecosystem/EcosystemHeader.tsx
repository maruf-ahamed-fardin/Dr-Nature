"use client";

import React from "react";
import Link from "next/link";
import { useEcosystem } from "@/lib/ecosystem-context";

export function EcosystemHeader() {
  const {
    totalCartCount,
    toggleCart,
    wishlistCount,
    toggleWishlist,
    toggleSearch,
    isMobileDrawerOpen,
    toggleMobileDrawer,
    openBooking,
  } = useEcosystem();

  return (
    <>
      <header id="navbar" className="sticky top-0 w-full z-40 transition-all duration-300 glass-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#0D4035] rounded-2xl flex items-center justify-center shadow-md shadow-[#0D4035]/20 transition-transform group-hover:scale-105">
                <i className="fa-solid fa-leaf text-[#FBBF24] text-xl sm:text-2xl" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-black tracking-tight text-[#06261E] font-serif-heading block">
                  Dr Natures
                </span>
                <span className="hidden sm:block text-[10px] font-bold tracking-widest text-[#10B981] uppercase -mt-1">
                  Ecosystem
                </span>
              </div>
            </Link>

            {/* Nav Menu Desktop */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-bold text-slate-700">
              <a
                href="#services"
                className="hover:text-[#047857] transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-user-doctor text-[#10B981] text-xs" />
                <span>Consultations</span>
              </a>
              <a
                href="#shop"
                className="hover:text-[#047857] transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-flask text-[#10B981] text-xs" />
                <span>Apothecary</span>
              </a>
              <a
                href="#tools"
                className="hover:text-[#047857] transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-calculator text-[#10B981] text-xs" />
                <span>Health Tools</span>
              </a>
              <a
                href="#video-stories"
                className="hover:text-[#047857] transition-colors flex items-center gap-1.5"
              >
                <i className="fa-brands fa-youtube text-red-500 text-xs" />
                <span>Videos</span>
              </a>
              <a
                href="#blog"
                className="hover:text-[#047857] transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-book-medical text-[#10B981] text-xs" />
                <span>Journal</span>
              </a>
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Global Search Trigger */}
              <button
                onClick={toggleSearch}
                aria-label="Search"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#ECFDF5] text-slate-600 hover:text-[#047857] flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </button>

              {/* Cart Trigger */}
              <button
                onClick={toggleCart}
                aria-label="Cart"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#ECFDF5] text-slate-600 hover:text-[#047857] flex items-center justify-center relative transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-bag-shopping" />
                <span
                  id="cart-badge"
                  className="absolute -top-1 -right-1 bg-[#F59E0B] text-[#06261E] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                >
                  {totalCartCount}
                </span>
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={toggleWishlist}
                aria-label="Wishlist"
                className="hidden sm:flex w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 items-center justify-center relative transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-heart" />
                <span
                  id="wishlist-badge"
                  className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </span>
              </button>

              <button
                onClick={() => openBooking("Dr. Farhana Ahmed", "PCOS Specialist", 1200)}
                className="hidden sm:inline-flex px-5 py-2.5 bg-[#0D4035] hover:bg-[#06261E] text-white text-xs font-bold rounded-full shadow-md shadow-[#0D4035]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <i className="fa-solid fa-calendar-check mr-2 text-[#FBBF24]" />
                <span>Book Visit</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                id="mobile-toggle"
                onClick={toggleMobileDrawer}
                aria-label="Toggle navigation"
                className="lg:hidden text-2xl text-slate-700 p-1 cursor-pointer"
              >
                <i className="fa-solid fa-bars-staggered" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 w-80 bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ${
            isMobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-[#0D4035] rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-leaf text-[#FBBF24]" />
                </div>
                <span className="font-extrabold text-slate-900 font-serif-heading text-lg">
                  Dr Natures
                </span>
              </div>
              <button
                onClick={toggleMobileDrawer}
                className="text-slate-400 hover:text-slate-700 text-xl cursor-pointer"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="space-y-4 font-bold text-slate-700 text-sm">
              <a
                href="#services"
                onClick={toggleMobileDrawer}
                className="block p-3 rounded-xl hover:bg-[#ECFDF5] hover:text-[#0D4035] transition-colors"
              >
                <i className="fa-solid fa-user-doctor mr-3 text-[#10B981]" /> Consultations
              </a>
              <a
                href="#shop"
                onClick={toggleMobileDrawer}
                className="block p-3 rounded-xl hover:bg-[#ECFDF5] hover:text-[#0D4035] transition-colors"
              >
                <i className="fa-solid fa-flask mr-3 text-[#10B981]" /> Apothecary &amp; Shop
              </a>
              <a
                href="#tools"
                onClick={toggleMobileDrawer}
                className="block p-3 rounded-xl hover:bg-[#ECFDF5] hover:text-[#0D4035] transition-colors"
              >
                <i className="fa-solid fa-calculator mr-3 text-[#10B981]" /> Health Calculators
              </a>
              <a
                href="#video-stories"
                onClick={toggleMobileDrawer}
                className="block p-3 rounded-xl hover:bg-[#ECFDF5] hover:text-[#0D4035] transition-colors"
              >
                <i className="fa-brands fa-youtube mr-3 text-red-500" /> YouTube Video Stories
              </a>
              <a
                href="#blog"
                onClick={toggleMobileDrawer}
                className="block p-3 rounded-xl hover:bg-[#ECFDF5] hover:text-[#0D4035] transition-colors"
              >
                <i className="fa-solid fa-newspaper mr-3 text-[#10B981]" /> Medical Journal
              </a>
              <a
                href="#portal"
                onClick={toggleMobileDrawer}
                className="block p-3 rounded-xl hover:bg-[#ECFDF5] hover:text-[#0D4035] transition-colors"
              >
                <i className="fa-solid fa-id-card mr-3 text-[#10B981]" /> Patient Account
              </a>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                toggleMobileDrawer();
                openBooking("Dr. Farhana Ahmed", "PCOS Specialist", 1200);
              }}
              className="block w-full text-center py-3 bg-[#0D4035] text-white rounded-full font-bold text-xs shadow-md cursor-pointer"
            >
              Book Doctor Visit
            </button>
            <p className="text-[11px] text-center text-slate-400 font-semibold">
              Hotline: +880 1700-000000
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
