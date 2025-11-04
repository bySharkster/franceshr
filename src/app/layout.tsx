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
    default: "FrancesHR - Professional Resume Services & Career Coaching",
  },
  description:
    "Transform your career with FrancesHR. Professional resume writing, career coaching, and interview preparation services. Land your dream job faster with expert guidance and personalized support.",
  keywords: [
    "FrancesHR",
    "resume services",
    "professional resume",
    "career coaching",
    "job search",
    "interview preparation",
    "CV writing",
    "career development",
    "job placement",
    "resume writing services",
    "career counseling",
    "executive resume",
    "LinkedIn profile",
    "cover letter writing",
  ],
  authors: [{ name: "FrancesHR" }],
  creator: "FrancesHR",
  publisher: "FrancesHR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title: "FrancesHR - Professional Resume Services & Career Coaching",
    description:
      "Transform your career with FrancesHR. Professional resume writing, career coaching, and interview preparation services. Land your dream job faster with expert guidance.",
    siteName: "FrancesHR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FrancesHR - Professional Resume Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrancesHR - Professional Resume Services & Career Coaching",
    description:
      "Transform your career with FrancesHR. Professional resume writing, career coaching, and interview preparation services.",
    images: ["/og-image.jpg"],
    creator: "@franceshr",
  },
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: defaultUrl,
  },
  category: "business",
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="FrancesHR" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FrancesHR" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Theme Color - adapts to system theme */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FrancesHR",
              url: defaultUrl,
              logo: `${defaultUrl}/logo.png`,
              description:
                "Professional resume writing, career coaching, and interview preparation services.",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: ["English"],
              },
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FrancesHR",
              url: defaultUrl,
              description:
                "Professional resume writing, career coaching, and interview preparation services.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${defaultUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Career Coaching and Resume Services",
              provider: {
                "@type": "Organization",
                name: "FrancesHR",
                url: defaultUrl,
              },
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Career Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Professional Resume Writing",
                      description: "Expert resume writing services to help you stand out",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Career Coaching",
                      description: "Personalized career coaching and mentorship",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Interview Preparation",
                      description: "Mock interviews and preparation strategies",
                    },
                  },
                ],
              },
            }),
          }}
        />
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
