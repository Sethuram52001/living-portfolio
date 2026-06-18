"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { HomeZone } from "@/components/home/home-map-data";

type ZoneNodeProps = {
  zone: HomeZone;
};

const toneClasses: Record<HomeZone["tone"], string> = {
  current: "bg-lp-primary-container",
  systems: "bg-lp-tertiary-container",
  work: "bg-lp-secondary-container",
  writing: "bg-lp-surface-container-lowest",
  skills: "bg-lp-surface-container-high",
};

export function ZoneNode({ zone }: ZoneNodeProps) {
  return (
    <motion.li
      className={zone.mapClassName}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <motion.div whileHover={{ x: 2, y: 2 }} whileTap={{ x: 4, y: 4 }}>
        <Link
          href={zone.destination}
          className={[
            "group block min-h-40 rounded-lp-lg border-[3px] border-lp-ink p-5 text-lp-on-surface shadow-lp-level-3 transition",
            "hover:shadow-lp-level-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-lp-secondary-container",
            toneClasses[zone.tone],
          ].join(" ")}
        >
          <span className="font-mono text-xs font-bold uppercase text-lp-on-surface-variant">
            {zone.plainTitle}
          </span>
          <span className="mt-3 block text-2xl font-black leading-tight">
            {zone.title}
          </span>
          <span className="mt-3 block text-sm leading-6 text-lp-on-surface">
            {zone.summary}
          </span>
          <span className="mt-5 inline-flex rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-2 text-sm font-black transition group-hover:bg-lp-on-surface group-hover:text-lp-surface">
            {zone.destinationLabel}
          </span>
        </Link>
      </motion.div>
    </motion.li>
  );
}
