"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Props = {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
};

export default function ZoomImage({
  src,
  alt,
  className = "",
  ratio = "aspect-[4/5]",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className={`zoom-frame img-placeholder ${ratio} w-full ${
        inView ? "is-in" : ""
      } ${className}`}
    >
      <div
        className="zoom-img"
        style={{ backgroundImage: `url(${asset(src)})` }}
      />
    </div>
  );
}
