import type { Metadata } from "next";
import { AppointmentPageClient } from "./AppointmentPageClient";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr Natures Clinical Nutrition & Consultations",
  description:
    "Schedule your private video or in-person consultation with certified clinical nutritionists at Dr Natures Banani flagship clinic in Dhaka.",
};

// Server-side pre-rendered and cached with ISR
export const revalidate = 60;

export default function AppointmentPage() {
  return <AppointmentPageClient />;
}
