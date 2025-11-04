# About Section Component

A beautifully designed About section for FrancesHR featuring glassmorphic cards, neuromorphic design elements, and soft pastel gradients that maintain visual consistency with the hero section.

## Features

### 🎨 Design Elements

- **Glassmorphic Mission Card**: Semi-transparent card with backdrop blur and gradient overlay on hover
- **Neuromorphic Feature Cards**: Soft shadow effects creating depth with light/dark mode support
- **Soft Pastel Gradients**: Blue, purple, and pink gradients matching the brand palette
- **Smooth Animations**: Scroll-triggered entrance animations using Framer Motion
- **Responsive Design**: Fully responsive from mobile to desktop

### 📋 Content Sections

1. **Section Header**
   - Animated icon badge with Heart icon
   - Title with gradient text "FrancesHR"
   - Descriptive paragraph about the company

2. **Mission Statement Card**
   - Large glassmorphic card
   - "Nuestra Misión" badge
   - Mission statement text
   - Hover effects with gradient overlay

3. **Features Grid**
   - Three neuromorphic cards in responsive grid
   - Icons: Briefcase, Target, TrendingUp
   - Features:
     - Redacción de Resume
     - Mentorías Personalizadas
     - Entrevistas Simuladas

## Usage

```tsx
import { About } from "@/components/organisms/sections/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      {/* Other sections */}
    </main>
  );
}
```

## Customization

### Modifying Features

Edit the `features` array in the component:

```tsx
const features = [
  {
    icon: Briefcase,
    title: "Redacción de Resume",
    description: "Currículums profesionales que destacan tus fortalezas y experiencia",
  },
  // Add more features...
];
```

### Changing Colors

The component uses CSS variables from `globals.css`:

- Primary colors: `--color-primary` (blue)
- Secondary colors: `--color-secondary` (purple)
- Gradients: Blue to purple transitions

### Animation Timing

Adjust animation delays in the motion components:

```tsx
transition={{ duration: 0.6, delay: 0.3 }}
```

## Design Principles

### Glassmorphism

- Semi-transparent backgrounds (`bg-card/60`)
- Backdrop blur effects (`backdrop-blur-md`)
- Subtle borders (`border-border/50`)
- Gradient overlays on hover

### Neuromorphism

- Soft dual shadows (light and dark)
- Subtle depth perception
- Smooth transitions
- Hover state enhancements

### Soft Pastel Gradients

- Blue: `from-blue-50` to `from-blue-100`
- Purple: `via-purple-50` to `to-purple-100`
- Pink: `to-pink-50` accents
- Dark mode variants with reduced opacity

## Responsive Breakpoints

- **Mobile** (default): Single column, compact spacing
- **Small** (sm: 640px): Increased spacing and text sizes
- **Medium** (md: 768px): 3-column grid for features
- **Large** (lg: 1024px): Maximum spacing and padding

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- ARIA-compliant motion animations with `viewport={{ once: true }}`
- Sufficient color contrast ratios
- Keyboard navigation support
- Responsive text sizing for readability

## Dependencies

- **motion**: Framer Motion for scroll-triggered animations
- **lucide-react**: Icons (Briefcase, Heart, Target, TrendingUp)
- **TailwindCSS**: Styling with custom gradient utilities

## Performance

- Scroll-triggered animations load only when in viewport
- Optimized backdrop blur rendering
- Minimal re-renders with React best practices
- CSS transforms for smooth animations
