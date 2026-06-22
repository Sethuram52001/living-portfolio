import Link from "next/link";
import type { CurrentQuest, StatusHud } from "@/lib/content/schemas";

type QuestLogProps = {
  quests: CurrentQuest[];
  status: StatusHud;
};

const statusLinks = {
  building: "/quests",
  writing: "/writing",
  learning: "/skills",
} as const;

export function QuestLog({ quests, status }: QuestLogProps) {
  return (
    <section className="grid gap-8">
      <header className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
            Quest Log
          </p>
          <h1 className="mt-4 text-5xl font-black leading-none text-lp-on-surface lg:text-7xl">
            Active Quests
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
            Current building, writing, learning, and experiments live here. These are
            active objectives, not a fixed update schedule.
          </p>
        </div>
        <div className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container-highest p-5 shadow-lp-level-2">
          <p className="text-5xl font-black text-lp-secondary-container">
            {quests.length}
          </p>
          <p className="mt-2 font-mono text-sm font-black uppercase tracking-[0.12em] text-lp-on-surface-variant">
            Active
          </p>
          <p className="text-xl font-black text-lp-on-surface">In progress</p>
        </div>
      </header>

      <StatusPanel status={status} />

      <div className="grid gap-6 lg:grid-cols-3">
        {quests.map((quest) => (
          <QuestCard key={quest.slug} quest={quest} />
        ))}
      </div>
    </section>
  );
}

function StatusPanel({ status }: { status: StatusHud }) {
  const rows = [
    { key: "building", label: status.building.label, value: status.building.value },
    { key: "writing", label: status.writing.label, value: status.writing.value },
    { key: "learning", label: status.learning.label, value: status.learning.value },
  ] as const;

  return (
    <aside className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 text-lp-on-surface shadow-lp-level-3 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
            Current Status
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight">
            What I am focused on now
          </h2>
        </div>
        {status.placeholder ? (
          <span className="rounded-lp border-2 border-lp-ink bg-lp-secondary-container px-3 py-1 font-mono text-xs font-black uppercase text-lp-on-surface">
            Placeholder
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm font-bold leading-6 text-lp-on-surface-variant">
        Last updated: {status.updatedOn}
      </p>

      <dl className="mt-5 grid gap-3 lg:grid-cols-3">
        {rows.map((row) => (
          <div
            key={row.key}
            className="rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container p-4"
          >
            <dt className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
              {row.label}
            </dt>
            <dd className="mt-2 text-base font-bold leading-6">{row.value}</dd>
            <Link
              href={statusLinks[row.key]}
              className="mt-3 inline-flex rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.08em] transition hover:bg-lp-primary-container"
            >
              View route
            </Link>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function QuestCard({ quest }: { quest: CurrentQuest }) {
  return (
    <article
      id={quest.slug}
      className="overflow-hidden rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-3"
    >
      <div className="relative h-44 border-b-[3px] border-lp-ink bg-lp-inverse-surface">
        <div className="absolute inset-6 rounded-lp-lg border-2 border-lp-inverse-on-surface/20 bg-[radial-gradient(circle_at_35%_35%,var(--lp-color-inverse-primary),transparent_28%),linear-gradient(135deg,rgba(35,172,241,0.35),rgba(17,28,45,0.2))]" />
        <span className="absolute right-5 top-5 rounded-full border-[3px] border-lp-ink bg-lp-primary-container px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface shadow-lp-level-2">
          {quest.placeholder ? "Placeholder" : quest.status}
        </span>
      </div>

      <div className="grid gap-5 p-5 lg:p-6">
        <div>
          <p className="font-mono text-sm font-black uppercase tracking-[0.12em] text-lp-tertiary">
            Active Quest
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-lp-on-surface">
            {quest.title}
          </h2>
          <p className="mt-4 text-base font-bold leading-7 text-lp-on-surface-variant">
            {quest.summary}
          </p>
        </div>

        <dl className="grid gap-3 border-y-2 border-lp-outline-variant py-5 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs font-black uppercase text-lp-on-surface-variant">
              Outcome
            </dt>
            <dd className="mt-1 text-base font-black text-lp-secondary">
              Buildable proof
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs font-black uppercase text-lp-on-surface-variant">
              Focus
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {quest.focus.map((focus) => (
                <span
                  key={focus}
                  className="rounded-lp border-2 border-lp-outline bg-lp-surface-container px-2 py-1 font-mono text-xs font-black uppercase text-lp-on-surface"
                >
                  {focus}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <ReferenceSummary
          skills={quest.references.skills}
          zones={quest.references.zones}
        />
      </div>
    </article>
  );
}

function ReferenceSummary({
  skills,
  zones,
}: {
  skills: string[];
  zones: string[];
}) {
  return (
    <div>
      <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
        Connected proof
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Link
            key={skill}
            href="/skills"
            className="rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-2 text-sm font-bold text-lp-on-surface transition hover:bg-lp-primary-container"
          >
            {skill}
          </Link>
        ))}
        {zones.map((zone) => (
          <Link
            key={zone}
            href="/"
            className="rounded-lp border-2 border-lp-outline bg-lp-surface-container-lowest px-3 py-2 text-sm font-bold text-lp-on-surface-variant transition hover:border-lp-ink hover:text-lp-on-surface"
          >
            {zone}
          </Link>
        ))}
      </div>
    </div>
  );
}
