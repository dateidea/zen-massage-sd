type Props = { className?: string };
export default function Logo({ className = "" }: Props) {
  return (
    <span className={`display text-[24px] tracking-[-0.02em] leading-none ${className}`} aria-label="Oasis 8 Massage">
      Oasis<span className="italic font-light text-clay"> &middot; </span>8
    </span>
  );
}
