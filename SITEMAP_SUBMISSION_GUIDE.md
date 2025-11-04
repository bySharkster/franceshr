# Sitemap Submission Guide for Google Search Console

## Overview

Your sitemap has been generated and is ready to submit to Google Search Console. The sitemap is automatically generated using Next.js 13+ App Router conventions and includes all public pages and service routes.

## What's Included

### Files Created

1. **`/apps/web/src/app/sitemap.ts`** - Dynamic sitemap generator
2. **`/apps/web/src/app/robots.ts`** - Robots.txt configuration

### Pages in Sitemap

#### Static Pages (Priority Order)

- **/** - Homepage (Priority: 1.0, Weekly updates)
- **/about** - About Frances page (Priority: 0.9, Monthly updates)
- **/auth/login** - Login page (Priority: 0.7, Monthly updates)
- **/auth/sign-up** - Sign up page (Priority: 0.7, Monthly updates)
- **/privacy** - Privacy policy (Priority: 0.3, Yearly updates)
- **/terms** - Terms of service (Priority: 0.3, Yearly updates)
- **/cookies** - Cookie policy (Priority: 0.3, Yearly updates)

#### Dynamic Service Pages (Priority: 0.8, Monthly updates)

- **/services/resume-basico** - Basic Resume Service
- **/services/resume-profesional** - Professional Resume Service
- **/services/resume-ejecutivo** - Executive Resume Service
- **/services/mentorias-laborales** - Career Mentoring Service
- **/services/entrevistas-simuladas** - Mock Interview Service

### Protected/Private Pages (Excluded from Sitemap)

The following pages are blocked in robots.txt and excluded from the sitemap:

- `/app/*` - User dashboard (requires authentication)
- `/api/*` - API endpoints
- `/auth/error` - Error pages
- `/auth/update-password` - Password update
- `/checkout/*` - Checkout flow
- `/onboarding/*` - Onboarding flow
- `/pay/*` - Payment pages
- `/protected/*` - Protected routes
- `/privacy-settings` - User privacy settings

## How to Submit to Google Search Console

### Step 1: Access Your Sitemap

Once deployed, your sitemap will be available at:

```
https://franceshr.com/sitemap.xml
```

You can also test it locally:

```
http://localhost:3000/sitemap.xml
```

### Step 2: Verify Your Site in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Enter your domain: `franceshr.com`
4. Choose verification method:
   - **HTML file upload** (recommended)
   - **HTML tag** (add to your layout.tsx)
   - **Google Analytics**
   - **Google Tag Manager**
   - **Domain name provider** (DNS verification)

### Step 3: Add Your Sitemap

1. In Google Search Console, select your property
2. Go to **"Sitemaps"** in the left sidebar
3. Enter your sitemap URL: `sitemap.xml`
4. Click **"Submit"**

### Step 4: Verify Submission

- Google will process your sitemap (can take a few hours to days)
- Check the status in the Sitemaps report
- Look for any errors or warnings

## HTML Tag Verification (If Needed)

If you choose HTML tag verification, add this to your `layout.tsx`:

1. Get your verification code from Google Search Console
2. Add it to your `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here
   ```
3. The verification meta tag is already configured in your layout.tsx metadata

## Robots.txt

Your robots.txt is automatically generated and available at:

```
https://franceshr.com/robots.txt
```

It allows all search engines to crawl public pages while blocking private/protected routes.

## Testing Your Sitemap

### Local Testing

```bash
# Start your dev server
cd apps/web
pnpm dev

# Visit in browser
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
```

### Production Testing

After deployment, verify:

```bash
# Check sitemap
curl https://franceshr.com/sitemap.xml

# Check robots.txt
curl https://franceshr.com/robots.txt
```

## Expected Results

### Sitemap.xml Output

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://franceshr.com</loc>
    <lastmod>2024-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... more URLs -->
</urlset>
```

### Robots.txt Output

```
User-Agent: *
Allow: /
Disallow: /app/*
Disallow: /api/*
# ... more rules

Sitemap: https://franceshr.com/sitemap.xml
```

## Additional SEO Recommendations

### 1. Update Environment Variables

Make sure your `.env.local` and production environment have:

```env
NEXT_PUBLIC_SITE_URL=https://franceshr.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code_here
```

### 2. Create OG Image

You updated the metadata to use `/og-image.webp`. Make sure to create this image:

- **Size**: 1200x630 pixels
- **Format**: JPG or PNG
- **Location**: `/apps/web/public/og-image.webp`
- **Content**: FrancesHR branding with tagline

### 3. Monitor Search Console

After submission, regularly check:

- **Coverage** - Pages indexed vs errors
- **Performance** - Search queries and clicks
- **Enhancements** - Mobile usability, Core Web Vitals
- **Manual Actions** - Any penalties or issues

### 4. Submit to Other Search Engines

#### Bing Webmaster Tools

- URL: https://www.bing.com/webmasters
- Submit: `https://franceshr.com/sitemap.xml`

#### Yandex Webmaster

- URL: https://webmaster.yandex.com
- Submit: `https://franceshr.com/sitemap.xml`

## Troubleshooting

### Sitemap Not Showing

- Verify the file exists at `/apps/web/src/app/sitemap.ts`
- Check for TypeScript errors: `pnpm type-check`
- Rebuild: `pnpm build`

### Google Can't Access Sitemap

- Check your hosting/firewall settings
- Verify the URL is publicly accessible
- Check robots.txt isn't blocking Googlebot

### Pages Not Indexed

- Check Coverage report in Search Console
- Verify pages aren't blocked in robots.txt
- Check for noindex meta tags
- Ensure pages have unique, quality content

## Next Steps

1. ✅ Sitemap created
2. ⏳ Deploy to production
3. ⏳ Verify site in Google Search Console
4. ⏳ Submit sitemap
5. ⏳ Create OG image (1200x630px)
6. ⏳ Monitor indexing status
7. ⏳ Submit to Bing/Yandex (optional)

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
