import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.3)] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white rounded-3xl border border-border p-10 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-8 h-8" />
        </div>
        <span className="text-4xl font-extrabold text-primary font-display block mb-1">
          404
        </span>
        <h1 className="text-2xl font-bold font-display text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
          The natural remedy, article, or resource you are looking for does not exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">
            Back to Homepage <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
