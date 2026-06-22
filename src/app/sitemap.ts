import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { loadFieldNotes, loadItems } from "@/lib/content/loaders";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = siteConfig.routes.map((route) => ({
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

  const fieldNoteRoutes = loadFieldNotes()
    .filter((note) => note.status === "published" && !note.placeholder)
    .map((note) => ({
      url: new URL(`/writing/${note.slug}`, siteConfig.url).toString(),
      lastModified: note.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...itemRoutes, ...fieldNoteRoutes];
}
