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
    <section className="grid gap-12">
      <header className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-highest p-5 shadow-lp-level-4 lg:p-8">
        <div className="grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
          <div className="mx-auto grid w-full max-w-64 justify-items-center lg:mx-0">
            <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-full border-[4px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-3">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(16,185,129,0.34),transparent_18%),linear-gradient(150deg,var(--lp-color-surface-container-lowest),var(--lp-color-surface-container-high))]" />
              <span className="relative text-7xl font-black text-lp-primary">S</span>
            </div>
            <span className="-mt-5 rounded-full border-[3px] border-lp-ink bg-lp-secondary-container px-5 py-2 font-mono text-xs font-black uppercase tracking-[0.08em] text-lp-on-surface shadow-lp-level-2">
              Photo placeholder
            </span>
          </div>

          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
              Contact
            </p>
            <h1 className="mt-3 text-5xl font-black leading-none text-lp-primary lg:text-7xl">
              Sethuram
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
              Backend engineer with light AI and frontend breadth. This page keeps
              the practical exits easy: resume, source code, professional profile,
              and direct contact.
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
        <h2 className="mt-3 text-4xl font-black leading-tight text-lp-on-surface lg:text-5xl">
          Continue the conversation
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
    <article className="grid min-h-64 overflow-hidden rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-3">
      <div className="flex items-start justify-between gap-4 border-b-[3px] border-lp-ink bg-lp-surface-container p-5">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-secondary">
            {link.placeholder ? "Placeholder" : "Ready"}
          </p>
          <h3 className="mt-3 text-3xl font-black leading-tight text-lp-on-surface lg:text-4xl">
            {copy.title}
          </h3>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-lp-ink bg-lp-primary-container font-black text-lp-on-surface">
          {link.label.slice(0, 1)}
        </span>
      </div>

      <div className="flex flex-col justify-between gap-6 p-5 lg:p-6">
        <p className="text-base font-bold leading-7 text-lp-on-surface-variant">
          {copy.body}
        </p>

        {link.placeholder ? (
          <span className="inline-flex w-fit rounded-lp border-[3px] border-lp-outline bg-lp-surface-container px-5 py-3 text-sm font-black uppercase text-lp-on-surface-variant">
            {copy.action}
          </span>
        ) : (
          <a
            href={link.href}
            className="inline-flex w-fit rounded-lp border-[3px] border-lp-ink bg-lp-primary px-5 py-3 text-sm font-black uppercase text-lp-inverse-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            {copy.action}
          </a>
        )}
      </div>
    </article>
  );
}
