import "./globals.css";

import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

const defaultUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | FrancesHR",
    default: "FrancesHR - Currículums, Mentoría y Entrevistas en Puerto Rico",
  },
  description:
    "Consigue tu próximo trabajo en Puerto Rico. Servicios de currículums profesionales, mentoría de carrera y entrevistas simuladas.",
  keywords: [
    "creación de currículums Puerto Rico",
    "resume builder",
    "mentoría de carrera",
    "entrevistas simuladas",
    "búsqueda de empleo",
    "desarrollo profesional",
    "servicios de recursos humanos",
    "empleo Puerto Rico",
  ],
  authors: [{ name: "CodeWFer" }],
  creator: "CodeWFer",
  publisher: "CodeWFer",
  // alternates are set per-page to ensure correct self-referencing canonical and hreflang
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es",
    url: defaultUrl,
    siteName: "FrancesHR",
    title: "FrancesHR - Currículums, Mentoría y Entrevistas en Puerto Rico",
    description:
      "Consigue tu próximo trabajo en Puerto Rico. Servicios de currículums profesionales, mentoría de carrera y entrevistas simuladas.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "FrancesHR - Servicios profesionales de creación de currículums, mentoría y entrevistas simuladas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrancesHR - Currículums, Mentoría y Entrevistas",
    description:
      "Consigue tu próximo trabajo en Puerto Rico. Servicios de currículums profesionales, mentoría de carrera y entrevistas simuladas.",
    images: ["/og-image.webp"],
    creator: "@codewfer",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Structured Data - JSON-LD */}
        {/** biome-ignore lint/correctness/useUniqueElementIds: Only used on layout */}
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "FrancesHR",
            description:
              "Servicios profesionales de creación de currículums, mentoría de carrera y entrevistas simuladas en Puerto Rico y Estados Unidos",
            url: defaultUrl,
            logo: `${defaultUrl}/og-image.webp`,
            address: {
              "@type": "PostalAddress",
              addressCountry: "PR",
              addressRegion: "Puerto Rico",
            },
            areaServed: [
              {
                "@type": "Country",
                name: "Puerto Rico",
              },
              {
                "@type": "Country",
                name: "United States",
              },
            ],
            serviceType: [
              "Creación de Currículums",
              "Mentoría de Carrera",
              "Entrevistas Simuladas",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "100",
              bestRating: "5",
              worstRating: "1",
            },
          })}
        </Script>
      </head>
      <body className={`${readexPro.className} antialiased`}>
        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="6IbI7JiCqsvwrPN4pQkjAA"
          strategy="lazyOnload"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          storageKey="franceshr-theme"
        >
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
