import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  HeartPulse,
  Leaf,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Dr Natures Healthcare",
  description: "Learn about Dr Natures Healthcare — our mission, clinical philosophy, third-party testing, and commitment to authentic wellness in Bangladesh.",
};

const PILLARS = [
  {
    icon: Leaf,
    title: "100% Organic & Pure",
    desc: "We source our adaptogens, herbs, and oils directly from certified organic cultivators with zero chemical pesticides or artificial fillers.",
  },
  {
    icon: Award,
    title: "Third-Party Lab Tested",
    desc: "Every single production batch undergoes strict chromatography and heavy-metal testing to verify bio-active potency and clinical safety.",
  },
  {
    icon: Users,
    title: "Certified Medical Guidance",
    desc: "Our registered dietitians and physicians believe in treating root causes rather than masking symptoms with synthetic pharmaceuticals.",
  },
  {
    icon: HeartPulse,
    title: "Nationwide Health Access",
    desc: "Delivering lab-verified supplements and high-definition video consultations to patients across all 64 districts in Bangladesh.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      {/* Hero */}
      <div className="bg-primary text-white py-16 mb-12">
        <div className="container-app">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-green-300 mb-2 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Our Story & Mission
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Restoring Health Through Nature, Grounded in Science.
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Dr Natures Healthcare was founded to bridge the critical gap between traditional herbal medicine and modern evidence-based clinical nutrition in Bangladesh.
            </p>
          </div>
        </div>
      </div>

      <div className="container-app space-y-16">
        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                Why Dr Natures Exists
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Tired of adulterated herbs and generic prescription quick-fixes?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                In Bangladesh, finding 100% pure, unadulterated adaptogens and nutritional supplements has long been a challenge. Consumers routinely face counterfeit labels, unregulated potency, and excessive filler agents.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Dr Natures changed this standard. We combine high-yield standardized herbal extraction with certified third-party laboratory verification, paired directly with personalized clinical nutrition support.
              </p>

              <div className="space-y-2 text-xs font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Transparent Certificates of Analysis (COA) for every product</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Licensed doctors and certified clinical dietitians on staff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Eco-conscious, sustainable packaging made in Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                alt="Healthcare Consultation"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">
              Core Principles
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              What Sets Dr Natures Apart
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white rounded-3xl border border-border p-6 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-foreground mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-primary text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            Start Your Health Journey with Us
          </h2>
          <p className="text-white/80 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Whether you need certified adaptogens, whole-food supplements, or a structured 4-week clinical diet plan, our team is here for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" variant="white" asChild>
              <Link href="/booking">Book Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
