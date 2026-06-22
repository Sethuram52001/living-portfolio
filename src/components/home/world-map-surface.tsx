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
            Explore Map
          </p>
          <h2
            id="world-map-title"
            className="mt-2 text-3xl font-black uppercase leading-tight"
          >
            Choose a zone
          </h2>
        </div>
        <p className="max-w-xl text-sm font-bold leading-6 text-lp-on-surface-variant">
          Each zone is a direct route into the portfolio. The map is here to orient
          you, not to hide the useful doors.
        </p>
      </div>

      <div className="lp-dot-surface overflow-hidden rounded-lp-xl border-[3px] border-lp-ink p-4 shadow-lp-level-4 lg:p-8">
        <ol className="grid gap-5 lg:min-h-[640px] lg:grid-cols-6 lg:grid-rows-3 lg:items-center">
          {zones.map((zone) => (
            <ZoneNode key={zone.slug} zone={zone} />
          ))}
        </ol>
      </div>
    </section>
  );
}
