"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Lock, Mail, User, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HEALTH_INTERESTS = [
  "Weight Management",
  "Gut & Digestion",
  "Hormonal Balance",
  "Immunity & Adaptogens",
  "Energy & Vitality",
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Rahel Ahmed",
    phone: "01712345678",
    email: "rahel@example.com",
    password: "password123",
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Gut & Digestion",
    "Energy & Vitality",
  ]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/account");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.3)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/25">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl text-foreground">
            Dr Natures
          </span>
        </Link>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Create Your Health Account
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Join thousands of Bangladeshis taking control of their wellness journey.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-3xl sm:px-10 border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Health Goals Multi-Select */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                Primary Health Interests
              </label>
              <div className="flex flex-wrap gap-1.5">
                {HEALTH_INTERESTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedInterests.includes(item)
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" size="lg" disabled={loading} className="w-full mt-4">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Complete Registration <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
