import type { HomeZone } from "@/components/home/home-map-data";
import { ZoneNode } from "@/components/home/zone-node";

type WorldMapSurfaceProps = {
  zones: HomeZone[];
};

export function WorldMapSurface({ zones }: WorldMapSurfaceProps) {
  return (
    <section aria-labelledby="world-map-title" className="grid gap-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-bold uppercase text-lp-secondary">
            World Map V1
          </p>
          <h2 id="world-map-title" className="mt-2 text-3xl font-black leading-tight">
            Choose a zone
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-lp-on-surface-variant">
          Each zone is a direct route into the portfolio. The map is here to orient
          you, not to hide the useful doors.
        </p>
      </div>

      <div className="rounded-lp-xl border-[3px] border-lp-ink bg-[radial-gradient(circle,var(--lp-color-surface-dim)_1.5px,transparent_1.5px)] bg-[length:28px_28px] p-4 shadow-lp-level-4 lg:p-8">
        <ol className="grid gap-4 lg:min-h-[660px] lg:grid-cols-6 lg:grid-rows-3 lg:items-center">
          {zones.map((zone) => (
            <ZoneNode key={zone.slug} zone={zone} />
          ))}
        </ol>
      </div>
    </section>
  );
}
