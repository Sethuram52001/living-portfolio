"use client";

import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";

type CarouselLayout = "focus" | "writing";

export type CarouselSlide = {
  content: ReactNode;
  id: string;
  label: string;
};

const layoutClasses: Record<
  CarouselLayout,
  {
    controlsVariant: "light" | "dark";
    item: string;
    scroller: string;
  }
> = {
  focus: {
    controlsVariant: "dark",
    item:
      "min-w-[calc(100vw-3rem)] snap-center sm:min-w-[22rem] md:min-w-[520px]",
    scroller:
      "mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 py-3 [scrollbar-width:none] sm:px-[calc((100%-22rem)/2)] md:px-[calc((100%-520px)/2)] [&::-webkit-scrollbar]:hidden",
  },
  writing: {
    controlsVariant: "light",
    item:
      "h-[30rem] min-w-[calc(100vw-4rem)] snap-center snap-always md:h-[32rem] md:min-w-[420px] lg:min-w-[460px] xl:min-w-[calc((100vw-7rem)/3)] xl:snap-start",
    scroller:
      "mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-10 pb-6 [scrollbar-width:none] md:px-[calc((100%-420px)/2)] lg:px-[calc((100%-460px)/2)] xl:gap-4 xl:px-[max(3.5rem,calc((100vw-72rem)/2+3.5rem))] [&::-webkit-scrollbar]:hidden",
  },
};

function CarouselDots({
  activeIndex,
  onSelect,
  slides,
  variant = "light",
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  slides: readonly CarouselSlide[];
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={[
        "flex items-center gap-2 rounded-full p-1.5",
        isDark ? "bg-white/10" : "bg-app-surface-muted",
      ].join(" ")}
      aria-label="Carousel slide controls"
    >
      <div className="flex items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={[
              "h-2 rounded-full transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              activeIndex === index
                ? isDark
                  ? "w-10 bg-app-background"
                  : "w-10 bg-app-foreground"
                : isDark
                  ? "w-2 bg-app-background/35 hover:bg-app-background/65"
                  : "w-2 bg-app-border-strong hover:bg-app-muted",
              isDark
                ? "focus-visible:outline-app-background"
                : "focus-visible:outline-app-accent-green",
            ].join(" ")}
            onClick={() => onSelect(index)}
            aria-label={`Show ${slide.label}`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function ScrollSnapCarousel({
  ariaLabel,
  controlsLabel,
  layout,
  slides,
}: {
  ariaLabel: string;
  controlsLabel: string;
  layout: CarouselLayout;
  slides: readonly CarouselSlide[];
}) {
  const classes = layoutClasses[layout];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToItem = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      const boundedIndex = Math.min(Math.max(index, 0), slides.length - 1);
      const item = scroller?.querySelector<HTMLElement>(
        `[data-carousel-index="${boundedIndex}"]`,
      );

      if (!scroller || !item) return;

      scroller.scrollTo({
        left: item.offsetLeft - (scroller.clientWidth - item.clientWidth) / 2,
        behavior: "smooth",
      });
      setActiveIndex(boundedIndex);
    },
    [slides.length],
  );

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const carouselItems = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-carousel-index]"),
    );
    const nextIndex = carouselItems.reduce(
      (closest, item, index) => {
        const itemCenter = item.offsetLeft + item.clientWidth / 2;
        const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
        const distance = Math.abs(itemCenter - scrollerCenter);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveIndex(nextIndex);
  }

  return (
    <>
      <div
        ref={scrollerRef}
        className={classes.scroller}
        onScroll={handleScroll}
        aria-label={ariaLabel}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            data-carousel-index={index}
            className={classes.item}
          >
            {slide.content}
          </div>
        ))}
      </div>

      <div
        className="mt-4 flex justify-center"
        aria-label={controlsLabel}
      >
        <CarouselDots
          activeIndex={activeIndex}
          onSelect={scrollToItem}
          slides={slides}
          variant={classes.controlsVariant}
        />
      </div>
    </>
  );
}
