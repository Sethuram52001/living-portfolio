import Link from "next/link";

export function HomeHero() {
  return (
    <section className="max-w-4xl">
      <div>
        <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
          Living Portfolio
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-lp-on-surface lg:text-6xl">
          A career map for the systems I build, the ideas I am testing, and the work
          I am growing into.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-lp-on-surface-variant">
          I am Sethuram, a backend engineer with light AI and frontend breadth. This
          portfolio is meant to be direct enough for hiring conversations and alive
          enough to show what I am exploring now.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="rounded-lp border-[3px] border-lp-ink bg-lp-primary-container px-5 py-3 text-sm font-black text-lp-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            View selected work
          </Link>
          <Link
            href="/contact"
            className="rounded-lp border-[3px] border-lp-ink bg-lp-surface-container-lowest px-5 py-3 text-sm font-black text-lp-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Contact details
          </Link>
        </div>
      </div>
    </section>
  );
}
