import SiteShell from '@/components/site-shell'
import { CtaBand } from '@/components/cta-band'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About PulseHub | Accommodation Management Software',
  description: 'PulseHub builds practical software that helps accommodation operators manage properties, rooms, residents, payments and daily operations.',
  path: routes.about,
  absoluteTitle: true,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About PulseHub',
  url: `${SITE_URL}${routes.about}`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
}

export default function AboutPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">About PulseHub</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.06] tracking-tight">
          Practical software for better accommodation operations
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            PulseHub helps accommodation operators bring property, room, resident, payment and operational information together in one connected platform. Our goal is to reduce administrative work and make everyday accommodation management clearer and easier.
          </p>
          <p>
            Operators often start with spreadsheets, messaging threads and disconnected records. PulseHub gives teams one place to organise rooms and occupancy, keep resident information up to date, track rent and payments, record maintenance, and review how each property is performing.
          </p>
          <p>
            PulseHub is designed for HMO operators, co-living businesses, student accommodation providers and other room-based accommodation operators who need practical software rather than a generic property system.
          </p>
        </div>
      </section>
      <CtaBand
        heading="See PulseHub in your workflow"
        text="Start a free trial, or contact the team if you would like a demonstration."
      />
    </SiteShell>
  )
}
