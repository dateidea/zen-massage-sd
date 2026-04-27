import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-google",
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-google",
});

const SITE_URL = "https://navajo-spa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Navajo Spa — An Honest Hour in Baltimore Plaza, La Mesa",
    template: "%s · Navajo Spa",
  },
  description:
    "A small, family-run massage spa in Baltimore Plaza, La Mesa. Full body, foot reflexology, deep tissue, hot stone — fair prices, private rooms, stamp cards. Open every day, 9 AM to 10 PM. Walk-ins welcome.",
  keywords: [
    "massage La Mesa",
    "Navajo Spa",
    "Baltimore Plaza massage",
    "foot reflexology La Mesa",
    "deep tissue massage La Mesa",
    "hot stone massage San Diego",
    "Grossmont massage spa",
    "couples massage La Mesa",
    "walk-in massage La Mesa",
  ],
  openGraph: {
    title: "Navajo Spa — An Honest Hour in Baltimore Plaza, La Mesa",
    description:
      "An honest hour your shoulders have been waiting for. Full body, foot, deep tissue, hot stone. Open daily 9–10 in La Mesa. Walk-ins welcome.",
    url: SITE_URL,
    siteName: "Navajo Spa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-01.jpg",
        width: 1200,
        height: 630,
        alt: "Navajo Spa — quiet treatment room in Baltimore Plaza, La Mesa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navajo Spa — An Honest Hour in La Mesa",
    description:
      "An honest hour your shoulders have been waiting for. Open daily 9–10.",
    images: ["/images/og-01.jpg"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
              name: "Navajo Spa",
              image: `${SITE_URL}/images/hero-01.jpg`,
              url: SITE_URL,
              telephone: "+16196395282",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "5575 Baltimore Dr #106-107",
                addressLocality: "La Mesa",
                addressRegion: "CA",
                postalCode: "91942",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 32.7803468,
                longitude: -117.0321235,
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
                  closes: "22:00",
                },
              ],
              paymentAccepted: "Cash, Card, Apple Pay",
              hasMap: "https://maps.app.goo.gl/3bFERDjYsj1cpB3c6",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                reviewCount: "26",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
