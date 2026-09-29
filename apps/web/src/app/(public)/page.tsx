// ✅ SERVER COMPONENT — SSR, no "use client"
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Truck, HeartPulse, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ProductCardSkeleton, BlogCardSkeleton } from "@/components/ui/spinner";
import { api } from "@/lib/api";
import { DEMO_PRODUCTS, DEMO_BLOGS, DEMO_CONSULTANTS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Dr Natures Healthcare | Natural Supplements & Nutrition Consultations",
  description: "Bangladesh's trusted natural healthcare platform. Shop organic supplements, book expert nutrition consultations, and read evidence-based wellness content.",
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const SERVICES = [
  {
    icon: "💻",
    title: "Online Consultation",
    desc: "45-min private video session with a certified nutritionist. Personalized plan included.",
    href: "/booking",
    price: "৳800",
  },
  {
    icon: "🏥",
    title: "In-Person Visit",
    desc: "60-min face-to-face consultation at our Dhaka clinic. Full health assessment.",
    href: "/booking",
    price: "৳1,500",
  },
  {
    icon: "📋",
    title: "Diet Plan Package",
    desc: "Custom 4-week meal plan + consultation + 2 follow-up check-ins.",
    href: "/booking",
    price: "৳2,500",
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "100% Authentic", desc: "Lab-tested products" },
  { icon: Truck, label: "Free Delivery", desc: "On orders over ৳1,500" },
  { icon: HeartPulse, label: "Expert Advice", desc: "Certified nutritionists" },
  { icon: Clock, label: "Fast Support", desc: "Response within 2 hours" },
];

const TESTIMONIALS = [
  { name: "Rahel Ahmed", role: "Software Engineer, Dhaka", rating: 5, text: "The Ashwagandha from Dr Natures literally changed my sleep and stress levels within 2 weeks. And the online consultation was incredibly detailed — worth every taka.", avatar: "RA" },
  { name: "Nasrin Begum", role: "Teacher, Chittagong", rating: 5, text: "I was skeptical about online nutrition consultation but Dr. Nadia completely changed my mind. My 3-month diet plan transformed my energy levels and I lost 8kg safely.", avatar: "NB" },
  { name: "Karim Hossain", role: "Business Owner, Sylhet", rating: 5, text: "Finally a Bangladeshi health brand I can trust. The Shilajit is genuine, the packaging is premium, and delivery was faster than expected to Sylhet!", avatar: "KH" },
];

export default async function HomePage() {
  // Server-side data fetching — falls back to demo data if API unavailable
  const [featuredData] = await Promise.all([
    api.featuredProducts(8),
  ]);

  const products = featuredData?.data ?? DEMO_PRODUCTS.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Trust Badges */}
      <section className="bg-white border-b border-border">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {TRUST_BADGES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-py bg-[hsl(var(--muted)/0.4)]">
        <div className="container-app">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow">Our Products</span>
              <h2 className="text-balance">Best-selling supplements & books</h2>
            </div>
            <Button variant="ghost" className="hidden md:flex gap-1 text-primary" asChild>
              <Link href="/shop">View all <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          }>
            <FeaturedProducts products={products} />
          </Suspense>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/shop">View all products <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Services Section */}
      <section className="section-py bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="eyebrow">Consultation Services</span>
            <h2 className="text-balance">Expert guidance for your health goals</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Work with certified Bangladeshi nutritionists and functional medicine practitioners online or in person.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.title} href={service.href} className="group">
                <div className="h-full bg-white border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{service.price}</span>
                    <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Book now <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/consultants">Meet our consultants <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-py bg-[hsl(var(--muted)/0.4)]">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="eyebrow">Testimonials</span>
            <h2>What our customers say</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              <span className="text-sm text-muted-foreground ml-2 font-medium">4.9 / 5 from 1,200+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-py bg-white">
        <div className="container-app">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow">Wellness Blog</span>
              <h2>Evidence-based health content</h2>
            </div>
            <Button variant="ghost" className="hidden md:flex gap-1 text-primary" asChild>
              <Link href="/blog">All articles <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>

          <Suspense fallback={
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)}
            </div>
          }>
            <BlogPreview blogs={DEMO_BLOGS} />
          </Suspense>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-py hero-bg">
        <div className="container-app text-center text-white relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-green-300 bg-white/10 px-4 py-1.5 rounded-full mb-5">
            🌿 Start your journey today
          </span>
          <h2 className="font-display text-balance mb-4 text-white">
            Your health transformation begins with one step.
          </h2>
          <p className="text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
            Join 3,400+ Bangladeshis who have transformed their health with evidence-based nutrition and genuine supplements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" variant="white" asChild>
              <Link href="/booking">Book free discovery call</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white" asChild>
              <Link href="/shop">Explore products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
