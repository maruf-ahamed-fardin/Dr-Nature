import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  Calendar,
  Clock,
  Video,
  Award,
  BookOpen,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { DEMO_CONSULTANTS } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const consultant = DEMO_CONSULTANTS.find((c) => c.id === id);
  if (!consultant) return { title: "Consultant Not Found" };

  return {
    title: `${consultant.user.name} - ${consultant.specialization} | Dr Natures`,
    description: consultant.bio,
  };
}

export default async function ConsultantProfilePage({ params }: PageProps) {
  const { id } = await params;
  const consultant = DEMO_CONSULTANTS.find((c) => c.id === id);

  if (!consultant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/consultants" className="hover:text-foreground">Specialists</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold">{consultant.user.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main profile */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden relative shrink-0 border-2 border-primary/20 shadow-md">
                <Image
                  src={consultant.imageUrl}
                  alt={consultant.user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider inline-block mb-2">
                  {consultant.specialization}
                </span>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  {consultant.user.name}
                </h1>
                <p className="text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-2 mb-4">
                  <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> 4.9 Rating
                  </span>
                  <span>•</span>
                  <span>12+ Years Clinical Practice</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">Verified Practitioner</span>
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {consultant.bio}
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-lg bg-[hsl(var(--muted)/0.5)] text-xs font-medium text-muted-foreground">
                    🌱 Functional Nutrition
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[hsl(var(--muted)/0.5)] text-xs font-medium text-muted-foreground">
                    🧬 Gut Microbiome
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[hsl(var(--muted)/0.5)] text-xs font-medium text-muted-foreground">
                    ⚡ Hormonal Health
                  </span>
                </div>
              </div>
            </div>

            {/* Approach & Credentials */}
            <div className="bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-display text-foreground">
                Clinical Approach & Philosophy
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rather than treating isolated symptoms with temporary quick-fixes, our consultations investigate your biochemical individuality, gut health, hormonal patterns, and lifestyle triggers. You receive a structured, step-by-step roadmap grounded in natural nutrition and verified lifestyle medicine.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border/70">
                <div className="p-4 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/60">
                  <h4 className="font-bold text-sm text-foreground mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" /> Qualifications
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    M.Sc. in Clinical Nutrition & Dietetics, Certified Functional Medicine Practitioner (CFMP), Member of Bangladesh Nutrition Society.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/60">
                  <h4 className="font-bold text-sm text-foreground mb-1 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> Research & Publications
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Author of 14 clinical case studies on dietary intervention for fatty liver and metabolic syndrome recovery in South Asian populations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking sidebar widget */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-lg text-foreground mb-2">Book a Session</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Consult online via secure HD video call or meet in person at our Dhaka wellness clinic.
              </p>

              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-6 text-xs space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Next Available:</span>
                  <span className="font-bold text-primary">Tomorrow, 10:00 AM</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Standard Fee:</span>
                  <span className="font-bold text-foreground">৳800 (45 mins)</span>
                </div>
              </div>

              <Button size="lg" className="w-full mb-3" asChild>
                <Link href={`/booking?consultant=${consultant.id}`}>
                  Book with {consultant.user.name.split(" ")[1] ?? "Doctor"} <Calendar className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <div className="space-y-2 text-xs text-muted-foreground pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Personalized meal guideline included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free 7-day follow-up messaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>100% Confidential medical session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
