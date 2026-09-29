import type { Metadata } from "next";
import { SciencePageClient } from "./SciencePageClient";

export const metadata: Metadata = {
  title: "Botanical Science, Sourcing & Lab Testing COA | Dr Natures",
  description:
    "Discover Dr Natures 4-pillar botanical science: high-altitude wild sourcing, ICP-MS heavy-metal spectroscopy, solvent-free cold bio-extraction, and independent laboratory Certificates of Analysis (COA).",
};

// Server-side pre-rendered and cached with ISR for instant load times
export const revalidate = 60;

export default function SciencePage() {
  return <SciencePageClient />;
}
