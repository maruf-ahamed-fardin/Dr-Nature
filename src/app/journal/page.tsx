import type { Metadata } from "next";
import { JournalPageClient } from "./JournalPageClient";
import { DEMO_BLOGS } from "@/lib/demo-data";

import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Clinical Journal & Botanical Literature | Dr Natures",
  description:
    "Explore peer-reviewed nutritional research, circadian biology, adaptogenic pharmacology, and gut microbiome restoration protocols written by licensed clinical researchers.",
};

// Server-side pre-rendered and cached with ISR for instant load times
export const revalidate = 60;

export default async function JournalPage() {
  const blogsData = await api.blogs().catch(() => null);
  const blogs = blogsData?.data && blogsData.data.length > 0 ? blogsData.data : DEMO_BLOGS;

  return <JournalPageClient initialBlogs={blogs} />;
}
