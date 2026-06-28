import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  BeakerIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { TechIcon } from "@/components/tech-icon";
import type { CurrentQuest, ItemDocument } from "@/lib/content/schemas";

type WorkInventoryProps = {
  currentQuests: CurrentQuest[];
  items: ItemDocument[];
};

export function WorkInventory({ currentQuests, items }: WorkInventoryProps) {
  const currentItemSlugs = new Set(
    currentQuests
      .filter((quest) => quest.status === "in-progress")
      .flatMap((quest) => [quest.slug, ...quest.references.items]),
  );
  const currentItems = items.filter((item) => currentItemSlugs.has(item.slug));
  const completedItems = items.filter((item) => !currentItemSlugs.has(item.slug));

  return (
    <section className="grid gap-12">
      <header className="max-w-4xl">
        <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
          Project Inventory
        </p>
        <h1 className="mt-3 text-[52px] font-black uppercase leading-none text-lp-on-surface md:text-[88px]">
          Collected Work
        </h1>
        <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
          A curated log of projects, experiments, and older builds. Each card opens
          into the motivation, artifact, and field notes behind the work.
        </p>
      </header>

      <InventorySection
        emptyMessage="No active project is pinned right now. Completed work is still available below."
        icon={<BeakerIcon className="size-5" />}
        items={currentItems}
        title="Currently Worked Upon"
      />

      <InventorySection
        emptyMessage="No completed projects are ready to inspect yet."
        icon={<CheckCircleIcon className="size-5" />}
        items={completedItems}
        title="Completed Projects"
      />
    </section>
  );
}

function InventorySection({
  emptyMessage,
  icon,
  items,
  title,
}: {
  emptyMessage: string;
  icon: ReactNode;
  items: ItemDocument[];
  title: string;
}) {
  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap items-center gap-3 border-b-[3px] border-lp-ink pb-4">
        <span className="grid size-10 place-items-center rounded-full border-[3px] border-lp-ink bg-lp-secondary-container text-lp-on-surface shadow-lp-level-2">
          {icon}
        </span>
        <h2 className="text-2xl font-black uppercase leading-tight text-lp-on-surface md:text-4xl">
          {title}
        </h2>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <ProjectInventoryCard
              key={item.slug}
              item={item}
              variant={title === "Currently Worked Upon" ? "ongoing" : "completed"}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lp-md border-[3px] border-dashed border-lp-outline-variant bg-lp-surface-container-lowest p-6">
          <p className="text-base font-bold leading-7 text-lp-on-surface-variant">
            {emptyMessage}
          </p>
        </div>
      )}
    </section>
  );
}

function ProjectInventoryCard({
  item,
  variant,
}: {
  item: ItemDocument;
  variant: "completed" | "ongoing";
}) {
  const tech = getTechLabels(item).slice(0, 3);
  const isOngoing = variant === "ongoing";

  return (
    <Link
      href={`/work/${item.slug}`}
      className={[
        "group block overflow-hidden rounded-lp-md border-[3px] border-lp-ink shadow-lp-level-3 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-lp-level-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-lp-secondary-container",
        isOngoing
          ? "bg-lp-surface-container-high opacity-80 grayscale-[35%]"
          : "bg-lp-surface-container-lowest",
      ].join(" ")}
    >
      <article>
        <ProjectPreview muted={isOngoing} />

        <div className="grid gap-4 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
                {isOngoing ? "Ongoing work" : `${item.artifact.type} artifact`}
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-lp-on-surface md:text-3xl">
                {item.title}
              </h3>
            </div>
            <WorkStateBadge state={isOngoing ? "under-development" : "completed"} />
          </div>

          <p className="text-sm font-bold leading-6 text-lp-on-surface-variant md:text-base md:leading-7">
            {item.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {tech.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.08em] text-lp-on-surface-variant"
              >
                <TechIcon className="size-4" label={label} />
                {label}
              </span>
            ))}
          </div>

          <span className="mt-2 inline-flex items-center justify-between border-t-[3px] border-lp-ink pt-4 font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-primary">
            View Details
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}

function ProjectPreview({
  muted,
}: {
  muted: boolean;
}) {
  return (
    <div
      className={[
        "relative min-h-48 overflow-hidden border-b-[3px] border-lp-ink bg-lp-inverse-surface md:min-h-64",
        muted ? "bg-lp-outline" : "",
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-75 [background-image:linear-gradient(90deg,rgba(35,172,241,0.2)_1px,transparent_1px),linear-gradient(rgba(35,172,241,0.2)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-6 rounded-lp border-[3px] border-lp-primary-container/70 bg-lp-primary/15" />
      <div className="absolute inset-x-8 bottom-8 grid grid-cols-8 gap-2">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className={[
              "h-4 rounded-sm border border-lp-ink/20",
              index % 7 === 0
                ? "bg-lp-secondary-container"
                : index % 5 === 0
                  ? "bg-lp-tertiary-container"
                  : "bg-lp-surface-container-high/45",
            ].join(" ")}
          />
        ))}
      </div>
      <span className="absolute right-4 top-4 rounded-full border-[3px] border-lp-ink bg-lp-surface-container-lowest px-3 py-2 font-mono text-xs font-black uppercase text-lp-on-surface shadow-lp-level-2">
        {muted ? "Under Development" : "Completed"}
      </span>
    </div>
  );
}

function WorkStateBadge({
  state,
}: {
  state: "completed" | "under-development";
}) {
  return (
    <span
      className={[
        "inline-flex rounded-lp border-2 border-lp-ink px-3 py-1 font-mono text-xs font-black uppercase text-lp-on-surface",
        state === "under-development"
          ? "bg-lp-secondary-container"
          : "bg-lp-primary-container",
      ].join(" ")}
    >
      {state === "under-development" ? "Under Development" : "Completed"}
    </span>
  );
}

function getTechLabels(item: ItemDocument) {
  return item.tech.length > 0 ? item.tech : item.skills.map(formatSlug);
}

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
