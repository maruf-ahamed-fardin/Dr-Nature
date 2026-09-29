"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "8801700000000";
const QUICK_MESSAGES = [
  "আমি একটি পরামর্শ নিতে চাই",
  "আমার স্বাস্থ্য সমস্যা নিয়ে কথা বলতে চাই",
  "প্রোডাক্ট সম্পর্কে জানতে চাই",
  "অ্যাপয়েন্টমেন্ট বুক করতে চাই",
];

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);

  useEffect(() => {
    if (!hasShownTooltip) {
      const t = setTimeout(() => {
        setShowTooltip(true);
        setHasShownTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [hasShownTooltip]);

  const sendMessage = (msg: string) => {
    const text = encodeURIComponent(
      msg || "Hello Dr Natures, আমি একটি পরামর্শ নিতে চাই।"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setOpen(false);
    setCustomMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[300px] sm:w-[330px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">Dr Natures</p>
                <p className="text-green-300 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  সাধারণত কয়েক মিনিটের মধ্যে জবাব দেয়
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="bg-[#ECE5DD] px-4 py-4">
              <div className="flex items-end gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center shrink-0 mb-0.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm max-w-[220px]">
                  <p className="text-[#1E293B] text-[13px] leading-relaxed">
                    👋 হ্যালো! Dr Natures থেকে স্বাগতম।
                    <br />
                    আপনাকে কীভাবে সাহায্য করতে পারি?
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 text-right">এখনই</p>
                </div>
              </div>
            </div>

            {/* Quick Messages + Input */}
            <div className="bg-white px-4 pt-3 pb-3 border-t border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                দ্রুত বার্তা পাঠান
              </p>
              <div className="flex flex-col gap-1.5 mb-3">
                {QUICK_MESSAGES.map((msg) => (
                  <button
                    key={msg}
                    onClick={() => sendMessage(msg)}
                    className="text-left text-[12px] text-[#075E54] font-medium px-3 py-2 rounded-xl bg-[#ECFDF5] hover:bg-[#075E54] hover:text-white transition-all duration-200 border border-[#075E54]/15"
                  >
                    {msg}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    customMessage.trim() &&
                    sendMessage(customMessage)
                  }
                  placeholder="নিজের বার্তা লিখুন..."
                  className="flex-1 text-[12px] px-3 py-2 rounded-full border border-slate-200 focus:border-[#075E54] focus:outline-none focus:ring-2 focus:ring-[#075E54]/20 bg-slate-50 placeholder-slate-400 text-slate-700"
                />
                <button
                  onClick={() =>
                    sendMessage(
                      customMessage ||
                        "Hello Dr Natures, আমি একটি পরামর্শ নিতে চাই।"
                    )
                  }
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1db954] flex items-center justify-center text-white shadow-sm transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-[#075E54] text-white text-[12px] font-medium px-3.5 py-2 rounded-full shadow-lg whitespace-nowrap"
          >
            💬 আমাদের সাথে কথা বলুন!
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => {
          setOpen((o) => !o);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp এ যোগাযোগ করুন"
        className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.45)] flex items-center justify-center text-white hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] transition-shadow"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
