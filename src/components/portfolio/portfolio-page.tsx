import type { HomePageData } from "@/lib/content/home-page";
import { ContactSection } from "./sections/contact-section";
import { CurrentFocusSection } from "./sections/current-focus-section";
import { ExperienceSection } from "./sections/experience-section";
import { HeroSection } from "./sections/hero-section";
import { HighlightsSection } from "./sections/highlights-section";
import { SkillsSection } from "./sections/skills-section";
import { WorkSection } from "./sections/work-section";
import { WritingSection } from "./sections/writing-section";

export function PortfolioPage({ data }: { data: HomePageData }) {
  return (
    <div className="mx-auto max-w-6xl">
      <HeroSection content={data.home.hero} person={data.site.person} />
      <HighlightsSection
        content={data.highlights}
        eyebrow={data.home.sectionHeaders.highlights.eyebrow}
      />
      <ExperienceSection
        content={data.home.sectionHeaders.experience}
        phases={data.experiencePhases}
      />
      <SkillsSection
        content={data.home.sectionHeaders.skills}
        skillGroups={data.visibleSkillGroups}
      />
      <WorkSection
        content={data.home.sectionHeaders.work}
        projects={data.selectedWork}
      />
      <WritingSection
        content={data.home.sectionHeaders.writing}
        fieldNotes={data.publishedFieldNotes}
        mediumHref={data.mediumHref}
      />
      <CurrentFocusSection
        cards={data.currentFocus}
        content={data.home.sectionHeaders.currentFocus}
      />
      <ContactSection
        content={data.home.sectionHeaders.contact}
        person={data.site.person}
      />
    </div>
  );
}
