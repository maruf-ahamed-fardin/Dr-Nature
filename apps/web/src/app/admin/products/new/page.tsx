"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    compareAtPrice: "",
    category: "supplements",
    shortDescription: "",
    description: "",
    stock: "50",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/products");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-display text-foreground">
          Create New Product
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm space-y-5 text-xs">
        <div>
          <label className="font-semibold block mb-1">Product Title *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Organic Ashwagandha Extract"
            className="w-full px-3 py-2 rounded-xl border border-border"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold block mb-1">Price (৳) *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Compare At Price (৳)</label>
            <input
              type="number"
              value={formData.compareAtPrice}
              onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border"
            >
              <option value="supplements">Supplements</option>
              <option value="books">Books</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-1">Short Summary</label>
          <input
            type="text"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="Single-sentence hook for search and cards"
            className="w-full px-3 py-2 rounded-xl border border-border"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Full Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-border"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-1.5" /> Save Product
          </Button>
        </div>
      </form>
    </div>
  );
}
