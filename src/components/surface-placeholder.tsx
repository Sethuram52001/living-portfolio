import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteRoute } from "@/config/site";

type SurfacePlaceholderProps = {
  route: SiteRoute;
  children?: ReactNode;
};

export function SurfacePlaceholder({ route, children }: SurfacePlaceholderProps) {
  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <section className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-6 shadow-lp-level-3 lg:p-10">
        <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
          {route.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-lp-on-surface lg:text-5xl">
          {route.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-lp-on-surface-variant">
          {route.description}
        </p>

        {children ? <div className="mt-8">{children}</div> : null}
      </section>

      <aside className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container p-5 shadow-lp-level-2">
        <p className="font-mono text-xs font-bold uppercase text-lp-on-surface-variant">
          Status
        </p>
        <p className="mt-3 text-base font-bold leading-7 text-lp-on-surface">
          {route.status}
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-lp border-[3px] border-lp-ink bg-lp-secondary-container px-4 py-3 text-sm font-black text-lp-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          Contact details
        </Link>
      </aside>
    </article>
  );
}
