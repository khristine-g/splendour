import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { CategoriesSection } from '@/components/landing/categories-section'
import { FeaturedVendors } from '@/components/landing/featured-vendors'
import { HowItWorks } from '@/components/landing/how-it-works'
// import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { CtaSection } from '@/components/landing/cta-section'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedVendors />
        <HowItWorks />
        {/* <TestimonialsSection /> */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
