"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Calendar,
  Users,
  FileText,
  Package,
  Leaf,
  LogOut,
  ExternalLink,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Blog & Research", href: "/admin/blog", icon: FileText },
  { label: "Patients & Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.35)] flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[hsl(142,76%,8%)] text-white p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base leading-none block">Dr Natures</span>
              <span className="text-[10px] font-semibold text-green-400 tracking-wider uppercase">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1 text-xs">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-all",
                    active
                      ? "bg-primary text-white font-bold shadow-sm"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom links */}
        <div className="pt-6 border-t border-white/10 space-y-2 text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white px-3.5 py-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Store</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 text-red-400 hover:text-red-300 px-3.5 py-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm text-foreground">
              Dr Natures Operational Backoffice
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
              Live Production
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                AD
              </div>
              <span className="text-xs font-semibold text-foreground hidden sm:inline">
                Admin Manager
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
