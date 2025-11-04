import { HeaderWrapper } from "@/components/organisms/HeaderWrapper";
import { About } from "@/components/organisms/sections/about";
// import { Contact } from "@/components/organisms/sections/contact";
// import { FAQ } from "@/components/organisms/sections/faq";
import { FinalCTA } from "@/components/organisms/sections/final-cta";
import { Hero } from "@/components/organisms/sections/hero";
// import { HowItWorks } from "@/components/organisms/sections/how-it-works";
// import { Pricing } from "@/components/organisms/sections/pricing";
import { Services } from "@/components/organisms/sections/services";
import { TestimonialsSection } from "@/components/organisms/sections/testimonials-section";
import { WhyChoose } from "@/components/organisms/sections/why-choose";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      {/* Navbar */}
      <HeaderWrapper />
      {/* Main Content */}
      <div className="relative flex w-full flex-1 flex-col">
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

        {/* Hero */}
        <Hero />

        {/* Main Steps */}
        <div className="flex flex-1 flex-col">
          <About />
          <Services />
          <WhyChoose />
          <TestimonialsSection />
          <FinalCTA />
          {/* <HowItWorks /> or <CoreValues/> */}
          {/* <FAQ /> or <Questions/> */}
          {/* <Pricing /> or <Blog/> or <News/> */}
          {/* <Contact /> */}
        </div>
      </div>
    </div>
  );
}
