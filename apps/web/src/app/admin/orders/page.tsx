"use client";

import { useState } from "react";
import { DEMO_STATS } from "@/lib/demo-data";
import { Search } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(DEMO_STATS.recentOrders);
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Order Management
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Process payments, verify addresses, and dispatch parcels nationwide.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order number or customer..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-[hsl(var(--muted)/0.3)]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="pb-3">Order Number</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono font-bold text-foreground">{o.orderNumber}</td>
                  <td className="py-3 font-semibold text-foreground">{o.user.name}</td>
                  <td className="py-3 font-bold text-foreground">৳{parseFloat(o.total).toLocaleString()}</td>
                  <td className="py-3 text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        o.status === "DELIVERED"
                          ? "bg-emerald-100 text-emerald-800"
                          : o.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-800"
                          : o.status === "CONFIRMED"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
