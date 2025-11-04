# ServiceCard Component

A reusable, beautifully designed service card component for showcasing individual services with icons, descriptions, and call-to-action buttons.

## Features

### 🎨 Design Elements

- **Gradient Icon Badge**: Primary to secondary gradient background with white icon
- **Hover Effects**: Smooth gradient overlay and shadow transitions
- **Responsive Layout**: Adapts from mobile to desktop (280px to 380px height)
- **Desktop Dimensions**: 932px width × 380px height (as specified)
- **Smooth Animations**: Scroll-triggered entrance with staggered delays
- **CTA Button**: Gradient button with arrow icon and hover effects

### 📋 Props

```typescript
interface ServiceCardProps {
  icon: LucideIcon; // Lucide icon component
  title: string; // Service title
  description: string; // Service description
  ctaText?: string; // CTA button text (default: "Reserva tu sesión")
  ctaLink?: string; // CTA button link (default: "#contact")
  index?: number; // Animation delay index (default: 0)
}
```

## Usage

### Basic Usage

```tsx
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { Briefcase } from "lucide-react";

export function MyComponent() {
  return (
    <ServiceCard
      icon={Briefcase}
      title="Resume Profesional"
      description="Haz que tu hoja de vida destaque ante los reclutadores con un diseño moderno y contenido estratégico."
      ctaText="Reserva tu sesión"
      ctaLink="#contact"
      index={0}
    />
  );
}
```

### In a Grid Layout

```tsx
const services = [
  {
    icon: Briefcase,
    title: "Resume Profesional",
    description: "...",
  },
  // ... more services
];

<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
  {services.map((service, index) => (
    <ServiceCard key={service.title} {...service} index={index} />
  ))}
</div>;
```

## Layout Specifications

### Desktop (md and up)

- **Width**: Max 932px
- **Height**: Min 380px
- **Padding**: 32px (2rem / p-8)
- **Gap**: 32px between elements

### Mobile

- **Width**: 100% (fluid)
- **Height**: Min 280px
- **Padding**: 24px (1.5rem / p-6)
- **Gap**: 24px between elements

### Card Structure

```
┌─────────────────────────────────┐
│  [Icon Badge]                   │
│                                 │
│  Title (Bold, Large)            │
│  Description (Regular)          │
│                                 │
│  [CTA Button →]                 │
└─────────────────────────────────┘
```

## Styling

### Colors

- **Icon Badge**: `from-primary to-secondary` gradient
- **Icon**: `text-background` (white on gradient)
- **Card Background**: `bg-card` with border
- **Hover Overlay**: Soft gradient from primary/secondary colors
- **CTA Button**: `from-primary to-secondary` gradient

### Shadows

- **Default**: `shadow-lg`
- **Hover**: `shadow-xl`
- **Icon Badge**: `shadow-md`

### Borders

- **Card**: `border-border/40` (subtle)
- **Radius**: `rounded-lg` (8px as specified)

## Animations

### Entrance Animation

```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 * index }}
```

### Icon Hover

```tsx
whileHover={{ scale: 1.05, rotate: 5 }}
```

### CTA Arrow

- Translates right on hover: `group-hover/btn:translate-x-1`

## Customization

### Change Icon Size

```tsx
<Icon className="h-8 w-8" /> // Larger icon
```

### Modify Gradient Colors

Update the gradient classes:

```tsx
className = "from-blue-500 to-purple-500 bg-linear-to-br";
```

### Adjust Card Height

```tsx
className = "min-h-[400px]"; // Taller card
```

### Custom CTA Styling

```tsx
<Link href={ctaLink} className="your-custom-classes">
  {ctaText}
</Link>
```

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA-compliant link elements
- Sufficient color contrast
- Hover and focus states

## Responsive Breakpoints

- **Mobile** (default): Single column, compact spacing
- **Small** (sm: 640px): Increased padding and text
- **Medium** (md: 768px): Target dimensions (380px height)
- **Large** (lg: 1024px): Grid layout support

## Dependencies

- **motion**: Framer Motion for animations
- **lucide-react**: Icon library
- **next/link**: Navigation
- **TailwindCSS**: Styling

## Performance

- Scroll-triggered animations (viewport detection)
- Optimized hover transitions
- Minimal re-renders
- CSS transforms for smooth animations
