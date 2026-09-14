import { CtaBand } from '@/components/cta-band'
import { CardGrid } from '@/components/card-grid'
import { ProductScreenshot } from '@/components/feature-showcase'
import { featureGroups } from '@/components/features'
import { PageHero } from '@/components/page-hero'
import { DashboardImage } from '@/components/product-visual'
import { ProductVideo } from '@/components/product-video'
import SiteShell from '@/components/site-shell'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

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

const screenshotSizes = '(max-width: 1152px) calc(100vw - 2rem), 1152px'

const groupVisuals: Record<string, ReactNode> = {
  residents: (
    <div className="space-y-6 sm:space-y-10">
      <ProductScreenshot
        src={screenshots.residents.src}
        alt={screenshots.residents.alt}
        width={screenshots.residents.width}
        height={screenshots.residents.height}
        sizes={screenshotSizes}
      />
      <div id="member-timeline" className="scroll-mt-24">
        <h3 className="text-xl font-bold sm:text-2xl">Member Timeline</h3>
        <p className="mt-2 mb-4 max-w-3xl text-base leading-relaxed text-foreground/70 sm:mb-5 sm:text-lg">
          A member’s history — admissions, room changes, charges, payments, deposits and complaints. Not the rent-collection screen.
        </p>
        <ProductVideo
          src="/videos/member-ledger.mp4"
          width={2026}
          height={1080}
          ariaLabel="PulseHub member timeline showing admissions, room changes, charges, payments, deposits, complaints and other member records"
        />
        <p className="sr-only">
          A short product recording of the PulseHub member timeline. It shows a complete record of member activity, including admissions, room changes, charges, payments, deposits and complaints, looping silently without playback controls.
        </p>
      </div>
    </div>
  ),
  payments: (
    <ProductScreenshot
      src={screenshots.payments.src}
      alt={screenshots.payments.alt}
      width={screenshots.payments.width}
      height={screenshots.payments.height}
      sizes={screenshotSizes}
    />
  ),
  operations: (
    <div>
      <ProductScreenshot
        src={screenshots.complaints.src}
        alt={screenshots.complaints.alt}
        width={screenshots.complaints.width}
        height={screenshots.complaints.height}
        sizes={screenshotSizes}
      />
      <p className="mt-3 text-sm leading-relaxed text-foreground/60 sm:text-base">
        The complaints screen includes QR-based submission for resident issues.
      </p>
    </div>
  ),
  portfolio: (
    <div>
      <ProductVideo
        src="/videos/property-switcher.mp4"
        width={3024}
        height={1576}
        ariaLabel="PulseHub property switcher: changing the selected property in the dashboard header and reviewing the All Properties portfolio view"
      />
      <p className="sr-only">
        A short product recording of the PulseHub property switcher. It shows changing the selected property from the dashboard header, then opening All Properties to compare occupancy, collections, costs and profit.
      </p>
    </div>
  ),
}

export default function FeaturesPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <PageHero
        heading="Accommodation Operations in One Platform"
        text="Rooms, residents, rent, maintenance and multiple properties — for HMO, co-living, student and shared-property operators."
        visual={
          <figure className="min-w-0">
            <DashboardImage priority />
            <figcaption className="mt-2 text-sm leading-relaxed text-foreground/60 sm:mt-3 sm:text-base">
              Collections, occupancy, deposits, pending payments and expenses for the selected property.
            </figcaption>
          </figure>
        }
      />
      {featureGroups.map((group, index) => {
        const visual = groupVisuals[group.id]
        return (
          <section
            key={group.id}
            id={group.id}
            className={cn('scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10 lg:px-8', index % 2 === 1 && 'bg-muted/30')}
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-4 max-w-3xl space-y-2 sm:mb-6 sm:space-y-3">
                <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">{group.heading}</h2>
                <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">{group.subtitle}</p>
              </div>
              <CardGrid items={group.items} columns={group.columns} size="comfortable" />
              {visual ? <div className="mx-auto mt-6 max-w-6xl min-w-0 sm:mt-8">{visual}</div> : null}
            </div>
          </section>
        )
      })}
      <CtaBand
        heading="Use These Tools With Your Properties"
        text="14-day free trial, no card required — or book a walkthrough of rooms, residents, rent and daily operations."
      />
    </SiteShell>
  )
}
