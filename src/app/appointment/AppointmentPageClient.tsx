"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  FileText,
  MapPin,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import { DEMO_CONSULTANTS } from "@/lib/demo-data";

const SERVICES = [
  {
    id: 0,
    title: "Private Tele-Nutrition Consultation",
    format: "Encrypted HD Video",
    fee: "৳800",
    duration: "45 Minutes",
    desc: "Comprehensive diagnostic assessment via private video call. Personalized adaptogen regimen, bio-individual diet plan, and 7-day direct WhatsApp follow-up.",
    icon: Video,
    popular: true,
  },
  {
    id: 1,
    title: "In-Clinic Functional Assessment",
    format: "Banani, Dhaka Flagship",
    fee: "৳1,500",
    duration: "60 Minutes",
    desc: "Face-to-face evaluation at our Banani clinic. Body composition analysis, tongue & pulse diagnostic mapping, and freshly customized herbal formulation.",
    icon: Building2,
    popular: false,
  },
  {
    id: 2,
    title: "4-Week Custom Microbiome Protocol",
    format: "Transformative 28-Day Care",
    fee: "৳2,500",
    duration: "28 Days",
    desc: "Complete gut lining restoration: 2 one-on-one sessions, 28-day meal blueprint, targeted adaptogenic support, and daily practitioner WhatsApp check-ins.",
    icon: Sparkles,
    popular: false,
  },
];

const TIME_SLOTS = [
  "10:30 AM",
  "12:00 PM",
  "02:30 PM",
  "04:30 PM",
  "06:00 PM",
  "07:30 PM",
];

export function AppointmentPageClient() {
  const [selectedService, setSelectedService] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Nadia Islam");
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("02:30 PM");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [healthConcern, setHealthConcern] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const activeService = SERVICES[selectedService];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const ref = `DN-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr Natures Clinic! I have booked an appointment.\n\nBooking Ref: ${bookingRef}\nService: ${activeService.title}\nDoctor: ${selectedDoctor}\nDate/Time: ${selectedDate} at ${selectedTime}\nPatient Name: ${fullName}\nPhone: ${phone}`
  );

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAFBF8] min-h-screen text-[#14221A]">
      {/* ─── Hero Header Banner ─── */}
      <section className="relative py-12 sm:py-16 bg-[#EEF2ED]/60 border-b border-[#B39868]/25 overflow-hidden">
        <div className="container-app relative z-10 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-body tracking-[0.2em] uppercase text-[#14221A]/60 mb-4">
            <Link href="/" className="hover:text-[#126336] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#126336] font-semibold">Appointment Booking</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#126336]/10 border border-[#126336]/25 text-[#126336] text-xs font-body tracking-[0.2em] uppercase font-semibold mb-5">
            <Calendar className="w-3.5 h-3.5 text-[#B39868]" />
            <span>Direct Clinical Scheduling</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light tracking-tight leading-tight mb-4">
            Schedule Your Clinical <br />
            <span className="italic text-[#126336]">Consultation Session</span>
          </h1>

          <p className="font-body text-[#14221A]/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Choose your preferred clinical package, select your nutritionist, and reserve a private appointment.
            Sessions are conducted in-clinic in Banani, Dhaka, or worldwide via encrypted HD video.
          </p>
        </div>
      </section>

      {/* ─── Booking Form & Details ─── */}
      <section className="py-12 sm:py-16">
        <div className="container-app max-w-5xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-[#B39868]/40 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-lg space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/40 text-[#126336] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-body tracking-[0.25em] uppercase text-[#B39868] font-semibold">
                  Appointment Confirmed
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#14221A] font-medium">
                  We look forward to seeing you, {fullName}!
                </h2>
                <p className="font-body text-xs text-[#14221A]/70">
                  Reference Code: <span className="font-bold text-[#126336]">{bookingRef}</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#EEF2ED] border border-[#B39868]/25 text-left text-xs font-body space-y-2">
                <div className="flex justify-between py-1 border-b border-[#B39868]/20">
                  <span className="text-[#14221A]/60">Service:</span>
                  <span className="font-medium text-[#14221A]">{activeService.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#B39868]/20">
                  <span className="text-[#14221A]/60">Practitioner:</span>
                  <span className="font-medium text-[#14221A]">{selectedDoctor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#B39868]/20">
                  <span className="text-[#14221A]/60">Date &amp; Time:</span>
                  <span className="font-medium text-[#14221A]">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#14221A]/60">Consultation Fee:</span>
                  <span className="font-bold text-[#126336]">{activeService.fee}</span>
                </div>
              </div>

              <p className="text-xs font-body text-[#14221A]/70">
                Our patient care desk has dispatched your booking intake form. You may also connect immediately via WhatsApp:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#126336] hover:bg-[#14221A] text-white text-xs font-body tracking-[0.16em] uppercase font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#B39868]" />
                  <span>Confirm on WhatsApp</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#B39868]/40 text-[#14221A] hover:bg-[#FAFBF8] text-xs font-body tracking-[0.16em] uppercase font-medium transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 sm:gap-12">
              {/* Left Column: Form & Stepper */}
              <div className="lg:col-span-7 space-y-8">
                {/* Step 1: Select Service */}
                <div className="bg-white rounded-3xl border border-[#B39868]/30 p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#B39868]/20">
                    <span className="w-6 h-6 rounded-full bg-[#126336] text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <h3 className="font-editorial text-xl text-[#14221A] font-semibold">
                      Select Consultation Service
                    </h3>
                  </div>

                  <div className="grid gap-3">
                    {SERVICES.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          selectedService === s.id
                            ? "border-[#126336] bg-[#126336]/5 shadow-sm ring-1 ring-[#126336]/30"
                            : "border-[#B39868]/25 hover:border-[#126336]/50 bg-[#FAFBF8]"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-editorial text-lg text-[#14221A] font-semibold">
                              {s.title}
                            </span>
                            {s.popular && (
                              <span className="px-2 py-0.5 rounded-full bg-[#126336] text-white text-[9px] uppercase tracking-wider font-semibold">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-body text-[#14221A]/70 leading-relaxed font-light">
                            {s.desc}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] font-body text-[#126336] pt-1">
                            <span>{s.duration}</span>
                            <span>·</span>
                            <span>{s.format}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-editorial text-xl font-bold text-[#126336]">
                            {s.fee}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Specialist */}
                <div className="bg-white rounded-3xl border border-[#B39868]/30 p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#B39868]/20">
                    <span className="w-6 h-6 rounded-full bg-[#126336] text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <h3 className="font-editorial text-xl text-[#14221A] font-semibold">
                      Choose Your Nutritionist
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {DEMO_CONSULTANTS.map((doc) => {
                      const isSelected = selectedDoctor === doc.user.name;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDoctor(doc.user.name)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center space-y-2 ${
                            isSelected
                              ? "border-[#126336] bg-[#126336]/5 ring-1 ring-[#126336]/30 shadow-sm"
                              : "border-[#B39868]/25 hover:border-[#126336]/50 bg-[#FAFBF8]"
                          }`}
                        >
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mx-auto border border-[#B39868]/40">
                            {doc.imageUrl ? (
                              <Image
                                src={doc.imageUrl}
                                alt={doc.user.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Stethoscope className="w-6 h-6 text-[#126336] m-auto" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-editorial text-base text-[#14221A] font-semibold leading-tight">
                              {doc.user.name}
                            </h4>
                            <p className="text-[10px] font-body text-[#B39868] mt-0.5 line-clamp-1">
                              {doc.specialization}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Schedule Date & Time Slot */}
                <div className="bg-white rounded-3xl border border-[#B39868]/30 p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#B39868]/20">
                    <span className="w-6 h-6 rounded-full bg-[#126336] text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <h3 className="font-editorial text-xl text-[#14221A] font-semibold">
                      Preferred Date &amp; Time
                    </h3>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-3 gap-2">
                    {["Today (Urgent)", "Tomorrow", "In 2 Days"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className={`py-2 px-3 rounded-xl text-xs font-body font-medium transition-colors ${
                          selectedDate === d
                            ? "bg-[#126336] text-white"
                            : "bg-[#EEF2ED]/70 border border-[#B39868]/25 text-[#14221A]/80 hover:border-[#126336]"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-body font-medium transition-colors flex items-center justify-center gap-1.5 ${
                          selectedTime === t
                            ? "bg-[#126336] text-white"
                            : "bg-white border border-[#B39868]/30 text-[#14221A]/80 hover:border-[#126336]"
                        }`}
                      >
                        <Clock className="w-3 h-3 text-[#B39868]" />
                        <span>{t}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Patient Details */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl border border-[#B39868]/30 p-6 sm:p-8 shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#B39868]/20">
                    <span className="w-6 h-6 rounded-full bg-[#126336] text-white text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <h3 className="font-editorial text-xl text-[#14221A] font-semibold">
                      Your Details &amp; Health Objective
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-body uppercase tracking-wider text-[#14221A]/70 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Tariqul Islam"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/35 text-xs font-body focus:outline-none focus:border-[#126336]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-body uppercase tracking-wider text-[#14221A]/70 block mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1700-000000"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/35 text-xs font-body focus:outline-none focus:border-[#126336]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-body uppercase tracking-wider text-[#14221A]/70 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tariqul@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/35 text-xs font-body focus:outline-none focus:border-[#126336]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-body uppercase tracking-wider text-[#14221A]/70 block mb-1">
                      Current Health Concern / Symptoms
                    </label>
                    <textarea
                      rows={3}
                      value={healthConcern}
                      onChange={(e) => setHealthConcern(e.target.value)}
                      placeholder="e.g. Chronic digestive bloating, low morning energy, high stress..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#B39868]/35 text-xs font-body focus:outline-none focus:border-[#126336]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#126336] hover:bg-[#14221A] text-white text-xs font-body tracking-[0.18em] uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Confirm &amp; Reserve Appointment</span>
                    <ArrowRight className="w-4 h-4 text-[#B39868]" />
                  </button>
                </form>
              </div>

              {/* Right Column: Appointment Summary & Clinic Guarantee */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl border border-[#B39868]/35 p-6 sm:p-7 shadow-sm sticky top-28 space-y-6">
                  <div>
                    <span className="text-[10px] font-body tracking-[0.24em] uppercase text-[#126336] font-semibold block mb-1">
                      ✦ Booking Summary
                    </span>
                    <h3 className="font-editorial text-2xl text-[#14221A] font-semibold">
                      Your Consultation File
                    </h3>
                  </div>

                  <div className="space-y-3 pb-6 border-b border-[#B39868]/20 text-xs font-body">
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#14221A]/60">Consultation:</span>
                      <span className="font-medium text-[#14221A] text-right">{activeService.title}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#14221A]/60">Doctor:</span>
                      <span className="font-medium text-[#126336]">{selectedDoctor}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#14221A]/60">Scheduled Date:</span>
                      <span className="font-medium text-[#14221A]">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#14221A]/60">Time Slot:</span>
                      <span className="font-medium text-[#14221A]">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-t border-[#B39868]/20 pt-3">
                      <span className="font-semibold text-[#14221A]">Total Payable:</span>
                      <span className="font-editorial text-2xl font-bold text-[#126336]">{activeService.fee}</span>
                    </div>
                  </div>

                  {/* Clinic Guarantee Badges */}
                  <div className="space-y-2.5 text-xs font-body text-[#14221A]/75">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#126336] shrink-0" />
                      <span>Encrypted, confidential clinical environment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#126336] shrink-0" />
                      <span>Direct 7-day post-consultation WhatsApp window</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#126336] shrink-0" />
                      <span>Personalized adaptogen &amp; dietary protocol design</span>
                    </div>
                  </div>

                  {/* Flagship Clinic Card */}
                  <div className="p-4 rounded-2xl bg-[#EEF2ED] border border-[#B39868]/25 text-xs font-body space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-[#14221A]">
                      <MapPin className="w-3.5 h-3.5 text-[#B39868]" />
                      <span>Dhaka Flagship Clinic</span>
                    </div>
                    <p className="text-[#14221A]/70 text-[11px]">
                      House 14, Road 11, Banani, Dhaka-1213
                    </p>
                    <p className="text-[10px] text-[#126336] font-semibold">
                      Open Daily 9:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
