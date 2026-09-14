import { CtaBand } from '@/components/cta-band'
import { CardGrid } from '@/components/card-grid'
import { ProductScreenshot } from '@/components/feature-showcase'
import { featureGroups } from '@/components/features'
import { PageHero } from '@/components/page-hero'
import SiteShell from '@/components/site-shell'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const productViews = [
  {
    heading: 'Resident records',
    text: 'Keep resident profiles, applications, deposits, notices and check-outs organised in one place.',
    screenshot: screenshots.residents,
  },
  {
    heading: 'Maintenance requests',
    text: 'Track resident complaints and maintenance requests from open through to resolved. The complaints screen includes QR-based submission.',
    screenshot: screenshots.complaints,
  },
]

export const metadata = pageMetadata({
  title: 'Accommodation Management Features',
  description:
    'Explore PulseHub features for property, room, resident, rent, occupancy, maintenance, utilities and multi-property management.',
  path: routes.features,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Accommodation Management Features',
  url: `${SITE_URL}${routes.features}`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
}

export default function FeaturesPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <PageHero
        heading="Everything You Need to Manage Accommodation"
        text="One connected platform for properties, rooms, residents, payments, occupancy, maintenance and reporting."
      />
      {featureGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-5 text-2xl font-bold sm:text-3xl">{group.heading}</h2>
            <CardGrid items={group.items} columns="two" />
          </div>
        </section>
      ))}
      {productViews.map((view, index) => (
        <section key={view.heading} className={`scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8 ${index % 2 === 0 ? 'bg-muted/30' : ''}`}>
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-6 max-w-3xl space-y-3 text-center sm:mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">{view.heading}</h2>
              <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">{view.text}</p>
            </div>
            <ProductScreenshot
              src={view.screenshot.src}
              alt={view.screenshot.alt}
              width={view.screenshot.width}
              height={view.screenshot.height}
              sizes="(max-width: 1152px) calc(100vw - 2rem), 1152px"
            />
          </div>
        </section>
      ))}
      <CtaBand
        heading="See how PulseHub fits your operations"
        text="Start a free trial or talk to the team about your properties, rooms and daily workflow."
      />
    </SiteShell>
  )
}
