import type { Metadata } from "next";
import { SurfacePlaceholder } from "@/components/surface-placeholder";
import { getRequiredRouteByHref } from "@/config/site";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/work");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function WorkPage() {
  return <SurfacePlaceholder route={route} />;
}
