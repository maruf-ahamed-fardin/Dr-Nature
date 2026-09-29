"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = DEMO_PRODUCTS.find((p) => p.id === id) ?? DEMO_PRODUCTS[0];

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-display text-foreground">
          Edit Product: {product.name}
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm space-y-5 text-xs">
        <div>
          <label className="font-semibold block mb-1">Product Title</label>
          <input
            type="text"
            defaultValue={product.name}
            className="w-full px-3 py-2 rounded-xl border border-border"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Price (৳)</label>
            <input
              type="number"
              defaultValue={product.price}
              className="w-full px-3 py-2 rounded-xl border border-border"
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Inventory Quantity</label>
            <input
              type="number"
              defaultValue={product.inventory?.quantity ?? 50}
              className="w-full px-3 py-2 rounded-xl border border-border"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-1">Short Description</label>
          <input
            type="text"
            defaultValue={product.shortDescription}
            className="w-full px-3 py-2 rounded-xl border border-border"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button onClick={() => router.push("/admin/products")}>
            <Save className="w-4 h-4 mr-1.5" /> Update Product
          </Button>
        </div>
      </div>
    </div>
  );
}
