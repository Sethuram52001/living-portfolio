"use client";

import type { ReactNode } from "react";
import { AppFooter } from "@/components/app-footer";
import { AppNavbar } from "@/components/app-navbar";
import { SplashIntro } from "@/components/app/splash-intro";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <SplashIntro>
      <div className="min-h-screen bg-app-background text-app-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--app-radius-sm)] focus:bg-app-accent-green focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <AppNavbar />

        <main id="main-content">{children}</main>

        <AppFooter />
      </div>
    </SplashIntro>
  );
}
