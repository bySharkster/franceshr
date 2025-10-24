import { HeaderWrapper } from "@/components/organisms/HeaderWrapper";
import { About } from "@/components/organisms/sections/about";
// import { Contact } from "@/components/organisms/sections/contact";
// import { FAQ } from "@/components/organisms/sections/faq";
import { FinalCTA } from "@/components/organisms/sections/final-cta";
import { Footer } from "@/components/organisms/sections/footer";
import { Hero } from "@/components/organisms/sections/hero";
// import { HowItWorks } from "@/components/organisms/sections/how-it-works";
// import { Pricing } from "@/components/organisms/sections/pricing";
import { Services } from "@/components/organisms/sections/services";
import { TestimonialsSection } from "@/components/organisms/sections/testimonials-section";
import { WhyChoose } from "@/components/organisms/sections/why-choose";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full flex-1 flex-col items-center pb-20">
        {/* Navbar */}
        <HeaderWrapper />
        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Hero */}
          <Hero />

          {/* Main Steps */}
          <main className="flex flex-1 flex-col">
            <About />
            <Services />
            <WhyChoose />
            <TestimonialsSection />
            <FinalCTA />
            {/* <HowItWorks /> or <CoreValues/> */}
            {/* <FAQ /> or <Questions/> */}
            {/* <Pricing /> or <Blog/> or <News/> */}
            {/* <Contact /> */}
          </main>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
