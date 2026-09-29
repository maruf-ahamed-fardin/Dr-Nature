import type { Metadata } from "next";
import { ConsultationPageClient } from "./ConsultationPageClient";

import { api } from "@/lib/api";
import { DEMO_CONSULTANTS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Clinical Nutrition Consultations & Functional Medicine | Dr Natures",
  description:
    "Private video and in-clinic functional nutrition consultations in Banani, Dhaka. Personalized adaptogen protocols, gut microbiome restoration, and bio-individual dietary frameworks.",
};

// Server-side pre-rendered and cached with ISR for instant load times
export const revalidate = 60;

export default async function ConsultationsPage() {
  const consultantsData = await api.consultants().catch(() => null);
  const consultants = consultantsData?.data && consultantsData.data.length > 0 ? consultantsData.data : DEMO_CONSULTANTS;

  return <ConsultationPageClient consultants={consultants} />;
}
