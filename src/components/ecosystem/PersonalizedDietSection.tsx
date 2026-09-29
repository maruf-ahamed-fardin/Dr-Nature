"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEcosystem } from "@/lib/ecosystem-context";

// ─── Types ───────────────────────────────────────────────────
type Gender = "male" | "female";
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface UserData {
  name: string;
  phone: string;
  gender: Gender;
  age: string;
  heightFt: string;
  heightIn: string;
  currentWeight: string;
  targetWeight: string;
  healthConditions: string[];
  selectedPlan: string;
}

const HEALTH_CONDITIONS = [
  { id: "diabetes", label: "ডায়াবেটিস আছে", icon: "🩸" },
  { id: "bp", label: "উচ্চ রক্তচাপ আছে", icon: "❤️" },
  { id: "thyroid", label: "থাইরয়েড আছে", icon: "🦋" },
  { id: "fatty_liver", label: "ফ্যাটি লিভার আছে", icon: "🫁" },
  { id: "hairfall", label: "মাথার চুল পড়ে", icon: "💇" },
  { id: "acne", label: "মুখে ব্রণ আছে", icon: "😔" },
  { id: "dry_skin", label: "মুখের স্কিন ড্রাই", icon: "💧" },
  { id: "pigmentation", label: "ব্রণ/মেস্তার দাগ আছে", icon: "🔴" },
  { id: "aging", label: "বয়সের তুলনায় বয়স্ক দেখায়", icon: "🧓" },
  { id: "none", label: "কোন সমস্যা নাই", icon: "✅" },
];

const PLANS = [
  { id: "1m", label: "১ মাস", days: 30, price: 999, original: 1998, perDay: 33 },
  { id: "3m", label: "৩ মাস", days: 90, price: 1499, original: 2998, perDay: 17, popular: true },
  { id: "6m", label: "৬ মাস", days: 180, price: 1999, original: 3998, perDay: 11 },
];

function getBMI(weightKg: number, heightFt: number, heightIn: number) {
  const totalInches = heightFt * 12 + heightIn;
  const heightM = totalInches * 0.0254;
  if (heightM <= 0 || weightKg <= 0) return 0;
  return weightKg / (heightM * heightM);
}

function getIdealWeight(heightFt: number, heightIn: number, gender: Gender) {
  const totalInches = heightFt * 12 + heightIn;
  const base = gender === "male" ? 50 : 45.5;
  const extra = ((totalInches - 60) * (gender === "male" ? 2.3 : 2.3));
  return Math.max(40, Math.round(base + extra));
}

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { label: "আন্ডারওয়েট", color: "#3B82F6", emoji: "😟" };
  if (bmi < 25) return { label: "স্বাভাবিক", color: "#10B981", emoji: "😊" };
  if (bmi < 30) return { label: "ওভারওয়েট", color: "#F59E0B", emoji: "😐" };
  return { label: "স্থূলকায়", color: "#EF4444", emoji: "😔" };
}

function getWeeksToGoal(current: number, target: number) {
  const diff = Math.abs(current - target);
  return Math.ceil((diff / 0.5) / 2); // ~0.5 kg/week safe rate
}

// ─── Step Progress Bar ─────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-[#F59E0B] tracking-widest uppercase">ধাপ {step} / {total}</span>
        <span className="text-[11px] text-slate-400">{Math.round((step / total) * 100)}% সম্পন্ন</span>
      </div>
      <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#F59E0B]"
          initial={{ width: 0 }}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Input Component ───────────────────────────────────────
function Input({ label, value, onChange, type = "text", placeholder, unit }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; unit?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-800/80 border border-slate-600/60 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 rounded-2xl px-4 py-3 text-white text-sm outline-none transition-all placeholder-slate-500"
        />
        {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">{unit}</span>}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────
export function PersonalizedDietSection() {
  const { openBooking } = useEcosystem();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<UserData>({
    name: "", phone: "", gender: "female", age: "", heightFt: "5", heightIn: "4",
    currentWeight: "", targetWeight: "", healthConditions: [], selectedPlan: "3m",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});

  const update = (field: keyof UserData, value: string | string[]) =>
    setData(prev => ({ ...prev, [field]: value }));

  // Computed values
  const cw = parseFloat(data.currentWeight) || 0;
  const tw = parseFloat(data.targetWeight) || 0;
  const hFt = parseInt(data.heightFt) || 5;
  const hIn = parseInt(data.heightIn) || 4;
  const bmi = getBMI(cw, hFt, hIn);
  const bmiCat = getBMICategory(bmi);
  const idealWeight = getIdealWeight(hFt, hIn, data.gender);
  const excessKg = Math.max(0, cw - idealWeight);
  const weeksToGoal = getWeeksToGoal(cw, tw || idealWeight);
  const targetDate = new Date(Date.now() + weeksToGoal * 7 * 24 * 3600000);
  const selectedPlanInfo = PLANS.find(p => p.id === data.selectedPlan)!;

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!data.name.trim()) e.name = "নাম দিন";
    if (!data.phone.match(/^01[3-9]\d{8}$/)) e.phone = "সঠিক মোবাইল নম্বর দিন";
    if (!data.age || parseInt(data.age) < 10 || parseInt(data.age) > 100) e.age = "সঠিক বয়স দিন";
    if (!data.currentWeight || cw < 20 || cw > 300) e.currentWeight = "সঠিক ওজন দিন";
    if (!data.targetWeight || tw < 20 || tw > 300) e.targetWeight = "সঠিক লক্ষ্য ওজন দিন";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(s => Math.min(7, s + 1) as Step);
  };
  const back = () => setStep(s => Math.max(1, s - 1) as Step);

  const toggleCondition = (id: string) => {
    if (id === "none") {
      update("healthConditions", data.healthConditions.includes("none") ? [] : ["none"]);
    } else {
      const filtered = data.healthConditions.filter(c => c !== "none");
      if (filtered.includes(id)) update("healthConditions", filtered.filter(c => c !== id));
      else update("healthConditions", [...filtered, id]);
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <section id="diet-plan" className="py-20 sm:py-28 bg-[#0A1F15] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#F59E0B] text-xs font-black tracking-widest uppercase block mb-2">
            ✦ AI-Powered Nutrition Assessment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight font-serif-heading">
            আপনার <span className="text-[#F59E0B]">পার্সোনালাইজড</span><br className="hidden sm:block" /> ডায়েট প্ল্যান নিন
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
            মাত্র ২ মিনিটে আপনার স্বাস্থ্য প্রোফাইল তৈরি করুন এবং বিশেষজ্ঞ পুষ্টিবিদের তৈরি কাস্টম ডায়েট প্ল্যান পান।
          </p>
        </div>

        {/* Two-column layout: Form + Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <ProgressBar step={step} total={6} />

              <AnimatePresence mode="wait">
                {/* ── STEP 1: Personal Info ── */}
                {step === 1 && (
                  <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h3 className="text-xl font-extrabold text-white mb-1">আপনার তথ্য দিন</h3>
                    <p className="text-slate-400 text-xs mb-6">সঠিক তথ্য দিলে সঠিক ডায়েট প্ল্যান পাবেন</p>
                    <div className="space-y-4">
                      <Input label="আপনার নাম" value={data.name} onChange={v => update("name", v)} placeholder="যেমন: রহিম আহমেদ" />
                      {errors.name && <p className="text-red-400 text-xs -mt-3">{errors.name}</p>}

                      <Input label="মোবাইল নম্বর" value={data.phone} onChange={v => update("phone", v)} type="tel" placeholder="01XXXXXXXXX" />
                      {errors.phone && <p className="text-red-400 text-xs -mt-3">{errors.phone}</p>}

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">লিঙ্গ</label>
                        <div className="grid grid-cols-2 gap-3">
                          {(["female", "male"] as Gender[]).map(g => (
                            <button key={g} onClick={() => update("gender", g)}
                              className={`py-3 rounded-2xl font-bold text-sm transition-all border-2 ${data.gender === g ? "bg-[#F59E0B] border-[#F59E0B] text-[#06261E]" : "bg-slate-800 border-slate-600 text-slate-300 hover:border-[#F59E0B]/50"}`}>
                              {g === "female" ? "👩 নারী" : "👨 পুরুষ"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Input label="বয়স" value={data.age} onChange={v => update("age", v)} type="number" placeholder="28" unit="বছর" />
                          {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">উচ্চতা</label>
                          <div className="flex gap-2">
                            <select value={data.heightFt} onChange={e => update("heightFt", e.target.value)}
                              className="flex-1 bg-slate-800/80 border border-slate-600/60 focus:border-[#F59E0B] rounded-2xl px-3 py-3 text-white text-sm outline-none transition-all">
                              {[3,4,5,6,7].map(f => <option key={f} value={f}>{f} ফুট</option>)}
                            </select>
                            <select value={data.heightIn} onChange={e => update("heightIn", e.target.value)}
                              className="flex-1 bg-slate-800/80 border border-slate-600/60 focus:border-[#F59E0B] rounded-2xl px-3 py-3 text-white text-sm outline-none transition-all">
                              {Array.from({length: 12}, (_, i) => <option key={i} value={i}>{i} ইঞ্চি</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Input label="বর্তমান ওজন" value={data.currentWeight} onChange={v => update("currentWeight", v)} type="number" placeholder="70" unit="কেজি" />
                          {errors.currentWeight && <p className="text-red-400 text-xs mt-1">{errors.currentWeight}</p>}
                        </div>
                        <div>
                          <Input label="কাঙ্ক্ষিত ওজন" value={data.targetWeight} onChange={v => update("targetWeight", v)} type="number" placeholder="60" unit="কেজি" />
                          {errors.targetWeight && <p className="text-red-400 text-xs mt-1">{errors.targetWeight}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: BMI Result ── */}
                {step === 2 && (
                  <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h3 className="text-xl font-extrabold text-white mb-1">আপনার BMI রিপোর্ট</h3>
                    <p className="text-slate-400 text-xs mb-6">{data.name}, আপনার শারীরিক তথ্য বিশ্লেষণ করা হচ্ছে</p>

                    {/* BMI Score Ring */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="12" />
                          <motion.circle cx="60" cy="60" r="50" fill="none" stroke={bmiCat.color} strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={`${Math.min(bmi / 40 * 314, 314)} 314`}
                            initial={{ strokeDasharray: "0 314" }}
                            animate={{ strokeDasharray: `${Math.min(bmi / 40 * 314, 314)} 314` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl">{bmiCat.emoji}</span>
                          <span className="text-2xl font-black text-white">{bmi.toFixed(1)}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">BMI স্কোর</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="text-center mb-6">
                      <span className="inline-block px-4 py-1.5 rounded-full text-sm font-black" style={{ background: `${bmiCat.color}22`, color: bmiCat.color }}>
                        {bmiCat.label}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { label: "বর্তমান ওজন", value: `${cw} কেজি`, color: "#EF4444" },
                        { label: "আদর্শ ওজন", value: `${idealWeight} কেজি`, color: "#10B981" },
                        { label: "অতিরিক্ত", value: `${excessKg} কেজি`, color: "#F59E0B" },
                      ].map(stat => (
                        <div key={stat.label} className="bg-slate-800/60 rounded-2xl p-3 text-center border border-slate-700/50">
                          <p className="text-lg font-black" style={{ color: stat.color }}>{stat.value}</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {excessKg > 0 && (
                      <div className="bg-amber-900/30 border border-amber-700/40 rounded-2xl p-4 text-center">
                        <p className="text-amber-300 text-sm font-bold">
                          আপনার <span className="text-[#F59E0B] text-lg">{excessKg} কেজি</span> অতিরিক্ত ওজন আছে
                        </p>
                        <p className="text-slate-400 text-xs mt-1">সঠিক ডায়েট প্ল্যানে এটি কমানো সম্ভব</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 3: Weight Loss Timeline ── */}
                {step === 3 && (
                  <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h3 className="text-xl font-extrabold text-white mb-1">ওজন কমানোর টাইমলাইন</h3>
                    <p className="text-slate-400 text-xs mb-6">আমাদের বিশেষজ্ঞরা অনুমান করছেন যে —</p>

                    {/* Prediction Card */}
                    <div className="bg-gradient-to-r from-[#0D4035] to-[#06261E] rounded-2xl p-5 mb-6 border border-emerald-800/40">
                      <p className="text-white text-sm font-bold mb-1">
                        <span className="text-[#F59E0B]">{data.name}</span>, আপনি{" "}
                        <span className="text-[#10B981] font-black">{tw || idealWeight} কেজি</span> ওজনে পৌঁছাবেন
                      </p>
                      <p className="text-emerald-300 font-black text-lg">
                        {targetDate.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <p className="text-slate-400 text-xs mt-1">অনুমানিত সময়: {weeksToGoal} সপ্তাহ (~{Math.ceil(weeksToGoal/4)} মাস)</p>
                    </div>

                    {/* Progress Timeline Visual */}
                    <div className="bg-slate-800/60 rounded-2xl p-5 mb-6 border border-slate-700/50">
                      <div className="flex items-end justify-between gap-2 mb-3 h-20">
                        {Array.from({length: 6}, (_, i) => {
                          const progress = i / 5;
                          const weekWeight = cw - (cw - (tw || idealWeight)) * progress;
                          const barHeight = 20 + (i / 5) * 60;
                          return (
                            <div key={i} className="flex flex-col items-center gap-1 flex-1">
                              <span className="text-[9px] text-slate-400">{Math.round(weekWeight)}kg</span>
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${barHeight}%` }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="w-full rounded-t-lg"
                                style={{ background: `linear-gradient(to top, #F59E0B, #10B981)`, opacity: 0.3 + i * 0.14 }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>আজ ({cw}kg)</span>
                        <span>লক্ষ্য ({tw || idealWeight}kg)</span>
                      </div>
                    </div>

                    {/* Before/After */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "এখন", weight: cw, bg: "from-red-900/40 to-red-900/20", border: "border-red-800/40", color: "#EF4444", emoji: "😔" },
                        { label: "লক্ষ্য", weight: tw || idealWeight, bg: "from-emerald-900/40 to-emerald-900/20", border: "border-emerald-800/40", color: "#10B981", emoji: "😍" },
                      ].map(item => (
                        <div key={item.label} className={`bg-gradient-to-b ${item.bg} border ${item.border} rounded-2xl p-4 text-center`}>
                          <div className="text-4xl mb-2">{item.emoji}</div>
                          <p className="text-xl font-black" style={{ color: item.color }}>{item.weight} কেজি</p>
                          <p className="text-slate-400 text-xs font-semibold">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4: Health Conditions ── */}
                {step === 4 && (
                  <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h3 className="text-xl font-extrabold text-white mb-1">স্বাস্থ্য সমস্যা</h3>
                    <p className="text-slate-400 text-xs mb-6">নিরাপদ ডায়েট প্ল্যান তৈরিতে আপনার সমস্যাগুলো চিহ্নিত করুন</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {HEALTH_CONDITIONS.map(cond => {
                        const selected = data.healthConditions.includes(cond.id);
                        return (
                          <button key={cond.id} onClick={() => toggleCondition(cond.id)}
                            className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all ${selected ? "bg-[#F59E0B]/15 border-[#F59E0B] text-white" : "bg-slate-800/60 border-slate-700/50 text-slate-300 hover:border-slate-500"}`}>
                            <span className="text-xl shrink-0">{cond.icon}</span>
                            <span className="text-sm font-semibold">{cond.label}</span>
                            {selected && <span className="ml-auto text-[#F59E0B]">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 5: Plan Ready ── */}
                {step === 5 && (
                  <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-[#F59E0B]/20 border-2 border-[#F59E0B]/50 flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">🎉</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white mb-1">আপনার ডায়েট প্ল্যান প্রস্তুত!</h3>
                      <p className="text-slate-400 text-xs">পার্সোনালাইজড লো-কার্ব ডায়েট প্ল্যান তৈরি করা হয়েছে</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {[
                        { icon: "📋", title: "কাস্টম ডায়েট চার্ট", desc: "আপনার শরীর ও লক্ষ্য অনুযায়ী তৈরি লো-কার্ব মিল প্ল্যান" },
                        { icon: "🌿", title: "লাইফস্টাইল গাইড", desc: "দৈনন্দিন রুটিন ও জীবনধারা পরিবর্তনের নির্দেশিকা" },
                        { icon: "📞", title: "পুষ্টিবিদের পরামর্শ", desc: "আমাদের পুষ্টিবিদ আপনাকে ফোন করে বুঝিয়ে দেবেন" },
                        { icon: "🔄", title: "ফলোআপ সাপোর্ট", desc: "নিয়মিত ফলোআপে ওজন কমানো নিশ্চিত করা হবে" },
                      ].map(item => (
                        <div key={item.icon} className="flex items-start gap-3 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
                          <span className="text-2xl shrink-0">{item.icon}</span>
                          <div>
                            <p className="text-white font-bold text-sm">{item.title}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                          </div>
                          <span className="ml-auto text-emerald-400 shrink-0">✓</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 6: Plan Selection ── */}
                {step === 6 && (
                  <motion.div key="step6" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h3 className="text-xl font-extrabold text-white mb-1">প্ল্যান সিলেক্ট করুন</h3>
                    <p className="text-slate-400 text-xs mb-6">কত দিনের ডায়েট প্ল্যান চান?</p>
                    <div className="space-y-3 mb-6">
                      {PLANS.map(plan => (
                        <button key={plan.id} onClick={() => update("selectedPlan", plan.id)}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative ${data.selectedPlan === plan.id ? "bg-[#F59E0B]/15 border-[#F59E0B]" : "bg-slate-800/60 border-slate-700/50 hover:border-slate-500"}`}>
                          {plan.popular && (
                            <span className="absolute -top-2.5 right-4 bg-[#F59E0B] text-[#06261E] text-[10px] font-black px-3 py-0.5 rounded-full">সবচেয়ে জনপ্রিয়</span>
                          )}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-black">{plan.label} প্ল্যান</p>
                              <p className="text-slate-400 text-xs">{plan.days} দিন · মাত্র ৳{plan.perDay}/দিন</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[#F59E0B] font-black text-lg">৳{plan.price}</p>
                              <p className="text-slate-500 text-xs line-through">৳{plan.original}</p>
                              <span className="text-emerald-400 text-[10px] font-bold">50% ছাড়</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {/* Summary */}
                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
                      <p className="text-xs text-slate-400 font-semibold mb-2">অর্ডার সারসংক্ষেপ</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{selectedPlanInfo?.label} প্ল্যান</span>
                        <span className="text-white font-bold">৳{selectedPlanInfo?.price}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>সাশ্রয়</span>
                        <span className="text-emerald-400">৳{(selectedPlanInfo?.original || 0) - (selectedPlanInfo?.price || 0)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 7: Redirect to WhatsApp ── */}
                {step === 7 && (
                  <motion.div key="step7" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-[#25D366]/20 border-2 border-[#25D366]/50 flex items-center justify-center mx-auto mb-4">
                        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#25D366]">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-extrabold text-white mb-2">প্ল্যান অর্ডার করুন</h3>
                      <p className="text-slate-400 text-sm mb-6">WhatsApp-এ মেসেজ করুন অথবা সরাসরি কনসালটেশন বুক করুন</p>

                      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 mb-6 text-left space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-slate-400">নাম</span><span className="text-white font-semibold">{data.name}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-400">প্ল্যান</span><span className="text-[#F59E0B] font-bold">{selectedPlanInfo?.label} - ৳{selectedPlanInfo?.price}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-400">BMI</span><span style={{ color: bmiCat.color }} className="font-bold">{bmi.toFixed(1)} ({bmiCat.label})</span></div>
                      </div>

                      <a
                        href={`https://wa.me/8801700000000?text=${encodeURIComponent(`হ্যালো Dr Natures! আমি ${data.name}, আমি ${selectedPlanInfo?.label} ডায়েট প্ল্যান (৳${selectedPlanInfo?.price}) নিতে চাই। আমার BMI: ${bmi.toFixed(1)}, বর্তমান ওজন: ${cw}kg, লক্ষ্য: ${tw || idealWeight}kg।`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1db954] text-white font-black text-base flex items-center justify-center gap-3 transition-all shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 mb-3"
                      >
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp-এ অর্ডার করুন
                      </a>
                      <button onClick={() => openBooking("Dr. Farhana Ahmed", "Clinical Nutritionist", selectedPlanInfo?.price || 999)}
                        className="w-full py-3.5 rounded-2xl border-2 border-[#F59E0B]/50 text-[#F59E0B] font-bold text-sm hover:bg-[#F59E0B]/10 transition-all">
                        সরাসরি কনসালটেশন বুক করুন
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
                {step > 1 && (
                  <button onClick={back}
                    className="px-6 py-3 rounded-2xl border border-slate-600 text-slate-300 font-bold text-sm hover:border-slate-400 transition-all">
                    ← পূর্ববর্তী
                  </button>
                )}
                {step < 7 && (
                  <button onClick={next}
                    className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white font-black text-sm hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 transition-all">
                    {step === 5 ? "প্ল্যান দেখুন →" : step === 6 ? "অর্ডার করুন →" : "পরবর্তী →"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Trust Signals */}
          <div className="lg:col-span-5 space-y-5">
            {/* Why Dr Natures */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-3xl p-6">
              <h4 className="text-white font-extrabold text-base mb-4">কেন Dr Natures বেছে নেবেন?</h4>
              <div className="space-y-3">
                {[
                  { icon: "🧬", title: "বিজ্ঞানভিত্তিক পুষ্টি পরিকল্পনা", desc: "প্রতিটি ডায়েট প্ল্যান ক্লিনিক্যালি যাচাইকৃত" },
                  { icon: "👩‍⚕️", title: "অভিজ্ঞ পুষ্টিবিদ দল", desc: "৫+ বছরের অভিজ্ঞতাসম্পন্ন ক্লিনিক্যাল নিউট্রিশনিস্ট" },
                  { icon: "📊", title: "১৪,০০০+ সফল রোগী", desc: "সারা বাংলাদেশে প্রমাণিত ফলাফল" },
                  { icon: "🔄", title: "৩০ দিনের ফলোআপ গ্যারান্টি", desc: "ফলাফল না পেলে সম্পূর্ণ রিফান্ড" },
                ].map(item => (
                  <div key={item.icon} className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-white font-bold text-sm">{item.title}</p>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-[#0D4035] to-[#06261E] border border-emerald-800/40 rounded-3xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({length: 5}).map((_, i) => <span key={i} className="text-[#F59E0B] text-sm">★</span>)}
                <span className="text-emerald-400 text-xs font-bold ml-2">যাচাইকৃত রিভিউ</span>
              </div>
              <p className="text-slate-200 text-sm italic leading-relaxed mb-4">
                "৩ মাসের প্ল্যানে ১২ কেজি ওজন কমেছে। পুষ্টিবিদ নিয়মিত ফলোআপ করেন, এটা সবচেয়ে বড় সুবিধা।"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] font-black">
                  F
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Fatema Begum</p>
                  <p className="text-emerald-400 text-xs">Mirpur, Dhaka · ৩ মাস আগে</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "14K+", label: "সফল রোগী" },
                { value: "4.9★", label: "রেটিং" },
                { value: "98%", label: "সন্তুষ্টি" },
              ].map(stat => (
                <div key={stat.label} className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4 text-center">
                  <p className="text-[#F59E0B] font-black text-xl">{stat.value}</p>
                  <p className="text-slate-400 text-[10px] font-semibold mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
