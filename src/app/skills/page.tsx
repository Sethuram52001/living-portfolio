import type { Metadata } from "next";
import { SkillTree } from "@/components/skills/skill-tree";
import { getRequiredRouteByHref } from "@/config/site";
import { loadSkillGroups } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/skills");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function SkillsPage() {
  const groups = loadSkillGroups();

  return <SkillTree groups={groups} />;
}
