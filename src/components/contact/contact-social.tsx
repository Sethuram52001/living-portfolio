import type { ExternalLink } from "@/config/site";
import { siteConfig } from "@/config/site";

type ContactSocialProps = {
  links: readonly ExternalLink[];
};

const contactCopy: Record<string, { title: string; body: string; action: string }> = {
  Resume: {
    title: "Resume",
    body: "A focused resume link will live here once the public PDF is finalized.",
    action: "Coming soon",
  },
  GitHub: {
    title: "GitHub",
    body: "Inspect source code, experiments, and projects that are ready to be public.",
    action: "Open GitHub",
  },
  LinkedIn: {
    title: "LinkedIn",
    body: "Professional profile and work history link placeholder.",
    action: "Coming soon",
  },
  Email: {
    title: "Email",
    body: "Direct contact placeholder until the public email address is confirmed.",
    action: "Coming soon",
  },
};

export function ContactSocial({ links }: ContactSocialProps) {
  return (
    <section className="grid gap-10">
      <header className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-highest p-6 shadow-lp-level-4 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
          <div className="grid aspect-square max-w-48 place-items-center rounded-full border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-2">
            <span className="text-6xl font-black text-lp-primary">S</span>
          </div>
          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
              Contact
            </p>
            <h1 className="mt-3 text-5xl font-black leading-none text-lp-on-surface lg:text-6xl">
              Sethuram
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
              Backend engineer with light AI and frontend breadth. Use this page for
              practical links: resume, source, professional profile, and direct contact.
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <ContactSignal label="Role" value={siteConfig.role} />
              <ContactSignal label="Availability" value="Open to backend roles" />
            </dl>
          </div>
        </div>
      </header>

      <section>
        <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
          Practical Links
        </p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-lp-on-surface">
          Where to continue
        </h2>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {links.map((link) => (
            <ContactCard key={link.label} link={link} />
          ))}
        </div>
      </section>
    </section>
  );
}

function ContactSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lp border-[3px] border-lp-ink bg-lp-surface-container-lowest p-4 shadow-lp-level-2">
      <dt className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface-variant">
        {label}
      </dt>
      <dd className="mt-2 text-lg font-black text-lp-on-surface">{value}</dd>
    </div>
  );
}

function ContactCard({ link }: { link: ExternalLink }) {
  const copy = contactCopy[link.label] ?? {
    title: link.label,
    body: link.description,
    action: "Open link",
  };

  return (
    <article className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-3 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
            {link.placeholder ? "Placeholder" : "Ready"}
          </p>
          <h3 className="mt-3 text-3xl font-black leading-tight text-lp-on-surface">
            {copy.title}
          </h3>
        </div>
        <span className="grid size-12 place-items-center rounded-full border-[3px] border-lp-ink bg-lp-primary-container font-black text-lp-on-surface">
          {link.label.slice(0, 1)}
        </span>
      </div>

      <p className="mt-4 text-base font-bold leading-7 text-lp-on-surface-variant">
        {copy.body}
      </p>

      {link.placeholder ? (
        <span className="mt-6 inline-flex rounded-lp border-[3px] border-lp-outline bg-lp-surface-container px-5 py-3 text-sm font-black uppercase text-lp-on-surface-variant">
          {copy.action}
        </span>
      ) : (
        <a
          href={link.href}
          className="mt-6 inline-flex rounded-lp border-[3px] border-lp-ink bg-lp-primary px-5 py-3 text-sm font-black uppercase text-lp-inverse-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          {copy.action}
        </a>
      )}
    </article>
  );
}
