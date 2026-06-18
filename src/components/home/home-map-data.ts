import type { StatusHud, Zone } from "@/lib/content/schemas";

export type HomeZone = Zone & {
  destination: string;
  destinationLabel: string;
  tone: "current" | "systems" | "work" | "writing" | "skills";
  mapClassName: string;
};

export type HomeStatus = StatusHud;

const zoneDestinations: Record<
  string,
  Pick<HomeZone, "destination" | "destinationLabel" | "tone" | "mapClassName">
> = {
  "current-camp": {
    destination: "/quests",
    destinationLabel: "Open Quest Log",
    tone: "current",
    mapClassName: "lg:col-span-2 lg:col-start-1 lg:row-start-1",
  },
  "production-systems": {
    destination: "/experience",
    destinationLabel: "View Experience",
    tone: "systems",
    mapClassName: "lg:col-span-2 lg:col-start-4 lg:row-start-1",
  },
  "project-archive": {
    destination: "/work",
    destinationLabel: "Browse Work",
    tone: "work",
    mapClassName: "lg:col-span-2 lg:col-start-2 lg:row-start-2",
  },
  "writing-harbour": {
    destination: "/writing",
    destinationLabel: "Read Writing",
    tone: "writing",
    mapClassName: "lg:col-span-2 lg:col-start-5 lg:row-start-2",
  },
  "skill-tree": {
    destination: "/skills",
    destinationLabel: "View Skills",
    tone: "skills",
    mapClassName: "lg:col-span-2 lg:col-start-3 lg:row-start-3",
  },
};

export function toHomeZones(zones: Zone[]): HomeZone[] {
  return zones
    .filter((zone) => zone.slug in zoneDestinations)
    .sort((a, b) => a.order - b.order)
    .map((zone) => ({
      ...zone,
      ...zoneDestinations[zone.slug],
    }));
}
