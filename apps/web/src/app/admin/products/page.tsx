"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Search, Star } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Product Catalog Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage inventory, pricing, lab certifications, and stock levels.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-1.5" /> Add New Product
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm space-y-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-[hsl(var(--muted)/0.3)]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="pb-3">Product</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted relative shrink-0">
                        {p.images?.[0] && (
                          <Image
                            src={p.images[0].url}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="font-bold text-foreground line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-primary font-medium">{p.category.name}</td>
                  <td className="py-3 font-bold text-foreground">৳{p.price}</td>
                  <td className="py-3 font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        (p.inventory?.quantity ?? 0) <= 20
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {p.inventory?.quantity} in stock
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 font-semibold text-yellow-500">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <span>{p.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
