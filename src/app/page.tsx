import type { Metadata } from "next";
import { TopAnnouncementBar } from "@/components/ecosystem/TopAnnouncementBar";
import { EcosystemHeader } from "@/components/ecosystem/EcosystemHeader";
import { EcosystemHero } from "@/components/ecosystem/EcosystemHero";
import { ConnectedEcosystemSection } from "@/components/ecosystem/ConnectedEcosystemSection";
import { DoctorServicesSection } from "@/components/ecosystem/DoctorServicesSection";
import { ConsultationPackagesSection } from "@/components/ecosystem/ConsultationPackagesSection";
import { ApothecaryShopSection } from "@/components/ecosystem/ApothecaryShopSection";
import { HealthToolsHubSection } from "@/components/ecosystem/HealthToolsHubSection";
import { PersonalizedDietSection } from "@/components/ecosystem/PersonalizedDietSection";
import { ClinicalJournalSection } from "@/components/ecosystem/ClinicalJournalSection";
import { EcosystemVideoReviewsSection } from "@/components/ecosystem/EcosystemVideoReviewsSection";
import { CustomerPortalSection } from "@/components/ecosystem/CustomerPortalSection";
import { EcosystemFooter } from "@/components/ecosystem/EcosystemFooter";
import { ModalsAndDrawers } from "@/components/ecosystem/ModalsAndDrawers";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Dr Natures | Premium Healthcare Ecosystem",
  description:
    "Integrated clinical consultations, specialized reversal protocols, certified natural apothecary, and interactive health calculators in Bangladesh.",
};

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="bg-[#FDFBF7] text-[#1E293B] antialiased">
      {/* 1. Top Bar: Helpline, Consultation Hours, Currency Switcher & Patient Portal */}
      <TopAnnouncementBar />

      {/* 2. Glass Header: Logo, Nav, Search, Cart Drawer, Wishlist, Book Visit */}
      <EcosystemHeader />

      <main>
        {/* 3. Hero Section: Quick Launcher, Trust Stats, Doctor Visual */}
        <EcosystemHero />

        {/* 4. Connected Ecosystem Model: 4-Step Clinical Framework */}
        <ConnectedEcosystemSection />

        {/* 5. Doctor Services & Specialist Finder */}
        <DoctorServicesSection />

        {/* 6. Specialized Healthcare Packages: PCOS, Diabetes, Body Transformation */}
        <ConsultationPackagesSection />

        {/* 7. Dr Natures Apothecary: Books, Supplements, Herbal & Bundles */}
        <ApothecaryShopSection />

        {/* 8. Personalized Diet Plan: Step-by-step BMI assessment & diet funnel */}
        <PersonalizedDietSection />

        {/* 9. Official YouTube Video Stories & Case Reviews */}
        <EcosystemVideoReviewsSection />

        {/* 10. Clinical Journal: Evidence-Based Health Guidance */}
        <ClinicalJournalSection />

        {/* 12. Customer Account Portal Preview */}
        <CustomerPortalSection />

      </main>

      {/* 12. Mega Footer: Brand Bio, Services, Apothecary & BD Payment Gateways */}
      <EcosystemFooter />

      {/* 13. Interactive Modals: Toast Notifications, Booking, Quick View, Cart Drawer, Search & AI Assistant */}
      <ModalsAndDrawers />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
