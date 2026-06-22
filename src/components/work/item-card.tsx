import Link from "next/link";
import type { ItemDocument } from "@/lib/content/schemas";
import { ItemStatusBadge } from "@/components/work/item-status-badge";

type ItemCardProps = {
  item: ItemDocument;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="relative">
      <Link
        href={`/work/${item.slug}`}
        className="group grid aspect-square min-h-32 place-items-center rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container-lowest p-4 text-center shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        <span className="absolute right-3 top-3 size-3 rounded-full bg-lp-secondary shadow-[2px_2px_0_var(--lp-color-ink)]" />
        <span className="grid gap-3">
          <span className="text-3xl font-black text-lp-primary">W</span>
          <span className="text-sm font-black uppercase leading-tight text-lp-on-surface">
            {item.title}
          </span>
          <span className="mx-auto">
            <ItemStatusBadge placeholder={item.placeholder} status={item.status} />
          </span>
        </span>
      </Link>
    </article>
  );
}
