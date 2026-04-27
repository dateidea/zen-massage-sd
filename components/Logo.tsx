type Props = { className?: string };
export default function Logo({ className = "" }: Props) {
  return (
    <span className={`display text-[22px] tracking-[-0.04em] leading-none font-bold ${className}`} aria-label="Oasis 8 Massage">
      Oasis<span className="text-clay-deep font-medium"> · </span>8
    </span>
  );
}
