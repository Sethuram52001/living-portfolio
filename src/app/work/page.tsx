import type { Metadata } from "next";
import { WorkInventory } from "@/components/work/work-inventory";
import { getRequiredRouteByHref } from "@/config/site";
import { loadCurrentQuests, loadItems } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/work");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function WorkPage() {
  const items = loadItems();
  const currentQuests = loadCurrentQuests();

  return <WorkInventory currentQuests={currentQuests} items={items} />;
}
