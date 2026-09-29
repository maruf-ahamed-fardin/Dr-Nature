"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Reactbits-style Spinner (Orbital) ───
export function SpinnerOrbit({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg className="animate-spin" style={{ width: size, height: size }} viewBox="0 0 50 50">
        <circle className="opacity-20" cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="currentColor" />
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="currentColor"
          strokeDasharray="80" strokeDashoffset="60" strokeLinecap="round"
          className="text-primary" />
      </svg>
    </div>
  );
}

// ─── Reactbits-style Dots Spinner ───
export function SpinnerDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />
      ))}
    </div>
  );
}

// ─── Reactbits-style Pulse Ring ───
export function SpinnerPulse({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      <div className="absolute inset-2 rounded-full bg-primary/40 animate-ping" style={{ animationDelay: "0.2s" }} />
      <div className="w-3 h-3 rounded-full bg-primary" />
    </div>
  );
}

// ─── Reactbits-style Leaf Spinner (Healthcare themed) ───
export function SpinnerLeaf({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-primary"
          style={{
            top: "50%", left: "50%",
            transform: `rotate(${i * 45}deg) translate(${size / 2 - 6}px, -50%)`,
            opacity: (i + 1) / 8,
            animation: `spin 1s linear infinite`,
            animationDelay: `${-i * 0.125}s`,
          }} />
      ))}
    </div>
  );
}

// ─── Reactbits-style Bar Loader ───
export function BarLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end gap-1 h-8", className)}>
      {[1, 1.5, 1, 2, 1.5, 1, 2].map((h, i) => (
        <div key={i} className="w-1.5 rounded-full bg-primary"
          style={{
            height: `${h * 10}px`,
            animation: "barBounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }} />
      ))}
      <style>{`
        @keyframes barBounce {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Page Loading Overlay ───
export function PageLoader({ text = "Preparing Botanical Apothecary..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFBF8]/95 backdrop-blur-md">
      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full border border-[#B39868]/40 bg-[#FAFBF8] flex items-center justify-center shadow-sm">
          <span className="font-editorial text-xl italic text-[#B39868]">DN</span>
        </div>
        <SpinnerOrbit size={40} className="text-[#B39868]" />
        <p className="text-xs font-body tracking-[0.22em] uppercase text-[#1F2B25]/70 font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}

// ─── Skeleton ───
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-lg bg-muted", className)} {...props} />;
}

// ─── Card Skeleton ───
export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
