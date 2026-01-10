import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import Slider from "@/components/slider"
import Testimonials from "@/components/testimonials"
import { fetchFaqs } from "@/lib/api"
import FaqComponent from "@/components/faq-component"

export default async function Home() {
  const faqs = await fetchFaqs();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <Slider />
        <PricingSection />
        <Testimonials />
        {/* <FaqSection faqs={faqs} /> */}
        <FaqComponent faqs={faqs} pageHeading={false}/>
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
