"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { HomeContent, SiteContent } from "@/lib/content/schemas";
import { Reveal } from "../ui/reveal";

export function HeroSection({
  content,
  person,
}: {
  content: HomeContent["hero"];
  person: SiteContent["person"];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative left-1/2 flex min-h-[85vh] w-screen -translate-x-1/2 flex-col justify-center overflow-hidden py-24 md:min-h-[90vh] md:py-32"
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10"
        style={{ scale: headlineScale, opacity: headlineOpacity }}
      >
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,30rem)] xl:gap-16">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-sm font-medium tracking-wide uppercase text-app-accent-green">
                {content.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 text-5xl font-bold leading-[1.08] tracking-tight text-app-foreground md:text-7xl lg:text-[80px]">
                {content.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 max-w-2xl space-y-5 text-xl leading-relaxed text-app-muted md:text-2xl md:leading-relaxed">
                {content.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="hidden xl:block">
            <motion.div
              className="relative h-[36rem] overflow-hidden rounded-[2rem] bg-[#e5e8ec]"
              style={{ y: imageY }}
            >
              <Image
                src={person.profileImage}
                alt={person.profileImageAlt}
                fill
                priority
                loading="eager"
                sizes="(min-width: 1280px) 30rem, 0px"
                className="object-cover object-[44%_50%]"
              />
            </motion.div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
