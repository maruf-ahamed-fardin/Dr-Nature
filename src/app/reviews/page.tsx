import type { Metadata } from "next";
import { ReviewsPageClient } from "./ReviewsPageClient";

export const metadata: Metadata = {
  title: "Client Video Reviews & Clinical Transformations | Dr Natures",
  description:
    "Watch authentic video testimonials and verified clinical case studies from patients who transformed their energy, sleep, gut health, and vitality with Dr Natures personalized protocols.",
};

// Server-side pre-rendered and cached with ISR for instant load times
export const revalidate = 60;

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}
