import type { Metadata } from "next";
import { ConsultationPageClient } from "../consultations/ConsultationPageClient";
import { api } from "@/lib/api";
import { DEMO_CONSULTANTS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Clinical Services & Diet Plans | Dr Natures",
  description:
    "Explore Dr Natures functional nutrition services, personalized diet plans, and private consultations with certified practitioners in Banani, Dhaka.",
};

// Server-side pre-rendered and cached with ISR
export const revalidate = 60;

export default async function ServicesPage() {
  const consultantsData = await api.consultants().catch(() => null);
  const consultants = consultantsData?.data && consultantsData.data.length > 0 ? consultantsData.data : DEMO_CONSULTANTS;

  return <ConsultationPageClient consultants={consultants} />;
}
