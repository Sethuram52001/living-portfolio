import type { Metadata } from "next";
import { SurfacePlaceholder } from "@/components/surface-placeholder";
import { getRequiredRouteByHref, siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/contact");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function ContactPage() {
  return (
    <SurfacePlaceholder route={route}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {siteConfig.externalLinks.map((link) => (
          <li
            key={link.label}
            className="rounded-lp border-[3px] border-lp-ink bg-lp-surface-container p-4"
          >
            <p className="text-base font-black text-lp-on-surface">{link.label}</p>
            <p className="mt-2 text-sm leading-6 text-lp-on-surface-variant">
              {link.description}
            </p>
            {link.placeholder ? (
              <span className="mt-4 inline-flex rounded-lp border-2 border-lp-outline bg-lp-surface-container-lowest px-3 py-2 text-sm font-bold text-lp-on-surface-variant">
                Placeholder
              </span>
            ) : (
              <a
                href={link.href}
                className="mt-4 inline-flex rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-2 text-sm font-bold text-lp-on-surface transition hover:bg-lp-primary-container"
              >
                Open link
              </a>
            )}
          </li>
        ))}
      </ul>
    </SurfacePlaceholder>
  );
}
