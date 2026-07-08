import type { Metadata } from "next";
import { PortfolioApp } from "@/components/app/portfolio-app";
import { siteConfig } from "@/config/site";
import {
  loadCurrentQuests,
  loadExperiencePhases,
  loadFieldNotes,
  loadHighlights,
  loadItems,
  loadSkillGroups,
  loadStatusHud,
} from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Backend Engineer",
  description:
    "Sethuram is a backend engineer building reliable systems, fintech workflows, and AI developer tooling.",
  path: "/",
});

export default function Home() {
  return (
    <PortfolioApp
      currentQuests={loadCurrentQuests()}
      experiencePhases={loadExperiencePhases()}
      externalLinks={siteConfig.externalLinks}
      fieldNotes={loadFieldNotes()}
      highlights={loadHighlights()}
      items={loadItems()}
      skillGroups={loadSkillGroups()}
      statusHud={loadStatusHud()}
    />
  );
}
