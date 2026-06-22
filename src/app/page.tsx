import type { Metadata } from "next";
import { HomeHero } from "@/components/home/home-hero";
import { toHomeZones } from "@/components/home/home-map-data";
import { WorldMapSurface } from "@/components/home/world-map-surface";
import { getRequiredRouteByHref } from "@/config/site";
import { loadZones } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/");

export const metadata: Metadata = createPageMetadata({
  title: "Living Portfolio",
  description: route.description,
  path: route.href,
});

export default function Home() {
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
