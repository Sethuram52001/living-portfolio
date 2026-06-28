import Link from "next/link";
import type { CurrentQuest, StatusHud } from "@/lib/content/schemas";

type QuestLogProps = {
  quests: CurrentQuest[];
  status: StatusHud;
};

const statusLinks = {
  building: "/work",
  writing: "/writing",
  learning: "/skills",
} as const;

export function QuestLog({ quests, status }: QuestLogProps) {
  const activeQuests = quests.filter((quest) => quest.status === "in-progress");
  const buildingQuests = activeQuests.filter((quest) =>
    quest.focus.includes("building"),
  );
  const writingQuests = activeQuests.filter((quest) =>
    quest.focus.includes("writing"),
  );
  const learningQuests = activeQuests.filter((quest) =>
    quest.focus.includes("learning"),
  );
  const primaryQuest = activeQuests[0];

  return (
    <section className="grid gap-10">
      <header className="grid gap-6 rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-highest p-6 shadow-lp-level-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:p-8">
        <div>
          <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
            Quest Log
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-none text-lp-on-surface lg:text-7xl">
            Active Quests
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
            Current building, writing, learning, and experiments live here. It is
            a momentum page, not a promise that every thread updates on a schedule.
          </p>
        </div>

        <aside className="grid gap-3 rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-2">
          <QuestStat label="Active" value={activeQuests.length.toString()} />
          <QuestStat label="Building" value={buildingQuests.length.toString()} />
          <QuestStat
            label="Learning"
            value={(learningQuests.length || status.learning.skills.length).toString()}
          />
        </aside>
      </header>

      {primaryQuest ? (
        <PrimaryQuestCard quest={primaryQuest} />
      ) : (
        <EmptyActivityState message="No active quest is pinned right now." />
      )}

      <section className="grid gap-5">
        <div className="border-b-[3px] border-lp-ink pb-4">
          <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
            Momentum lanes
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-lp-on-surface lg:text-4xl">
            Building, writing, and learning
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <MomentumLane
            count={buildingQuests.length}
            href={statusLinks.building}
            label={status.building.label}
            quests={buildingQuests}
            tone="bg-lp-primary-container"
            value={status.building.value}
          />
          <MomentumLane
            count={writingQuests.length || (status.writing.value ? 1 : 0)}
            href={statusLinks.writing}
            label={status.writing.label}
            quests={writingQuests}
            tone="bg-lp-secondary-container"
            value={status.writing.value}
          />
          <MomentumLane
            count={learningQuests.length || status.learning.skills.length}
            href={statusLinks.learning}
            label={status.learning.label}
            quests={learningQuests}
            tone="bg-lp-tertiary-container"
            value={status.learning.value}
          />
        </div>
      </section>
    </section>
  );
}

function QuestStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b-2 border-lp-outline-variant pb-3 last:border-b-0 last:pb-0">
      <span className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-on-surface-variant">
        {label}
      </span>
      <span className="text-2xl font-black text-lp-on-surface">{value}</span>
    </div>
  );
}

function PrimaryQuestCard({ quest }: { quest: CurrentQuest }) {
  return (
    <article
      id={quest.slug}
      className="overflow-hidden rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-4"
    >
      <div className="grid gap-6 border-b-[3px] border-lp-ink bg-lp-inverse-surface p-6 text-lp-inverse-on-surface lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:p-8">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-inverse-primary">
            Current focus
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight lg:text-6xl">
            {quest.title}
          </h2>
        </div>
        <span className="w-fit rounded-lp border-[3px] border-lp-inverse-on-surface bg-lp-secondary-container px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.08em] text-lp-on-surface shadow-lp-level-2">
          {quest.placeholder ? "Draft proof" : quest.status}
        </span>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-8">
        <div>
          <p className="text-lg font-bold leading-8 text-lp-on-surface-variant">
            {quest.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {quest.focus.map((focus) => (
              <span
                key={focus}
                className="rounded-lp border-2 border-lp-outline bg-lp-surface-container px-3 py-2 font-mono text-xs font-black uppercase text-lp-on-surface"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>

        <ReferenceSummary
          skills={quest.references.skills}
          zones={quest.references.zones}
        />
      </div>
    </article>
  );
}

function MomentumLane({
  count,
  href,
  label,
  quests,
  tone,
  value,
}: {
  count: number;
  href: string;
  label: string;
  quests: CurrentQuest[];
  tone: string;
  value: string;
}) {
  return (
    <article className="grid overflow-hidden rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-3">
      <div className={["border-b-[3px] border-lp-ink p-5", tone].join(" ")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface-variant">
              {label}
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight text-lp-on-surface">
              {value}
            </h3>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-lp-ink bg-lp-surface-container-lowest font-black text-lp-on-surface">
            {count}
          </span>
        </div>
      </div>

      <div className="grid gap-4 p-5">
        {quests.length > 0 ? (
          quests.map((quest) => (
            <Link
              key={quest.slug}
              href={`#${quest.slug}`}
              className="rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container p-4 transition hover:border-lp-ink"
            >
              <span className="font-black text-lp-on-surface">{quest.title}</span>
              <span className="mt-2 block text-sm font-bold leading-6 text-lp-on-surface-variant">
                {quest.summary}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-sm font-bold leading-6 text-lp-on-surface-variant">
            No dedicated quest card yet. This lane is still represented through the
            current status signal.
          </p>
        )}

        <Link
          href={href}
          className="mt-auto inline-flex w-fit rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.08em] text-lp-on-surface transition hover:bg-lp-primary-container"
        >
          Open related page
        </Link>
      </div>
    </article>
  );
}

function EmptyActivityState({ message }: { message: string }) {
  return (
    <div className="rounded-lp-xl border-[3px] border-dashed border-lp-outline bg-lp-surface-container-lowest p-6 shadow-lp-level-2">
      <p className="text-base font-bold leading-7 text-lp-on-surface-variant">
        {message}
      </p>
    </div>
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
    <div className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container p-5">
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
