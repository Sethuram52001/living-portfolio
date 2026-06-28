import { TechIcon, getTechIconMeta } from "@/components/tech-icon";
import type { SkillGroup } from "@/lib/content/schemas";

type SkillTreeProps = {
  groups: SkillGroup[];
};

type SkillNode = SkillGroup["skills"][number];

export function SkillTree({ groups }: SkillTreeProps) {
  return (
    <section className="grid gap-12">
      <header className="max-w-4xl">
        <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
          Capability Sectors
        </p>
        <h1 className="mt-3 text-[52px] font-black uppercase leading-none text-lp-on-surface md:text-[88px]">
          Skill Tree
        </h1>
        <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
          A backend-first icon map of the tools I use, the systems ideas I am
          sharpening, and the frontend breadth behind older projects.
        </p>
      </header>

      <div className="grid gap-12">
        {groups.map((group) => (
          <SkillSector key={group.slug} group={group} />
        ))}
      </div>
    </section>
  );
}

function SkillSector({ group }: { group: SkillGroup }) {
  return (
    <section
      id={group.slug}
      className="grid gap-6 rounded-lp-md border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-3 md:p-6"
    >
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
          Sector
        </p>
        <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-lp-on-surface md:text-3xl">
          {group.title}
        </h2>
        <p className="mt-3 text-sm font-bold leading-6 text-lp-on-surface-variant">
          {group.summary}
        </p>
      </div>

      <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {group.skills.map((skill) => (
          <li key={skill.slug}>
            <SkillIconTile skill={skill} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function SkillIconTile({ skill }: { skill: SkillNode }) {
  const iconMeta = getTechIconMeta(skill.title);

  return (
    <article className="group relative">
      <button
        aria-describedby={`${skill.slug}-summary`}
        aria-label={`${skill.title}: ${skill.summary}`}
        className="grid aspect-square w-full place-items-center rounded-lp bg-transparent p-5 text-lp-primary transition hover:-translate-y-1 focus:outline-none focus-visible:-translate-y-1 focus-visible:ring-4 focus-visible:ring-lp-secondary-container"
        type="button"
      >
        <TechIcon
          className="size-16 drop-shadow-[3px_3px_0_var(--lp-color-ink)]"
          label={skill.title}
        />
      </button>

      <div
        className="pointer-events-none absolute inset-x-0 top-[calc(100%+0.75rem)] z-[1] rounded-lp border-[3px] border-lp-ink bg-lp-surface-container-lowest p-4 text-sm font-bold leading-6 text-lp-on-surface-variant opacity-0 shadow-lp-level-3 transition group-focus-within:opacity-100 group-hover:opacity-100"
        id={`${skill.slug}-summary`}
        role="tooltip"
      >
        <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-on-surface">
          {iconMeta.title}
        </p>
        <p className="mt-2">{skill.summary}</p>
      </div>
    </article>
  );
}
