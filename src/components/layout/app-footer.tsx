import {
  DocumentIcon,
  EnvelopeIcon,
  GitHubIcon,
  HeartIcon,
  LinkedInIcon,
  MediumIcon,
} from "@/components/icons/app-icons";
import type { SiteContent } from "@/lib/content/schemas";

const footerLinkIcons = {
  Email: EnvelopeIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Medium: MediumIcon,
  Resume: DocumentIcon,
};

export function AppFooter({
  footer,
  links,
  siteName,
}: {
  footer: SiteContent["shell"]["footer"];
  links: SiteContent["externalLinks"];
  siteName: string;
}) {
  const footerLinks = links.filter((link) => footer.linkLabels.includes(link.label));

  return (
    <footer className="border-t border-app-border bg-app-surface-muted/60">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-app-foreground">
              {siteName}
            </p>
          </div>

          <nav aria-label="Footer links">
            <ul className="flex flex-wrap gap-2">
              {footerLinks.map((link) => {
                const isExternal = !link.href.startsWith("mailto:");
                const Icon = footerLinkIcons[link.label as keyof typeof footerLinkIcons];

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={link.label}
                      title={link.label}
                      className="inline-flex size-11 items-center justify-center text-app-muted transition duration-200 hover:-translate-y-0.5 hover:text-app-accent-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-foreground"
                    >
                      {Icon ? <Icon className="size-5" /> : link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="grid gap-3 border-t border-app-border py-5 text-xs text-app-subtle sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <p className="sm:justify-self-start">
            © {new Date().getFullYear()} {siteName}. {footer.copyright}
          </p>
          <p className="flex items-center gap-1.5 font-medium text-app-muted sm:col-start-2">
            Built with love
            <HeartIcon className="size-3.5 text-app-accent-red" />
          </p>
          <a
            href={footer.backToTopHref}
            className="w-fit font-medium text-app-muted transition-colors hover:text-app-accent-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-foreground sm:col-start-3 sm:justify-self-end"
          >
            {footer.backToTopLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
