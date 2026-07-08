"use client";

import { useMemo } from "react";
import type { ExternalLink } from "@/config/site";
import type {
  CurrentQuest,
  ExperiencePhase,
  FieldNoteDocument,
  HighlightsDocument,
  ItemDocument,
  SkillGroup,
  StatusHud,
} from "@/lib/content/schemas";
import { ContactSection } from "./sections/contact-section";
import { CurrentFocusSection } from "./sections/current-focus-section";
import { ExperienceSection } from "./sections/experience-section";
import { HeroSection } from "./sections/hero-section";
import { HighlightsSection } from "./sections/highlights-section";
import { SkillsSection } from "./sections/skills-section";
import { WorkSection } from "./sections/work-section";
import { WritingSection } from "./sections/writing-section";

type PortfolioAppProps = {
  currentQuests: CurrentQuest[];
  experiencePhases: ExperiencePhase[];
  externalLinks: readonly ExternalLink[];
  fieldNotes: FieldNoteDocument[];
  highlights: HighlightsDocument;
  items: ItemDocument[];
  skillGroups: SkillGroup[];
  statusHud: StatusHud;
};

const selectedWorkSlugs = [
  "path-visualizer",
  "sorting-visualizer",
  "old-portfolio",
] as const;

export function PortfolioApp({
  currentQuests,
  experiencePhases,
  externalLinks,
  fieldNotes,
  highlights,
  items,
  skillGroups,
  statusHud,
}: PortfolioAppProps) {
  const currentQuest = currentQuests.find(
    (quest) => quest.status === "in-progress",
  );
  const currentItemSlugs = useMemo(
    () =>
      new Set(
        currentQuests
          .filter((quest) => quest.status === "in-progress")
          .flatMap((quest) => quest.references.items),
      ),
    [currentQuests],
  );
  const currentItem = items.find((item) => currentItemSlugs.has(item.slug));
  const selectedItems = useMemo(() => {
    return selectedWorkSlugs
      .map((slug) => items.find((item) => item.slug === slug))
      .filter(Boolean) as ItemDocument[];
  }, [items]);

  return (
    <div className="mx-auto max-w-6xl">
      <HeroSection />
      <HighlightsSection content={highlights} />
      <ExperienceSection phases={experiencePhases} />
      <SkillsSection skillGroups={skillGroups} />
      <WorkSection
        items={selectedItems}
        currentItemSlug={currentItem?.slug}
      />
      <WritingSection fieldNotes={fieldNotes} />
      <CurrentFocusSection
        currentQuest={currentQuest}
        currentItem={currentItem}
        fieldNotes={fieldNotes}
        items={items}
        statusHud={statusHud}
      />
      <ContactSection externalLinks={externalLinks} />
    </div>
  );
}
