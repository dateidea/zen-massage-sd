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

const SITE_URL = "https://dateidea.github.io/blue-moon-spa";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ZEN Massage — An Honest Hour on El Cajon Boulevard, San Diego",
    template: "%s · ZEN Massage",
  },
  description:
    "A small, Asian-owned massage studio on El Cajon Boulevard. The Custom Hour: Swedish, deep tissue, or both — with hot stones and essential oil included, $79.99. Open every day, 9 AM to 11 PM. Walk-ins welcome.",
  keywords: [
    "ZEN Massage",
    "massage San Diego",
    "El Cajon Blvd massage",
    "deep tissue massage San Diego",
    "Swedish massage San Diego",
    "hot stone massage San Diego",
    "Asian-owned massage",
    "College Area massage",
    "foot reflexology San Diego",
  ],
  openGraph: {
    title: "ZEN Massage — An Honest Hour on El Cajon Boulevard",
    description:
      "Swedish, deep tissue, or both — with hot stones and essential oil included. $79.99 Custom Hour. Open daily 9–11 in San Diego.",
    url: SITE_URL,
    siteName: "ZEN Massage",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-01.png",
        width: 1200,
        height: 630,
        alt: "ZEN Massage — quiet, warm treatment room on El Cajon Boulevard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEN Massage — An Honest Hour on El Cajon Boulevard",
    description:
      "Swedish, deep tissue, or both — with hot stones included. $79.99. Open daily 9–11.",
    images: ["/images/og-01.png"],
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
              name: "ZEN Massage",
              image: `${SITE_URL}/images/hero-01.jpg`,
              url: SITE_URL,
              telephone: "+16265222888",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "7034 El Cajon Blvd",
                addressLocality: "San Diego",
                addressRegion: "CA",
                postalCode: "92115",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 32.7691869,
                longitude: -117.0461041,
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
              paymentAccepted: "Cash, Credit Card",
              hasMap: "https://maps.app.goo.gl/4wrpXnSY2Wy9iGuD9",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.5",
                reviewCount: "11",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
