import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
import { TechIcon } from "@/components/tech-icon";
import type { ItemDocument } from "@/lib/content/schemas";

type ItemDetailProps = {
  item: ItemDocument;
};

export function ItemDetail({ item }: ItemDetailProps) {
  const primaryLink = item.links[0];
  const tech = getTechLabels(item);

  return (
    <article className="mx-auto grid max-w-[1024px] gap-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-3 font-mono text-xs font-black uppercase tracking-[0.12em]"
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-lp-outline transition hover:text-lp-primary"
        >
          <ArrowLeftIcon className="size-4" />
          Work
        </Link>
        <span className="text-lp-outline" aria-hidden="true">
          /
        </span>
        <span className="text-lp-secondary">{item.slug}</span>
      </nav>

      <section className="overflow-hidden rounded-lp-md border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-4">
        <ProjectHero item={item} />

        <div className="grid gap-6 p-6 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
                {item.artifact.type} artifact
              </p>
              <h1 className="mt-3 text-[42px] font-black uppercase leading-none text-lp-on-surface md:text-[72px]">
                {item.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-bold leading-7 text-lp-on-surface-variant md:text-lg md:leading-8">
                {item.summary}
              </p>
            </div>

            <div className="rounded-lp border-[3px] border-lp-ink bg-lp-surface-container-high p-4 shadow-lp-level-2">
              <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface-variant">
                Key Tech
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((label) => (
                  <TechPill key={label} label={label} />
                ))}
              </div>
            </div>
          </div>

          <div className="border-l-[8px] border-lp-secondary pl-5">
            <p className="text-base font-bold leading-7 text-lp-on-surface-variant">
              <strong className="text-lp-on-surface">Motivation:</strong>{" "}
              {item.proof.motivation}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Project actions"
        className="grid gap-4 md:grid-cols-2"
      >
        <DeploymentAction item={item} />

        {primaryLink ? (
          <a
            href={primaryLink.href}
            className="inline-flex min-h-16 items-center justify-center gap-3 rounded-lp-md border-[3px] border-lp-ink bg-lp-surface-container-lowest px-6 py-4 text-center text-xl font-black uppercase leading-tight text-lp-on-surface shadow-lp-level-3 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-lp-level-2"
          >
            <CodeBracketIcon className="size-5" />
            {primaryLink.label}
          </a>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <DetailPanel
          className="bg-[#c9e6ff] text-[#001e2f]"
          icon={<ExclamationTriangleIcon className="size-6" />}
          title="The Challenge"
        >
          <p>{item.proof.motivation}</p>
        </DetailPanel>

        <DetailPanel
          className="bg-[#ffddb8] text-[#2a1700]"
          icon={<MapIcon className="size-6" />}
          title="The Journey"
        >
          <p>{item.body}</p>
        </DetailPanel>
      </section>

      <section className="grid gap-5">
        <div className="flex items-center gap-3 border-b-[3px] border-lp-ink pb-4">
          <BookOpenIcon className="size-6 text-lp-primary" />
          <h2 className="text-2xl font-black uppercase leading-tight text-lp-on-surface md:text-3xl">
            Field Notes
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FieldNoteCard title="What I Learned" body={item.proof.learned} />
          <FieldNoteCard title="Why It Mattered" body={item.proof.mattered} />
        </div>
      </section>
    </article>
  );
}

function DeploymentAction({ item }: { item: ItemDocument }) {
  if (item.deployment.status === "available" && item.deployment.href) {
    return (
      <a
        href={item.deployment.href}
        className="inline-flex min-h-16 items-center justify-center gap-3 rounded-lp-md border-[3px] border-lp-ink bg-lp-primary px-6 py-4 text-center text-xl font-black uppercase leading-tight text-lp-inverse-on-surface shadow-lp-level-3 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-lp-level-2"
      >
        <ArrowTopRightOnSquareIcon className="size-5" />
        {item.deployment.label ?? "View Deployment"}
      </a>
    );
  }

  return (
    <span
      aria-disabled="true"
      className="inline-flex min-h-16 items-center justify-center gap-3 rounded-lp-md border-[3px] border-lp-outline-variant bg-lp-surface-container px-6 py-4 text-center text-xl font-black uppercase leading-tight text-lp-outline shadow-lp-level-2"
    >
      <ArrowTopRightOnSquareIcon className="size-5" />
      No Deployment Available
    </span>
  );
}

function ProjectHero({ item }: { item: ItemDocument }) {
  return (
    <div className="relative min-h-[320px] overflow-hidden border-b-[3px] border-lp-ink bg-lp-inverse-surface md:min-h-[460px]">
      <div className="absolute inset-0 opacity-75 [background-image:linear-gradient(90deg,rgba(35,172,241,0.22)_1px,transparent_1px),linear-gradient(rgba(35,172,241,0.18)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute inset-6 rounded-lp-lg border-[3px] border-lp-primary-container bg-lp-primary/15 md:inset-10" />
      <div className="absolute inset-x-10 bottom-10 grid grid-cols-8 gap-2 md:inset-x-20 md:bottom-16">
        {Array.from({ length: 48 }).map((_, index) => (
          <span
            key={index}
            className={[
              "h-5 rounded-sm border border-lp-ink/20 md:h-7",
              index % 11 === 0
                ? "bg-lp-secondary-container"
                : index % 7 === 0
                  ? "bg-lp-primary-container"
                  : index % 5 === 0
                    ? "bg-lp-tertiary-container"
                    : "bg-lp-surface-container-high/35",
            ].join(" ")}
          />
        ))}
      </div>
      <span className="absolute left-5 top-5 rounded-lp border-[3px] border-lp-ink bg-lp-surface-container-lowest px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface shadow-lp-level-2 md:left-8 md:top-8">
        {item.artifact.label}
      </span>
    </div>
  );
}

function DetailPanel({
  children,
  className,
  icon,
  title,
}: {
  children: ReactNode;
  className: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <section
      className={[
        "grid gap-5 rounded-lp-md border-[3px] border-lp-ink p-6 shadow-lp-level-3 md:p-8",
        className,
      ].join(" ")}
    >
      <h2 className="flex items-center gap-3 border-b-[3px] border-current pb-4 text-2xl font-black uppercase leading-tight md:text-3xl">
        {icon}
        {title}
      </h2>
      <div className="grid gap-5 text-base font-medium leading-7 md:text-lg md:leading-8">
        {children}
      </div>
    </section>
  );
}

function FieldNoteCard({ body, title }: { body: string; title: string }) {
  return (
    <section className="grid gap-4 rounded-lp-md border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-2">
      <CheckCircleIcon className="size-6 text-lp-primary" />
      <h3 className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
        {title}
      </h3>
      <p className="text-sm font-bold leading-6 text-lp-on-surface-variant">
        {body}
      </p>
    </section>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container-lowest px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.08em] text-lp-on-surface-variant">
      <TechIcon className="size-4" label={label} />
      {label}
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
