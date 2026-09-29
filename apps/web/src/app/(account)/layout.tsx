"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingBag,
  Calendar,
  MapPin,
  Bell,
  LogOut,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCOUNT_NAV = [
  { label: "Overview", href: "/account", icon: User },
  { label: "My Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "Consultations", href: "/account/bookings", icon: Calendar },
  { label: "Saved Addresses", href: "/account/addresses", icon: MapPin },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[hsl(var(--muted)/0.3)]">
      {/* Top Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container-app flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-bold font-display text-lg text-foreground">
              Dr Natures
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="text-xs font-semibold text-primary hover:underline hidden sm:inline"
            >
              Shop Store
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
              RA
            </div>
          </div>
        </div>
      </header>

      <div className="container-app py-8">
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md shadow-primary/20">
                RA
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Rahel Ahmed</h3>
                <span className="text-xs text-muted-foreground">rahel@example.com</span>
              </div>
            </div>

            <nav className="space-y-1">
              {ACCOUNT_NAV.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                      active
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-border">
              <Link
                href="/login"
                className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 px-3.5 py-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Link>
            </div>
          </aside>

          {/* Main Account Content Area */}
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
