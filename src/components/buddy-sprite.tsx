"use client";

import { useEffect, useRef } from "react";
import { moodDuration, sheet, sheetUrl, type Mood } from "@/lib/buddies";

type Props = {
  slug: string;
  mood: Mood;
  // performance.now() de quando o estado começou. 0 = desde que a página abriu.
  startedAt: number;
  label: string;
  className?: string;
  onFinish?: () => void;
};

// Toca as folhas exportadas do app no mesmo ritmo dele: o repouso se repete
// e cada reação toca uma vez só, terminando de volta no repouso.
export function BuddySprite({ slug, mood, startedAt, label, className, onFinish }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const finish = useRef(onFinish);

  useEffect(() => {
    finish.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = moodDuration[mood];
    const peak = Math.round(sheet.frames * 0.45);
    let frameShown = -1;
    let ended = false;
    let raf = 0;
    element.style.backgroundImage = `url(${sheetUrl(slug, mood)})`;

    const paint = (frame: number) => {
      if (frame === frameShown) return;
      frameShown = frame;
      const column = frame % sheet.columns;
      const row = Math.floor(frame / sheet.columns);
      element.style.backgroundPosition = `${(column / (sheet.columns - 1)) * 100}% ${(row / (sheet.rows - 1)) * 100}%`;
    };

    const tick = (now: number) => {
      const seconds = Math.max(0, (now - startedAt) / 1000);
      if (mood === "idle") {
        paint(reduce ? 0 : Math.floor(((seconds % duration) / duration) * sheet.frames) % sheet.frames);
      } else {
        paint(reduce ? peak : Math.min(sheet.frames - 1, Math.round((seconds / duration) * (sheet.frames - 1))));
        if (seconds >= duration && !ended) {
          ended = true;
          finish.current?.();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [slug, mood, startedAt]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={className}
      style={{ backgroundSize: `${sheet.columns * 100}% ${sheet.rows * 100}%`, backgroundRepeat: "no-repeat" }}
    />
  );
}
