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

const SITE_URL = "https://dateidea.github.io/the-unhurried-hour";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pure Massage — An Honest Hour on El Cajon Boulevard, San Diego",
    template: "%s · Pure Massage",
  },
  description:
    "A small, Asian-owned neighborhood massage studio on El Cajon Boulevard. Sixty minutes, fifty dollars, no upsell. Open every day, 9 AM to 11 PM. New clients get $10 off the first hour. Walk-ins welcome.",
  keywords: [
    "massage San Diego",
    "El Cajon Blvd massage",
    "deep tissue massage San Diego",
    "foot reflexology San Diego",
    "hot stone massage",
    "Asian-owned massage",
    "College Area massage",
    "Pure Massage San Diego",
  ],
  openGraph: {
    title: "Pure Massage — An Honest Hour on El Cajon Boulevard",
    description:
      "An honest hour your shoulders have been waiting for. Sixty minutes, fifty dollars, no upsell. Open daily 9–11 in San Diego. $10 off the first hour.",
    url: SITE_URL,
    siteName: "Pure Massage",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-01.jpg",
        width: 1200,
        height: 630,
        alt: "Pure Massage — quiet, warm treatment room on El Cajon Boulevard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pure Massage — An Honest Hour on El Cajon Boulevard",
    description:
      "An honest hour your shoulders have been waiting for. Open daily 9–11.",
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
              name: "Pure Massage",
              image: `${SITE_URL}/images/hero-01.jpg`,
              url: SITE_URL,
              telephone: "+18583815959",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "6979 El Cajon Blvd",
                addressLocality: "San Diego",
                addressRegion: "CA",
                postalCode: "92115",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 32.76787,
                longitude: -117.04812,
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
                  closes: "23:00",
                },
              ],
              paymentAccepted: "Cash, Apple Pay",
              hasMap: "https://maps.app.goo.gl/6R3zcMDtZ2aZ9SgF8",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.2",
                reviewCount: "17",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
