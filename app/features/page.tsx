import { CtaBand } from '@/components/cta-band'
import { CardGrid } from '@/components/card-grid'
import { ProductScreenshot } from '@/components/feature-showcase'
import { featureGroups } from '@/components/features'
import { PageHero } from '@/components/page-hero'
import { DashboardImage } from '@/components/product-visual'
import { ProductVideo } from '@/components/product-video'
import { PublicWebsiteSection } from '@/components/public-website-section'
import SiteShell from '@/components/site-shell'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { SITE_URL } from '@/lib/site'
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
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Accommodation Management Features',
      url: `${SITE_URL}${routes.features}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Features', item: `${SITE_URL}${routes.features}` },
      ],
    },
  ],
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
          A member’s history: admissions, room changes, charges, payments, deposits and complaints. Not the rent-collection screen.
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
        eyebrow="The platform"
        heading="Accommodation operations in one platform"
        text="Rooms, residents, rent, maintenance and multiple properties, for HMO, student, co-living and hostel operators."
        visual={
          <figure className="min-w-0">
            <DashboardImage priority label="Portfolio overview" sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem" />
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Collections · occupancy · deposits · pending payments · expenses
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
            className={cn('scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8', index > 0 && 'border-t border-border')}
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 max-w-3xl sm:mb-8">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-tight">{group.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{group.subtitle}</p>
              </div>
              <CardGrid items={group.items} columns={group.columns} size="comfortable" />
              {visual ? <div className="mx-auto mt-8 max-w-6xl min-w-0">{visual}</div> : null}
            </div>
          </section>
        )
      })}
      <div className="border-t border-border">
        <PublicWebsiteSection
          lead="PulseHub gives each property a public page where people can browse rooms, beds, rent and amenities, then join the waitlist or message you directly. It stays in sync with your live occupancy, so what people see is always current."
          features={[
            'Live room and bed availability',
            'Rent shown in your local currency',
            'Amenities like WiFi, laundry, gym and security',
            'Packages and menu',
            'Join-waitlist enquiries in your dashboard',
            'One-tap WhatsApp or direct enquiries',
          ]}
          screenshot={screenshots.website}
        />
      </div>
      <CtaBand
        heading="Use these tools with your properties"
        text="Start a 14-day free trial with no card required, or book a walkthrough of rooms, residents, rent and daily operations."
      />
    </SiteShell>
  )
}
