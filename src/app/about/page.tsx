import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us · Medical Faculty & Botanical Standards | Dr Natures",
  description:
    "Learn about Dr Natures clinical team, physician qualifications, our Banani apothecary, and our mission to revive ancestral medicine with modern clinical testing in Bangladesh.",
};

// Server-side pre-rendered and cached with ISR
export const revalidate = 60;

export default function AboutPage() {
  return <AboutPageClient />;
}
