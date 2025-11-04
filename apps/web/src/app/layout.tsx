import "./globals.css";

import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { CookieConsentBanner } from "@/components/molecules/cookie-consent-banner";
import { Footer } from "@/components/organisms/sections/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `${process.env.NEXT_PUBLIC_SITE_URL}`;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | FrancesHR",
    default: "FrancesHR",
  },
  description: "The fastest way to land your next job",
  keywords: [
    "job search",
    "resume builder",
    "career development",
    "job applications",
    "HR platform",
    "employment",
    "job matching",
  ],
  authors: [{ name: "FrancesHR" }],
  creator: "FrancesHR",
  publisher: "FrancesHR",
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
    locale: "en_US",
    url: defaultUrl,
    siteName: "FrancesHR",
    title: "FrancesHR",
    description: "The fastest way to land your next job",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "FrancesHR - The fastest way to land your next job",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrancesHR",
    description: "The fastest way to land your next job",
    images: ["/og-image.webp"],
    creator: "@franceshr",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${readexPro.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          storageKey="franceshr-theme"
        >
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsentBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
