"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Package,
} from "lucide-react";
import { DEMO_STATS, DEMO_PRODUCTS } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(DEMO_STATS.recentOrders);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const lowStockProducts = DEMO_PRODUCTS.filter(
    (p) => (p.inventory?.quantity ?? 0) <= 25
  );

  return (
    <div className="space-y-8">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
            Platform Overview
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time business performance, consultation bookings, and supply chain status.
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" asChild>
            <Link href="/admin/products">+ New Product</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/admin/bookings">+ Book Slot</Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-foreground mb-1">
            {DEMO_STATS.totalRevenue}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +14.8% vs last month
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-foreground mb-1">
            {DEMO_STATS.totalOrders}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +8.2% this week
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground">Active Patients</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-foreground mb-1">
            {DEMO_STATS.totalCustomers}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 64 Districts reached
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground">Consultations</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-foreground mb-1">
            428
          </div>
          <span className="text-[11px] font-semibold text-purple-600 flex items-center gap-1">
            98.4% patient satisfaction
          </span>
        </div>
      </div>

      {/* Main Grid: Orders & Alerts */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-foreground">Recent Customer Orders</h2>
            <span className="text-xs text-muted-foreground">Real-time status updater</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono font-bold text-foreground">{o.orderNumber}</td>
                    <td className="py-3 font-medium text-foreground">{o.user.name}</td>
                    <td className="py-3 font-bold text-foreground">৳{parseFloat(o.total).toLocaleString()}</td>
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
                    <td className="py-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        aria-label={`Update status for ${o.orderNumber}`}
                        className="text-[10px] font-semibold bg-[hsl(var(--muted)/0.5)] border border-border rounded-lg px-2 py-1"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock & Inventory Alerts */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-base text-foreground">Inventory Low Stock Alerts</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Items approaching reorder thresholds in our Dhaka distribution center.
          </p>

          <div className="space-y-3 pt-2">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-border/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-foreground block line-clamp-1">{p.name}</span>
                  <span className="text-muted-foreground text-[10px]">{p.category.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-amber-600 block text-sm">
                    {p.inventory?.quantity} left
                  </span>
                  <button className="text-[10px] text-primary font-semibold hover:underline">
                    Reorder Stock
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/products">Manage All Inventory</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
