import type { Metadata } from "next";
import { LivingPortfolioSpa } from "@/components/living-spa/living-portfolio-spa";
import { siteConfig } from "@/config/site";
import {
  loadCurrentQuests,
  loadExperiencePhases,
  loadFieldNotes,
  loadItems,
  loadSkillGroups,
} from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Backend Engineer",
  description:
    "A single-page living workspace portfolio for Sethuram, a backend engineer exploring production systems, AI tooling, selected work, writing, and contact paths.",
  path: "/",
});

export default function Home() {
  return (
    <LivingPortfolioSpa
      currentQuests={loadCurrentQuests()}
      experiencePhases={loadExperiencePhases()}
      externalLinks={siteConfig.externalLinks}
      fieldNotes={loadFieldNotes()}
      items={loadItems()}
      skillGroups={loadSkillGroups()}
    />
  );
}
