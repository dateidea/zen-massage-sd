import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://feelgoodspa.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Feel Good Spa — Massage on El Cajon Boulevard, San Diego",
    template: "%s · Feel Good Spa",
  },
  description:
    "A small, family-run massage studio on El Cajon Boulevard. Relaxing, deep tissue, hot stone, and reflexology. Open every day, 9 AM to 10:30 PM. Walk-ins welcome.",
  keywords: [
    "massage San Diego",
    "El Cajon Blvd massage",
    "deep tissue massage",
    "foot reflexology",
    "hot stone massage",
    "Chinese massage",
    "College Area massage",
  ],
  openGraph: {
    title: "Feel Good Spa — Massage on El Cajon Boulevard",
    description:
      "An unhurried hour. Quiet hands. Warm room. Open daily 9–10:30 on El Cajon Boulevard.",
    url: SITE_URL,
    siteName: "Feel Good Spa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-01.jpg",
        width: 1200,
        height: 630,
        alt: "Feel Good Spa — quiet, warm treatment room on El Cajon Boulevard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feel Good Spa — Massage on El Cajon Boulevard",
    description:
      "An unhurried hour. Quiet hands. Warm room. Open daily 9–10:30.",
    images: ["/images/og-01.jpg"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <a
          href="#booking"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to booking
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MassageTherapy",
              "@id": `${SITE_URL}/#business`,
              name: "Feel Good Spa",
              image: `${SITE_URL}/images/hero-01.jpg`,
              url: SITE_URL,
              telephone: "+16198253033",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "6917 El Cajon Blvd",
                addressLocality: "San Diego",
                addressRegion: "CA",
                postalCode: "92115",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 32.7682228,
                longitude: -117.0489569,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "09:00",
                  closes: "22:30",
                },
              ],
              paymentAccepted: "Cash, Apple Pay",
              hasMap:
                "https://www.google.com/maps/place/Feel+Good+Spa/@32.7682228,-117.0489569,17z",
            }),
          }}
        />
      </body>
    </html>
  );
}
