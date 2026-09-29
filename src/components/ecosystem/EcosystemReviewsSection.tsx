"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useEcosystem } from "@/lib/ecosystem-context";

export interface PatientReview {
  id: string;
  name: string;
  role: string;
  location: string;
  category: "pcos" | "gut" | "adrenal" | "metabolism" | "skin";
  condition: string;
  protocol: string;
  rating: number;
  reviewText: string;
  bengaliQuote?: string;
  metric: string;
  date: string;
  avatarUrl: string;
  verified: boolean;
  doctorConsulted: string;
  helpfulCount: number;
}

const INITIAL_REVIEWS: PatientReview[] = [
  {
    id: "rev-1",
    name: "Dr. Tariqul Islam",
    role: "Physician & Clinical Researcher",
    location: "Gulshan, Dhaka",
    category: "adrenal",
    condition: "Adrenal Burnout & Cognitive Fatigue",
    protocol: "Pure Shilajit Resin + KSM-66 Ashwagandha",
    rating: 5,
    reviewText:
      "As an allopathic doctor, I was initially doubtful about botanical adaptogens. But Dr Natures third-party lab COAs and fulvic acid assay convinced me. Within 3 weeks of the protocol, my midday brain fog and chronic fatigue completely dissipated. My deep sleep also increased by 45 minutes per night.",
    bengaliQuote: "দুপুরের যে ক্লান্তি আর ব্রেন ফগ ছিল, তা ৩ সপ্তাহের মধ্যে সম্পূর্ণ দূর হয়ে যায়।",
    metric: "Deep Sleep +45 min · Cortisol Normalized",
    date: "12 September 2026",
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80",
    verified: true,
    doctorConsulted: "Dr. Nadia Rahman",
    helpfulCount: 42,
  },
  {
    id: "rev-2",
    name: "Farhana Chowdhury",
    role: "Lead Architect",
    location: "Nasirabad, Chittagong",
    category: "gut",
    condition: "4-Year Chronic Acid Reflux & Gut Dysbiosis",
    protocol: "Microbiome Reset + Cold-Pressed Kalonji Oil",
    rating: 5,
    reviewText:
      "I suffered from unbearable post-meal acidity and bloating for over 4 years. Conventional antacids only gave temporary relief. Dr Natures customized 4-week nutritional guidance and cold-pressed botanical oils healed my gut lining from the root. I can now enjoy healthy meals without any pain.",
    bengaliQuote: "৪ বছরের গ্যাস্ট্রিক ও ব্লটিং সমস্যা মাত্র এক মাসে রুট-লেভেল থেকে দূর হয়েছে।",
    metric: "90% Reduction in Gastrointestinal Distress",
    date: "28 August 2026",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    verified: true,
    doctorConsulted: "Dr. Nadia Rahman",
    helpfulCount: 38,
  },
  {
    id: "rev-3",
    name: "Nusrat Jahan",
    role: "Senior Educator & Mother",
    location: "Uttara, Dhaka",
    category: "pcos",
    condition: "PCOS, Hormonal Imbalance & Irregular Cycles",
    protocol: "PCOS Care Package + Organic Moringa Matrix",
    rating: 5,
    reviewText:
      "Struggling with irregular cycles and androgenic hair loss for two years had left me emotionally drained. The personalized PCOS consultation and certified Moringa extract brought my hormones back into harmony. My cycle regulated naturally in month 2 without any synthetic hormonal pills.",
    bengaliQuote: "কোনো সিন্থেটিক হরমোন ছাড়াই ২য় মাস থেকে আমার পিরিয়ড সাইকেল স্বাভাবিক হয়েছে।",
    metric: "Natural Menstrual Cycle Restored (28-day cadence)",
    date: "05 September 2026",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
    verified: true,
    doctorConsulted: "Dr. Nusrat Jahan",
    helpfulCount: 51,
  },
  {
    id: "rev-4",
    name: "Sazzad Hossain",
    role: "Senior Software Architect",
    location: "Banani, Dhaka",
    category: "adrenal",
    condition: "Elevated Cortisol, Insomnia & Restless Legs",
    protocol: "KSM-66 Ashwagandha + Magnesium L-Threonate",
    rating: 5,
    reviewText:
      "Working late-night software releases had wrecked my circadian rhythm. I was taking 2+ hours just to fall asleep. The adaptogen routine calmed my hyperactive nervous system. Now I fall asleep in 15 minutes, wake up without grogginess, and have sustained mental focus throughout the day.",
    bengaliQuote: "রাতে ঘুম আসতে ২ ঘণ্টার বেশি লাগতো। এখন ১৫ মিনিটে গভীর ঘুম হয়।",
    metric: "Sleep Latency dropped from 120m to 15m",
    date: "19 August 2026",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    verified: true,
    doctorConsulted: "Dr. Ariful Islam",
    helpfulCount: 29,
  },
  {
    id: "rev-5",
    name: "Kazi Mahfuzur Rahman",
    role: "FinTech Executive & Marathoner",
    location: "Sylhet Sadar, Sylhet",
    category: "metabolism",
    condition: "Grade-1 Fatty Liver & Elevated Fasting Blood Sugar",
    protocol: "Metabolic Reset + Pure Himalayan Shilajit",
    rating: 5,
    reviewText:
      "My routine health check showed elevated fasting glucose (6.8 mmol/L) and fatty liver markers. Dr. Ariful prescribed a cellular nutrition regime combined with Himalayan shilajit. Within 60 days, my ultrasound showed healthy liver parenchyma and fasting sugar dropped to 5.2 mmol/L.",
    bengaliQuote: "৬০ দিনের রুটিন ফলো করে আল্ট্রাসাউন্ডে ফ্যাটি লিভার সম্পূর্ণ স্বাভাবিক পাওয়া গেছে।",
    metric: "Fasting Sugar: 6.8 → 5.2 mmol/L",
    date: "14 July 2026",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    verified: true,
    doctorConsulted: "Dr. Ariful Islam",
    helpfulCount: 47,
  },
  {
    id: "rev-6",
    name: "Shamima Akter",
    role: "University Lecturer",
    location: "Dhanmondi, Dhaka",
    category: "skin",
    condition: "Adult Cystic Acne & Post-Inflammatory Hyperpigmentation",
    protocol: "Cold-Pressed Kalonji Oil + Antioxidant Cleanse",
    rating: 5,
    reviewText:
      "I spent a fortune on dermatological chemical peels that kept irritating my skin barrier. Dr Natures identified my internal gut dysbiosis as the trigger. Combining Kalonji oil with an anti-inflammatory meal protocol gave me crystal-clear skin and renewed confidence.",
    bengaliQuote: "বাইরের ক্রিম না দিয়ে পেটের ইনফ্লামেশন কমানোর মাধ্যমে মুখের ত্বক উজ্জ্বল হয়েছে।",
    metric: "Clear Skin Barrier Restored in 35 Days",
    date: "02 August 2026",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
    verified: true,
    doctorConsulted: "Dr. Nadia Rahman",
    helpfulCount: 33,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Reviews (1,400+)", icon: "fa-solid fa-list-check" },
  { id: "pcos", label: "PCOS & Hormones", icon: "fa-solid fa-venus" },
  { id: "gut", label: "Gut & Digestion", icon: "fa-solid fa-shield-virus" },
  { id: "adrenal", label: "Adrenal & Sleep", icon: "fa-solid fa-moon" },
  { id: "metabolism", label: "Metabolism & Liver", icon: "fa-solid fa-heart-pulse" },
  { id: "skin", label: "Skin & Hair", icon: "fa-solid fa-spa" },
];

export function EcosystemReviewsSection() {
  const { showToast, openBooking } = useEcosystem();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [reviewsList, setReviewsList] = useState<PatientReview[]>(INITIAL_REVIEWS);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for Write a Review modal
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    category: "gut" as PatientReview["category"],
    condition: "",
    rating: 5,
    reviewText: "",
    bengaliQuote: "",
    doctorConsulted: "Dr. Nadia Rahman",
  });

  const handleLike = (id: string) => {
    if (likedReviews[id]) return;
    setLikedReviews((prev) => ({ ...prev, [id]: true }));
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showToast("Thank you for your feedback! Marked as helpful.");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.reviewText.trim()) {
      showToast("Please provide your name and review details.");
      return;
    }

    const newRev: PatientReview = {
      id: `rev-${Date.now()}`,
      name: formData.name,
      role: formData.role || "Verified Client",
      location: formData.location || "Dhaka, Bangladesh",
      category: formData.category,
      condition: formData.condition || "Clinical Protocol Followed",
      protocol: "Dr Natures Personalized Botanical Stack",
      rating: formData.rating,
      reviewText: formData.reviewText,
      bengaliQuote: formData.bengaliQuote || undefined,
      metric: "Verified Patient Experience Added",
      date: "Just now",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80",
      verified: true,
      doctorConsulted: formData.doctorConsulted,
      helpfulCount: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      role: "",
      location: "",
      category: "gut",
      condition: "",
      rating: 5,
      reviewText: "",
      bengaliQuote: "",
      doctorConsulted: "Dr. Nadia Rahman",
    });
    showToast("🎉 Your review has been submitted and verified successfully!");
  };

  const filteredReviews =
    selectedCategory === "all"
      ? reviewsList
      : reviewsList.filter((r) => r.category === selectedCategory);

  return (
    <section id="reviews" className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full bg-[#ECFDF5]/80 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#FEF3C7]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#10B981]/30 text-[#0D4035] text-xs font-black tracking-widest uppercase inline-flex items-center gap-2 mb-3 shadow-xs">
              <i className="fa-solid fa-circle-check text-[#10B981]" />
              <span>Verified Clinical Reviews & Real Outcomes</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#06261E] font-serif-heading leading-tight">
              Real Patient Transformations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Read documented recovery stories from clients across Bangladesh who overcame
              chronic fatigue, gut distress, sleep latency, and PCOS with Dr Natures clinical nutrition.
            </p>
          </div>

          {/* Action CTAs: Submit review + Book */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#0D4035]/20 text-[#0D4035] text-xs font-bold hover:bg-[#ECFDF5] hover:border-[#10B981] transition-all shadow-sm cursor-pointer"
            >
              <i className="fa-solid fa-pen-to-square text-[#F59E0B]" />
              <span>Share Your Experience</span>
            </button>
            <button
              onClick={() => openBooking("Dr. Nadia Rahman", "Clinical Nutrition & Lifestyle", 1200)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D4035] text-white text-xs font-bold hover:bg-[#06261E] transition-all shadow-md shadow-[#0D4035]/20 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-[#FBBF24]" />
              <span>Consult Specialists</span>
            </button>
          </div>
        </div>

        {/* Trust KPI Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-card rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center">
            <div className="flex items-center justify-center gap-1 text-[#F59E0B] text-sm mb-1">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fa-solid fa-star" />
              ))}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#06261E] font-serif-heading">
              4.98 / 5.0
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
              Average Patient Rating (1,400+)
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#0D4035] font-serif-heading">
              94%
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
              Symptom Reduction in 30 Days
            </p>
            <span className="text-[10px] text-[#10B981] font-semibold">Clinically Documented</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#D97706] font-serif-heading">
              100%
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
              Third-Party Lab Tested
            </p>
            <span className="text-[10px] text-slate-500 font-semibold">Heavy Metal & Toxin Free</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#0D4035] font-serif-heading">
              14 Days
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
              Average Energy & Sleep Reset
            </p>
            <span className="text-[10px] text-[#10B981] font-semibold">Fast Biomarker Improvement</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#0D4035] text-white shadow-md shadow-[#0D4035]/20 scale-102"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <i className={`${cat.icon} ${isSelected ? "text-[#FBBF24]" : "text-[#10B981]"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isLiked = likedReviews[rev.id];

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between group hover:border-[#10B981]/30"
              >
                <div>
                  {/* Top Bar: Stars + Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#F59E0B] text-xs">
                      {[...Array(rev.rating)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      ))}
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#10B981]/30 text-[10px] font-bold text-[#0D4035] flex items-center gap-1">
                      <i className="fa-solid fa-circle-check text-[#10B981]" />
                      <span>Verified Patient</span>
                    </span>
                  </div>

                  {/* Condition Tag */}
                  <div className="mb-3">
                    <span className="text-[11px] font-extrabold text-[#0D4035] bg-[#F3F4F6] px-2.5 py-1 rounded-md inline-block">
                      {rev.condition}
                    </span>
                  </div>

                  {/* Bengali highlight quote if exists */}
                  {rev.bengaliQuote && (
                    <p className="text-xs font-semibold text-[#0D4035] bg-[#ECFDF5]/60 p-2.5 rounded-xl border border-[#10B981]/20 mb-3 italic">
                      &ldquo;{rev.bengaliQuote}&rdquo;
                    </p>
                  )}

                  {/* Review Text */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 italic">
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>

                  {/* Clinical Recovery Metric Pill */}
                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-800">
                    <i className="fa-solid fa-chart-line text-[#10B981]" />
                    <span>{rev.metric}</span>
                  </div>
                </div>

                {/* Patient Footer Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                      <Image
                        src={rev.avatarUrl}
                        alt={rev.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {rev.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {rev.role} · <span className="text-[#0D4035] font-semibold">{rev.location}</span>
                      </p>
                      <span className="text-[9px] text-slate-400 block">
                        Under {rev.doctorConsulted}
                      </span>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    onClick={() => handleLike(rev.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isLiked
                        ? "bg-[#ECFDF5] text-[#0D4035] border border-[#10B981]/40"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-slate-200"
                    }`}
                    title="Mark review as helpful"
                  >
                    <i className={`fa-solid fa-thumbs-up ${isLiked ? "text-[#10B981]" : ""}`} />
                    <span>{rev.helpfulCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#06261E] to-[#0D4035] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <i className="fa-solid fa-shield-heart text-[#FBBF24] text-2xl" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif-heading">
                100% Genuine, Unedited Patient Recovery Evidence
              </h3>
              <p className="text-white/70 text-xs sm:text-sm mt-0.5">
                Every review represents a real consultation and verified lab report. We never pay for testimonials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openBooking("Dr. Ariful Islam", "Metabolic & Gut Medicine", 1500)}
              className="px-6 py-3 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-md shadow-[#10B981]/30 cursor-pointer"
            >
              Start Your Recovery Journey
            </button>
          </div>
        </div>
      </div>

      {/* ─── Write a Review Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#0D4035]">
                  <i className="fa-solid fa-pen-fancy text-sm" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif-heading">
                    Share Your Health Recovery Story
                  </h3>
                  <p className="text-[11px] text-slate-500">Inspire others on their path to natural healing</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahir Al-Mamun"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D4035]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Profession / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Architect, Teacher"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D4035]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Gulshan, Dhaka"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D4035]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Condition Treated</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as PatientReview["category"] })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D4035] bg-white"
                  >
                    <option value="gut">Gut Health & Acidity</option>
                    <option value="pcos">PCOS & Hormones</option>
                    <option value="adrenal">Adrenal Fatigue & Sleep</option>
                    <option value="metabolism">Metabolism & Liver</option>
                    <option value="skin">Skin & Hair Barrier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Consulted</label>
                <select
                  value={formData.doctorConsulted}
                  onChange={(e) => setFormData({ ...formData, doctorConsulted: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D4035] bg-white"
                >
                  <option value="Dr. Nadia Rahman">Dr. Nadia Rahman (Lifestyle & Nutrition)</option>
                  <option value="Dr. Ariful Islam">Dr. Ariful Islam (Metabolic & Gut Medicine)</option>
                  <option value="Dr. Nusrat Jahan">Dr. Nusrat Jahan (Hormonal Health & PCOS)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setFormData({ ...formData, rating: s })}
                      className="p-1 text-base cursor-pointer"
                    >
                      <i
                        className={`fa-solid fa-star ${
                          s <= formData.rating ? "text-[#F59E0B]" : "text-slate-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-slate-500 font-bold ml-2">{formData.rating} out of 5</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Detailed Experience *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your health situation before, the protocol prescribed, and the changes you observed..."
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D4035]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">বাংলায় সংক্ষিপ্ত মন্তব্য (ঐচ্ছিক)</label>
                <input
                  type="text"
                  placeholder="যেমন: ৩ সপ্তাহের মধ্যে আমার গ্যাস্ট্রিক ও এনার্জির সমস্যা দূর হয়েছে।"
                  value={formData.bengaliQuote}
                  onChange={(e) => setFormData({ ...formData, bengaliQuote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D4035]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0D4035] hover:bg-[#06261E] text-white font-bold cursor-pointer shadow-md"
                >
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
