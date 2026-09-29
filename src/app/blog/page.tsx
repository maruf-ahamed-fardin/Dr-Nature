import type { Metadata } from "next";
import { JournalPageClient } from "../journal/JournalPageClient";
import { api } from "@/lib/api";
import { DEMO_BLOGS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Health Articles, Tips & Clinical Insights | Dr Natures Blog",
  description:
    "Evidence-based wellness articles, nutritional tips, and clinical studies on adaptogens, gut health, and holistic medicine written by licensed practitioners.",
};

// Server-side pre-rendered and cached with ISR
export const revalidate = 60;

export default async function BlogPage() {
  const blogsData = await api.blogs().catch(() => null);
  const blogs = blogsData?.data && blogsData.data.length > 0 ? blogsData.data : DEMO_BLOGS;

  return <JournalPageClient initialBlogs={blogs} />;
}
