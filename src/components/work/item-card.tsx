import Link from "next/link";
import type { ItemDocument } from "@/lib/content/schemas";
import { ItemStatusBadge } from "@/components/work/item-status-badge";

type ItemCardProps = {
  item: ItemDocument;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-3">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
          Inventory Item
        </p>
        <ItemStatusBadge placeholder={item.placeholder} status={item.status} />
      </div>

      <h2 className="mt-4 text-2xl font-black leading-tight text-lp-on-surface">
        {item.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-lp-on-surface-variant">
        {item.summary}
      </p>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container p-3">
          <dt className="font-mono text-xs font-bold uppercase text-lp-secondary">
            Motivation
          </dt>
          <dd className="mt-2 leading-6 text-lp-on-surface">{item.proof.motivation}</dd>
        </div>
        <div className="rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container p-3">
          <dt className="font-mono text-xs font-bold uppercase text-lp-secondary">
            Artifact
          </dt>
          <dd className="mt-2 leading-6 text-lp-on-surface">{item.artifact.label}</dd>
        </div>
      </dl>

      <Link
        href={`/work/${item.slug}`}
        className="mt-6 inline-flex w-fit rounded-lp border-[3px] border-lp-ink bg-lp-primary-container px-4 py-3 text-sm font-black text-lp-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        Inspect item
      </Link>
    </article>
  );
}
