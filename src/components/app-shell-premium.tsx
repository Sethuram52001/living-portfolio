"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

type AppShellPremiumProps = {
  children: ReactNode;
};

const navAnchors = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export function AppShellPremium({ children }: AppShellPremiumProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pm-surface text-pm-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--pm-radius-sm)] focus:bg-pm-accent-emerald focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      {/* ---- Sticky header ---- */}
      <header className="sticky top-0 z-40 border-b border-pm-border bg-pm-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-pm-text transition-opacity hover:opacity-70"
          >
            Sethuram
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Page sections">
            {navAnchors.map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className="text-[13px] font-medium text-pm-text-secondary transition-colors hover:text-pm-text"
              >
                {anchor.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-[var(--pm-radius-sm)] text-pm-text-secondary transition hover:bg-pm-surface-alt md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-section-nav"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <nav
            id="mobile-section-nav"
            className="absolute left-0 right-0 top-full border-b border-t border-pm-border bg-pm-surface/95 px-6 pb-6 pt-4 shadow-pm-sm backdrop-blur-xl md:hidden"
            aria-label="Page sections"
          >
            <ul className="grid gap-1">
              {navAnchors.map((anchor) => (
                <li key={anchor.href}>
                  <a
                    href={anchor.href}
                    className="block rounded-[var(--pm-radius-sm)] px-3 py-2.5 text-sm font-medium text-pm-text-secondary transition-colors hover:bg-pm-surface-alt hover:text-pm-text"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {anchor.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* ---- Main content ---- */}
      <main id="main-content">{children}</main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-pm-border bg-pm-surface-alt">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold text-pm-text">Sethuram</p>
            <p className="mt-1 text-sm text-pm-text-secondary">
              Backend engineer · Building reliable systems and useful tools.
            </p>
          </div>

          <ul className="flex flex-wrap gap-4">
            {siteConfig.externalLinks.map((link) =>
              link.placeholder ? (
                <li key={link.label}>
                  <span className="text-sm text-pm-text-tertiary">
                    {link.label}
                  </span>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-pm-text-secondary transition-colors hover:text-pm-text"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="border-t border-pm-border">
          <div className="mx-auto max-w-6xl px-6 py-5 lg:px-10">
            <p className="text-xs text-pm-text-tertiary">
              © {new Date().getFullYear()} Sethuram. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
