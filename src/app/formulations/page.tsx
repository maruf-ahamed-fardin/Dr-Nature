import type { Metadata } from "next";
import { FormulationsPageClient } from "./FormulationsPageClient";
import { api } from "@/lib/api";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Lab-Tested Botanical Formulations & Sacred Adaptogens | Dr Natures",
  description:
    "Explore small-batch, heavy-metal tested botanical adaptogens in Dhaka: Himalayan Shilajit resin, KSM-66 Ashwagandha, organic Moringa, and cold-pressed Nigella Sativa oil.",
};

export const revalidate = 60;

export default async function FormulationsPage() {
  const featuredData = await api.featuredProducts(12).catch(() => null);
  const products = featuredData?.data && featuredData.data.length > 0 ? featuredData.data : DEMO_PRODUCTS;

  return <FormulationsPageClient products={products} />;
}
