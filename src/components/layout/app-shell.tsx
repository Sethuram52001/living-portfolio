"use client";

import type { ReactNode } from "react";
import type { SiteContent } from "@/lib/content/schemas";
import { AppFooter } from "./app-footer";
import { AppNavbar } from "./app-navbar";
import { SplashIntro } from "./splash-intro";

type AppShellProps = {
  children: ReactNode;
  site: SiteContent;
};

export function AppShell({ children, site }: AppShellProps) {
  return (
    <SplashIntro person={site.person}>
      <div className="min-h-screen bg-app-background text-app-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--app-radius-sm)] focus:bg-app-accent-green focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          {site.shell.skipLinkLabel}
        </a>

        <AppNavbar
          menu={site.shell.menu}
          navigation={site.shell.navigation}
          siteName={site.person.name}
        />

        <main id="main-content">{children}</main>

        <AppFooter
          footer={site.shell.footer}
          links={site.externalLinks}
          siteName={site.person.name}
        />
      </div>
    </SplashIntro>
  );
}
