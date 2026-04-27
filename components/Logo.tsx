type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[26px] tracking-[-0.01em] leading-none ${className}`}
      aria-label="Blue Moon Spa"
    >
      Blue
      <span className="italic font-light"> </span>Moon
      <span className="text-clay"> · </span>
      <span className="smallcaps text-[14px] tracking-[0.18em] opacity-70">
        Spa
      </span>
    </span>
  );
}
