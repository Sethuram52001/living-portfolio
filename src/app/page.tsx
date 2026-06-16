import Link from "next/link";
import type { Metadata } from "next";
import { SurfacePlaceholder } from "@/components/surface-placeholder";
import { getRequiredRouteByHref, siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/");

export const metadata: Metadata = createPageMetadata({
  title: "Living Portfolio",
  description: route.description,
  path: route.href,
});

export default function Home() {
  const directRoutes = siteConfig.routes.filter((item) => item.href !== "/");

  return (
    <SurfacePlaceholder route={route}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <p className="max-w-2xl text-base leading-7 text-lp-on-surface">
            This site is being built as a living career map: a direct,
            recruiter-readable portfolio first, with richer map exploration added
            step by step.
          </p>
          <p className="mt-4 max-w-2xl text-base font-bold leading-7 text-lp-on-surface">
            {siteConfig.role}
          </p>
        </div>

        <div className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container p-5">
          <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
            Direct links
          </p>
          <ul className="mt-4 grid gap-2">
            {directRoutes.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container-lowest px-3 py-2 text-sm font-bold text-lp-on-surface transition hover:border-lp-ink hover:bg-lp-primary-container"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SurfacePlaceholder>
  );
}
