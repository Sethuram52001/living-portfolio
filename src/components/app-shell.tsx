import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { SiteNavigation } from "@/components/site-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-lp-surface pb-28 text-lp-on-surface lg:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lp focus:border-[3px] focus:border-lp-ink focus:bg-lp-secondary-container focus:px-4 focus:py-2 focus:font-bold focus:text-lp-on-surface"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-10 border-b-[3px] border-lp-ink bg-lp-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 lg:px-10">
          <Link href="/" className="group inline-flex flex-col gap-1">
            <span className="text-lg font-black leading-none text-lp-primary lg:text-xl">
              {siteConfig.name}
            </span>
            <span className="font-mono text-xs font-bold uppercase leading-none text-lp-on-surface-variant">
              Living Portfolio
            </span>
          </Link>

          <SiteNavigation routes={siteConfig.routes} variant="desktop" />
        </div>
      </header>

      <main id="main-content" className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-10 lg:py-14">
        {children}
      </main>

      <footer className="border-t-[3px] border-lp-ink bg-lp-inverse-surface px-5 py-8 text-lp-inverse-on-surface lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase">Direct path</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-lp-inverse-on-surface/80">
              Recruiter-safe navigation is ready. Richer map, inventory, and skill
              surfaces arrive in later milestones.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {siteConfig.externalLinks.map((link) => (
              <li key={link.label}>
                {link.placeholder ? (
                  <span className="inline-flex rounded-lp border-2 border-lp-inverse-on-surface/40 px-3 py-2 text-sm font-bold text-lp-inverse-on-surface/70">
                    {link.label}
                  </span>
                ) : (
                  <a
                    href={link.href}
                    className="inline-flex rounded-lp border-2 border-lp-inverse-on-surface/60 px-3 py-2 text-sm font-bold text-lp-inverse-on-surface transition hover:bg-lp-inverse-on-surface hover:text-lp-inverse-surface"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <SiteNavigation routes={siteConfig.routes} variant="mobile" />
    </div>
  );
}
