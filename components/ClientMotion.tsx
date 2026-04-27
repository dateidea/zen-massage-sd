"use client";

import { useEffect, useRef } from "react";

const MAGNETIC_RADIUS = 110;
const MAGNETIC_PULL = 0.28;
const HOVER_SELECTORS = "a, button, [role='button']";

export default function ClientMotion() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const dot = dotRef.current;
    let raf = 0;
    let mx = 0, my = 0;
    let dx = 0, dy = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }

    function tick() {
      // Smoothly trail the cursor
      dx += (mx - dx) * 0.18;
      dy += (my - dy) * 0.18;
      if (dot) {
        dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      }
      // Magnetic pull on btn-primary elements
      const btns = document.querySelectorAll(".btn-primary");
      btns.forEach((b) => {
        const el = b as HTMLElement;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const ddx = mx - cx;
        const ddy = my - cy;
        const dist = Math.hypot(ddx, ddy);
        if (dist < MAGNETIC_RADIUS) {
          const strength = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_PULL;
          el.style.transform = `translate(${ddx * strength}px, ${ddy * strength}px)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      });
    }

    function onEnter() { dot?.classList.add("is-active"); }
    function onLeave() { dot?.classList.remove("is-active"); }

    function onHoverIn() { dot?.classList.add("is-hover"); }
    function onHoverOut() { dot?.classList.remove("is-hover"); }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseenter", onEnter);
    document.body.addEventListener("mouseleave", onLeave);
    document.querySelectorAll(HOVER_SELECTORS).forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.removeEventListener("mouseleave", onLeave);
      document.querySelectorAll(HOVER_SELECTORS).forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden />;
}
