"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

function useOnePassCarousel({
  activeIndex,
  delayMs = 4200,
  enabled,
  itemCount,
  onSelect,
}: {
  activeIndex: number;
  delayMs?: number;
  enabled: boolean;
  itemCount: number;
  onSelect: (index: number) => void;
}) {
  const [hasCompletedPass, setHasCompletedPass] = useState(false);
  const isComplete = itemCount <= 1 || hasCompletedPass;

  useEffect(() => {
    if (!enabled) return;
    if (isComplete || itemCount <= 1) return;

    const timeoutId = window.setTimeout(() => {
      if (activeIndex >= itemCount - 1) {
        setHasCompletedPass(true);
        return;
      }

      const nextIndex = activeIndex + 1;
      onSelect(nextIndex);

      if (nextIndex >= itemCount - 1) {
        setHasCompletedPass(true);
      }
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, delayMs, enabled, isComplete, itemCount, onSelect]);
}

function CarouselDots({
  activeIndex,
  dotLabels,
  onSelect,
  variant = "light",
}: {
  activeIndex: number;
  dotLabels: string[];
  onSelect: (index: number) => void;
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
        {dotLabels.map((label, index) => (
          <button
            key={label}
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
            aria-label={`Show ${label}`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function ScrollSnapCarousel({
  autoPlay = false,
  ariaLabel,
  children,
  controlsLabel,
  controlsVariant = "light",
  dotLabels,
  itemClassName,
  scrollerClassName,
}: {
  autoPlay?: boolean;
  ariaLabel: string;
  children: ReactNode;
  controlsLabel: string;
  controlsVariant?: "light" | "dark";
  dotLabels: string[];
  itemClassName: string;
  scrollerClassName: string;
}) {
  const items = Children.toArray(children);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToItem = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      const boundedIndex = Math.min(Math.max(index, 0), items.length - 1);
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
    [items.length],
  );

  useOnePassCarousel({
    activeIndex,
    enabled: autoPlay,
    itemCount: items.length,
    onSelect: scrollToItem,
  });

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
        className={scrollerClassName}
        onScroll={handleScroll}
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <div
            key={dotLabels[index] ?? index}
            data-carousel-index={index}
            className={itemClassName}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center" aria-label={controlsLabel}>
        <CarouselDots
          activeIndex={activeIndex}
          dotLabels={dotLabels}
          onSelect={scrollToItem}
          variant={controlsVariant}
        />
      </div>
    </>
  );
}
