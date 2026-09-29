// ✅ SERVER COMPONENT — SSR, no "use client"
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { IngredientMarquee } from "@/components/sections/IngredientMarquee";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";
import { StatsSection } from "@/components/sections/StatsSection";
import { RemedyQuizSection } from "@/components/sections/RemedyQuizSection";
import { ConsultationList } from "@/components/sections/ConsultationList";
import { PurityProcessSection } from "@/components/sections/PurityProcessSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ProductCardSkeleton, BlogCardSkeleton } from "@/components/ui/spinner";
import { api } from "@/lib/api";
import { DEMO_PRODUCTS, DEMO_BLOGS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Dr Natures | Pure Botanical Apothecary & Clinical Nutrition",
  description:
    "Luxury botanical apothecary and certified functional nutrition clinic in Dhaka. Lab-tested adaptogens, Himalayan Shilajit, KSM-66 Ashwagandha, and personalized dietary protocols.",
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  // Server-side data fetching — falls back gracefully to rich demo catalog if API is offline
  const [featuredData] = await Promise.all([
    api.featuredProducts(8).catch(() => null),
  ]);

  // Use all products so category filters have full variety
  const products = featuredData?.data && featuredData.data.length > 0 ? featuredData.data : DEMO_PRODUCTS;

  return (
    <div className="bg-[#FAFBF8] text-[#14221A] antialiased selection:bg-[#B39868]/20 selection:text-[#14221A]">
      {/* 1. Hero Section: Arch window + Animated Botanical Line Drawing + Rotating Seal + Glow */}
      <HeroSection />

      {/* 2. Ingredient Marquee: Sacred Herbs & Adaptogens ticker */}
      <IngredientMarquee />

      {/* 3. Scroll-Highlighted Philosophy Section: Word-by-word illuminated manifesto */}
      <PhilosophySection />

      {/* 4. Arch-Shaped Product Cards with Category Filter Tabs, Quick View, and Cart Drawer */}
      <Suspense
        fallback={
          <div className="py-24 container-app grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <FeaturedProducts products={products} />
      </Suspense>

      {/* 5. Thin-Line Stats Row: Champagne Hairlines & Cormorant Garamond Light figures */}
      <StatsSection />

      {/* 6. Interactive Botanical Remedy Finder / Wellness Quiz */}
      <RemedyQuizSection />

      {/* 7. Consultation List with Hairline Rows & Interactive 3-Step Booking Modal */}
      <ConsultationList />

      {/* 8. Uncompromising Botanical Science: Sourcing to Bottle 4-Pillar Journey + Lab COA Inspector */}
      <PurityProcessSection />

      {/* 9. Single Large Rotating Testimonial: Editorial layout with oversized quotation marks */}
      <TestimonialSection />

      {/* 10. Frequently Inquired Questions: Interactive Accordion */}
      <FAQSection />

      {/* 11. Evidence-Based Botanical Journal / Blog Preview with Interactive Article Reader Modal */}
      <section id="journal" className="py-28 md:py-36 bg-[#FAFBF8] border-t border-[#B39868]/20 relative">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[11px] font-body tracking-[0.28em] uppercase text-[#B39868] font-medium block mb-2">
                ✦ The Clinical Journal · Peer-Reviewed
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#14221A] font-light leading-none">
                Evidence-Based <span className="italic text-[#B39868]">Readings</span>
              </h2>
              <p className="font-body text-[#14221A]/70 text-xs sm:text-sm font-light mt-3 max-w-md">
                Essays on clinical biochemistry, adaptogen pharmacokinetics, and functional nutrition protocols. Tap any study to view findings.
              </p>
            </div>

            <a
              href="#formulations"
              className="inline-flex items-center gap-2 text-xs font-body tracking-[0.22em] uppercase text-[#14221A] hover:text-[#B39868] transition-colors pb-1 border-b border-[#B39868]/40 self-start md:self-auto"
            >
              <span>Explore Related Formulations</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B39868]" />
            </a>
          </div>

          <Suspense
            fallback={
              <div className="grid md:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <BlogPreview blogs={DEMO_BLOGS} />
          </Suspense>
        </div>
      </section>

      {/* 12. Closing CTA: Apothecary Arch Pavilion */}
      <ClosingCTA />
    </div>
  );
}
