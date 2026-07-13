"use client";

import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";

export type CarouselSlide = {
  content: ReactNode;
  id: string;
  label: string;
};

const writingLayoutClasses = {
  item:
    "h-[30rem] min-w-[calc(100vw-4rem)] snap-center snap-always md:h-[32rem] md:min-w-[420px] lg:min-w-[460px] xl:min-w-[calc((100vw-7rem)/3)] xl:snap-start",
  scroller:
    "mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-px-6 px-6 pb-6 [scrollbar-width:none] md:scroll-px-8 md:px-8 lg:scroll-px-10 lg:px-10 xl:gap-4 [&::-webkit-scrollbar]:hidden",
};

function CarouselDots({
  activeIndex,
  onSelect,
  slides,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  slides: readonly CarouselSlide[];
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-full bg-app-surface-muted p-1.5"
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
                ? "w-10 bg-app-foreground"
                : "w-2 bg-app-border-strong hover:bg-app-muted",
              "focus-visible:outline-app-accent-green",
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
  slides,
}: {
  ariaLabel: string;
  controlsLabel: string;
  slides: readonly CarouselSlide[];
}) {
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
        className={writingLayoutClasses.scroller}
        onScroll={handleScroll}
        aria-label={ariaLabel}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            data-carousel-index={index}
            className={writingLayoutClasses.item}
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
        />
      </div>
    </>
  );
}
