// Prefix asset paths with the deployment basePath when set.
// Used for inline CSS background-image URLs and other non-next/image refs
// that don't get auto-prefixed by Next.

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(p: string): string {
  if (!p) return p;
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  const normalized = p.startsWith("/") ? p : `/${p}`;
  return `${BASE}${normalized}`;
}
