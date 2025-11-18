import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Modern JavaScript - no unnecessary polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize bundle
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons", "motion"],
    optimizeCss: true,
  },
  // Modern browser targets
  transpilePackages: [],
  // Production optimizations
  poweredByHeader: false,
  compress: true,

  // Security Headers - Defense in Depth Strategy
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // CSP directives to control resource loading and execution
            // Tailored for Next.js + Supabase + Stripe + Ahrefs Analytics
            value: [
              // Default: Only allow resources from same origin
              "default-src 'self'",

              // Scripts: Next.js requires 'unsafe-eval' for dev, 'unsafe-inline' for inline event handlers
              // Allow: Self, Next.js chunks, Ahrefs Analytics, Stripe.js
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://analytics.ahrefs.com https://js.stripe.com",

              // Styles: Allow inline styles for CSS-in-JS (Tailwind, styled-components)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // Images: Allow self, data URIs, HTTPS images, LinkedIn (for profile pics), Stripe assets
              "img-src 'self' data: https: blob: https://media.licdn.com https://*.stripe.com",

              // Fonts: Allow self, data URIs, Google Fonts
              "font-src 'self' data: https://fonts.gstatic.com",

              // Connect (AJAX/fetch): Allow API calls to Supabase, Stripe, own API routes
              // IMPORTANT: Replace *.supabase.co with your actual Supabase project URL in production
              `connect-src 'self' https://${process.env.SUPABASE_PROJECT_ID}.supabase.co https://api.stripe.com https://analytics.ahrefs.com`,

              // Frames: Allow Stripe Checkout embeds (for 3D Secure, payment forms)
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",

              // Frame Ancestors: Prevent clickjacking - cannot be embedded in iframes
              "frame-ancestors 'none'",

              // Base URI: Restrict base tag to prevent base tag injection attacks
              "base-uri 'self'",

              // Form Actions: Only allow form submissions to same origin
              "form-action 'self' https://checkout.stripe.com",

              // Object/Embed: Block Flash, Java applets, and other plugins
              "object-src 'none'",

              // Media: Allow self-hosted media only
              "media-src 'self'",

              // Worker: Allow web workers from same origin
              "worker-src 'self' blob:",

              // Manifest: Allow web app manifest from same origin
              "manifest-src 'self'",

              // Upgrade Insecure Requests: Automatically upgrade HTTP to HTTPS
              "upgrade-insecure-requests",
            ].join("; "),
          },
          {
            key: "X-DNS-Prefetch-Control",
            // Enable DNS prefetching for performance (already using in layout.tsx)
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            // HSTS: Force HTTPS for 2 years, include subdomains, allow preload list
            // Protects against SSL stripping attacks and ensures encrypted connections
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            // Prevents MIME type sniffing - forces browser to respect Content-Type header
            // Protects against attacks where malicious files are disguised as safe types
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            // Prevents clickjacking - page cannot be embedded in frames/iframes
            // Defense against UI redress attacks
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            // Legacy XSS filter for older browsers (modern browsers use CSP)
            // mode=block stops page rendering if XSS detected
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            // Balanced privacy & functionality
            // Sends origin on cross-origin, full URL on same-origin
            // Protects sensitive data in URLs while maintaining analytics
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            // Feature Policy: Disable sensitive browser features not needed
            // Reduces attack surface and protects user privacy
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()", // Block Google FLoC tracking
              "payment=(self)", // Allow Payment Request API for Stripe
              "usb=()",
              "serial=()",
              "bluetooth=()",
              "magnetometer=()",
              "accelerometer=()",
              "gyroscope=()",
              "ambient-light-sensor=()",
            ].join(", "),
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            // COEP: Prevents loading cross-origin resources without explicit permission
            // Required for SharedArrayBuffer and high-resolution timers
            // Using 'credentialless' for better compatibility with third-party resources
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            // COOP: Isolates browsing context from cross-origin windows
            // Protects against Spectre-like attacks
            // Using 'same-origin-allow-popups' to allow Stripe checkout popups
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            // CORP: Protects resources from being loaded by other origins
            // Prevents information leakage through timing attacks
            value: "same-origin",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            // Restrict Adobe Flash and PDF cross-domain requests
            value: "none",
          },
        ],
      },
      // Specific headers for API routes - more permissive CORS for API endpoints
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            // IMPORTANT: In production, replace with your actual domain
            value: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization, Accept",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
