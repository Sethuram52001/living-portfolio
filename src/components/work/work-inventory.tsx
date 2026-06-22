import Link from "next/link";
import type { ItemDocument } from "@/lib/content/schemas";
import { ItemCard } from "@/components/work/item-card";

type WorkInventoryProps = {
  items: ItemDocument[];
};

export function WorkInventory({ items }: WorkInventoryProps) {
  const featuredItem = items[0];

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start">
      <div className="grid gap-8">
        <header>
          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
              Work
            </p>
            <h1 className="mt-3 max-w-xl text-5xl font-black uppercase leading-none text-lp-on-surface lg:text-6xl">
              Collected Work
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
              Selected projects and build artifacts with enough structure to inspect
              motivation, proof, and learning.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.slug} item={item} />
          ))}
        </div>
      </div>

      {featuredItem ? <FeaturedWorkPanel item={featuredItem} /> : null}
    </section>
  );
}

function FeaturedWorkPanel({ item }: { item: ItemDocument }) {
  return (
    <aside className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-4">
      <div className="rounded-t-[calc(var(--lp-radius-xl)-3px)] bg-lp-secondary-container p-6">
        <p className="inline-flex rounded-lp border-2 border-lp-ink bg-lp-inverse-surface px-3 py-1 font-mono text-xs font-black uppercase text-lp-inverse-on-surface">
          Work Item
        </p>
        <h2 className="mt-4 text-4xl font-black uppercase leading-none text-lp-on-surface">
          {item.title}
        </h2>
      </div>

      <div className="grid gap-6 p-6">
        <div className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-inverse-surface p-6 text-lp-inverse-on-surface">
          <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-inverse-primary">
            Visible Artifact
          </p>
          <p className="mt-3 text-lg font-bold">{item.artifact.label}</p>
        </div>

        <div>
          <p className="font-mono text-sm font-black uppercase text-lp-secondary">
            Story
          </p>
          <p className="mt-3 text-base font-bold leading-7 text-lp-on-surface-variant">
            {item.summary}
          </p>
        </div>

        <div className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container p-5">
          <p className="font-mono text-sm font-black uppercase text-lp-on-surface">
            Proof
          </p>
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="font-mono text-xs font-black uppercase text-lp-on-surface">
                Motivation
              </dt>
              <dd className="mt-2 text-sm font-bold leading-6 text-lp-on-surface-variant">
                {item.proof.motivation}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs font-black uppercase text-lp-on-surface">
                Learned
              </dt>
              <dd className="mt-2 text-sm font-bold leading-6 text-lp-on-surface-variant">
                {item.proof.learned}
              </dd>
            </div>
          </dl>
        </div>

        <Link
          href={`/work/${item.slug}`}
          className="inline-flex justify-center rounded-lp border-[3px] border-lp-ink bg-lp-primary px-5 py-4 text-xl font-black uppercase text-lp-inverse-on-surface shadow-lp-level-3 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          View Source
        </Link>
      </div>
    </aside>
  );
}
