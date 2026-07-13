import type { HomePageData } from "@/lib/content/home-page";
import type { HomeContent } from "@/lib/content/schemas";
import { ProjectFeatureCard } from "../ui/project-feature-card";
import { SectionHeader } from "../ui/section-header";

export function WorkSection({
  content,
  projects,
}: {
  content: HomeContent["sectionHeaders"]["work"];
  projects: HomePageData["selectedWork"];
}) {
  return (
    <section
      id="work"
      className="overflow-hidden border-t border-app-border bg-app-background py-24 md:py-32"
    >
      <div className="px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader content={content} />
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-10 px-6 lg:px-10">
        {projects.map((project, index) => (
          <ProjectFeatureCard
            key={project.item.slug}
            project={project}
            index={index}
            imageFirst={index % 2 === 0}
            previewLabel={content.previewLabel}
            projectActionLabel={content.projectActionLabel}
          />
        ))}
      </div>
    </section>
  );
}
