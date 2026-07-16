import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { TrustBanner } from "./components/TrustBanner"
import { ScrollStorySection } from "./components/ScrollStorySection"
import { HowItWorksSection } from "./components/HowItWorksSection"

import { EscrowDemoSection } from "./components/EscrowDemoSection"
import { BeforeAfterSection } from "./components/BeforeAfterSection"
import { TestimonialsSection } from "./components/TestimonialsSection"
import { FAQSection } from "./components/FAQSection"
import { FinalCTASection } from "./components/FinalCTASection"
import { Footer } from "./components/Footer"

export function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-background font-sans antialiased">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBanner />
        <HowItWorksSection />
        <ScrollStorySection />
        <EscrowDemoSection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
