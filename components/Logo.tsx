type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[22px] tracking-[-0.015em] leading-none ${className}`}
      aria-label="Blue Moon Spa"
    >
      Blue
      <span className="italic font-light"> </span>Moon
      <span className="text-clay font-light"> · </span>
      <span className="opacity-70 font-light tracking-[0.02em] text-[18px]">SD</span>
    </span>
  );
}
