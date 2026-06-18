import type { ExperiencePhase } from "@/lib/content/schemas";

type ExperienceTimelineProps = {
  phases: ExperiencePhase[];
};

export function ExperienceTimeline({ phases }: ExperienceTimelineProps) {
  return (
    <section className="grid gap-6">
      <header className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-6 shadow-lp-level-3 lg:p-10">
        <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
          Production Systems
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-lp-on-surface lg:text-5xl">
          Backend experience
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-lp-on-surface-variant">
          Career phases and Professional Milestones live here. The goal is to show
          backend impact, reliability work, and product delivery without turning
          the page into a pasted resume.
        </p>
      </header>

      <ol className="grid gap-6">
        {phases.map((phase) => (
          <li key={phase.slug}>
            <ExperiencePhaseCard phase={phase} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function ExperiencePhaseCard({ phase }: { phase: ExperiencePhase }) {
  return (
    <article className="grid gap-5 rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container p-5 shadow-lp-level-3 lg:grid-cols-[260px_minmax(0,1fr)] lg:p-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
          {phase.plainTitle}
        </p>
        <h2 className="mt-3 text-2xl font-black leading-tight text-lp-on-surface">
          {phase.title}
        </h2>
        <p className="mt-3 font-mono text-sm font-bold text-lp-on-surface-variant">
          {formatDateRange(phase.dateRange)}
        </p>
        <span className="mt-4 inline-flex rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-1 font-mono text-xs font-bold uppercase text-lp-on-surface">
          {phase.placeholder ? "Placeholder" : phase.status}
        </span>
      </div>

      <div>
        <p className="text-base leading-7 text-lp-on-surface-variant">
          {phase.summary}
        </p>
        <div className="mt-5 grid gap-4">
          {phase.milestones.map((milestone) => (
            <section
              key={milestone.slug}
              className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-black leading-tight text-lp-on-surface">
                  {milestone.title}
                </h3>
                <span className="rounded-lp border-2 border-lp-outline px-2 py-1 font-mono text-xs font-bold uppercase text-lp-on-surface-variant">
                  {milestone.placeholder ? "Placeholder" : milestone.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-lp-on-surface-variant">
                {milestone.summary}
              </p>
              <div className="mt-4 rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container p-4">
                <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
                  Proof
                </p>
                <p className="mt-2 text-sm leading-6 text-lp-on-surface">
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
