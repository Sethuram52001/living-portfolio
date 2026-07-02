import type { Metadata } from "next";
import { HomeHero } from "@/components/home/home-hero";
import { toHomeZones } from "@/components/home/home-map-data";
import { WorldMapSurface } from "@/components/home/world-map-surface";
import { loadZones } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "World Map V1",
  description:
    "The original map-style living portfolio homepage prototype, preserved for comparison.",
  path: "/map-v1",
});

export default function MapV1Page() {
  const zones = toHomeZones(loadZones());

  return (
    <div className="grid gap-10 lg:gap-14">
      <HomeHero />

      <section>
        <WorldMapSurface zones={zones} />
      </section>
    </div>
  );
}
