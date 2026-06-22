import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

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
  description = siteConfig.description,
  path = "/",
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetadataInput = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.title,
      description,
      url,
      siteName: siteConfig.title,
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary",
      title: title ?? siteConfig.title,
      description,
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
