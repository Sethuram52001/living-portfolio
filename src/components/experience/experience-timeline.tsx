import type { ExperiencePhase } from "@/lib/content/schemas";

type ExperienceTimelineProps = {
  phases: ExperiencePhase[];
};

export function ExperienceTimeline({ phases }: ExperienceTimelineProps) {
  return (
    <section className="grid gap-10">
      <header>
        <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
          Experience
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-lp-primary lg:text-6xl">
          Career Timeline
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
          A chronological path through backend experience, production systems,
          and professional milestones completed so far.
        </p>
      </header>

      <ol className="relative grid gap-10 pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-1 before:bg-lp-ink lg:gap-12">
        {phases.map((phase) => (
          <li key={phase.slug} className="relative">
            <span
              className="absolute -left-[31px] top-8 size-8 rounded-full border-[3px] border-lp-ink bg-lp-primary-container"
              aria-hidden="true"
            />
            <ExperiencePhaseCard phase={phase} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function ExperiencePhaseCard({ phase }: { phase: ExperiencePhase }) {
  return (
    <article className="grid gap-5 rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-4 lg:p-7">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-lp border-[3px] border-lp-ink bg-lp-secondary-container px-3 py-1 font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-on-surface shadow-lp-level-2">
              Career Phase
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight text-lp-on-surface lg:text-5xl">
              {phase.title}
            </h2>
          </div>
          <span className="rounded-full border-[3px] border-lp-ink bg-lp-surface-container-high px-4 py-2 font-mono text-sm font-black text-lp-on-surface-variant">
            {formatDateRange(phase.dateRange)}
          </span>
        </div>

        <p className="mt-5 text-lg font-bold leading-8 text-lp-on-surface-variant">
          {phase.summary}
        </p>
        <div className="mt-6 grid gap-4">
          {phase.milestones.map((milestone) => (
            <section
              key={milestone.slug}
              className="rounded-lp-lg border-2 border-lp-outline-variant bg-lp-surface-container p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-black leading-tight text-lp-on-surface">
                  {milestone.title}
                </h3>
                <span className="rounded-lp border-2 border-lp-outline px-2 py-1 font-mono text-xs font-bold uppercase text-lp-on-surface-variant">
                  {milestone.placeholder ? "Placeholder" : milestone.status}
                </span>
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-lp-on-surface-variant">
                {milestone.summary}
              </p>
              <div className="mt-4 rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container-lowest p-4">
                <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
                  Proof
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-lp-on-surface">
                  {milestone.proof}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

function formatDateRange(dateRange: ExperiencePhase["dateRange"]) {
  return `${dateRange.start} - ${dateRange.end ?? "Present"}`;
}
