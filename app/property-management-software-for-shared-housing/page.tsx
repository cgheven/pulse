import type { ReactNode } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { DemoSection } from '@/components/demo-section'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const PATH = routes.sharedHousing

export const metadata = pageMetadata({
  title: 'Property Management Software for Shared & Co-Living Housing',
  description:
    'Property management software built for shared and co-living housing: rent by the room and bed, split monthly payments, electricity and deposits, across every property.',
  path: PATH,
})

const capabilities = [
  'Rooms and beds, not whole units',
  'One monthly bill per resident',
  'Partial payments tracked as installments',
  'Electricity and shared bills, split fairly',
  'Deposits held and settled at move-out',
  'Occupancy kept true automatically',
  'Every property in one portfolio view',
  'Applications, waiting list and check-out',
  'A public website per property, with live availability',
]

const faqs = [
  {
    question: 'What is property management software for shared housing?',
    answer:
      'It is software that runs a shared-living property where people rent a room or a bed rather than a whole flat. It handles admissions, room and bed occupancy, a monthly bill per resident for rent and shared costs, partial payments, deposits and reporting, across one property or a whole portfolio.',
  },
  {
    question: 'How is it different from a hotel PMS or a real-estate property management system?',
    answer:
      'A hotel PMS is built around nightly stays, a front desk and channel distribution. A real-estate property management system is built around whole-unit leases, one tenant and one rent. Shared housing sits between the two: many people under one roof, each renting a bed, each paying monthly and often in parts. PulseHub is built for that model, down to the bed.',
  },
  {
    question: 'Does it work for co-living, student housing, hostels and HMOs?',
    answer:
      'Yes. The same system runs co-living spaces, student accommodation, hostels, shared houses, HMOs and PGs. The words on screen and the local rails adjust to your market, but the core, renting beds and billing residents monthly, is the same everywhere.',
  },
  {
    question: 'Can it bill electricity and other shared costs, not just rent?',
    answer:
      'Yes. Alongside rent you can add a metered electricity charge, split between residents by their move-in dates, and recurring charges such as water, gas and broadband, so each resident gets one bill covering their whole share.',
  },
  {
    question: 'Does it handle more than one property?',
    answer:
      'Yes. Switch between properties on one login, move a resident or a room between properties, and see every property together in a portfolio view with occupancy, collection and costs side by side.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. You can start a 14-day free trial with no card required, then book a demonstration if you would like a walkthrough for your type of accommodation.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Property Management Software for Shared and Co-Living Housing',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}${PATH}#software`,
      name: SITE_NAME,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${SITE_URL}${PATH}`,
      description:
        'Property management software for shared and co-living housing: rooms and beds, a monthly bill per resident, electricity and deposits, across every property.',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Property management software for shared housing', item: `${SITE_URL}${PATH}` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
      {children}
    </h2>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</p>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
    >
      {children}
    </Link>
  )
}

type Shot = { src: string; width: number; height: number; alt: string }

function BigShot({ shot, label }: { shot: Shot; label: string }) {
  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <ProductScreenshot
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        label={label}
        sizes="(max-width: 1151px) calc(100vw - 2rem), 1152px"
      />
    </div>
  )
}

function DocCard({ shot, alt, caption }: { shot: Shot; alt: string; caption: string }) {
  return (
    <figure className="mx-auto w-full max-w-[20rem]">
      <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
        <ProductScreenshot
          src={shot.src}
          alt={alt}
          width={shot.width}
          height={shot.height}
          frame={false}
          sizes="(max-width: 640px) calc(100vw - 3.5rem), 20rem"
          className="rounded-lg"
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}

export default function SharedHousingPmsPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Property management system"
        heading="Property Management Software for Shared and Co-Living Housing"
        text="A property management system for operators who rent by the room and the bed, where the rent arrives monthly and often in pieces. Admissions, billing, electricity, deposits and occupancy for every resident, across every property, in one place."
        supporting="For co-living, student accommodation, hostels, shared houses, HMOs and PGs."
        visual={
          <ProductScreenshot
            src={screenshots.properties.src}
            alt="PulseHub portfolio view comparing occupancy, rent collected, costs and net profit across several shared-housing properties"
            width={screenshots.properties.width}
            height={screenshots.properties.height}
            priority
            label="All properties · occupancy, rent & costs"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem"
          />
        }
        split
        secondaryCta="watch"
      />

      <DemoSection subtitle="See how PulseHub runs rooms, residents, rent and shared bills across a shared-housing portfolio." />

      {/* Rooms and beds, not units */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Built for the model</p>
          <H2>Rooms and beds, not whole units</H2>
          <Lead>
            Most property management software assumes one tenant signs for one whole unit and pays one rent. Shared
            housing does not work like that. A four-bed room with three residents is three-quarters full, each resident
            has their own agreement, and the money comes in monthly, often in parts. PulseHub models your property as
            floors, rooms and beds, keeps occupancy true so a room can never be over-filled, and prices each room from
            the rate you set per bed.
          </Lead>
        </div>
        <BigShot
          shot={screenshots.dashboard}
          label="Dashboard · occupancy, rent, costs & electricity"
        />
      </section>

      {/* One bill per resident */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Billing</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              One bill per resident, even when rent arrives in pieces
            </h2>
            <Lead>
              Each resident gets one monthly bill that gathers their rent and any shared costs, electricity, meals,
              recurring charges, into a single balance. A part-payment is recorded as an installment with its own date
              and receipt, the real balance carries forward with no double-counting, and a numbered receipt is issued
              when it is paid.
            </Lead>
          </div>
          <DocCard
            shot={screenshots.invoice}
            alt="A PulseHub resident invoice showing monthly rent and a metered electricity charge with the total amount due"
            caption="Rent and shared costs on one bill"
          />
        </div>
      </section>

      {/* Electricity and shared bills */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Shared costs</p>
          <H2>Electricity and shared bills, split fairly</H2>
          <Lead>
            When a bill covers a whole room or property, a flat split is unfair to whoever was barely there. PulseHub
            meters electricity, prices the usage at the tariff you set, and splits it between residents by their
            move-in dates, so the charge follows who was actually in the room and when. Water, gas and broadband can
            ride along as recurring charges on the same bill.
          </Lead>
        </div>
        <BigShot
          shot={screenshots.payments}
          label="Payments · each resident's rent & metered electricity"
        />
      </section>

      {/* Portfolio */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">One portfolio</p>
          <H2>Every room, every property, one view</H2>
          <Lead>
            Run one house or twenty. Switch between properties on a single login, move a resident or a room from one
            property to another with their deposit and electricity meter following along, and see every property
            together: occupancy, collection, outstanding dues, costs and profit, side by side. Managers can be given
            access to just their own property.
          </Lead>
        </div>
      </section>

      {/* Fill rooms + resident channels */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Fill rooms</p>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-medium leading-tight tracking-tight">
              A website per property, with live availability
            </h2>
            <Lead>
              Every property gets a public page showing its rooms, photos, prices and real-time availability, with a
              built-in application form and a waiting list. The page carries structured data, so search engines and AI
              assistants can read and answer from it, which helps your own rooms get found.
            </Lead>
          </div>
          <DocCard
            shot={screenshots.website}
            alt="A public PulseHub property website showing rooms with photos, monthly prices, available beds, amenities and a join-waitlist button"
            caption="A public listing with live availability"
          />
        </div>
      </section>

      {/* Resident channels */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <DocCard
            shot={screenshots.complaints}
            alt="The PulseHub complaints screen showing resident maintenance requests with their status and history"
            caption="Complaints and maintenance, tracked"
          />
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Residents, without an app</p>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-medium leading-tight tracking-tight">
              Admissions, complaints and reminders in one place
            </h2>
            <Lead>
              Residents apply through the property page or walk in, and each becomes one record with their documents,
              deposit and ledger. They raise complaints by scanning a code on the wall, leave private feedback through a
              one-time link, and get payment reminders automatically, all without needing an account or an app.
            </Lead>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Everything a shared-housing operator needs</H2>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-base text-foreground/85">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <PricingGrid
        heading="Plans and pricing"
        subtitle="Property-based plans that grow with your portfolio. Every feature on this page is included on every plan. 14-day free trial, no card required."
        geoAware
      />

      {/* Related */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            New to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A> and the
            three kinds you will come across. For your type of accommodation, see{' '}
            <A href={routes.hmo}>HMO management software</A>,{' '}
            <A href={routes.student}>student accommodation software</A>, or{' '}
            <A href={routes.coliving}>co-living management software</A>.
          </p>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
            Frequently asked questions
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        heading="Run your shared housing on one system."
        text="Rooms and beds, a monthly bill per resident, shared bills and every property in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.coliving}
        secondaryLabel="Co-living management software"
      />
    </SiteShell>
  )
}
