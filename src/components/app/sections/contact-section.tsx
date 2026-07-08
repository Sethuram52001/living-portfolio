"use client";

import Image from "next/image";
import type { ExternalLink } from "@/config/site";
import {
  ChevronRight,
  DocumentIcon,
  ExternalArrow,
  GitHubIcon,
  LinkedInIcon,
} from "../common/icons";
import { getExternalLink } from "../common/links";
import { Reveal } from "../common/reveal";

type ContactChannel = {
  link: ExternalLink;
  title: string;
  actionLabel: string;
  icon: "document" | "external" | "github" | "linkedin";
};

export function ContactSection({
  externalLinks,
}: {
  externalLinks: readonly ExternalLink[];
}) {
  const officialEmail = getExternalLink(externalLinks, "Email");
  const resume = getExternalLink(externalLinks, "Resume");
  const linkedIn = getExternalLink(externalLinks, "LinkedIn");
  const github = getExternalLink(externalLinks, "GitHub");

  const secondaryChannels = (
    [
      resume
        ? {
            link: resume,
            title: "Resume",
            actionLabel: "View resume",
            icon: "document" as const,
          }
        : null,
      linkedIn
        ? {
            link: linkedIn,
            title: "LinkedIn",
            actionLabel: "View profile",
            icon: "linkedin" as const,
          }
        : null,
      github
        ? {
            link: github,
            title: "GitHub",
            actionLabel: "View profile",
            icon: "github" as const,
          }
        : null,
    ] satisfies Array<ContactChannel | null>
  ).filter(Boolean) as ContactChannel[];

  return (
    <section
      id="contact"
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 border-t border-app-border bg-app-surface-muted"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 lg:px-10">
        <Reveal blur={false}>
          <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-app-md">
            <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-12 lg:p-12">
              <div>
                <p className="text-sm font-semibold text-app-muted">
                  Contact
                </p>
                <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-app-foreground md:text-5xl">
                  Open to what&apos;s next.
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-app-muted">
                  Open to backend roles, thoughtful product teams, and dev
                  collaborations — email is the best place to start.
                </p>

                {officialEmail ? (
                  <a
                    href={officialEmail.href}
                    className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 text-[17px] font-medium text-white transition hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0071e3]"
                  >
                    Email Sethuram
                  </a>
                ) : null}

                {secondaryChannels.length > 0 ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {secondaryChannels.map((channel) => (
                      <ContactCompactLink
                        key={channel.title}
                        channel={channel}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <aside className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none lg:justify-self-end">
                <div className="group relative overflow-hidden rounded-[1.5rem] border border-app-border bg-white shadow-app-sm transition duration-300 hover:shadow-app-md">
                  <div className="absolute left-1/2 top-3.5 z-20 h-2 w-10 -translate-x-1/2 rounded-full border border-black/5 bg-black/15 shadow-inner" />

                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-app-surface-muted">
                    <Image
                      src="/profile/sethuram-contact.webp"
                      alt="Sethuram S V"
                      fill
                      sizes="(min-width: 1024px) 300px, 280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ objectPosition: "50% 32%" }}
                    />
                  </div>

                  <div className="border-t border-app-border px-5 py-5 text-center">
                    <p className="text-xl font-semibold tracking-tight text-app-foreground">
                      Sethuram S V
                    </p>
                    <p className="mt-1 text-sm font-medium text-app-muted">
                      Backend Engineer
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCompactLink({ channel }: { channel: ContactChannel }) {
  return (
    <a
      href={channel.link.href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-[5.5rem] flex-col justify-between rounded-[1rem] border border-app-border bg-app-surface-muted/70 p-4 transition duration-200 hover:border-app-border-strong hover:bg-white hover:shadow-app-xs"
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-app-foreground shadow-app-xs">
        <ContactChannelIcon icon={channel.icon} className="size-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-app-foreground">
          {channel.title}
        </span>
        <span className="mt-1 inline-flex items-center gap-0.5 text-[13px] font-medium text-[#0066cc] group-hover:underline">
          {channel.actionLabel}
          <ChevronRight className="size-3.5" />
        </span>
      </span>
    </a>
  );
}

function ContactChannelIcon({
  icon,
  className,
}: {
  icon: ContactChannel["icon"];
  className?: string;
}) {
  switch (icon) {
    case "document":
      return <DocumentIcon className={className} />;
    case "github":
      return <GitHubIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "external":
      return <ExternalArrow className={className} />;
  }
}
