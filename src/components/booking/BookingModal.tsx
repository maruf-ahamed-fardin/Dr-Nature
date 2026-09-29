"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Video, Building2, User, Phone, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceIndex?: number;
}

const CONSULTATION_TYPES = [
  {
    id: "tele",
    title: "Private Tele-Nutrition Consultation",
    format: "Encrypted HD Video",
    duration: "45 Minutes",
    fee: "৳800",
    desc: "Comprehensive review of medical history, lifestyle biomarkers, and creation of a personalized adaptogen & diet roadmap.",
  },
  {
    id: "clinic",
    title: "In-Clinic Functional Assessment",
    format: "Dhaka Banani Flagship",
    duration: "60 Minutes",
    fee: "৳1,500",
    desc: "Direct face-to-face diagnostic evaluation, body composition mapping, tongue & pulse assessment, and personalized herbal guidance.",
  },
  {
    id: "microbiome",
    title: "4-Week Custom Microbiome Protocol",
    format: "Complete Care Program",
    duration: "28 Days Continuous",
    fee: "৳2,500",
    desc: "Two one-on-one clinical consultations, bespoke 28-day gut roadmap, tailored adaptogen stack, and daily WhatsApp practitioner care.",
  },
];

const PRACTITIONERS = [
  {
    name: "Dr. Nadia Rahman, MSc",
    role: "Lead Functional Nutritionist",
    specialty: "Gut Microbiome & Chronic Fatigue",
  },
  {
    name: "Dr. Asif Mahmud, MD",
    role: "Clinical Adaptogen Specialist",
    specialty: "Hormonal Balance & Metabolic Vitality",
  },
  {
    name: "Dr. Rubina Yasmin, BAMS",
    role: "Ayurvedic Medicine Consultant",
    specialty: "Ancestral Botanicals & Detoxification",
  },
];

const SLOTS = ["11:00 AM", "02:30 PM", "05:00 PM", "07:30 PM"];

export function BookingModal({ isOpen, onClose, defaultServiceIndex = 0 }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState(defaultServiceIndex);
  const [selectedPractitioner, setSelectedPractitioner] = useState(0);
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedSlot, setSelectedSlot] = useState("02:30 PM");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    healthGoal: "Fatigue & Sleep Optimization",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    } else if (step === 3) {
      if (!formData.name || !formData.phone) return;
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  const service = CONSULTATION_TYPES[selectedService] || CONSULTATION_TYPES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#14221A]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAFBF8] border border-[#B39868]/40 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#B39868]/30 flex items-center justify-center text-[#14221A] hover:bg-[#14221A] hover:text-white transition-colors"
              aria-label="Close booking modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Step Indicators */}
            {step < 4 && (
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-medium transition-colors ${
                        step === s
                          ? "bg-[#14221A] text-white"
                          : step > s
                          ? "bg-[#B39868] text-white"
                          : "border border-[#B39868]/40 text-[#14221A]/60"
                      }`}
                    >
                      {s}
                    </span>
                    {s < 3 && <div className="w-6 sm:w-10 h-px bg-[#B39868]/30" />}
                  </div>
                ))}
                <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868] ml-2 font-medium">
                  {step === 1 && "Select Consultation"}
                  {step === 2 && "Choose Date & Doctor"}
                  {step === 3 && "Patient Information"}
                </span>
              </div>
            )}

            {/* STEP 1: Select Consultation */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-editorial text-3xl text-[#14221A] font-light">
                    Select Your Consultation Format
                  </h3>
                  <p className="text-xs text-[#14221A]/70 font-body mt-1">
                    Every consultation is strictly confidential and guided by a licensed clinical nutritionist.
                  </p>
                </div>

                <div className="space-y-3">
                  {CONSULTATION_TYPES.map((c, idx) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedService(idx)}
                      className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        selectedService === idx
                          ? "border-[#B39868] bg-[#EEF2ED]/70 shadow-sm"
                          : "border-[#B39868]/20 bg-white hover:border-[#B39868]/60"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-editorial text-lg italic text-[#B39868]">
                            0{idx + 1}
                          </span>
                          <h4 className="font-editorial text-xl sm:text-2xl text-[#14221A] font-light">
                            {c.title}
                          </h4>
                        </div>
                        <span className="font-editorial text-2xl text-[#14221A] font-light shrink-0">
                          {c.fee}
                        </span>
                      </div>
                      <p className="text-xs text-[#14221A]/70 font-body leading-relaxed mb-3">
                        {c.desc}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] font-body tracking-[0.16em] uppercase text-[#14221A]/60">
                        <span>{c.duration}</span>
                        <span>·</span>
                        <span>{c.format}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase hover:bg-[#B39868] transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to Slot Selection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B39868]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Practitioner & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-editorial text-3xl text-[#14221A] font-light">
                    Practitioner & Clinical Schedule
                  </h3>
                  <p className="text-xs text-[#14221A]/70 font-body mt-1">
                    Select your preferred practitioner and convenient consultation time.
                  </p>
                </div>

                {/* Practitioners */}
                <div>
                  <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868] font-medium block mb-2.5">
                    ✦ Certified Clinical Practitioner
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {PRACTITIONERS.map((doc, idx) => (
                      <div
                        key={doc.name}
                        onClick={() => setSelectedPractitioner(idx)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all text-left ${
                          selectedPractitioner === idx
                            ? "border-[#B39868] bg-[#EEF2ED]/80 shadow-sm"
                            : "border-[#B39868]/20 bg-white hover:border-[#B39868]/60"
                        }`}
                      >
                        <p className="font-editorial text-base text-[#14221A] font-normal leading-snug">
                          {doc.name}
                        </p>
                        <p className="text-[10px] font-body text-[#B39868] mt-0.5">
                          {doc.role}
                        </p>
                        <p className="text-[10px] font-body text-[#14221A]/60 mt-1 line-clamp-1">
                          {doc.specialty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868] font-medium block mb-2">
                      Appointment Day
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {["Tomorrow", "In 2 Days", "Friday", "Saturday"].map((d) => (
                        <button
                          type="button"
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`py-2 px-3 rounded-xl border text-xs font-body transition-colors ${
                            selectedDate === d
                              ? "border-[#B39868] bg-[#14221A] text-white"
                              : "border-[#B39868]/30 bg-white text-[#14221A] hover:bg-[#EEF2ED]"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#B39868] font-medium block mb-2">
                      Available Time Slot (Dhaka Time)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-xl border text-xs font-body transition-colors ${
                            selectedSlot === slot
                              ? "border-[#B39868] bg-[#14221A] text-white"
                              : "border-[#B39868]/30 bg-white text-[#14221A] hover:bg-[#EEF2ED]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-body tracking-wider uppercase text-[#14221A]/70 hover:text-[#14221A]"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase hover:bg-[#B39868] transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to Patient Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B39868]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Patient Information Form */}
            {step === 3 && (
              <form onSubmit={handleNext} className="space-y-5">
                <div>
                  <h3 className="font-editorial text-3xl text-[#14221A] font-light">
                    Patient Credentials & Health Focus
                  </h3>
                  <p className="text-xs text-[#14221A]/70 font-body mt-1">
                    Your diagnostic data is strictly encrypted and shared only with your attending clinical nutritionist.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EEF2ED] border border-[#B39868]/20 flex items-center justify-between text-xs font-body">
                  <div>
                    <span className="font-medium text-[#14221A] block">{service.title}</span>
                    <span className="text-[#14221A]/60 text-[11px]">
                      With {PRACTITIONERS[selectedPractitioner].name} · {selectedDate} at {selectedSlot}
                    </span>
                  </div>
                  <span className="font-editorial text-xl text-[#B39868] font-normal">
                    {service.fee}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nusrat Jahan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/30 bg-white text-xs font-body focus:outline-none focus:border-[#B39868]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                      WhatsApp Mobile Number *
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
                </div>

                <div>
                  <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="nusrat@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/30 bg-white text-xs font-body focus:outline-none focus:border-[#B39868]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#14221A]/70 block mb-1.5">
                    Primary Health Focus / Symptoms
                  </label>
                  <select
                    value={formData.healthGoal}
                    onChange={(e) => setFormData({ ...formData, healthGoal: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/30 bg-white text-xs font-body focus:outline-none focus:border-[#B39868]"
                  >
                    <option value="Fatigue & Sleep Optimization">Fatigue, Brain Fog & Sleep Optimization</option>
                    <option value="Gut Health & Microbiome Balance">Gut Inflammation, IBS & Microbiome Reset</option>
                    <option value="Metabolic & Weight Management">Metabolic Health, Insulin & Healthy Weight</option>
                    <option value="Hormonal Equilibrium">Thyroid & Hormonal Equilibrium</option>
                    <option value="General Longevity & Adaptogen Regimen">General Longevity & Standardized Adaptogen Regimen</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-body tracking-wider uppercase text-[#14221A]/70 hover:text-[#14221A]"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase hover:bg-[#B39868] transition-colors shadow-lg"
                  >
                    Confirm Consultation Booking
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Success Confirmation */}
            {step === 4 && (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#EEF2ED] text-[#B39868] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium block mb-1">
                    ✦ Appointment Reserved ✦
                  </span>
                  <h3 className="font-editorial text-4xl text-[#14221A] font-light">
                    Consultation Confirmed
                  </h3>
                  <p className="text-xs text-[#14221A]/70 font-body mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#14221A]">{formData.name}</span>. Your clinical session has been scheduled with <span className="font-medium text-[#14221A]">{PRACTITIONERS[selectedPractitioner].name}</span>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#B39868]/30 max-w-md mx-auto text-left space-y-2 text-xs font-body">
                  <div className="flex justify-between">
                    <span className="text-[#14221A]/60">Consultation Reference:</span>
                    <span className="font-mono font-semibold text-[#B39868]">DN-CONSULT-7821</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#14221A]/60">Date & Slot:</span>
                    <span className="font-medium text-[#14221A]">{selectedDate} at {selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#14221A]/60">Format:</span>
                    <span className="font-medium text-[#14221A]">{service.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#14221A]/60">Practitioner Fee:</span>
                    <span className="font-editorial text-base text-[#14221A]">{service.fee} (Payable upon session)</span>
                  </div>
                </div>

                <p className="text-[11px] font-body text-[#14221A]/60">
                  A private WhatsApp invitation & clinical intake questionnaire have been dispatched to <span className="font-medium text-[#14221A]">{formData.phone}</span>.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-full bg-[#14221A] text-white text-xs font-body tracking-[0.2em] uppercase hover:bg-[#B39868] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
