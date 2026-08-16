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
      name: 'Basic — Monthly',
      price: '6000',
      priceCurrency: 'PKR',
      priceValidUntil: '2027-12-31',
      description: 'Per branch, billed monthly, plus a one-time onboarding fee',
    },
    {
      '@type': 'Offer',
      name: 'Basic — Yearly',
      price: '60000',
      priceCurrency: 'PKR',
      priceValidUntil: '2027-12-31',
      description: 'Per branch, billed annually — 2 months free, no onboarding fee',
    },
    {
      '@type': 'Offer',
      name: 'Premium — Monthly',
      price: '10000',
      priceCurrency: 'PKR',
      priceValidUntil: '2027-12-31',
      description: 'Per branch, billed monthly',
    },
    {
      '@type': 'Offer',
      name: 'Premium — Yearly',
      price: '100000',
      priceCurrency: 'PKR',
      priceValidUntil: '2027-12-31',
      description: 'Per branch, billed annually — 2 months free, no onboarding fee',
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
