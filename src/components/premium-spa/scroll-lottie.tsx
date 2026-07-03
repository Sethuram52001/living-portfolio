"use client";

import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";
import { useScroll, useTransform, useMotionValueEvent } from "motion/react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ScrollLottieProps = {
  /** Path to the Lottie JSON file in /public */
  path: string;
  /** CSS class for the wrapper */
  className?: string;
  /** The scroll container ref — defaults to viewport */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Scroll progress range mapped to animation: [start, end] in 0–1 */
  scrollRange?: [number, number];
  /** Opacity CSS to apply on the container */
  style?: React.CSSProperties;
};

type AutoplayLottieProps = {
  /** Path to the Lottie JSON file in /public */
  path: string;
  /** CSS class for the wrapper */
  className?: string;
  /** Whether the animation loops */
  loop?: boolean;
  /** Playback speed multiplier */
  speed?: number;
  /** Only start playing when in viewport */
  playOnView?: boolean;
  style?: React.CSSProperties;
};

/* ------------------------------------------------------------------ */
/* Scroll-driven Lottie                                                */
/* Ties animation frame progress to scroll position.                   */
/* ------------------------------------------------------------------ */

export function ScrollLottie({
  path,
  className,
  containerRef,
  scrollRange = [0, 1],
  style,
}: ScrollLottieProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<unknown>(null);

  // Load the JSON
  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [path]);

  // Scroll progress for the target container
  const { scrollYProgress } = useScroll({
    target: containerRef ?? wrapperRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to a normalized 0–1 range within scrollRange
  const frameProgress = useTransform(
    scrollYProgress,
    scrollRange,
    [0, 1],
  );

  // Drive the Lottie frame from scroll
  useMotionValueEvent(frameProgress, "change", (latest) => {
    const instance = lottieRef.current;
    if (!instance) return;

    const totalFrames = instance.getDuration(true) ?? 0;
    if (totalFrames <= 0) return;

    const clamped = Math.max(0, Math.min(1, latest));
    const frame = clamped * totalFrames;
    instance.goToAndStop(frame, true);
  });

  if (!animationData) return null;

  return (
    <div ref={wrapperRef} className={className} style={style}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Autoplay Lottie (with optional play-on-view)                        */
/* Standard looping/play-once with viewport trigger.                   */
/* ------------------------------------------------------------------ */

export function AutoplayLottie({
  path,
  className,
  loop = true,
  speed = 1,
  playOnView = true,
  style,
}: AutoplayLottieProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Load the JSON
  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [path]);

  // IntersectionObserver for play-on-view
  useEffect(() => {
    if (!playOnView || !wrapperRef.current || !animationData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          lottieRef.current?.play();
          setHasPlayed(true);
          if (!loop) {
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [animationData, hasPlayed, loop, playOnView]);

  if (!animationData) return null;

  return (
    <div ref={wrapperRef} className={className} style={style}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={!playOnView}
        loop={loop}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid meet",
        }}
        onDOMLoaded={() => {
          if (speed !== 1) {
            lottieRef.current?.setSpeed(speed);
          }
          if (playOnView) {
            lottieRef.current?.stop();
          }
        }}
      />
    </div>
  );
}
