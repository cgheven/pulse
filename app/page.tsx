import Cta from '@/components/cta'
import Hero from '@/components/hero'
import HomeFaq, { homeFaqs } from '@/components/home-faq'
import MemberLedgerShowcase from '@/components/member-ledger-showcase'
import Portfolio from '@/components/portfolio'
import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import UseCases from '@/components/use-cases'
import { getRegion, regionPlans } from '@/lib/pricing'
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
      offers: regionPlans(getRegion('gb')).flatMap((plan) => [
        {
          '@type': 'Offer',
          name: `${plan.name} Monthly`,
          price: String(plan.monthly),
          priceCurrency: 'GBP',
          url: `${SITE_URL}/pricing`,
        },
        {
          '@type': 'Offer',
          name: `${plan.name} Annual`,
          price: String(plan.annual),
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
      <UseCases />
      <MemberLedgerShowcase />
      <Portfolio />
      <PricingGrid
        heading="Pricing that grows with your portfolio"
        subtitle="Plans by property allowance: 1, 3 or 10 properties. 14-day free trial, no card. Annual billing saves 2 months."
      />
      <HomeFaq />
      <Cta />
    </SiteShell>
  )
}
