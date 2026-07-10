import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { TrustBanner } from "./components/TrustBanner"
import { ScrollStorySection } from "./components/ScrollStorySection"
import { HowItWorksSection } from "./components/HowItWorksSection"
import { WhyTrustLayerSection } from "./components/WhyTrustLayerSection"
import { EscrowDemoSection } from "./components/EscrowDemoSection"
import { InActionSection } from "./components/InActionSection"
import { BeforeAfterSection } from "./components/BeforeAfterSection"
import { TrustFeaturesSection } from "./components/TrustFeaturesSection"
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
        <ScrollStorySection />
        <HowItWorksSection />
        <WhyTrustLayerSection />
        <EscrowDemoSection />
        <InActionSection />
        <BeforeAfterSection />
        <TrustFeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
