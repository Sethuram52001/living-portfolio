"use client";

import Image from "next/image";
import type { HomePageData } from "@/lib/content/home-page";
import type { HomeContent, SiteContent } from "@/lib/content/schemas";
import {
  ChevronRight,
  DocumentIcon,
  EnvelopeIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/icons/app-icons";
import { Reveal } from "../ui/reveal";

export function ContactSection({
  content,
  person,
}: {
  content: HomePageData["home"]["sectionHeaders"]["contact"];
  person: SiteContent["person"];
}) {
  return (
    <section
      id="contact"
      className="border-t border-app-border px-6 py-24 md:py-32 lg:px-10"
    >
        <Reveal>
          <p className="text-sm font-medium tracking-wide uppercase text-app-accent-green">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-app-foreground md:text-5xl">
            {content.title}{" "}
            {content.mutedTitle ? (
              <span className="text-app-muted">{content.mutedTitle}</span>
            ) : null}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-app-border bg-app-surface-card shadow-app-md">
            <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-12 lg:p-12">
              <div className="lg:order-1">
                <p className="max-w-lg text-lg leading-relaxed text-app-muted">
                  {content.supporting}
                </p>

                {content.actions.length > 0 ? (
                  <div className="mt-10 grid max-w-2xl grid-cols-2 gap-6 md:gap-8">
                    {content.actions.map((channel) => (
                      <ContactAction
                        key={channel.title}
                        channel={channel}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <aside className="order-first mx-auto w-full max-w-[280px] lg:order-2 lg:mx-0 lg:max-w-none lg:justify-self-end">
                <div className="group relative overflow-hidden rounded-[1.5rem] border border-app-border bg-app-surface-card shadow-app-sm transition duration-300 hover:-translate-y-1 hover:shadow-app-md">
                  <div className="absolute left-1/2 top-3.5 z-20 h-2 w-10 -translate-x-1/2 rounded-full border border-black/5 bg-black/15 shadow-inner" />

                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-app-surface-muted">
                    <Image
                      src={person.profileImage}
                      alt={person.profileImageAlt}
                      fill
                      sizes="(min-width: 1024px) 300px, 280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ objectPosition: "50% 32%" }}
                    />
                  </div>

                  <div className="border-t border-app-border px-5 py-5 text-center">
                    <p className="text-xl font-semibold tracking-tight text-app-foreground">
                      {person.profileName}
                    </p>
                    <p className="mt-1 text-sm font-medium text-app-muted">
                      {person.role}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
    </section>
  );
}

function ContactAction({
  channel,
}: {
  channel: HomePageData["home"]["sectionHeaders"]["contact"]["actions"][number];
}) {
  const isExternal = !channel.href.startsWith("mailto:");
  const toneClassName = {
    primary:
      "border-app-foreground bg-app-foreground text-white hover:-translate-y-0.5 hover:bg-black hover:shadow-app-sm",
    secondary:
      "border-app-border-strong bg-white text-app-foreground hover:-translate-y-0.5 hover:shadow-app-sm",
    subtle:
      "border-app-border bg-app-surface-muted/70 text-app-foreground hover:-translate-y-0.5 hover:border-app-border-strong hover:bg-white hover:shadow-app-xs",
  }[channel.tone];
  const iconClassName =
    channel.tone === "primary"
      ? "bg-white/15 text-white"
      : "border border-black/[0.06] bg-white text-app-foreground";

  return (
    <a
      href={channel.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`group flex min-h-16 items-center justify-between rounded-full border px-5 py-3 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-foreground ${toneClassName}`}
    >
      <span className="inline-flex items-center gap-3">
        <span
          className={`inline-flex size-8 items-center justify-center rounded-full ${iconClassName}`}
        >
          <ContactChannelIcon icon={channel.icon} className="size-4" />
        </span>
        <span className="text-sm font-semibold">{channel.title}</span>
      </span>
      <ChevronRight
        className={`size-4 transition-all group-hover:translate-x-0.5 group-hover:text-app-accent-green ${channel.tone === "primary" ? "text-white/70" : "text-app-subtle"}`}
      />
    </a>
  );
}

function ContactChannelIcon({
  icon,
  className,
}: {
  icon: HomeContent["sectionHeaders"]["contact"]["actions"][number]["icon"];
  className?: string;
}) {
  switch (icon) {
    case "document":
      return <DocumentIcon className={className} />;
    case "email":
      return <EnvelopeIcon className={className} />;
    case "github":
      return <GitHubIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
  }
}
