"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: string;
  className?: string;
  /** ms between each letter */
  step?: number;
  /** delay before starting */
  delay?: number;
  /** Render as which tag */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

/**
 * Type-in-place: splits text into letters and reveals each in sequence
 * exactly once on mount. Idempotent across hydration. Falls back to fully
 * visible text if reduced-motion is requested.
 */
export default function TypeIn({
  children,
  className = "",
  step = 24,
  delay = 80,
  as: Tag = "h1",
}: Props) {
  const [shown, setShown] = useState(0);
  const total = children.length;
  const reduced = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) {
      setShown(total);
      return;
    }
    const start = window.setTimeout(() => {
      let i = 0;
      const tick = () => {
        i += 1;
        setShown(i);
        if (i < total) timer = window.setTimeout(tick, step);
      };
      let timer = window.setTimeout(tick, step);
      // expose for cleanup via closure
      (window as Window & { __typeInTimer?: number }).__typeInTimer = timer;
    }, delay);
    return () => window.clearTimeout(start);
  }, [total, step, delay]);

  // Build letter spans. Preserve <br> from source by splitting on \n if present.
  const lines = children.split("\n");
  let letterIdx = 0;

  return (
    <Tag className={className} aria-label={children}>
      {lines.map((line, lineI) => (
        <span key={lineI}>
          {Array.from(line).map((ch) => {
            const i = letterIdx++;
            const visible = i < shown;
            return (
              <span
                key={i}
                aria-hidden
                className={`type-letter${visible ? " is-in" : ""}`}
                style={{ transitionDelay: `${i * 8}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
            );
          })}
          {lineI < lines.length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
}
