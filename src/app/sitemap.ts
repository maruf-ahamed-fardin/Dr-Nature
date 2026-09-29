import { MetadataRoute } from "next";
import { DEMO_PRODUCTS, DEMO_BLOGS } from "@/lib/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drnatures.com";

  const staticRoutes = [
    "",
    "/services",
    "/shop",
    "/appointment",
    "/blog",
    "/about",
    "/consultations",
    "/formulations",
    "/science",
    "/reviews",
    "/journal",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.85,
  }));

  const productRoutes = DEMO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const blogRoutes = DEMO_BLOGS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
