import Link from "next/link";
import Image from "next/image";
import { Star, Calendar, Award, CheckCircle, Video, MapPin, ArrowRight } from "lucide-react";
import { DEMO_CONSULTANTS } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Health Consultants & Nutritionists | Dr Natures",
  description: "Meet Bangladesh's leading certified nutritionists, herbalists, and functional medicine practitioners.",
};

export default function ConsultantsPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-28 pb-20">
      {/* Banner */}
      <div className="bg-primary text-white py-14 mb-10">
        <div className="container-app">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-green-300 mb-2 block">
              Certified Medical & Functional Nutritionists
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
              Meet Our Health Specialists
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Work one-on-one with certified Bangladeshi practitioners who prioritize root-cause resolution, whole-food nutrition, and personalized natural therapies.
            </p>
          </div>
        </div>
      </div>

      <div className="container-app">
        <div className="grid md:grid-cols-3 gap-8">
          {DEMO_CONSULTANTS.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
            >
              {/* Image banner */}
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <Image
                  src={c.imageUrl}
                  alt={c.user.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-foreground flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>4.9 (120+ reviews)</span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1 block">
                  {c.specialization}
                </span>
                <h2 className="text-xl font-bold font-display text-foreground mb-2">
                  <Link href={`/consultants/${c.id}`} className="hover:text-primary transition-colors">
                    {c.user.name}
                  </Link>
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-1">
                  {c.bio}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Certified Functional Medicine & Dietetics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-primary" />
                    <span>Online Video & In-Person Visits</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/booking?consultant=${c.id}`}>
                      Book Session <Calendar className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/consultants/${c.id}`}>Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
