import Link from "next/link";
import type { HomeStatus } from "@/components/home/home-map-data";

type CurrentlyPanelProps = {
  status: HomeStatus;
};

const statusRows = [
  {
    key: "building",
    href: "/quests",
  },
  {
    key: "writing",
    href: "/writing",
  },
  {
    key: "learning",
    href: "/skills",
  },
] as const;

export function CurrentlyPanel({ status }: CurrentlyPanelProps) {
  return (
    <aside className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-inverse-surface p-5 text-lp-inverse-on-surface shadow-lp-level-3 lg:p-6">
      <p className="font-mono text-xs font-bold uppercase text-lp-secondary-container">
        Currently
      </p>
      <h2 className="mt-3 text-2xl font-black leading-tight">Active signal</h2>
      <p className="mt-3 text-sm leading-6 text-lp-inverse-on-surface/75">
        A compact snapshot of what is being built, written, and learned. Placeholder
        entries stay marked until real public copy replaces them.
      </p>

      <dl className="mt-5 grid gap-3">
        {statusRows.map((row) => {
          const item = status[row.key];

          return (
            <div key={row.key} className="rounded-lp border-2 border-lp-inverse-on-surface/25 bg-lp-inverse-on-surface/10 p-4">
              <dt className="font-mono text-xs font-bold uppercase text-lp-secondary-container">
                {item.label}
              </dt>
              <dd className="mt-2 text-base font-bold leading-6">{item.value}</dd>
              <Link
                href={row.href}
                className="mt-3 inline-flex rounded-lp border-2 border-lp-inverse-on-surface/50 px-3 py-2 text-sm font-bold transition hover:bg-lp-inverse-on-surface hover:text-lp-inverse-surface"
              >
                View route
              </Link>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}
