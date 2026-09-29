"use client";

import { Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Platform & Business Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure payment gateways, SMS notifications, and delivery charges.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm space-y-6 text-xs">
        <div>
          <h3 className="font-bold text-sm text-foreground mb-4">Delivery & Shipping Rules</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Inside Dhaka Shipping (৳)</label>
              <input type="number" defaultValue="80" className="w-full px-3 py-2 rounded-xl border border-border" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Free Delivery Threshold (৳)</label>
              <input type="number" defaultValue="1500" className="w-full px-3 py-2 rounded-xl border border-border" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-bold text-sm text-foreground mb-4">Payment Gateways Active</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-primary" />
              <span>bKash Merchant Gateway (Automated Callback)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-primary" />
              <span>Nagad Direct Payment</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-primary" />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button>
            <Save className="w-4 h-4 mr-1.5" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
