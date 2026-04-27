import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oasis8massage.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "ZEN Massage — An Honest Hour on El Cajon Boulevard, San Diego", template: "%s · ZEN Massage" },
  description: "ZEN Massage at 7086 El Cajon Blvd, San Diego. Foot, hot stone, deep tissue, and combo work. Open every day, 9:30 AM to 10 PM. Combo: 30 min foot + 30 min body for $45. 10% off active duty and veterans. Walk-ins welcome. Call (619) 548-0773.",
  keywords: ["ZEN Massage","massage San Diego","El Cajon Blvd massage","foot massage San Diego","deep tissue massage San Diego","hot stone massage San Diego","combo massage El Cajon Blvd","couples massage San Diego","walk-in massage San Diego","military discount massage"],
  openGraph: {
    title: "ZEN Massage — An Honest Hour on El Cajon Boulevard, San Diego",
    description: "An honest hour for everywhere you carry it. Foot, hot stone, deep tissue, combo. Open every day, 9:30 AM to 10 PM at 7086 El Cajon Blvd, San Diego.",
    url: SITE_URL, siteName: "ZEN Massage", locale: "en_US", type: "website",
    images: [{ url: "/images/og-01.jpg", width: 1200, height: 630, alt: "ZEN Massage — quiet, warm treatment room on El Cajon Boulevard" }],
  },
  twitter: { card: "summary_large_image", title: "ZEN Massage — An Honest Hour on El Cajon Boulevard, San Diego", description: "An honest hour for everywhere you carry it. Open every day, 9:30 AM to 10 PM.", images: ["/images/og-01.jpg"] },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <a href="#booking" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">Skip to booking</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "MassageTherapy", "@id": `${SITE_URL}/#business`,
          name: "ZEN Massage", image: `${SITE_URL}/images/hero-01.jpg`, url: SITE_URL,
          telephone: "+16195480773", email: "oasis8massage@gmail.com", priceRange: "$$",
          address: { "@type": "PostalAddress", streetAddress: "7086 El Cajon Blvd", addressLocality: "San Diego", addressRegion: "CA", postalCode: "92115", addressCountry: "US" },
          geo: { "@type": "GeoCoordinates", latitude: 32.7689095, longitude: -117.0451089 },
          openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:30", closes: "22:00" }],
          paymentAccepted: "Cash, Credit Card", hasMap: "https://maps.app.goo.gl/JMd4asWRLgScwdAv7",
        }) }} />
      </body>
    </html>
  );
}
