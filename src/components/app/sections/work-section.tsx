import type { ItemDocument } from "@/lib/content/schemas";
import { ProjectFeatureCard } from "../common/project-feature-card";
import { SectionHeader } from "../common/section-header";

export function WorkSection({ items }: { items: ItemDocument[] }) {
  return (
    <section
      id="work"
      className="overflow-hidden border-t border-app-border bg-app-background py-24 md:py-32"
    >
      <div className="px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected work"
            title={
              <>
                Built from a love of exploring ideas{" "}
                <span className="text-app-muted">
                  and making them tangible.
                </span>
              </>
            }
            supporting="These projects reflect how I learn best: by building, experimenting, and turning concepts into interactive experiences that deepen my understanding."
          />
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-10 px-6 lg:px-10">
        {items.map((item, index) => (
          <ProjectFeatureCard
            key={item.slug}
            item={item}
            index={index}
            imageFirst={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}
