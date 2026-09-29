"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white rounded-3xl border border-border p-8 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold font-display text-foreground mb-2">
          Something went wrong
        </h2>
        <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
          An unexpected error occurred while processing your request. Please try refreshing or return to the homepage.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => reset()} size="sm">
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Try Again
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
