type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[22px] tracking-[-0.02em] leading-none ${className}`}
      aria-label="Blue Moon Spa"
    >
      Blue
      <span className="italic font-light"> </span>Moon
      <span className="opacity-60 font-light"> Spa</span>
    </span>
  );
}
