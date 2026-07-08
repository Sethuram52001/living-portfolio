"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ItemDocument } from "@/lib/content/schemas";
import { getProjectSourceHref } from "../common/links";
import { ScrollSnapCarousel } from "../common/scroll-snap-carousel";
import { SectionHeader } from "../common/section-header";

export function WorkSection({
  items,
  currentItemSlug,
}: {
  items: ItemDocument[];
  currentItemSlug: string | undefined;
}) {
  const dotLabels = items.map((item) => item.title);

  return (
    <section
      id="work"
      className="overflow-hidden border-t border-app-border py-24 md:py-32"
    >
      <div className="px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected work"
            title={
              <>
                Project highlights,{" "}
                <span className="text-app-muted">
                  curated like a product tour.
                </span>
              </>
            }
            supporting="Each card is one proof point: current AI tooling, backend API work, realtime systems, visual algorithms, and architecture writing."
          />
        </div>
      </div>

      <ScrollSnapCarousel
        autoPlay={false}
        ariaLabel="Selected project highlights"
        controlsLabel="Project slide position"
        dotLabels={dotLabels}
        itemClassName="min-w-[calc(100vw-3rem)] snap-center md:min-w-[660px] lg:min-w-[760px]"
        scrollerClassName="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] lg:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <ProjectHighlightCard
            key={item.slug}
            item={item}
            index={index}
            isCurrent={item.slug === currentItemSlug}
          />
        ))}
      </ScrollSnapCarousel>
    </section>
  );
}

function ProjectHighlightCard({
  item,
  index,
  isCurrent,
}: {
  item: ItemDocument;
  index: number;
  isCurrent: boolean;
}) {
  const sourceHref = getProjectSourceHref(item);
  const cardClassName = [
    "group/card flex min-h-[500px] w-full flex-col overflow-hidden rounded-[2rem] border p-3 shadow-app-sm transition duration-300",
    sourceHref
      ? "cursor-pointer hover:shadow-app-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-accent-green"
      : "cursor-default",
    isCurrent
      ? "border-app-accent-green/35 bg-app-accent-green-soft"
      : "border-app-border bg-app-surface-card",
  ].join(" ");

  const content = (
    <>
      <div className="relative h-48 overflow-hidden rounded-[1.35rem] bg-app-surface-muted md:h-64 lg:h-80 xl:h-[360px]">
        {item.previewImage ? (
          <Image
            src={item.previewImage}
            alt={`${item.title} project preview`}
            fill
            sizes="(min-width: 1024px) 760px, (min-width: 768px) 660px, calc(100vw - 3rem)"
            className="object-cover transition duration-700 group-hover/card:scale-[1.03]"
            priority={index === 0}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm font-medium text-app-subtle">
            Preview coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-3 pt-5 md:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold",
              isCurrent
                ? "bg-app-accent-green text-white"
                : "bg-app-surface-muted text-app-muted",
            ].join(" ")}
          >
            {isCurrent ? "In progress" : "Completed"}
          </span>
        </div>

        <h3 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-app-foreground">
          {item.title}
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-app-muted">
          {item.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-app-border bg-app-surface-muted px-3 py-1 text-xs font-medium text-app-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-app-border pt-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-app-subtle">
            Why it matters
          </p>
          <p className="mt-2 text-sm leading-relaxed text-app-muted">
            {item.proof.mattered}
          </p>
        </div>
      </div>
    </>
  );

  if (!sourceHref) {
    return (
      <motion.article
        className={cardClassName}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.article>
    );
  }

  return (
    <motion.a
      href={sourceHref}
      target="_blank"
      rel="noreferrer"
      className={cardClassName}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`Open source for ${item.title}`}
    >
      {content}
    </motion.a>
  );
}
