import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { getRequiredRouteByHref } from "@/config/site";
import { loadExperiencePhases } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/experience");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function ExperiencePage() {
  const phases = loadExperiencePhases();

  return <ExperienceTimeline phases={phases} />;
}
