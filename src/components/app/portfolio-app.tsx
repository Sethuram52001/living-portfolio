import type { ExternalLink } from "@/config/site";
import type {
  ExperiencePhase,
  FieldNoteDocument,
  HighlightsDocument,
  SkillGroup,
} from "@/lib/content/schemas";
import type { ResolvedHomeSelection } from "@/lib/content/home-selection";
import { ContactSection } from "./sections/contact-section";
import { CurrentFocusSection } from "./sections/current-focus-section";
import { ExperienceSection } from "./sections/experience-section";
import { HeroSection } from "./sections/hero-section";
import { HighlightsSection } from "./sections/highlights-section";
import { SkillsSection } from "./sections/skills-section";
import { WorkSection } from "./sections/work-section";
import { WritingSection } from "./sections/writing-section";

type PortfolioAppProps = {
  experiencePhases: ExperiencePhase[];
  externalLinks: readonly ExternalLink[];
  fieldNotes: FieldNoteDocument[];
  highlights: HighlightsDocument;
  homeSelection: ResolvedHomeSelection;
  skillGroups: SkillGroup[];
};

export function PortfolioApp({
  experiencePhases,
  externalLinks,
  fieldNotes,
  highlights,
  homeSelection,
  skillGroups,
}: PortfolioAppProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <HeroSection />
      <HighlightsSection content={highlights} />
      <ExperienceSection phases={experiencePhases} />
      <SkillsSection skillGroups={skillGroups} />
      <WorkSection items={homeSelection.selectedWork} />
      <WritingSection fieldNotes={fieldNotes} />
      <CurrentFocusSection
        buildingItem={homeSelection.currentFocus.building}
        writingNote={homeSelection.currentFocus.writing}
        learningItem={homeSelection.currentFocus.learning}
      />
      <ContactSection externalLinks={externalLinks} />
    </div>
  );
}
