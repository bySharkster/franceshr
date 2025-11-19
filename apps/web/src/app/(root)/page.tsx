import dynamic from "next/dynamic";

import { HeaderWrapper } from "@/components/organisms/HeaderWrapper";
import { Hero } from "@/components/organisms/sections/hero";

// Lazy load below-the-fold components
const About = dynamic(
  () => import("@/components/organisms/sections/about").then((mod) => ({ default: mod.About })),
  {
    loading: () => <div className="min-h-[400px]" />,
  },
);

const Services = dynamic(
  () =>
    import("@/components/organisms/sections/services").then((mod) => ({ default: mod.Services })),
  {
    loading: () => <div className="min-h-[400px]" />,
  },
);

const WhyChoose = dynamic(
  () =>
    import("@/components/organisms/sections/why-choose").then((mod) => ({
      default: mod.WhyChoose,
    })),
  {
    loading: () => <div className="min-h-[400px]" />,
  },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/organisms/sections/testimonials-section").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  {
    loading: () => <div className="min-h-[400px]" />,
  },
);

const FinalCTA = dynamic(
  () =>
    import("@/components/organisms/sections/final-cta").then((mod) => ({ default: mod.FinalCTA })),
  {
    loading: () => <div className="min-h-[200px]" />,
  },
);

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      {/* Navbar */}
      <HeaderWrapper />
      {/* Main Content */}
      <div className="relative z-0 flex w-full flex-1 flex-col">
        <div
          className="bg-background absolute inset-0 -z-10 h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid) 1px, transparent 1px)",
            backgroundSize: "6rem 4rem",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,hsl(var(--primary)/0.15),transparent)]"></div>
        </div>

        {/* Hero - Critical above-the-fold content */}
        <Hero />

        {/* Main Steps - Lazy loaded */}
        <div className="flex flex-1 flex-col">
          <About />
          <Services />
          <WhyChoose />
          <TestimonialsSection />
          <FinalCTA />
        </div>
      </div>
    </div>
  );
}
