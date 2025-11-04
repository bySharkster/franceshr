# Services Section Component

A comprehensive services showcase section featuring three main offerings with individual ServiceCard components, gradient backgrounds, and smooth animations.

## Features

### 🎨 Design Elements

- **Three Service Cards**: Resume, Mentorías, and Entrevistas
- **Individual CTAs**: Each card has its own "Reserva tu sesión" button
- **Gradient Backgrounds**: Soft blue gradient with decorative blur elements
- **Scroll Animations**: Staggered entrance animations for cards
- **Responsive Grid**: Single column on mobile, 3 columns on desktop
- **Additional CTA**: Consultation offer at the bottom

### 📋 Services Included

1. **Resume Profesional**
   - Icon: Briefcase
   - Professional resume creation with modern design
   - Strategic content highlighting

2. **Mentorías Laborales**
   - Icon: Users
   - Personalized career guidance
   - Profile strengthening and job search optimization

3. **Entrevistas Simuladas**
   - Icon: MessageSquare
   - Mock interviews with recruitment expert
   - Improve responses, body language, and confidence

## Usage

```tsx
import { Services } from "@/components/organisms/sections/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      {/* Other sections */}
    </main>
  );
}
```

## Structure

```
Services Section
├── Section Header
│   ├── Icon Badge (Briefcase)
│   ├── Title: "Nuestros Servicios"
│   └── Description
├── Services Grid (3 columns)
│   ├── ServiceCard: Resume Profesional
│   ├── ServiceCard: Mentorías Laborales
│   └── ServiceCard: Entrevistas Simuladas
└── Additional CTA
    └── Free consultation offer
```

## Customization

### Modify Services

Edit the `services` array:

```tsx
const services = [
  {
    icon: Briefcase,
    title: "Resume Profesional",
    description: "...",
    ctaText: "Reserva tu sesión",
    ctaLink: "#contact",
  },
  // Add or modify services
];
```

### Change Grid Layout

```tsx
// 2 columns on large screens
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

// 4 columns on extra large screens
<div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
```

### Update Section Colors

```tsx
// Change gradient background
<div className="bg-linear-to-b from-transparent via-purple-50/30 to-transparent" />

// Change blur colors
<div className="bg-purple-200/20 blur-3xl" />
```

### Customize CTA Links

Update the `ctaLink` property to point to different destinations:

```tsx
{
  ctaLink: "/booking/resume",  // Specific booking page
  ctaLink: "https://calendly.com/...",  // External calendar
  ctaLink: "#pricing",  // Pricing section
}
```

## Layout Specifications

### Desktop (lg: 1024px+)

- **Grid**: 3 columns
- **Gap**: 32px (2rem)
- **Max Width**: 1280px (max-w-7xl)
- **Card Width**: ~932px max per card

### Tablet (md: 768px)

- **Grid**: Single column
- **Gap**: 24px
- **Cards**: Full width

### Mobile (default)

- **Grid**: Single column
- **Gap**: 24px
- **Padding**: 16px sides

## Styling

### Section Background

- Subtle blue gradient overlay
- Decorative blur elements (blue and indigo)
- Transparent base for layering

### Section Header

- Icon badge with gradient background
- Large heading with gradient text
- Descriptive subheading

### Services Grid

- Responsive grid layout
- Consistent gap spacing
- Equal height cards

## Animations

### Section Header

```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Service Cards

- Staggered delays: 0.1s increments
- Scroll-triggered entrance
- Individual hover effects

### Additional CTA

```tsx
transition={{ duration: 0.6, delay: 0.4 }}
```

## Accessibility

- Semantic HTML structure with `<section>`
- Proper heading hierarchy (h2 for section title)
- Keyboard-navigable CTAs
- ARIA-compliant animations
- Sufficient color contrast
- Responsive text sizing

## Responsive Breakpoints

- **Mobile** (default): Stacked cards, compact spacing
- **Small** (sm: 640px): Increased spacing
- **Medium** (md: 768px): Larger text, more padding
- **Large** (lg: 1024px): 3-column grid layout

## Integration with ServiceCard

The Services section uses the `ServiceCard` component for each service. See `ServiceCard.README.md` for detailed card customization options.

### ServiceCard Props

```tsx
<ServiceCard
  icon={LucideIcon}
  title="Service Title"
  description="Service description"
  ctaText="Button text"
  ctaLink="#link"
  index={0}
/>
```

## Dependencies

- **motion**: Framer Motion for animations
- **lucide-react**: Icons (Briefcase, MessageSquare, Users)
- **ServiceCard**: Custom card component
- **TailwindCSS**: Styling

## Performance

- Scroll-triggered animations (viewport detection)
- Optimized gradient rendering
- Minimal re-renders
- CSS transforms for smooth animations
- Lazy loading of card animations

## Best Practices

1. **Keep descriptions concise**: 1-2 sentences per service
2. **Use consistent CTAs**: Same text for similar actions
3. **Maintain visual hierarchy**: Icon → Title → Description → CTA
4. **Test responsiveness**: Verify layout on all screen sizes
5. **Optimize images**: If adding service images in the future
