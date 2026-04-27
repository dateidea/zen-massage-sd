"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  zoom?: boolean;
};

export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", zoom = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const Element = Tag;
  return (
    <Element
      ref={ref}
      className={"reveal " + (zoom ? "zoom " : "") + (shown ? "is-in " : "") + className}
      style={{ transitionDelay: shown ? delay + "ms" : "0ms" }}
    >
      {children}
    </Element>
  );
}
