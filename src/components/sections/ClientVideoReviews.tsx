"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export interface VideoReview {
  id: string;
  title: string;
  clientName: string;
  clientRole: string;
  location: string;
  protocolUsed: string;
  condition: string;
  youtubeUrlOrId: string;
  duration: string;
  thumbnailUrl: string;
  keyQuote: string;
  rating: number;
  metric: string;
}

// Function to extract 11-character YouTube video ID from any link format
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

const DEFAULT_VIDEO_REVIEWS: VideoReview[] = [
  {
    id: "vid-1",
    title: "How Severe Chronic Fatigue & Brain Fog Dissolved in 3 Weeks",
    clientName: "Sazzad Hossain",
    clientRole: "Senior Software Architect",
    location: "Gulshan, Dhaka",
    protocolUsed: "Himalayan Shilajit Resin + KSM-66 Ashwagandha",
    condition: "Adrenal Burnout & Chronic Fatigue",
    youtubeUrlOrId: "dQw4w9WgXcQ", // Replace with your YouTube video link or ID
    duration: "2:45 min",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    keyQuote:
      "I was drinking 5 cups of coffee just to survive the afternoon. Dr. Nadia restructured my morning nutrition and prescribed pure Shilajit. In 3 weeks, my sustained focus returned 100%.",
    rating: 5,
    metric: "Natural Energy Restored · 0 Midday Crashes",
  },
  {
    id: "vid-2",
    title: "5 Years of Severe Acidity, Bloating & Gut Distress Reversed",
    clientName: "Dr. Samina Khan",
    clientRole: "Dental Surgeon",
    location: "Banani, Dhaka",
    protocolUsed: "4-Week Microbiome Restoration Protocol",
    condition: "Gut Dysbiosis & Chronic Bloating",
    youtubeUrlOrId: "dQw4w9WgXcQ", // Replace with your YouTube video link or ID
    duration: "3:10 min",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    keyQuote:
      "As a healthcare professional, I was skeptical. But the clinical biomarker approach at Dr Natures addressed the root cause instead of suppressing symptoms. My gut has never felt lighter.",
    rating: 5,
    metric: "90% Reduction in Gastrointestinal Distress",
  },
  {
    id: "vid-3",
    title: "Overcoming Anxiety & Restless Nights Without Sleeping Pills",
    clientName: "Farhan Ahmed",
    clientRole: "Creative Director",
    location: "Dhanmondi, Dhaka",
    protocolUsed: "KSM-66 Ashwagandha Extract (600mg)",
    condition: "Sleep Latency & Elevated Cortisol",
    youtubeUrlOrId: "dQw4w9WgXcQ", // Replace with your YouTube video link or ID
    duration: "2:15 min",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    keyQuote:
      "I used to wake up at 3 AM with my heart racing. With standardized Ashwagandha and circadian eating guidance, I fall asleep in 15 minutes and wake up refreshed.",
    rating: 5,
    metric: "Deep Sleep Time Increased by 45 Minutes",
  },
  {
    id: "vid-4",
    title: "Postpartum Energy, Hair Recovery & Hormonal Vitality",
    clientName: "Nusrat Jahan",
    clientRole: "Educator & Mother of Two",
    location: "Uttara, Dhaka",
    protocolUsed: "Organic Moringa Leaf + Cold-Pressed Kalonji Oil",
    condition: "Postpartum Nutrient Depletion",
    youtubeUrlOrId: "dQw4w9WgXcQ", // Replace with your YouTube video link or ID
    duration: "2:50 min",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    keyQuote:
      "The clean, heavy-metal tested Moringa gave me instant cellular stamina. The fact that Dr Natures publishes third-party lab COAs gave me total trust while nursing.",
    rating: 5,
    metric: "Vital Micronutrients Replenished Within 30 Days",
  },
];

export function ClientVideoReviews() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <section
      id="video-reviews"
      className="py-16 sm:py-24 md:py-36 bg-[#EEF2ED]/50 border-t border-[#B39868]/25 relative overflow-hidden"
    >
      {/* Delicate background illumination */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#FAFBF8]/90 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#D8E2DC]/40 blur-3xl pointer-events-none" />

      <div className="container-app relative z-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-body tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#B39868] font-medium block mb-2 sm:mb-3">
              ✦ Verified Patient Video Stories · Honest Experiences
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#14221A] font-light leading-[1.08] sm:leading-[1.05]">
              Real Journeys. <br />
              <span className="italic text-[#B39868]">Honest Voices.</span>
            </h2>
            <p className="font-body text-[#14221A]/70 text-xs sm:text-base font-light mt-3 sm:mt-4 leading-relaxed">
              Watch unfiltered video accounts from clients across Bangladesh
              sharing their real health recoveries with Dr Natures personalized
              clinical nutrition protocols and pure adaptogens.
            </p>
          </div>

          {/* Action on Header Right */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <a
              href="https://wa.me/8801700000000?text=Hello%20Dr%20Natures,%20I%20would%20like%20to%20share%20my%20honest%20video%20review%20experience"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-[#B39868]/60 bg-white text-[#14221A] text-[11px] font-body tracking-[0.16em] uppercase hover:bg-[#14221A] hover:text-white transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#B39868]" />
              <span>Submit Your Video Review</span>
            </a>
          </div>
        </div>



        {/* Bottom Trust Badge Row */}
        <div className="mt-12 pt-6 border-t border-[#B39868]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[10.5px] font-body tracking-[0.18em] uppercase text-[#14221A]/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B39868]" />
            <span>100% Genuine Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B39868]" />
            <span>Unscripted & Unfiltered Experiences</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B39868]" />
            <span>Verified Clinical Outcomes</span>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
