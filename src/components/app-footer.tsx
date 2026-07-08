import { siteConfig } from "@/config/site";

export function AppFooter() {
  return (
    <footer className="border-t border-app-border bg-app-surface-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <p className="text-sm font-semibold text-app-foreground">Sethuram</p>
          <p className="mt-1 text-sm text-app-muted">
            Backend engineer · Building reliable systems and useful tools.
          </p>
        </div>

        <ul className="flex flex-wrap gap-4">
          {siteConfig.externalLinks.map((link) =>
            link.placeholder ? (
              <li key={link.label}>
                <span className="text-sm text-app-subtle">
                  {link.label}
                </span>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-app-muted transition-colors hover:text-app-foreground"
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
        </ul>
      </div>

      <div className="border-t border-app-border">
        <div className="mx-auto max-w-6xl px-6 py-5 lg:px-10">
          <p className="text-xs text-app-subtle">
            © {new Date().getFullYear()} Sethuram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
