import type { Metadata } from "next";
import { PortfolioApp } from "@/components/app/portfolio-app";
import { siteConfig } from "@/config/site";
import { loadAllContent } from "@/lib/content/loaders";
import { resolveHomeSelection } from "@/lib/content/home-selection";
import { createPageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sethuram | Software Engineer",
  description:
    "Sethuram is a software engineer building reliable backend systems, fintech workflows, and AI developer tooling.",
  path: "/",
});

export default function Home() {
  const content = loadAllContent();

  return (
    <PortfolioApp
      experiencePhases={content.experiencePhases}
      externalLinks={siteConfig.externalLinks}
      fieldNotes={content.fieldNotes}
      highlights={content.highlights}
      homeSelection={resolveHomeSelection(content)}
      skillGroups={content.skillGroups}
    />
  );
}
