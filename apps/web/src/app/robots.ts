import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://franceshr.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/app/*",
          "/api/*",
          "/auth/error",
          "/auth/update-password",
          "/checkout/*",
          "/onboarding/*",
          "/pay/*",
          "/protected/*",
          "/privacy-settings",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
