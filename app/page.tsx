import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Benefits from '@/components/benefits'
import Pricing from '@/components/pricing'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <Footer />
    </main>
  )
}
