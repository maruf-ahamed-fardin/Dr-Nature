import type { Metadata } from "next";
import { FormulationsPageClient } from "../formulations/FormulationsPageClient";
import { api } from "@/lib/api";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Shop Health Products & Sacred Adaptogens | Dr Natures",
  description:
    "Order laboratory-tested adaptogens, organic health supplements, and wellness books from Dr Natures botanical apothecary in Dhaka, Bangladesh.",
};

// Server-side pre-rendered and cached with ISR
export const revalidate = 60;

export default async function ShopPage() {
  const featuredData = await api.featuredProducts(16).catch(() => null);
  const products = featuredData?.data && featuredData.data.length > 0 ? featuredData.data : DEMO_PRODUCTS;

  return <FormulationsPageClient products={products} />;
}
