import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import { CtaBand } from '@/components/cta-band'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Simple, Transparent Pricing',
  description: 'GBP pricing for PulseHub accommodation management software. Choose a plan that matches your property portfolio.',
  path: routes.pricing,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Simple, Transparent Pricing',
  url: `${SITE_URL}${routes.pricing}`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
}

export default function PricingPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <div className="px-4 pb-0 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        <h1 className="text-[clamp(1.5rem,6vw,3.25rem)] font-bold leading-[1.18]">Pricing That Scales With Your Portfolio</h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/70 sm:mt-4 sm:text-lg">
          14-day free trial, no card. Annual billing saves 2 months.
        </p>
      </div>
      <PricingGrid
        subtitle="Every plan includes the PulseHub platform. Choose 1, 3 or 10 properties."
      />
      <CtaBand
        heading="Not sure which plan fits?"
        text="Start a free trial, or contact the team to talk through your number of properties, rooms and operators."
      />
    </SiteShell>
  )
}
