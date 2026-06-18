import type { ItemDocument } from "@/lib/content/schemas";
import { ItemCard } from "@/components/work/item-card";

type WorkInventoryProps = {
  items: ItemDocument[];
};

export function WorkInventory({ items }: WorkInventoryProps) {
  return (
    <section className="grid gap-6">
      <div className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container p-5 shadow-lp-level-2">
        <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
          Project Archive
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-lp-on-surface lg:text-5xl">
          Selected work
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-lp-on-surface-variant">
          Inventory Items are substantial projects with proof: the motivation,
          a visible artifact, and what was learned or why it mattered. Draft items
          stay marked while the public copy is being shaped.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <ItemCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
