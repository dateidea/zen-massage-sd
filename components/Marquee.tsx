type Props = {
  items: string[];
  /** Inverse style — light text on dark band. Defaults to dark text on cream. */
  inverse?: boolean;
};

/**
 * Slow horizontal drift of repeating service names.
 * Used as a recurring motif between sections — the rhythm of the menu.
 * Pure CSS animation; respects prefers-reduced-motion via globals.css.
 */
export default function Marquee({ items, inverse = false }: Props) {
  // Duplicate the list so the loop is seamless (track translates -50%).
  const loop = [...items, ...items];

  const band = inverse
    ? "bg-shadow text-cream border-y border-clay/40"
    : "bg-cream-deep text-ink border-y border-hairline";

  const accent = inverse ? "text-clay" : "text-clay";

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${band}`}
    >
      <div className="marquee-track py-7 md:py-9">
        {loop.map((item, i) => (
          <span
            key={i}
            className="display text-[28px] tracking-[0.01em] md:text-[36px] flex items-center gap-12 pl-12"
          >
            <span className="italic">{item}</span>
            <span className={`text-[18px] not-italic ${accent}`}>&#x2756;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
