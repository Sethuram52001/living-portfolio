import type { Metadata } from "next";
import { siteUrl } from "@/config/site";
import { loadSiteContent } from "@/lib/content/loaders";

type PageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetadataInput = {}): Metadata {
  const site = loadSiteContent();
  const resolvedDescription = description ?? site.metadata.description;
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? site.metadata.title,
      description: resolvedDescription,
      url,
      siteName: site.metadata.name,
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary",
      title: title ?? site.metadata.title,
      description: resolvedDescription,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}
