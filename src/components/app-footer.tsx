import { siteConfig } from "@/config/site";

const footerLinkLabels = new Set([
  "Resume",
  "GitHub",
  "LinkedIn",
  "Medium",
  "Email",
]);

export function AppFooter() {
  const footerLinks = siteConfig.externalLinks.filter((link) =>
    footerLinkLabels.has(link.label),
  );

  return (
    <footer className="border-t border-app-border bg-app-surface-muted/60">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-app-foreground">
              Sethuram
            </p>
            <p className="mt-2 text-sm text-app-muted">
              Software engineer building reliable systems and useful tools.
            </p>
          </div>

          <nav aria-label="Footer links">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {footerLinks.map((link) => {
                const isExternal = !link.href.startsWith("mailto:");

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="text-sm font-medium text-app-muted transition-colors hover:text-app-accent-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-app-border py-5 text-xs text-app-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sethuram. All rights reserved.</p>
          <a
            href="#about"
            className="w-fit font-medium text-app-muted transition-colors hover:text-app-accent-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-foreground"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
