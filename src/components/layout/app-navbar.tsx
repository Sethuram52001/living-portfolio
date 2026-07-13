"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@/components/icons/app-icons";
import type { SiteContent } from "@/lib/content/schemas";

export function AppNavbar({
  menu,
  navigation,
  siteName,
}: {
  menu: SiteContent["shell"]["menu"];
  navigation: SiteContent["shell"]["navigation"];
  siteName: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-app-border bg-app-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-app-foreground transition-opacity hover:opacity-70"
        >
          {siteName}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={menu.navigationLabel}
        >
          {navigation.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="text-[13px] font-medium text-app-muted transition-colors hover:text-app-accent-green"
            >
              {anchor.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-[var(--app-radius-sm)] text-app-muted transition hover:bg-app-surface-muted md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? menu.closeLabel : menu.openLabel}
          aria-controls="mobile-section-nav"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="size-5" />
          ) : (
            <Bars3Icon className="size-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-section-nav"
          className="absolute left-0 right-0 top-full border-b border-t border-app-border bg-app-background/95 px-6 pb-6 pt-4 shadow-app-sm backdrop-blur-xl md:hidden"
          aria-label={menu.navigationLabel}
        >
          <ul className="grid gap-1">
            {navigation.map((anchor) => (
              <li key={anchor.href}>
                <a
                  href={anchor.href}
                  className="block rounded-[var(--app-radius-sm)] px-3 py-2.5 text-sm font-medium text-app-muted transition-colors hover:bg-app-surface-muted hover:text-app-accent-green"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {anchor.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
