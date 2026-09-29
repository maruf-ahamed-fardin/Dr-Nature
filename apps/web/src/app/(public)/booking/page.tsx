"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  CheckCircle,
  ChevronRight,
  User,
  Shield,
  Star,
  Sparkles,
} from "lucide-react";
import { DEMO_SERVICES, DEMO_CONSULTANTS } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:30 PM",
  "06:00 PM",
  "08:00 PM",
];

const HEALTH_GOALS = [
  "Weight Management & Fat Loss",
  "Gut Restoration & Digestion",
  "Diabetes & Insulin Resistance",
  "Thyroid & Hormonal Balance",
  "Chronic Fatigue & Low Energy",
  "General Vitality & Longevity",
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(DEMO_SERVICES[0]);
  const [selectedConsultant, setSelectedConsultant] = useState(DEMO_CONSULTANTS[0]);
  const [selectedDate, setSelectedDate] = useState("Tomorrow, 10:00 AM");
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [selectedGoal, setSelectedGoal] = useState(HEALTH_GOALS[0]);

  const [patientDetails, setPatientDetails] = useState({
    name: "Rahel Ahmed",
    phone: "01712345678",
    email: "rahel@example.com",
    age: "32",
    gender: "Male",
    notes: "Suffering from bloating and sleep disruption for past 3 months.",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const handleConfirm = () => {
    const code = `DNB-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(code);
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-32 pb-24">
        <div className="container-app max-w-xl">
          <div className="bg-white rounded-3xl border border-border p-8 md:p-12 text-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
              Appointment Confirmed!
            </span>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Consultation Scheduled
            </h1>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              We&apos;ve reserved your session with <strong>{selectedConsultant.user.name}</strong>. A confirmation SMS with video link instructions has been sent to <strong>{patientDetails.phone}</strong>.
            </p>

            <div className="p-5 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-border/80 text-left space-y-3 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking Pass ID:</span>
                <span className="font-mono font-bold text-foreground">{bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consultant:</span>
                <span className="font-semibold text-foreground">{selectedConsultant.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium text-foreground">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Slot:</span>
                <span className="font-medium text-foreground">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-2 font-bold">
                <span className="text-foreground">Session Fee:</span>
                <span className="text-primary font-black text-base">৳{selectedService.price}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/account/bookings">View In My Bookings</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      <div className="container-app max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 inline-flex items-center gap-1.5 bg-primary/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Direct Doctor & Nutritionist Booking
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Book Your Natural Health Consultation
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Get personalized root-cause health analysis, tailored diet plans, and ongoing practitioner guidance.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto px-4">
          {[
            { num: 1, label: "Service" },
            { num: 2, label: "Practitioner" },
            { num: 3, label: "Schedule" },
            { num: 4, label: "Details" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s.num
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.num}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:inline ${
                  step >= s.num ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold font-display text-foreground mb-4">
                Step 1: Choose Your Consultation Type
              </h2>
              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {DEMO_SERVICES.map((serv) => (
                  <div
                    key={serv.id}
                    onClick={() => setSelectedService(serv)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedService.id === serv.id
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">
                        {serv.slug === "online" ? "💻" : serv.slug === "in-person" ? "🏥" : "📋"}
                      </span>
                      <span className="text-base font-extrabold text-primary">৳{serv.price}</span>
                    </div>
                    <h3 className="font-bold text-sm text-foreground mb-1">{serv.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {serv.description}
                    </p>
                    <span className="text-[11px] font-semibold text-foreground/80 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" /> {serv.durationMin} mins session
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Continue to Select Doctor <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Consultant */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold font-display text-foreground mb-4">
                Step 2: Choose Your Health Specialist
              </h2>
              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {DEMO_CONSULTANTS.map((con) => (
                  <div
                    key={con.id}
                    onClick={() => setSelectedConsultant(con)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col ${
                      selectedConsultant.id === con.id
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative mb-4 border border-border">
                      <Image
                        src={con.imageUrl}
                        alt={con.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-sm text-foreground mb-0.5">{con.user.name}</h3>
                    <span className="text-xs text-primary font-medium mb-3">{con.specialization}</span>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
                      {con.bio}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>4.9 / 5</span>
                      <span className="text-muted-foreground ml-1">(300+ sessions)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Choose Time Slot <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Schedule Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold font-display text-foreground mb-4">
                Step 3: Select Date & Time Slot
              </h2>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">
                    Available Dates (Next 5 Days)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      "Tomorrow, Oct 1",
                      "Thursday, Oct 2",
                      "Friday, Oct 3",
                      "Saturday, Oct 4",
                    ].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          selectedDate === d
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">
                    Available Slots with {selectedConsultant.user.name}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          selectedSlot === slot
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">
                    Primary Health Focus Area
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {HEALTH_GOALS.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setSelectedGoal(goal)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          selectedGoal === goal
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        ✓ {goal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={() => setStep(4)}>
                  Patient Details <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Info & Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold font-display text-foreground mb-4">
                Step 4: Patient Information & Final Review
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientDetails.name}
                    onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Phone Number (for SMS & Video Link) *
                  </label>
                  <input
                    type="tel"
                    value={patientDetails.phone}
                    onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    value={patientDetails.age}
                    onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={patientDetails.email}
                    onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Brief Health Concerns / Current Symptoms
                  </label>
                  <textarea
                    rows={3}
                    value={patientDetails.notes}
                    onChange={(e) => setPatientDetails({ ...patientDetails, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Review summary box */}
              <div className="p-4 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-border mb-6 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session:</span>
                  <span className="font-bold text-foreground">{selectedService.name} ({selectedService.durationMin} mins)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Specialist:</span>
                  <span className="font-bold text-foreground">{selectedConsultant.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span className="font-semibold text-foreground">{selectedDate} @ {selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Focus Goal:</span>
                  <span className="font-semibold text-foreground">{selectedGoal}</span>
                </div>
                <div className="flex justify-between border-t border-border/60 pt-2 text-sm font-bold">
                  <span>Total Consultation Fee:</span>
                  <span className="text-primary text-base">৳{selectedService.price}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button size="lg" onClick={handleConfirm}>
                  Confirm & Schedule Appointment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
