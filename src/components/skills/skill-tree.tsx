import Link from "next/link";
import type { SkillGroup } from "@/lib/content/schemas";

type SkillTreeProps = {
  groups: SkillGroup[];
};

type SkillNode = SkillGroup["skills"][number];
type ReferenceKey = keyof SkillNode["references"];

const statusStyles: Record<SkillNode["status"], string> = {
  available: "border-lp-outline bg-lp-surface-container-high text-lp-on-surface",
  completed: "border-lp-ink bg-lp-primary-container text-lp-on-surface",
  current: "border-lp-ink bg-lp-secondary-container text-lp-on-surface",
  learning: "border-lp-ink bg-lp-tertiary-container text-lp-on-surface",
};

const groupToneClasses = [
  "bg-lp-primary-container",
  "bg-lp-tertiary-container",
  "bg-lp-secondary-container",
] as const;

const referenceConfig: Record<
  ReferenceKey,
  { label: string; href: (slug: string) => string }
> = {
  fieldNotes: { label: "Field note", href: () => "/writing" },
  experiences: { label: "Experience", href: () => "/experience" },
  items: { label: "Work", href: (slug) => `/work/${slug}` },
  quests: { label: "Quest", href: (slug) => `/quests#${slug}` },
  skills: { label: "Skill", href: () => "/skills" },
  zones: { label: "Zone", href: () => "/" },
};

export function SkillTree({ groups }: SkillTreeProps) {
  return (
    <div className="grid gap-10">
      <header className="mx-auto grid max-w-4xl justify-items-center text-center">
        <p className="inline-flex rounded-full border-[3px] border-lp-ink bg-lp-secondary-container px-5 py-2 font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface shadow-lp-level-2">
          Backend-first capabilities
        </p>
        <h1 className="mt-6 text-5xl font-black uppercase leading-none text-lp-on-surface lg:text-7xl">
          Mastery Tree
        </h1>
        <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
          A backend-first view of what Sethuram has used, is learning, and is
          actively applying. Each skill node points toward connected proof where
          the repo has it.
        </p>
      </header>

      <div className="lp-grid-surface rounded-lp-xl border-[3px] border-lp-ink p-5 shadow-lp-level-4 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
          {groups.map((group, index) => (
            <SkillGroupSection key={group.slug} group={group} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillGroupSection({
  group,
  index,
}: {
  group: SkillGroup;
  index: number;
}) {
  const tone = groupToneClasses[index % groupToneClasses.length];

  return (
    <section id={group.slug} className="grid gap-6">
      <div
        className={[
          "rounded-lp border-[3px] border-lp-ink p-4 shadow-lp-level-3",
          tone,
        ].join(" ")}
      >
        <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface-variant">
          Capability Group
        </p>
        <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-lp-on-surface lg:text-3xl">
          {group.title}
        </h2>
      </div>

      <ol className="grid gap-10">
        {group.skills.map((skill, skillIndex) => (
          <li key={skill.slug} className="relative grid justify-items-center gap-5">
            <SkillNodeCard skill={skill} />
            {skillIndex < group.skills.length - 1 ? (
              <span className="h-10 w-1 bg-lp-ink" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>

      {group.placeholder ? (
        <span className="mx-auto rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-1 font-mono text-xs font-black uppercase text-lp-on-surface">
          Placeholder
        </span>
      ) : null}

      <p className="text-center text-sm font-bold leading-6 text-lp-on-surface-variant">
        {group.summary}
      </p>
    </section>
  );
}

function SkillNodeCard({ skill }: { skill: SkillNode }) {
  return (
    <article
      id={skill.slug}
      className="flex min-h-48 w-full max-w-64 flex-col rounded-lp-sm border-[3px] border-lp-ink bg-lp-surface-container-lowest p-4 text-center shadow-lp-level-2"
    >
      <div className="grid justify-items-center gap-3">
        <div className="grid size-16 place-items-center border-[3px] border-lp-ink bg-lp-surface">
          <span className="text-2xl font-black text-lp-primary">
            {skill.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <span
          className={`rounded-lp border-2 px-3 py-1 font-mono text-xs font-bold uppercase ${statusStyles[skill.status]}`}
        >
          {skill.status}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-black uppercase leading-tight text-lp-on-surface">
        {skill.title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-lp-on-surface-variant">
        {skill.summary}
      </p>

      <ConnectedProof references={skill.references} />
    </article>
  );
}

function ConnectedProof({
  references,
}: {
  references: SkillNode["references"];
}) {
  const links = (Object.keys(referenceConfig) as ReferenceKey[]).flatMap((key) =>
    references[key].map((slug) => ({
      key: `${key}-${slug}`,
      label: `${referenceConfig[key].label}: ${slug}`,
      href: referenceConfig[key].href(slug),
    })),
  );

  return (
    <div className="mt-auto pt-5">
      <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
        Connected proof
      </p>
      {links.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="rounded-lp border-2 border-lp-outline bg-lp-surface-container-lowest px-3 py-2 text-xs font-bold text-lp-on-surface-variant transition hover:border-lp-ink hover:bg-lp-primary-container hover:text-lp-on-surface"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-lp-on-surface-variant">
          No public proof connected yet.
        </p>
      )}
    </div>
  );
}
