"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteRoute } from "@/config/site";

type SiteNavigationProps = {
  routes: readonly SiteRoute[];
  variant: "desktop" | "mobile";
};

export function SiteNavigation({ routes, variant }: SiteNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={variant === "desktop" ? "Primary navigation" : "Mobile navigation"}
      className={
        variant === "desktop"
          ? "hidden items-center gap-2 lg:flex"
          : "fixed inset-x-0 bottom-0 z-20 border-t-[3px] border-lp-ink bg-lp-surface-container px-3 py-2 shadow-[0_-4px_0_var(--lp-color-ink)] lg:hidden"
      }
    >
      <ul
        className={
          variant === "desktop"
            ? "flex items-center gap-2"
            : "mx-auto grid max-w-2xl grid-cols-4 gap-2"
        }
      >
        {routes.map((route) => {
          const isActive = pathname === route.href;

          return (
            <li key={route.href}>
              <Link
                href={route.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  variant === "desktop"
                    ? [
                        "inline-flex min-h-10 items-center rounded-lp border-[3px] px-4 py-2 text-sm font-bold transition",
                        isActive
                          ? "translate-x-1 translate-y-1 border-lp-ink bg-lp-primary-container text-lp-on-surface shadow-none"
                          : "border-transparent bg-transparent text-lp-on-surface hover:border-lp-ink hover:bg-lp-surface-container-high hover:shadow-lp-level-2",
                      ].join(" ")
                    : [
                        "flex min-h-12 items-center justify-center rounded-lp border-2 px-2 text-center text-xs font-bold leading-tight transition",
                        isActive
                          ? "border-lp-ink bg-lp-primary-container text-lp-on-surface"
                          : "border-transparent bg-lp-surface text-lp-on-surface-variant",
                      ].join(" ")
                }
              >
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
