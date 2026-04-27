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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dateidea.github.io/zen-massage-sd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ZEN Massage — An Honest Hour on Baltimore Plaza, La Mesa",
    template: "%s · ZEN Massage",
  },
  description:
    "ZEN Massage at 5575 Baltimore Dr #106-107, La Mesa. Foot, hot stone, deep tissue, and combo work. Open every day, 9 AM to 10 PM. Combo: 30 min foot + 30 min body for $45. 10% off active duty and veterans. Walk-ins welcome.",
  keywords: [
    "ZEN Massage",
    "massage La Mesa",
    "Baltimore Plaza massage",
    "foot massage La Mesa",
    "deep tissue massage San Diego",
    "hot stone massage La Mesa",
    "foot reflexology La Mesa",
    "couples massage La Mesa",
    "walk-in massage La Mesa",
    "military discount massage",
  ],
  openGraph: {
    title:
      "ZEN Massage — An Honest Hour on Baltimore Plaza, La Mesa",
    description:
      "An honest hour for everywhere you carry it. Foot, hot stone, deep tissue, combo. Open every day, 9 AM to 10 PM at 5575 Baltimore Dr #106-107, La Mesa.",
    url: SITE_URL,
    siteName: "ZEN Massage",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-01.jpg",
        width: 1200,
        height: 630,
        alt: "ZEN Massage — quiet, warm treatment room on Baltimore Plaza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ZEN Massage — An Honest Hour on Baltimore Plaza, La Mesa",
    description:
      "An honest hour for everywhere you carry it. Open every day, 9 AM to 10 PM.",
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
              name: "ZEN Massage",
              image: `${SITE_URL}/images/hero-01.jpg`,
              url: SITE_URL,
              telephone: "+16196395282",
              email: "oasis8massage@gmail.com",
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
                latitude: 32.7696314,
                longitude: -117.0269936,
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
              paymentAccepted: "Cash, Credit Card",
              hasMap: "https://maps.app.goo.gl/BzZuUZrvG5NLdQzK6",
              makesOffer: [
                {
                  "@type": "Offer",
                  name: "Combo: 30 min foot + 30 min body",
                  price: "45.00",
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "Combo: 40 min foot + 40 min body",
                  price: "60.00",
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "10% off — active duty and veterans",
                  description:
                    "Discount on any service with a valid military ID. Cannot be combined.",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
