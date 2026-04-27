"use client";

import { useEffect, useRef, createElement } from "react";
import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  zoom?: boolean;
  children: ReactNode;
};

/**
 * Single reveal primitive.
 * - For elements ABOVE the fold (or already in view at observe time),
 *   sets `is-in` immediately — no IntersectionObserver race on hydration.
 * - For elements below the fold, uses IntersectionObserver to add `is-in`
 *   when scrolled into view.
 * - Hard fallback: if anything goes sideways, every reveal still becomes
 *   `is-in` 800ms after mount so content can never get stuck invisible.
 */
export default function Reveal({
  as = "div",
  className = "",
  delay = 0,
  zoom = false,
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.transitionDelay = `${delay}ms`;

    // Hard fallback — never let content stay invisible.
    const safety = window.setTimeout(() => {
      node.classList.add("is-in");
    }, 800);

    // If already in viewport on mount, reveal immediately.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      node.classList.add("is-in");
      window.clearTimeout(safety);
      return () => {};
    }

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-in");
      window.clearTimeout(safety);
      return () => {};
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            obs.unobserve(e.target);
            window.clearTimeout(safety);
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.01 }
    );
    obs.observe(node);
    return () => {
      obs.disconnect();
      window.clearTimeout(safety);
    };
  }, [delay]);

  const cls = `${zoom ? "zoom-frame" : "reveal"} ${className}`;
  return createElement(as, { ref, className: cls }, children);
}
