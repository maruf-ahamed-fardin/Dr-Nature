"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useEcosystem } from "@/lib/ecosystem-context";

export interface YouTubeVideoItem {
  id: string;
  title: string;
  bengaliTitle?: string;
  clientOrSpeaker: string;
  role: string;
  location: string;
  condition: string;
  category: "patient-story" | "doctor-masterclass" | "pcos-recovery" | "gut-health";
  youtubeId: string;
  duration: string;
  views: string;
  thumbnailUrl: string;
  keyQuote: string;
  metric: string;
}

// Helper to sanitize any youtube URL or ID
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "dQw4w9WgXcQ";
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

const YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: "yt-2",
    title: "How Severe Chronic Fatigue & Brain Fog Dissolved in 3 Weeks",
    bengaliTitle: "দুপুরের ক্লান্তি ও অনিদ্রা দূর করার বাস্তব রিকভারি স্টোরি",
    clientOrSpeaker: "Sazzad Hossain",
    role: "Senior Software Architect",
    location: "Gulshan, Dhaka",
    condition: "Adrenal Burnout & Chronic Fatigue",
    category: "patient-story",
    youtubeId: "dQw4w9WgXcQ",
    duration: "2:45 min",
    views: "18.9K views",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    keyQuote:
      "I was drinking 5 cups of coffee just to survive the afternoon. Pure Himalayan Shilajit and circadian timing reset my cellular mitochondria.",
    metric: "Natural Stamina Restored · 0 Midday Crashes",
  },
  {
    id: "yt-3",
    title: "Overcoming Restless Nights & Cortisol Spikes Without Sleeping Pills",
    bengaliTitle: "স্লিপিং পিল ছাড়াই গভীর ও স্বাভাবিক ঘুমের অভিজ্ঞতা",
    clientOrSpeaker: "Farhan Ahmed",
    role: "Creative Director",
    location: "Dhanmondi, Dhaka",
    condition: "Elevated Cortisol & Sleep Latency",
    category: "patient-story",
    youtubeId: "dQw4w9WgXcQ",
    duration: "2:15 min",
    views: "9.8K views",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    keyQuote:
      "I used to wake up at 3 AM with racing thoughts. With KSM-66 Ashwagandha and evening routine guidance, I sleep peacefully through the night.",
    metric: "Deep Sleep Time Increased by 45 Minutes",
  },
  {
    id: "yt-4",
    title: "Postpartum Energy, Hair Recovery & Hormonal Vitality with Pure Botanicals",
    bengaliTitle: "সন্তান জন্মের পর হরমোনাল ভারসাম্য ও চুল পড়ার সমাধান",
    clientOrSpeaker: "Nusrat Jahan",
    role: "Educator & Mother",
    location: "Uttara, Dhaka",
    condition: "Postpartum Nutrient Depletion & PCOS",
    category: "pcos-recovery",
    youtubeId: "dQw4w9WgXcQ",
    duration: "2:50 min",
    views: "22.4K views",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    keyQuote:
      "The heavy-metal tested Moringa leaf and cold-pressed Kalonji oil replenished my micronutrients while nursing with absolute safety.",
    metric: "Natural Menstrual Cadence Restored",
  },
  {
    id: "yt-5",
    title: "Clinical Masterclass: The Truth About Heavy Metals in Shilajit & Herbs",
    bengaliTitle: "ডা. আরিফুল ইসলাম: ভেষজ ওষুধের কোয়ালিটি ও ল্যাব টেস্টের গুরুত্ব",
    clientOrSpeaker: "Dr. Ariful Islam",
    role: "Clinical Lead & Researcher",
    location: "Dr Natures Research Lab",
    condition: "Standardization & Purity Science",
    category: "doctor-masterclass",
    youtubeId: "dQw4w9WgXcQ",
    duration: "4:30 min",
    views: "31.5K views",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80",
    keyQuote:
      "Why over-the-counter herbal supplements fail: Understanding fulvic acid concentration, microbial screening, and certificate of analysis (COA).",
    metric: "100% Third-Party Lab Certified Data",
  },
];

export function EcosystemVideoReviewsSection() {
  const { openBooking } = useEcosystem();
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "patient-story" | "doctor-masterclass">("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeVideo]);

  const filteredVideos =
    activeTab === "all"
      ? YOUTUBE_VIDEOS
      : YOUTUBE_VIDEOS.filter((v) =>
          activeTab === "patient-story"
            ? v.category === "patient-story" || v.category === "pcos-recovery" || v.category === "gut-health"
            : v.category === "doctor-masterclass"
        );

  return (
    <section id="video-stories" className="py-24 bg-gradient-to-b from-[#06261E] via-[#0D4035] to-[#06261E] text-white relative overflow-hidden border-t border-b border-[#10B981]/20">
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-black tracking-widest uppercase inline-flex items-center gap-2 mb-3 shadow-xs">
              <i className="fa-brands fa-youtube text-red-500 text-sm" />
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif-heading leading-tight" />
            <p className="text-white/70 text-sm sm:text-base mt-3 leading-relaxed" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <i className="fa-brands fa-youtube text-base" />
              <span>Visit YouTube Channel</span>
            </a>
            <a
              href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures,%20I%20would%20like%20to%20share%20my%20video%20review%20experience"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-[#10B981] text-base" />
              <span>Submit Your Video</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-white" />
            <p className="text-white/60 text-xs mt-1" />
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: "all", label: "All Videos" },
              { id: "patient-story", label: "Patient Stories" },
              { id: "doctor-masterclass", label: "Doctor Masterclasses" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#10B981] text-white shadow-md shadow-[#10B981]/30"
                    : "bg-white/10 text-white/70 hover:bg-white/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#10B981]/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3.5 bg-black/60">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform duration-200">
                      <i className="fa-solid fa-play text-sm ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[#FBBF24] text-[9px]" />
                    <span>{video.duration}</span>
                  </div>

                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600/90 text-[9px] font-extrabold uppercase text-white flex items-center gap-1">
                    <i className="fa-brands fa-youtube" />
                    <span>YouTube</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded inline-block mb-2">
                  {video.condition}
                </span>

                <h4 className="text-sm font-bold text-white group-hover:text-[#FBBF24] transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h4>

                <p className="text-white/60 text-xs mt-2 line-clamp-2 italic">
                  &ldquo;{video.keyQuote}&rdquo;
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-white text-[11px] leading-tight">
                    {video.clientOrSpeaker}
                  </h5>
                  <p className="text-[10px] text-white/50">{video.location}</p>
                </div>

                <span className="text-[10px] font-bold text-red-400 group-hover:text-red-300 flex items-center gap-1">
                  <span>Watch</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-semibold text-white/70">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-[#10B981] text-base" />
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-flask-vial text-[#FBBF24] text-base" />
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-brands fa-youtube text-red-500 text-base" />
          </div>
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#06261E] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
            <div className="px-5 py-3 sm:px-6 sm:py-4 border-b border-white/15 flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#FBBF24] flex items-center gap-1.5">
                  <i className="fa-brands fa-youtube text-red-500" />
                  <span>Dr Natures YouTube Video Player</span>
                </span>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white hover:text-[#06261E] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(activeVideo.youtubeId)}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#0D4035]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold uppercase">
                    {activeVideo.condition}
                  </span>
                  <span className="text-xs text-white/60">
                    {activeVideo.clientOrSpeaker} · {activeVideo.location}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white font-serif-heading">
                  {activeVideo.title}
                </h4>
                <p className="text-xs text-white/70 italic mt-1">
                  &ldquo;{activeVideo.keyQuote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
                <button
                  onClick={() => {
                    const cond = activeVideo.condition;
                    setActiveVideo(null);
                    openBooking("Dr. Nadia Rahman", cond, 1200);
                  }}
                  className="px-4 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-md shadow-[#10B981]/30 cursor-pointer"
                >
                  Consult This Protocol
                </button>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
