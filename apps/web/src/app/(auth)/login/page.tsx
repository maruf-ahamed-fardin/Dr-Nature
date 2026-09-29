"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/account");
    }, 800);
  };

  const handleFillDemo = (type: "customer" | "admin") => {
    if (type === "customer") {
      setEmail("rahel@example.com");
      setPassword("password123");
    } else {
      setEmail("admin@drnatures.com");
      setPassword("admin123");
    }
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
          Sign In to Your Account
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Access your personalized nutrition plans, consultations, and order history.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-3xl sm:px-10 border border-border">
          {/* Quick Demo Credentials Autofill Banner */}
          <div className="mb-6 p-3.5 rounded-2xl bg-primary/5 border border-primary/20 text-xs">
            <span className="font-bold text-primary block mb-1">⚡ Quick Demo One-Click Fill:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo("customer")}
                className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-border text-[11px] font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Demo Customer
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo("admin")}
                className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-border text-[11px] font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Demo Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-[hsl(var(--muted)/0.3)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
                <input type="checkbox" defaultChecked className="rounded text-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-semibold text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" size="lg" disabled={loading} className="w-full mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Create free account
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
