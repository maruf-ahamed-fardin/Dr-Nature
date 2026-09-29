"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useEcosystem, DOCTORS_DATA, PRODUCTS_DATA } from "@/lib/ecosystem-context";

export function ModalsAndDrawers() {
  const {
    toasts,
    currency,
    formatPrice,
    cart,
    removeFromCart,
    subtotalBDT,
    discountBDT,
    shippingBDT,
    grandTotalBDT,
    applyCoupon,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    booking,
    closeBooking,
    quickProduct,
    closeQuickView,
    addToCart,
    isSearchOpen,
    setIsSearchOpen,
    isAiChatOpen,
    toggleAiChat,
    aiMessages,
    sendAiMessage,
    showToast,
  } = useEcosystem();

  // Booking Form State
  const [consultType, setConsultType] = useState<"Online Video" | "In-Clinic Visit">("Online Video");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSlot, setBookingSlot] = useState("10:00 AM");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeBooking();
    showToast(`Appointment Booked with ${booking.docName}! Confirmation sent via SMS to ${patientPhone || "+880 1700-000000"}.`);
    setPatientName("");
    setPatientPhone("");
  };

  // Cart Coupon
  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    applyCoupon(couponInput);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Cart is empty!");
      return;
    }
    clearCart();
    setIsCartOpen(false);
    showToast("Order Placed Successfully! Cash on Delivery / bKash invoice generated.");
  };

  // Global Search State
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = searchQuery.trim().length >= 2
    ? DOCTORS_DATA.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredProds = searchQuery.trim().length >= 2
    ? PRODUCTS_DATA.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // AI Chat Input
  const [aiInput, setAiInput] = useState("");

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    sendAiMessage(aiInput);
    setAiInput("");
  };

  return (
    <>
      {/* ─── 1. Toast Notification Container ─── */}
      <div
        id="toast-container"
        className="fixed top-24 right-5 z-[100] flex flex-col gap-3 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-[#06261E] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-[#0D4035] flex items-center space-x-2 animate-toast pointer-events-auto"
          >
            <i className="fa-solid fa-circle-check text-[#10B981]" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* ─── 2. Appointment Booking Modal ─── */}
      {booking.isOpen && (
        <div
          id="booking-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeBooking}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#0D4035] flex items-center justify-center text-xl font-bold shrink-0">
                <i className="fa-solid fa-user-doctor" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{booking.docName}</h3>
                <p className="text-xs text-[#047857] font-semibold">{booking.specialty}</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`border p-3 rounded-2xl flex items-center space-x-2 cursor-pointer transition-all ${
                      consultType === "Online Video"
                        ? "border-[#0D4035] bg-[#ECFDF5]/30 font-bold"
                        : "border-slate-200 hover:border-[#0D4035]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="consult-type"
                      value="Online Video"
                      checked={consultType === "Online Video"}
                      onChange={() => setConsultType("Online Video")}
                      className="accent-[#0D4035]"
                    />
                    <span className="text-xs text-slate-800">
                      <i className="fa-solid fa-video mr-1 text-[#047857]" /> Online Video
                    </span>
                  </label>
                  <label
                    className={`border p-3 rounded-2xl flex items-center space-x-2 cursor-pointer transition-all ${
                      consultType === "In-Clinic Visit"
                        ? "border-[#0D4035] bg-[#ECFDF5]/30 font-bold"
                        : "border-slate-200 hover:border-[#0D4035]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="consult-type"
                      value="In-Clinic Visit"
                      checked={consultType === "In-Clinic Visit"}
                      onChange={() => setConsultType("In-Clinic Visit")}
                      className="accent-[#0D4035]"
                    />
                    <span className="text-xs text-slate-800">
                      <i className="fa-solid fa-hospital mr-1 text-[#F59E0B]" /> Clinic Visit
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Slot
                  </label>
                  <select
                    required
                    value={bookingSlot}
                    onChange={(e) => setBookingSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
                  >
                    <option value="10:00 AM">10:00 AM - Morning</option>
                    <option value="04:00 PM">04:00 PM - Afternoon</option>
                    <option value="08:00 PM">08:00 PM - Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hossain"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number (bKash / SMS)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1700-000000"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
                />
              </div>

              <div className="p-3 bg-[#ECFDF5] rounded-2xl border border-[#10B981]/20 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                    Total Consultation Fee
                  </span>
                  <p className="text-lg font-black text-[#0D4035]">
                    {formatPrice(booking.feeBDT)}
                  </p>
                </div>
                <span className="text-[10px] bg-white px-2.5 py-1 rounded-md font-bold text-[#0D4035] shadow-xs">
                  Instant Confirmation
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0D4035] hover:bg-[#06261E] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer"
              >
                Confirm &amp; Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── 3. Product Quick View Modal ─── */}
      {quickProduct && (
        <div
          id="product-quick-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden">
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl z-10 cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-64 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-4 relative">
                <Image
                  src={quickProduct.img}
                  alt={quickProduct.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div>
                <span className="px-2.5 py-1 bg-[#ECFDF5] text-[#0D4035] text-[10px] font-extrabold uppercase rounded-md mb-2 inline-block">
                  {quickProduct.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{quickProduct.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {quickProduct.desc}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-black text-[#0D4035] font-serif-heading">
                    {formatPrice(quickProduct.priceBDT)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(quickProduct.oldPriceBDT)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickProduct.id);
                    closeQuickView();
                  }}
                  className="w-full py-3 bg-[#0D4035] hover:bg-[#06261E] text-white rounded-2xl font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-bag-shopping" /> Add to Cart Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 4. Slide-Over Shopping Cart Drawer ─── */}
      <div
        id="cart-drawer"
        className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 max-w-md w-full bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-bag-shopping text-[#0D4035] text-xl" />
                <h3 className="font-extrabold text-slate-900 text-lg">Your Cart</h3>
                <span className="text-xs bg-[#ECFDF5] text-[#0D4035] font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((s, i) => s + i.qty, 0)} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xl cursor-pointer"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 shrink-0 bg-white rounded-lg overflow-hidden border border-slate-200">
                        <Image src={item.img} alt={item.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 leading-tight">{item.name}</h5>
                        <p className="text-slate-400">
                          {formatPrice(item.priceBDT)} x {item.qty}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer p-1"
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Footer */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            {/* Coupon Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon Code (e.g. NATURE10)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-[#0D4035] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">{formatPrice(subtotalBDT)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Discount</span>
                <span className="font-bold text-[#0D4035]">-{formatPrice(discountBDT)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Shipping (BD)</span>
                <span className="font-bold text-slate-800">{formatPrice(shippingBDT)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>Grand Total</span>
                <span className="text-[#0D4035]">{formatPrice(grandTotalBDT)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#0D4035] hover:bg-[#06261E] text-white rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-lock text-[#FBBF24]" /> Proceed to Checkout (bKash/Nagad/COD)
            </button>
          </div>
        </div>
      </div>

      {/* ─── 5. Global Search Modal ─── */}
      {isSearchOpen && (
        <div
          id="search-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Global Ecosystem Search</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            </div>
            <input
              type="text"
              id="global-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type 'PCOS', 'Honey', 'Farhana'..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
              autoFocus
            />

            <div className="mt-4 max-h-60 overflow-y-auto space-y-2 text-xs">
              {searchQuery.trim().length < 2 ? (
                <p className="text-slate-400 text-center py-4">
                  Start typing to search doctors, products, and medical guides...
                </p>
              ) : filteredDocs.length === 0 && filteredProds.length === 0 ? (
                <p className="text-slate-400 text-center py-4">
                  No matching medical resources found.
                </p>
              ) : (
                <>
                  {filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center"
                    >
                      <span>
                        Doctor: <strong>{doc.name}</strong> ({doc.specialty})
                      </span>
                      <a
                        href="#services"
                        onClick={() => setIsSearchOpen(false)}
                        className="text-[#047857] font-bold"
                      >
                        Book
                      </a>
                    </div>
                  ))}
                  {filteredProds.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center"
                    >
                      <span>
                        Product: <strong>{prod.name}</strong>
                      </span>
                      <button
                        onClick={() => {
                          addToCart(prod.id);
                          setIsSearchOpen(false);
                        }}
                        className="text-[#047857] font-bold cursor-pointer"
                      >
                        Add Cart
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── 6. Floating AI Health Assistant Widget ─── */}
      <div id="ai-assistant-widget" className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleAiChat}
          aria-label="Open AI Assistant"
          className="w-14 h-14 bg-[#0D4035] hover:bg-[#06261E] text-white rounded-full shadow-glow flex items-center justify-center text-2xl transition-all transform hover:scale-105 relative cursor-pointer"
        >
          <i className="fa-solid fa-robot text-[#FBBF24]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-white" />
        </button>

        {/* AI Chat Window */}
        {isAiChatOpen && (
          <div
            id="ai-chat-box"
            className="absolute bottom-18 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
          >
            <div className="bg-[#06261E] text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-sparkles text-[#F59E0B]" />
                <div>
                  <h4 className="font-extrabold text-xs">Dr Natures Health AI</h4>
                  <p className="text-[9px] text-[#10B981]">Educational Assistant</p>
                </div>
              </div>
              <button
                onClick={toggleAiChat}
                className="text-slate-400 hover:text-white text-lg cursor-pointer"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-slate-100 text-slate-800 text-right ml-8 font-medium"
                      : "bg-[#ECFDF5] text-[#06261E] mr-8 font-medium"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAi} className="p-3 border-t border-slate-100 flex gap-2 bg-slate-50">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D4035]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#0D4035] text-white font-bold rounded-xl text-xs cursor-pointer hover:bg-[#06261E]"
              >
                <i className="fa-solid fa-paper-plane" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
