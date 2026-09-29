"use client";

import { useState } from "react";
import { MapPin, Plus, Check, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_ADDRESSES = [
  {
    id: "addr-1",
    tag: "Home (Default)",
    recipient: "Rahel Ahmed",
    phone: "01712345678",
    address: "House 42, Road 11, Banani",
    city: "Dhaka",
    division: "Dhaka Division",
    isDefault: true,
  },
  {
    id: "addr-2",
    tag: "Office",
    recipient: "Rahel Ahmed",
    phone: "01712345678",
    address: "Level 6, Navana Tower, Gulshan-1",
    city: "Dhaka",
    division: "Dhaka Division",
    isDefault: false,
  },
];

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    tag: "Clinic / Alternate",
    recipient: "Rahel Ahmed",
    phone: "01712345678",
    address: "",
    city: "Dhaka",
    division: "Dhaka Division",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.address) return;
    setAddresses((prev) => [
      ...prev,
      {
        ...newAddr,
        id: `addr-${Date.now()}`,
        isDefault: false,
      },
    ]);
    setShowAddModal(false);
    setNewAddr({
      tag: "Alternate",
      recipient: "Rahel Ahmed",
      phone: "01712345678",
      address: "",
      city: "Dhaka",
      division: "Dhaka Division",
    });
  };

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
        tag: a.id === id ? `${a.tag.replace(" (Default)", "")} (Default)` : a.tag.replace(" (Default)", ""),
      }))
    );
  };

  const removeAddr = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Saved Shipping Addresses
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your delivery destinations for fast supplement checkout across Bangladesh.
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Add New Address
        </Button>
      </div>

      {showAddModal && (
        <form onSubmit={handleAdd} className="bg-white rounded-3xl border border-primary/40 p-6 shadow-md space-y-4">
          <h3 className="font-bold text-base text-foreground">Add New Shipping Address</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold block mb-1">Address Label</label>
              <input
                type="text"
                value={newAddr.tag}
                onChange={(e) => setNewAddr({ ...newAddr, tag: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border"
                placeholder="e.g. Vacation Home, Gym"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Phone Number</label>
              <input
                type="tel"
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1">Street Address</label>
              <input
                type="text"
                required
                value={newAddr.address}
                onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border"
                placeholder="House / Flat / Road / Area"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">City</label>
              <input
                type="text"
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Division</label>
              <select
                value={newAddr.division}
                onChange={(e) => setNewAddr({ ...newAddr, division: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border"
              >
                <option value="Dhaka Division">Dhaka Division</option>
                <option value="Chittagong Division">Chittagong Division</option>
                <option value="Sylhet Division">Sylhet Division</option>
                <option value="Rajshahi Division">Rajshahi Division</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Address</Button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((a) => (
          <div
            key={a.id}
            className={`bg-white rounded-3xl border p-6 shadow-sm flex flex-col justify-between ${
              a.isDefault ? "border-primary ring-1 ring-primary/20" : "border-border"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                  {a.tag}
                </span>
                {a.isDefault && (
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Primary
                  </span>
                )}
              </div>

              <h4 className="font-bold text-sm text-foreground mb-1">{a.recipient}</h4>
              <p className="text-xs text-muted-foreground mb-1">{a.phone}</p>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {a.address}, {a.city}, {a.division}
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between text-xs">
              {!a.isDefault ? (
                <button
                  onClick={() => setDefault(a.id)}
                  className="font-semibold text-primary hover:underline"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-muted-foreground">Default address</span>
              )}

              <button
                onClick={() => removeAddr(a.id)}
                className="text-muted-foreground hover:text-red-500 transition-colors"
                aria-label="Delete address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
