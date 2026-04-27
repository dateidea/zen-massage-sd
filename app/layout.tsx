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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oasis-8-massage.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Oasis 8 Massage — An Honest Hour on El Cajon Boulevard, La Mesa",
    template: "%s · Oasis 8 Massage",
  },
  description:
    "A small, family-run massage studio on El Cajon Boulevard at 79th. Foot, hot stone, deep tissue, and combo work. Open every day, 10 AM to 9:30 PM. Combo: 30 min foot + 30 min body for $45. Walk-ins welcome.",
  keywords: [
    "Oasis 8 Massage",
    "massage La Mesa",
    "El Cajon Blvd massage",
    "foot massage La Mesa",
    "deep tissue massage San Diego",
    "hot stone massage La Mesa",
    "combo massage El Cajon Blvd",
    "walk-in massage La Mesa",
  ],
  openGraph: {
    title:
      "Oasis 8 Massage — An Honest Hour on El Cajon Boulevard, La Mesa",
    description:
      "An honest hour for everywhere you carry it. Foot, hot stone, deep tissue, combo. Open every day, 10 AM to 9:30 PM at 7900 El Cajon Blvd.",
    url: SITE_URL,
    siteName: "Oasis 8 Massage",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-01.jpg",
        width: 1200,
        height: 630,
        alt: "Oasis 8 Massage — quiet, warm treatment room on El Cajon Boulevard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oasis 8 Massage — An Honest Hour on El Cajon Boulevard, La Mesa",
    description:
      "An honest hour for everywhere you carry it. Open every day, 10 AM to 9:30 PM.",
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
              name: "Oasis 8 Massage",
              image: `${SITE_URL}/images/hero-01.jpg`,
              url: SITE_URL,
              telephone: "+16194396708",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "7900 El Cajon Blvd, Ste C",
                addressLocality: "La Mesa",
                addressRegion: "CA",
                addressCountry: "US",
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
                  opens: "10:00",
                  closes: "21:30",
                },
              ],
              paymentAccepted: "Cash, Credit Card",
              hasMap:
                "https://maps.google.com/?q=7900+El+Cajon+Blvd+Suite+C+La+Mesa",
              makesOffer: [
                "Foot massage",
                "Full body massage with hot stones",
                "Deep tissue massage",
                "Couples massage",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
