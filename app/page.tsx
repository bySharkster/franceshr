
import { Hero } from "@/components/organisms/sections/hero";
import {Footer} from "@/components/organisms/sections/footer";
import {Navbar} from "@/components/organisms/sections/navbar";
import {About} from "@/components/organisms/sections/about"
import {Services} from "@/components/organisms/sections/services"
import {HowItWorks} from "@/components/organisms/sections/how-it-works"
import {Testimonials} from "@/components/organisms/sections/testimonials"
import {FAQ} from "@/components/organisms/sections/faq"
import {Contact} from "@/components/organisms/sections/contact"
import {Pricing} from "@/components/organisms/sections/pricing"

export default function Home() {
  return (  
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        {/* Navbar */}
      <Navbar/>
      {/* Main Content */}
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {/* Hero */}
          <Hero />
          {/* Main Steps */}
          <main className="flex-1 flex flex-col gap-6 px-4">
            <About/>
             <Services/> {/* or <Products/> */}
            <HowItWorks/> {/* or <CoreValues/> */}
            <Testimonials/> {/* or <Clients/> */}
            <FAQ/> {/* or <Questions/> */}
            <Pricing/> {/* or <Blog/> or <News/> */}
            <Contact/>
          </main>
        </div>
        {/* Footer */}
       <Footer/>
      </div>
    </main>
  );
}
