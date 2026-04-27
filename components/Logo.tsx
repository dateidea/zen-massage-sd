type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[22px] tracking-[-0.02em] leading-none ${className}`}
      aria-label="Navajo Spa"
    >
      Navajo
      <span className="italic font-light"> &middot; </span>Spa
    </span>
  );
}
