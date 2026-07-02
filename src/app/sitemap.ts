import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { loadItems } from "@/lib/content/loaders";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [...siteConfig.routes, { href: "/map-v1" }].map((route) => ({
    url: new URL(route.href, siteConfig.url).toString(),
    changeFrequency: "monthly" as const,
    priority: route.href === "/" ? 1 : 0.8,
  }));

  const itemRoutes = loadItems()
    .filter((item) => item.status === "published" && !item.placeholder)
    .map((item) => ({
      url: new URL(`/work/${item.slug}`, siteConfig.url).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...itemRoutes];
}
