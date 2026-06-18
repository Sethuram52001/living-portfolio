import Link from "next/link";
import type { ItemDocument } from "@/lib/content/schemas";
import { ItemStatusBadge } from "@/components/work/item-status-badge";

type ItemDetailProps = {
  item: ItemDocument;
};

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <section className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-6 shadow-lp-level-3 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
            Inventory Item
          </p>
          <ItemStatusBadge placeholder={item.placeholder} status={item.status} />
        </div>

        <h1 className="mt-4 text-4xl font-black leading-tight text-lp-on-surface lg:text-5xl">
          {item.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-lp-on-surface-variant">
          {item.summary}
        </p>

        <div className="mt-8 grid gap-4">
          <ProofSection title="Problem / motivation" body={item.proof.motivation} />
          <ProofSection title="Visible artifact" body={item.artifact.label} />
          <ProofSection title="What I learned" body={item.proof.learned} />
          <ProofSection title="Why it mattered" body={item.proof.mattered} />
        </div>

        <section className="mt-8 rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container p-5">
          <h2 className="text-xl font-black leading-tight">Narrative notes</h2>
          <p className="mt-3 whitespace-pre-line text-base leading-7 text-lp-on-surface-variant">
            {item.body}
          </p>
        </section>
      </section>

      <aside className="grid gap-4">
        <section className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-secondary-container p-5 shadow-lp-level-2">
          <p className="font-mono text-xs font-bold uppercase text-lp-on-surface">
            Artifact
          </p>
          <p className="mt-3 text-lg font-black leading-7 text-lp-on-surface">
            {item.artifact.label}
          </p>
          <p className="mt-2 text-sm font-bold uppercase text-lp-on-surface-variant">
            {item.artifact.type}
          </p>
        </section>

        <section className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container p-5 shadow-lp-level-2">
          <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
            Links
          </p>
          <ul className="mt-4 grid gap-2">
            {item.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-2 text-sm font-bold text-lp-on-surface transition hover:bg-lp-primary-container"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/work"
                className="inline-flex rounded-lp border-2 border-lp-outline bg-lp-surface-container-lowest px-3 py-2 text-sm font-bold text-lp-on-surface-variant transition hover:border-lp-ink hover:text-lp-on-surface"
              >
                Back to Inventory
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    </article>
  );
}

function ProofSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container p-5">
      <h2 className="font-mono text-xs font-bold uppercase text-lp-secondary">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-lp-on-surface">{body}</p>
    </section>
  );
}
