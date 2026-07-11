"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ItemDocument } from "@/lib/content/schemas";
import { getProjectSourceHref } from "./links";

export function ProjectFeatureCard({
  imageFirst,
  index,
  item,
}: {
  imageFirst: boolean;
  index: number;
  item: ItemDocument;
}) {
  const sourceHref = getProjectSourceHref(item);
  const cardClassName = [
    "group/card grid min-h-[calc(100svh-4rem)] w-full overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white shadow-app-xs transition duration-300 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2",
    sourceHref
      ? "cursor-pointer hover:-translate-y-1 hover:shadow-app-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-accent-green"
      : "cursor-default",
  ].join(" ");
  const imageClassName = [
    "relative min-h-[32svh] overflow-hidden bg-white sm:min-h-[38svh] lg:min-h-full",
    imageFirst ? "lg:order-1" : "lg:order-2",
  ].join(" ");
  const contentClassName = [
    "flex min-h-0 flex-col p-6 sm:p-10 lg:min-h-full lg:p-14 xl:p-16",
    imageFirst ? "lg:order-2" : "lg:order-1",
  ].join(" ");
  const proofPoints = [
    item.proof.motivation,
    item.proof.learned,
    item.proof.mattered,
  ];

  const content = (
    <>
      <div className={imageClassName} data-project-feature-image>
        {item.previewImage ? (
          <div className="absolute inset-4 flex items-center justify-center sm:inset-6 lg:inset-8">
            <Image
              src={item.previewImage}
              alt={`${item.title} project preview`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain transition duration-700 group-hover/card:scale-[1.03]"
              priority={index === 0}
            />
          </div>
        ) : (
          <div className="flex size-full items-center justify-center text-sm font-medium text-app-subtle">
            Preview coming soon
          </div>
        )}
      </div>

      <div className={contentClassName} data-project-feature-copy>
        <div>
          <h3 className="max-w-xl text-3xl font-semibold leading-[1.02] tracking-tight text-app-foreground md:text-5xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-app-muted md:mt-5 md:text-lg">
            {item.summary}
          </p>

          <ul className="mt-5 space-y-2.5 md:mt-8 md:space-y-4">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-xs leading-relaxed text-app-muted md:text-[15px]"
              >
                <span
                  className="mt-2 block size-1.5 shrink-0 rounded-full bg-app-foreground"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-6 md:pt-10">
          <div className="flex flex-wrap gap-2">
            {item.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/[0.05] bg-app-surface-muted px-2.5 py-1 text-xs font-medium text-app-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {sourceHref ? (
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-app-foreground md:mt-7">
              View project
              <span className="transition-transform group-hover/card:translate-x-1">
                →
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  if (!sourceHref) {
    return (
      <motion.article
        data-project-feature-card
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
      data-project-feature-card
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
      aria-label={`Open project for ${item.title}`}
    >
      {content}
    </motion.a>
  );
}
