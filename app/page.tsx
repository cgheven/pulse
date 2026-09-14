import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Benefits from '@/components/benefits'
import Pricing from '@/components/pricing'
import Cta from '@/components/cta'
import Footer from '@/components/footer'
import { APP_ORIGIN, CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      email: CONTACT_EMAIL,
      logo: `${SITE_URL}/logo.png`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: SITE_NAME,
      alternateName: 'Pulse HMS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: SITE_DESCRIPTION,
      url: `${APP_ORIGIN}/`,
      image: `${SITE_URL}/opengraph-image.png`,
      provider: { '@id': `${SITE_URL}/#organization` },
      offers: [
        {
          '@type': 'Offer',
          name: 'Basic — Monthly',
          price: '6000',
          priceCurrency: 'PKR',
          url: `${SITE_URL}/#pricing`,
        },
        {
          '@type': 'Offer',
          name: 'Basic — Yearly',
          price: '60000',
          priceCurrency: 'PKR',
          url: `${SITE_URL}/#pricing`,
        },
        {
          '@type': 'Offer',
          name: 'Premium — Monthly',
          price: '10000',
          priceCurrency: 'PKR',
          url: `${SITE_URL}/#pricing`,
        },
        {
          '@type': 'Offer',
          name: 'Premium — Yearly',
          price: '100000',
          priceCurrency: 'PKR',
          url: `${SITE_URL}/#pricing`,
        },
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="min-h-screen">
        <Hero />
        <Features />
        <Benefits />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
