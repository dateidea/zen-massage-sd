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
 * Single reveal primitive. Defaults to a quiet fade.
 * Pass `zoom` to use the signature slow image-zoom (the new motion
 * direction). Components compose `Reveal zoom` around image frames
 * to opt in.
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
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);

  const cls = `${zoom ? "zoom-frame" : "reveal"} ${className}`;
  return createElement(as, { ref, className: cls }, children);
}
