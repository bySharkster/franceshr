# Hero Section Component

A stunning, modern hero section designed for the HR Services Company website. This component features smooth animations, gradient backgrounds, service highlights, and clear call-to-action buttons.

## Features

### 🎨 Visual Design

- **Gradient Backgrounds**: Beautiful blue-to-purple gradient with decorative blur elements
- **Smooth Animations**: Motion-powered entrance animations with staggered delays
- **Dark Mode Support**: Fully responsive dark mode styling
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes

### 📋 Content Sections

1. **Trust Badge**: Displays social proof ("Trusted by 1000+ Professionals")
2. **Headline**: Eye-catching gradient text highlighting the value proposition
3. **Subheadline**: Clear description of services offered
4. **Service Icons**: Three key services with icons:
   - Resume Creation
   - Career Mentorship
   - Mock Interviews
5. **CTA Buttons**: Two prominent call-to-action buttons:
   - Primary: "Get Started Today" (gradient button)
   - Secondary: "View Services" (outlined button)
6. **Social Proof**: Avatar stack showing community engagement
7. **Stats Section**: Three key metrics:
   - 95% Success Rate
   - 1000+ Clients Served
   - 4.9/5 Client Rating

## Usage

```tsx
import { Hero } from "@/components/organisms/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Other sections */}
    </main>
  );
}
```

## Storybook

View the component in Storybook to see different states and variations:

```bash
npm run storybook
```

Navigate to **Sections > Hero** to see:

- Default state
- Dark mode
- Mobile viewport
- Tablet viewport

## Customization

### Modifying Services

Edit the `services` array in the component:

```tsx
const services = [
  { icon: FileText, text: "Resume Creation" },
  { icon: Users, text: "Career Mentorship" },
  { icon: MessageSquare, text: "Mock Interviews" },
];
```

### Updating Stats

Modify the stats array in the component:

```tsx
{[
  { number: "95%", label: "Success Rate" },
  { number: "1000+", label: "Clients Served" },
  { number: "4.9/5", label: "Client Rating" },
].map((stat) => (
  // ...
))}
```

### Changing CTA Links

Update the `href` attributes in the Link components:

```tsx
<Link href="#contact">Get Started Today</Link>
<Link href="#services">View Services</Link>
```

## Dependencies

- **motion**: For smooth entrance animations
- **lucide-react**: For icons (ArrowRight, CheckCircle2, FileText, MessageSquare, Users)
- **next/link**: For navigation
- **TailwindCSS**: For styling

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- Keyboard navigation support for all interactive elements
- ARIA-compliant link elements
- Sufficient color contrast ratios
- Responsive text sizing

## Performance

- Client-side component with optimized animations
- Lazy-loaded motion library
- Optimized gradient rendering
- Minimal re-renders with React best practices
