"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  ArrowTopRightOnSquareIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { TechIcon } from "@/components/tech-icon";
import type { ExternalLink } from "@/config/site";
import type {
  CurrentQuest,
  ExperiencePhase,
  FieldNoteDocument,
  ItemDocument,
  SkillGroup,
} from "@/lib/content/schemas";

type LivingPortfolioSpaProps = {
  currentQuests: CurrentQuest[];
  experiencePhases: ExperiencePhase[];
  externalLinks: readonly ExternalLink[];
  fieldNotes: FieldNoteDocument[];
  items: ItemDocument[];
  skillGroups: SkillGroup[];
};

type SectionId = "intro" | "experience" | "skills" | "work" | "writing" | "contact";

const mediumUrl = "https://medium.com/@sethuram52001";

export function LivingPortfolioSpa({
  currentQuests,
  experiencePhases,
  externalLinks,
  fieldNotes,
  items,
  skillGroups,
}: LivingPortfolioSpaProps) {
  const currentItemSlugs = useMemo(
    () =>
      new Set(
        currentQuests
          .filter((quest) => quest.status === "in-progress")
          .flatMap((quest) => [quest.slug, ...quest.references.items]),
      ),
    [currentQuests],
  );
  const selectedWork = useMemo(
    () => selectWork(items, currentItemSlugs),
    [currentItemSlugs, items],
  );
  const selectedSkills = useMemo(() => selectSkills(skillGroups), [skillGroups]);
  const selectedNotes = useMemo(() => selectWriting(fieldNotes), [fieldNotes]);
  const currentQuest = currentQuests.find((quest) => quest.status === "in-progress");

  return (
    <div className="mx-auto grid max-w-5xl gap-10 md:gap-14">
      <IntroSection currentQuest={currentQuest} />
      <ExperienceSection phases={experiencePhases} />
      <SkillsSection skills={selectedSkills} />
      <WorkSection currentItemSlugs={currentItemSlugs} items={selectedWork} />
      <WritingSection notes={selectedNotes} />
      <ContactSection links={externalLinks} />
    </div>
  );
}

function IntroSection({ currentQuest }: { currentQuest: CurrentQuest | undefined }) {
  return (
    <SpaSection
      eyebrow="About"
      icon={<ChatBubbleLeftRightIcon className="size-5" />}
      id="intro"
      title="Hi, I am Sethuram."
    >
      <p className="max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
        I build backend systems with a product eye. My strongest work sits around
        distributed systems, reliability, fintech workflows, and the practical side
        of shipping useful software.
      </p>
      <p className="mt-4 max-w-3xl text-base font-bold leading-7 text-lp-on-surface-variant">
        This page keeps the original portfolio spirit: simple sections, selected
        work, and a little movement to make the journey feel alive.
      </p>
      {currentQuest ? (
        <div className="mt-6 rounded-lp-md border-[3px] border-lp-ink bg-lp-secondary-container p-5 shadow-lp-level-3">
          <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface">
            Currently building
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-lp-on-surface">
            {currentQuest.title}
          </h2>
          <p className="mt-3 text-sm font-bold leading-6 text-lp-on-surface">
            {currentQuest.summary}
          </p>
        </div>
      ) : null}
    </SpaSection>
  );
}

function ExperienceSection({ phases }: { phases: ExperiencePhase[] }) {
  return (
    <SpaSection
      eyebrow="Experience"
      icon={<BriefcaseIcon className="size-5" />}
      id="experience"
      title="Production systems, fintech workflows, and the path into backend work."
    >
      <ol className="mt-6 grid gap-4">
        {phases.map((phase) => (
          <li
            className="rounded-lp-md border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-2"
            key={phase.slug}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
                  {phase.position}
                </p>
                <h2 className="mt-2 text-2xl font-black leading-tight text-lp-on-surface">
                  {phase.company}
                </h2>
              </div>
              <time className="rounded-lp border-2 border-lp-ink bg-lp-surface-container px-3 py-2 font-mono text-[11px] font-black uppercase text-lp-on-surface-variant">
                {formatDateRange(phase.dateRange)}
              </time>
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-lp-on-surface-variant">
              {phase.summary}
            </p>
          </li>
        ))}
      </ol>
    </SpaSection>
  );
}

function SkillsSection({ skills }: { skills: Array<SkillGroup["skills"][number]> }) {
  return (
    <SpaSection
      eyebrow="Skills"
      icon={<CommandLineIcon className="size-5" />}
      id="skills"
      title="The toolkit behind the work."
    >
      <div className="mt-6 grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6">
        {skills.map((skill) => (
          <div className="group relative grid justify-items-center gap-2" key={skill.slug}>
            <span className="grid aspect-square w-full max-w-20 place-items-center rounded-lp bg-transparent p-3 transition group-hover:-translate-y-1">
              <TechIcon
                className="size-12 drop-shadow-[3px_3px_0_var(--lp-color-ink)]"
                label={skill.title}
              />
            </span>
            <span className="text-center font-mono text-[10px] font-black uppercase leading-tight text-lp-on-surface-variant">
              {skill.title}
            </span>
          </div>
        ))}
      </div>
    </SpaSection>
  );
}

function WorkSection({
  currentItemSlugs,
  items,
}: {
  currentItemSlugs: Set<string>;
  items: ItemDocument[];
}) {
  return (
    <SpaSection
      eyebrow="Selected Work"
      icon={<CommandLineIcon className="size-5" />}
      id="work"
      title="A few projects that show the current direction."
    >
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {items.map((item) => {
          const isCurrent = currentItemSlugs.has(item.slug);

          return (
            <article
              className={[
                "grid rounded-lp-md border-[3px] border-lp-ink p-5 shadow-lp-level-3",
                isCurrent
                  ? "bg-lp-surface-container-high"
                  : "bg-lp-surface-container-lowest",
              ].join(" ")}
              key={item.slug}
            >
              <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
                {isCurrent ? "Under development" : "Completed"}
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight text-lp-on-surface">
                {item.title}
              </h2>
              <p className="mt-4 text-sm font-bold leading-6 text-lp-on-surface-variant">
                {item.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tech.slice(0, 3).map((tech) => (
                  <span
                    className="inline-flex items-center gap-2 rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container px-2 py-1 font-mono text-[10px] font-black uppercase text-lp-on-surface-variant"
                    key={tech}
                  >
                    <TechIcon className="size-4" label={tech} />
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </SpaSection>
  );
}

function WritingSection({ notes }: { notes: FieldNoteDocument[] }) {
  return (
    <SpaSection
      eyebrow="Writing"
      icon={<PencilSquareIcon className="size-5" />}
      id="writing"
      title="Selected field notes, not a full archive."
    >
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {notes.map((note) => (
          <article
            className="rounded-lp-md border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-2"
            key={note.slug}
          >
            <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
              {formatDate(note.date)}
            </p>
            <h2 className="mt-3 text-xl font-black leading-tight text-lp-on-surface">
              {note.title}
            </h2>
            <p className="mt-3 text-sm font-bold leading-6 text-lp-on-surface-variant">
              {note.summary}
            </p>
          </article>
        ))}
      </div>

      <a
        className="mt-6 inline-flex w-fit items-center gap-3 rounded-lp border-[3px] border-lp-ink bg-lp-secondary-container px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.08em] text-lp-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        href={mediumUrl}
        rel="noreferrer"
        target="_blank"
      >
        Find more on Medium
        <ArrowTopRightOnSquareIcon className="size-4" />
      </a>
    </SpaSection>
  );
}

function ContactSection({ links }: { links: readonly ExternalLink[] }) {
  return (
    <SpaSection
      eyebrow="Contact"
      icon={<ChatBubbleLeftRightIcon className="size-5" />}
      id="contact"
      title="Easy exits when the work looks worth a conversation."
    >
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {links.map((link) =>
          link.placeholder ? (
            <span
              aria-disabled="true"
              className="rounded-lp-md border-[3px] border-lp-outline bg-lp-surface-container p-5 font-bold text-lp-on-surface-variant"
              key={link.label}
            >
              {link.label}: coming soon
            </span>
          ) : (
            <a
              className="rounded-lp-md border-[3px] border-lp-ink bg-lp-primary px-5 py-4 font-black uppercase text-lp-inverse-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              href={link.href}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    </SpaSection>
  );
}

function SpaSection({
  children,
  eyebrow,
  icon,
  id,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  icon: ReactNode;
  id: SectionId;
  title: string;
}) {
  return (
    <section
      className="scroll-mt-28 rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface/95 p-5 shadow-lp-level-3 md:p-7"
      data-spa-section
      id={id}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full border-[3px] border-lp-ink bg-lp-primary-container text-lp-on-surface shadow-lp-level-2">
          {icon}
        </span>
        <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
          {eyebrow}
        </p>
      </div>
      <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase leading-tight text-lp-on-surface md:text-5xl">
        {title}
      </h1>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function selectWork(items: ItemDocument[], currentItemSlugs: Set<string>) {
  const current = items.find((item) => currentItemSlugs.has(item.slug));
  const completed = items.filter((item) => !currentItemSlugs.has(item.slug)).slice(0, 2);

  return [current, ...completed].filter((item): item is ItemDocument => Boolean(item));
}

function selectSkills(skillGroups: SkillGroup[]) {
  return skillGroups.flatMap((group) => group.skills).slice(0, 12);
}

function selectWriting(notes: FieldNoteDocument[]) {
  return [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
}

function formatDateRange(dateRange: ExperiencePhase["dateRange"]) {
  return `${formatMonth(dateRange.start)} - ${
    dateRange.end ? formatMonth(dateRange.end) : "Present"
  }`;
}

function formatMonth(month: string) {
  const [year, monthIndex] = month.split("-");
  const date = new Date(Number(year), Number(monthIndex) - 1);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
