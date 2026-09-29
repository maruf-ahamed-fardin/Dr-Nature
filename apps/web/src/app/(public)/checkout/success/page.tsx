import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.25)] pt-32 pb-20">
      <div className="container-app max-w-xl">
        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 text-center shadow-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
            Order Confirmed!
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Thank You for Your Order
          </h1>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Your order has been placed successfully. We are preparing your lab-tested supplements for delivery across Bangladesh.
          </p>

          <div className="p-5 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-border/80 text-left space-y-2 mb-8 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Reference:</span>
              <span className="font-mono font-bold text-foreground">DN-2026-9281</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-medium text-foreground">2-3 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Notification:</span>
              <span className="font-medium text-emerald-600">SMS updates sent to your phone</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/account/orders">Track Shipment</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
