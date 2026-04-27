type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[26px] tracking-[0.04em] uppercase leading-none ${className}`}
      aria-label="ZEN Massage"
    >
      ZEN
      <span className="text-brass"> &middot; </span>Massage
    </span>
  );
}
