import {
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  Package,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ORDERS = [
  {
    id: "DN-2026-1284",
    date: "Sep 29, 2026",
    total: "৳6,000",
    status: "IN_TRANSIT",
    items: [
      { name: "Organic Ashwagandha Root Extract", qty: 1, price: 1200 },
      { name: "Himalayan Shilajit Resin", qty: 2, price: 2400 },
    ],
    deliveryAddress: "House 42, Road 11, Banani, Dhaka",
    trackingStep: 3, // 1: Placed, 2: Verified, 3: Dispatched, 4: Delivered
  },
  {
    id: "DN-2026-0941",
    date: "Sep 14, 2026",
    total: "৳850",
    status: "DELIVERED",
    items: [{ name: "Functional Nutrition Bible", qty: 1, price: 850 }],
    deliveryAddress: "House 42, Road 11, Banani, Dhaka",
    trackingStep: 4,
  },
  {
    id: "DN-2026-0812",
    date: "Aug 28, 2026",
    total: "৳1,960",
    status: "DELIVERED",
    items: [{ name: "Black Seed (Kalonji) Oil 250ml", qty: 2, price: 980 }],
    deliveryAddress: "House 42, Road 11, Banani, Dhaka",
    trackingStep: 4,
  },
];

export default function AccountOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          My Order History & Tracking
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor your package shipments and download digital invoices.
        </p>
      </div>

      <div className="space-y-6">
        {ORDERS.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
              <div>
                <span className="text-xs text-muted-foreground">Order ID</span>
                <h3 className="font-mono font-bold text-base text-foreground">{order.id}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{order.date}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === "IN_TRANSIT"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {order.status === "IN_TRANSIT" ? "In Transit" : "Delivered"}
                </span>
              </div>
            </div>

            {/* Stepper for In Transit */}
            {order.status === "IN_TRANSIT" && (
              <div className="bg-[hsl(var(--muted)/0.3)] p-4 rounded-2xl border border-border/80">
                <span className="text-xs font-bold text-foreground block mb-4">
                  Live Dispatch Status (Pathao Express)
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                  {["Confirmed", "Packed", "Dispatched", "Delivered"].map((step, idx) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] mb-1.5 ${
                          idx + 1 <= order.trackingStep
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        ✓
                      </div>
                      <span
                        className={
                          idx + 1 <= order.trackingStep
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itemized list */}
            <div className="divide-y divide-border/60 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">× {item.qty}</span>
                  </div>
                  <span className="font-bold text-foreground">
                    ৳{(item.qty * item.price).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Delivered to: </span>
                <span className="font-semibold text-foreground">{order.deliveryAddress}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-primary">{order.total}</span>
                <Button size="sm" variant="outline">
                  Download Invoice
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
