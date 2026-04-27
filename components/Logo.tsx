type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[22px] tracking-[-0.02em] leading-none ${className}`}
      aria-label="ZEN Massage"
    >
      ZEN
      <span className="italic font-light"> &middot; </span>Massage
    </span>
  );
}
