import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
}: PageMetadataInput = {}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
  };
}
