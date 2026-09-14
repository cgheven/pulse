import Audience from '@/components/audience'
import Benefits from '@/components/benefits'
import Cta from '@/components/cta'
import Features from '@/components/features'
import Hero from '@/components/hero'
import HeroBenefits from '@/components/hero-benefits'
import HomeFaq, { homeFaqs } from '@/components/home-faq'
import Portfolio from '@/components/portfolio'
import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import Workflow from '@/components/workflow'
import { pricingPlans } from '@/lib/pricing'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { APP_ORIGIN, CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
})

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
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: SITE_DESCRIPTION,
      url: `${APP_ORIGIN}/`,
      image: `${SITE_URL}/opengraph-image.png`,
      provider: { '@id': `${SITE_URL}/#organization` },
      offers: pricingPlans.flatMap((plan) => [
        {
          '@type': 'Offer',
          name: `${plan.name} — Monthly`,
          price: String(plan.monthly),
          priceCurrency: 'GBP',
          url: `${SITE_URL}/pricing`,
        },
        {
          '@type': 'Offer',
          name: `${plan.name} — Annual`,
          price: String(plan.yearly),
          priceCurrency: 'GBP',
          url: `${SITE_URL}/pricing`,
        },
      ]),
    },
    {
      '@type': 'FAQPage',
      mainEntity: homeFaqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
}

export default function Page() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <Hero />
      <HeroBenefits />
      <Audience />
      <Features />
      <Benefits />
      <Workflow />
      <Portfolio />
      <PricingGrid
        heading="Pricing That Scales With Your Property Portfolio"
        subtitle="GBP pricing with a clear property allowance on each plan. Pay annually and get 2 months free."
      />
      <HomeFaq />
      <Cta />
    </SiteShell>
  )
}
