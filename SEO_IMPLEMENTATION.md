# SEO Implementation Guide

## Overview

This document outlines the comprehensive SEO enhancements implemented for FrancesHR to improve search engine visibility, social media sharing, and overall discoverability.

## Implemented Features

### 1. Enhanced Metadata (`src/app/layout.tsx`)

#### Title & Description

- **Default Title**: "FrancesHR - Professional Resume Services & Career Coaching"
- **Template**: "%s | FrancesHR" (for page-specific titles)
- **Description**: Comprehensive description highlighting key services
- **Keywords**: 14 targeted keywords including "resume services", "career coaching", "interview preparation"

#### OpenGraph Tags

- Complete OpenGraph implementation for rich social media previews
- Image: `/og-image.jpg` (1200x630px)
- Proper locale, type, and URL configuration
- Optimized for Facebook, LinkedIn, and other platforms

#### Twitter Cards

- Large image card format
- Dedicated Twitter metadata
- Twitter handle: @franceshr (update with your actual handle)

#### Robots & Crawling

- Explicit indexing instructions
- Google-specific bot configuration
- Max image preview: large
- Max snippet: unlimited
- Max video preview: unlimited

### 2. Structured Data (JSON-LD)

Three types of structured data schemas implemented:

#### Organization Schema

```json
{
  "@type": "Organization",
  "name": "FrancesHR",
  "logo": "/logo.png",
  "contactPoint": {...}
}
```

#### WebSite Schema

```json
{
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction"
  }
}
```

#### Service Schema

```json
{
  "@type": "Service",
  "serviceType": "Career Coaching and Resume Services",
  "hasOfferCatalog": ["Professional Resume Writing", "Career Coaching", "Interview Preparation"]
}
```

### 3. PWA Configuration

#### Web App Manifest (`public/site.webmanifest`)

- App name and short name
- Display mode: standalone
- Theme colors for light/dark modes
- Icon definitions (16x16, 32x32, 180x180, 512x512)
- Categories: business, productivity, career

#### Meta Tags

- Apple mobile web app capable
- Mobile web app capable
- Application name
- Theme color with media queries for dark mode

### 4. Robots.txt (`src/app/robots.ts`)

- Allow all user agents
- Disallow: `/api/`, `/admin/`, `/_next/`, `/private/`
- Sitemap reference

### 5. Sitemap (`src/app/sitemap.ts`)

- Homepage (priority: 1.0, daily updates)
- Sign-in page (priority: 0.8, monthly updates)
- Sign-up page (priority: 0.8, monthly updates)
- Extensible for additional routes

## Best Practices Implemented

### Performance

- Font display: swap (prevents FOUT)
- Smooth scroll behavior
- Optimized image formats

### Accessibility

- Proper HTML lang attribute
- Semantic HTML structure
- ARIA-compliant components

### Mobile Optimization

- Responsive meta viewport
- PWA support
- Touch-friendly interface

## Maintenance Tasks

### Regular Updates

1. **Update Sitemap** (`src/app/sitemap.ts`)
   - Add new public pages
   - Update lastModified dates
   - Adjust priorities based on importance

2. **Refresh Structured Data** (`src/app/layout.tsx`)
   - Update service offerings
   - Add social media links to `sameAs` array
   - Update contact information

3. **Monitor Performance**
   - Google Search Console
   - Lighthouse scores
   - Core Web Vitals

### Social Media Integration

Update the following in `layout.tsx`:

```typescript
twitter: {
  creator: "@franceshr", // Replace with actual handle
}

sameAs: [
  // Add your social media URLs
  "https://twitter.com/franceshr",
  "https://linkedin.com/company/franceshr",
  "https://facebook.com/franceshr"
]
```

## Testing Your SEO

### Tools to Use

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test structured data implementation

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test OpenGraph tags

3. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter card implementation

4. **Lighthouse (Chrome DevTools)**
   - Performance: Target 90+
   - SEO: Target 100
   - Accessibility: Target 100
   - Best Practices: Target 100

5. **Google Search Console**
   - Submit sitemap
   - Monitor indexing status
   - Check for errors

## Next Steps

### Recommended Enhancements

1. **Blog/Content Section**
   - Add a blog for career advice
   - Implement article schema
   - Target long-tail keywords

2. **Local SEO** (if applicable)
   - Add LocalBusiness schema
   - Include address and phone
   - Set up Google Business Profile

3. **Reviews & Testimonials**
   - Add Review schema
   - Display aggregate ratings
   - Implement rich snippets

4. **Analytics Integration**
   - Google Analytics 4
   - Google Tag Manager
   - Conversion tracking

5. **Page-Specific SEO**
   - Create unique metadata for each page
   - Add breadcrumb schema
   - Implement FAQ schema where relevant

## Image Optimization

### Required Images

Ensure these images exist and are optimized:

- `/og-image.jpg` (1200x630px) ✓
- `/logo.png` (512x512px) ✓
- `/favicon.ico` (32x32px)
- `/favicon-16x16.png`
- `/favicon-32x32.png`
- `/apple-touch-icon.png` (180x180px)

### Optimization Tips

- Use WebP format for better compression
- Compress images (TinyPNG, ImageOptim)
- Include alt text for all images
- Use responsive images with srcset

## Common Issues & Solutions

### Issue: Metadata not updating in social media

**Solution**: Clear cache using platform-specific debuggers

### Issue: Sitemap not found

**Solution**: Verify deployment and check `/sitemap.xml` URL

### Issue: Structured data errors

**Solution**: Validate with Google Rich Results Test

### Issue: Poor mobile performance

**Solution**: Optimize images, enable compression, use CDN

## Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Web.dev SEO Guide](https://web.dev/lighthouse-seo/)

## Lint Warnings Note

The `dangerouslySetInnerHTML` warnings in `layout.tsx` are expected and safe. This is the standard Next.js pattern for adding JSON-LD structured data. The content is statically generated and not user-provided, so there's no XSS risk.
