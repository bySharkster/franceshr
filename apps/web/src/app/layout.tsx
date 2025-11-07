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
    default: "FrancesHR",
  },
  description: "La forma más rápida de conseguir tu próximo trabajo",
  keywords: [
    "job search",
    "resume builder",
    "career development",
    "job applications",
    "HR platform",
    "employment",
    "job matching",
  ],
  authors: [{ name: "CodeWFer" }],
  creator: "CodeWFer",
  publisher: "CodeWFer",
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
    description: "La forma más rápida de conseguir tu próximo trabajo",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "FrancesHR - La forma más rápida de conseguir tu próximo trabajo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrancesHR",
    description: "La forma más rápida de conseguir tu próximo trabajo",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
