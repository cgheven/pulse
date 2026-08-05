import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Benefits from '@/components/benefits'
import Pricing from '@/components/pricing'
import Footer from '@/components/footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pulse HMS',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Hostel management system for Pakistani hostel owners: rent and AC bill tracking, WhatsApp payment reminders, a branded mini website, and a multi-branch dashboard.',
  url: 'https://www.yourpulse.io',
  provider: {
    '@type': 'Organization',
    name: 'PulseHub',
    url: 'https://www.yourpulse.io',
    email: 'mohammad.aamir@yourpulse.io',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Monthly',
      price: '8000',
      priceCurrency: 'PKR',
      priceValidUntil: '2027-12-31',
      description: 'Per branch, billed monthly',
    },
    {
      '@type': 'Offer',
      name: 'Annual',
      price: '80000',
      priceCurrency: 'PKR',
      priceValidUntil: '2027-12-31',
      description: 'Per branch, billed annually — 2 months free',
    },
  ],
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <Footer />
    </main>
  )
}
