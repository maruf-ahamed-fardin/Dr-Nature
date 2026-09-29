"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowUpRight, ShieldCheck, Sparkles, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "Dhaka",
    paymentMethod: "cod",
  });

  const FREE_SHIPPING_THRESHOLD = 1500;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 80;
  const total = subtotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCheckingOut(false);
      setIsOpen(false);
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isCheckingOut) setIsOpen(false);
            }}
            className="absolute inset-0 bg-[#14221A]/60 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#FAFBF8] border-l border-[#B39868]/30 shadow-2xl flex flex-col justify-between relative"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#B39868]/20 flex items-center justify-between bg-white/70 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-[#B39868]/40 bg-[#EEF2ED] flex items-center justify-center text-[#B39868]">
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl text-[#14221A] font-light leading-none">
                      Apothecary Bag
                    </h3>
                    <span className="text-[10px] font-body tracking-[0.22em] uppercase text-[#B39868] font-medium">
                      {itemCount} {itemCount === 1 ? "Curated Item" : "Curated Items"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCheckingOut(false);
                    setIsOpen(false);
                  }}
                  className="w-8 h-8 rounded-full border border-[#B39868]/30 flex items-center justify-center text-[#14221A] hover:bg-[#14221A] hover:text-white transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="bg-[#EEF2ED]/70 px-6 py-3 border-b border-[#B39868]/15">
                <div className="flex items-center justify-between text-[11px] font-body text-[#14221A]/70 mb-1.5">
                  <span className="tracking-wide">
                    {remainingForFree === 0
                      ? "✦ Complimentary Nationwide Express Unlocked"
                      : `Add ৳${remainingForFree.toLocaleString()} more for Free Express Delivery`}
                  </span>
                  <span className="font-semibold text-[#B39868]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#FAFBF8] overflow-hidden border border-[#B39868]/20">
                  <motion.div
                    className="h-full bg-[#B39868]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full border border-[#B39868]/30 bg-[#EEF2ED] mx-auto flex items-center justify-center text-[#B39868]">
                      <Sparkles className="w-6 h-6 stroke-[1.2]" />
                    </div>
                    <p className="font-editorial text-2xl text-[#14221A] font-light">
                      Your bag is currently empty.
                    </p>
                    <p className="text-xs font-body text-[#14221A]/60 max-w-xs mx-auto">
                      Explore our standardized adaptogens, organic superfoods, and clinical wellness literature.
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase hover:bg-[#B39868] transition-colors"
                    >
                      Browse Formulations
                    </button>
                  </div>
                ) : isCheckingOut ? (
                  /* Instant Checkout Form */
                  <div className="space-y-5">
                    {checkoutSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center space-y-4 bg-white rounded-2xl p-6 border border-[#B39868]/40 shadow-sm"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#EEF2ED] text-[#B39868] mx-auto flex items-center justify-center">
                          <Check className="w-7 h-7" />
                        </div>
                        <h4 className="font-editorial text-3xl text-[#14221A] font-light">
                          Order Confirmed!
                        </h4>
                        <p className="text-xs font-body text-[#14221A]/70 leading-relaxed max-w-xs mx-auto">
                          Thank you, <span className="font-medium text-[#14221A]">{formData.name}</span>. Your order reference is <span className="font-mono text-[#B39868]">DN-2026-8841</span>. An SMS confirmation has been dispatched.
                        </p>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[#B39868] pt-2">
                          ✦ Estimated Delivery: 24-48 Hours
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-[#B39868]/20">
                          <h4 className="font-editorial text-xl text-[#14221A] font-light">
                            Express Delivery Details
                          </h4>
                          <button
                            type="button"
                            onClick={() => setIsCheckingOut(false)}
                            className="text-[11px] font-body tracking-wider uppercase text-[#B39868] hover:underline"
                          >
                            ← Back to Items
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. Sabrina Khan"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/30 bg-white text-xs font-body focus:outline-none focus:border-[#B39868]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                            Phone Number * (for delivery SMS)
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+880 1700-000000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/30 bg-white text-xs font-body focus:outline-none focus:border-[#B39868]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                            Delivery Address *
                          </label>
                          <textarea
                            required
                            rows={2}
                            placeholder="House, Road, Area, Dhaka"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/30 bg-white text-xs font-body focus:outline-none focus:border-[#B39868]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                            District / Division
                          </label>
                          <select
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/30 bg-white text-xs font-body focus:outline-none focus:border-[#B39868]"
                          >
                            <option value="Dhaka">Dhaka (Same-Day / Next-Day)</option>
                            <option value="Chittagong">Chittagong (2 Days)</option>
                            <option value="Sylhet">Sylhet (2 Days)</option>
                            <option value="Rajshahi">Rajshahi (2 Days)</option>
                            <option value="Other">Other 64 Districts Nationwide</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-2">
                            Payment Method
                          </label>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${
                              formData.paymentMethod === "cod"
                                ? "border-[#B39868] bg-[#EEF2ED]/60 font-medium"
                                : "border-[#B39868]/20 bg-white"
                            }`}>
                              <input
                                type="radio"
                                name="pm"
                                checked={formData.paymentMethod === "cod"}
                                onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                                className="accent-[#B39868]"
                              />
                              <span>Cash on Delivery</span>
                            </label>

                            <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${
                              formData.paymentMethod === "bkash"
                                ? "border-[#B39868] bg-[#EEF2ED]/60 font-medium"
                                : "border-[#B39868]/20 bg-white"
                            }`}>
                              <input
                                type="radio"
                                name="pm"
                                checked={formData.paymentMethod === "bkash"}
                                onChange={() => setFormData({ ...formData, paymentMethod: "bkash" })}
                                className="accent-[#B39868]"
                              />
                              <span>bKash / Nagad</span>
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-4 py-3.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.22em] uppercase font-medium hover:bg-[#B39868] transition-colors shadow-lg"
                        >
                          Confirm Order · ৳{total.toLocaleString()}
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  /* Cart Items List */
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#B39868]/20 items-center justify-between shadow-sm"
                      >
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[#EEF2ED] shrink-0 border border-[#B39868]/15">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="font-editorial text-lg text-[#14221A] font-light truncate">
                            {item.name}
                          </h4>
                          <span className="text-[11px] font-editorial text-[#B39868] block">
                            ৳{item.price.toLocaleString()} each
                          </span>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2.5 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-[#B39868]/30 flex items-center justify-center text-[#14221A] hover:bg-[#14221A] hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-body font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-[#B39868]/30 flex items-center justify-center text-[#14221A] hover:bg-[#14221A] hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-editorial text-base font-light text-[#14221A] block">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#14221A]/40 hover:text-red-600 transition-colors p-1 mt-2 inline-block"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout Button */}
              {items.length > 0 && !isCheckingOut && (
                <div className="p-6 border-t border-[#B39868]/20 bg-white/80 backdrop-blur-md space-y-4">
                  <div className="space-y-1.5 text-xs font-body text-[#14221A]/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-editorial text-base text-[#14221A]">
                        ৳{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nationwide Express Delivery</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-emerald-700 font-medium">FREE</span>
                        ) : (
                          `৳${shippingFee}`
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#B39868]/20 flex justify-between text-sm font-medium text-[#14221A]">
                      <span className="font-body tracking-wider uppercase text-xs">Total</span>
                      <span className="font-editorial text-2xl text-[#14221A]">
                        ৳{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-4 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.22em] uppercase font-medium hover:bg-[#B39868] transition-all duration-300 shadow-[0_8px_20px_rgba(20,34,26,0.12)] flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Express Checkout</span>
                    <ArrowUpRight className="w-4 h-4 text-[#B39868] group-hover:text-white transition-colors" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B39868]" />
                    <span>Lab-Tested · Authenticity Guaranteed</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
