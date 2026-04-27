import { asset } from "@/lib/asset";

type Props = {
  src: string;
  alt: string;
  ratio?: string;
};

/**
 * Full-bleed horizon-line photograph used as a section break.
 * Escapes its parent container via .horizon-band CSS utility.
 */
export default function HorizonBand({ src, alt, ratio = "aspect-[21/9]" }: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`horizon-band img-placeholder ${ratio}`}
      style={{
        backgroundImage: `url(${asset(src)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
