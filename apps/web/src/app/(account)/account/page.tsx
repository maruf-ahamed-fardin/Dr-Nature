import Link from "next/link";
import {
  Calendar,
  ShoppingBag,
  Video,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-primary text-white rounded-3xl p-6 md:p-8">
        <span className="text-xs uppercase font-bold tracking-widest text-green-300 block mb-1">
          Patient Portal
        </span>
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
          Welcome back, Rahel!
        </h1>
        <p className="text-white/80 text-xs md:text-sm max-w-xl">
          Track your nutritional protocol, consult with your functional practitioner, and manage your supplement shipments.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">1</span>
              <span className="text-xs text-muted-foreground block">Upcoming Session</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">3</span>
              <span className="text-xs text-muted-foreground block">Total Orders</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-bold text-emerald-600">Active</span>
              <span className="text-xs text-muted-foreground block">4-Week Gut Plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Upcoming Appointment Highlight */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
              Upcoming Online Consultation
            </span>
            <h2 className="text-lg font-bold text-foreground">
              Follow-up Review with Dr. Nadia Islam
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            Confirmed
          </span>
        </div>

        <div className="py-4 grid sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Tomorrow, October 1, 2026</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>10:00 AM – 10:45 AM (BST)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            Video link will unlock 10 minutes before the call.
          </span>
          <Button size="sm" className="w-full sm:w-auto">
            <Video className="w-4 h-4 mr-2" /> Join Video Room
          </Button>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-foreground">Recent Orders</h3>
          <Link href="/account/orders" className="text-xs font-semibold text-primary hover:underline">
            View All Orders
          </Link>
        </div>

        <div className="divide-y divide-border text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-foreground block">DN-2026-1284</span>
              <span className="text-muted-foreground">Organic Ashwagandha Extract (x1), Shilajit (x2)</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-foreground block">৳6,000</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                <Truck className="w-3 h-3" /> In Transit
              </span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-foreground block">DN-2026-0941</span>
              <span className="text-muted-foreground">Functional Nutrition Bible (x1)</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-foreground block">৳850</span>
              <span className="text-muted-foreground font-semibold flex items-center gap-1 justify-end">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
