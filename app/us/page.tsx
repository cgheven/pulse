import type { ReactNode } from 'react'
import Link from 'next/link'
import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { CtaBand } from '@/components/cta-band'
import { DemoSection } from '@/components/demo-section'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import { routes } from '@/lib/navigation'
import { usScreenshots as screenshots } from '@/lib/screenshots'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

const PATH = routes.us

export const metadata = pageMetadata({
  title: 'Co-Living & Rooming House Management Software (USA)',
  languages: marketHreflang,
  description:
    'Property management software for US co-living, rooming houses and shared housing: rent by the room and bed, billed per resident in USD, across every property.',
  path: PATH,
})

const useCases = [
  { icon: Building2, title: 'Co-living operators', description: 'Shared homes and co-living with private rooms, common areas and all-in monthly rent.', href: routes.coliving },
  { icon: Home, title: 'Rooming houses & SROs', description: 'Rent by the room, bill each resident, and keep occupancy accurate down to the bed.', href: routes.sharedHousing },
  { icon: GraduationCap, title: 'Student & off-campus', description: 'Off-campus houses and student rooms managed through the whole leasing cycle.', href: routes.student },
  { icon: BedDouble, title: 'Boarding & shared houses', description: 'Boarding houses and shared houses with per-room rent, deposits and utilities.', href: routes.sharedHousing },
]

const billingSteps = [
  {
    number: '01',
    title: 'Generate invoices',
    description: 'Create a monthly invoice per resident with rent and metered utilities on one clear breakdown, and share it by email or a link.',
    shot: screenshots.invoice,
  },
  {
    number: '02',
    title: 'Record payments and issue receipts',
    description: 'Record full or partial payments as they come in and issue a numbered receipt for each one.',
    shot: screenshots.receipt,
  },
  {
    number: '03',
    title: 'Handle move-outs',
    description: 'Settle the final utility charge and any outstanding dues against the deposit, and see exactly what to collect or refund.',
    shot: screenshots.checkout,
  },
]

const faqs = [
  {
    question: 'What kinds of US accommodation does PulseHub support?',
    answer:
      'Operations that rent by the room or the bed rather than by the whole unit: co-living, rooming houses, SROs, shared houses, boarding houses and off-campus student housing. It manages each property at the room and bed level, with a separate record and bill for every resident.',
  },
  {
    question: 'How is it different from AppFolio or Buildium?',
    answer:
      'Tools like AppFolio, Buildium and Yardi are built around whole-unit leases: one tenant, one lease, one rent. PulseHub is built for the opposite, several residents under one roof, each renting a room or a bed, each on their own agreement and bill. If you rent by the room, a whole-unit system fights you every month.',
  },
  {
    question: 'Is pricing shown in US dollars?',
    answer:
      'Yes. US plans are billed in USD, by property allowance, with a 14-day free trial and no card required. Every plan includes the full PulseHub platform.',
  },
  {
    question: 'Can I manage more than one property?',
    answer:
      'Yes. Run every property from one account, switch between them, move a resident or a room between properties, and use the All Properties view to compare occupancy, collections and outstanding balances side by side.',
  },
  {
    question: 'Can it bill utilities, not just rent?',
    answer:
      'Yes. Alongside rent you can meter electricity and split it between residents by their move-in dates, and add recurring charges such as water, gas and internet, so each resident gets one bill covering their whole share.',
  },
  {
    question: 'Does PulseHub do RUBS (ratio utility billing)?',
    answer:
      'PulseHub bills actual metered electricity per room and allocates it to the residents who lived there, split by their move-in dates, rather than estimating shares of a master bill by a ratio the way a RUBS (Ratio Utility Billing System) does. Metered allocation is more transparent and easier to defend than a RUBS estimate. For flat utilities such as water or internet, you can add a recurring charge per resident.',
  },
  {
    question: 'Does each property get a public listing page?',
    answer:
      'Yes. Every property gets a free public page showing available rooms, beds, rent and amenities, with a waitlist and enquiry form. It stays in sync with live occupancy, so the listing is always current.',
  },
  {
    question: 'Can I try PulseHub before subscribing?',
    answer: 'Yes. You can start a 14-day free trial with no card required, or book a demo first.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Co-Living & Rooming House Management Software for the US',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'United States', item: `${SITE_URL}${PATH}` },
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

export default function UsPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Co-living & shared housing · USA"
        heading="Co-Living and Rooming House Management Software for the US"
        text="PulseHub is property management software for US operators who rent by the room and the bed: co-living, rooming houses, student housing and shared homes. Manage residents, rent, deposits, utilities and every property from one platform, billed in US dollars."
        visual={
          <ProductScreenshot
            src={screenshots.dashboard.src}
            alt={screenshots.dashboard.alt}
            width={screenshots.dashboard.width}
            height={screenshots.dashboard.height}
            priority
            label="Dashboard · occupancy, rent & profit"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem"
          />
        }
        split
        secondaryCta="watch"
      />

      <DemoSection subtitle="See how PulseHub brings properties, residents, rent, payments and operations together in one platform." />

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            heading="Built for renting by the room, not the unit"
            subtitle="One platform, shaped around the kind of shared housing you run."
          />
          <CardGrid items={useCases} columns="four" />
        </div>
      </section>

      {/* Room & bed level */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Residents & records</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Run every property at the room and bed level
            </h2>
            <Lead>
              Organize each property into rooms and beds, keep one record for every resident with their documents,
              deposit and full history, and track rent, part-payments and overdue balances without rebuilding a
              spreadsheet each month. Occupancy stays accurate, so a room is never double-booked.
            </Lead>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              For the whole category, see{' '}
              <A href={routes.sharedHousing}>property management software for shared housing</A>, or read{' '}
              <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
            </p>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={screenshots.tenants.src}
              alt={screenshots.tenants.alt}
              width={screenshots.tenants.width}
              height={screenshots.tenants.height}
              label="Residents · active, waiting list & deposits"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      {/* Rent, utilities and arrears */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Per-resident utility billing</p>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
            Rent and utilities on one bill, allocated per resident
          </h2>
          <Lead>
            Each resident gets one monthly bill covering their rent and their share of utilities, with part-payments
            tracked as installments and a true running balance so arrears never build up unnoticed. Instead of a flat
            split or a RUBS-style estimate, PulseHub meters each room and allocates the actual usage to the residents
            who lived there, by their move-in dates. Water, internet and other recurring charges can ride on the same
            bill.
          </Lead>
        </div>
        <div className="mx-auto mt-8 max-w-6xl">
          <ProductScreenshot
            src={screenshots.payments.src}
            alt={screenshots.payments.alt}
            width={screenshots.payments.width}
            height={screenshots.payments.height}
            label="Payments · each resident's rent & metered electricity"
            sizes="(max-width: 1151px) calc(100vw - 2rem), 1152px"
          />
        </div>
      </section>

      {/* Billing lifecycle */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            heading="From monthly billing to final move-out"
            subtitle="Invoices, payments, receipts and deposit settlements for every resident, in one place."
          />
          <ol className="mt-10 grid gap-8 sm:gap-6 lg:grid-cols-3">
            {billingSteps.map((step) => (
              <li key={step.number} className="flex flex-col">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{step.number}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{step.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{step.description}</p>
                <div className="mt-5 rounded-xl border border-border bg-card p-3 shadow-sm">
                  <div className="mx-auto w-full max-w-[17rem] max-h-[26rem] overflow-hidden rounded-lg">
                    <ProductScreenshot
                      src={step.shot.src}
                      alt={step.shot.alt}
                      width={step.shot.width}
                      height={step.shot.height}
                      frame={false}
                      sizes="(max-width: 640px) calc(100vw - 3.5rem), (max-width: 1024px) calc(50vw - 3.5rem), 17rem"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Central ledger / payment methods */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">One central ledger</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Record any payment method against one ledger
            </h2>
            <Lead>
              However a resident pays, Zelle, Venmo, Cash App, a check, cash or a bank transfer, record it against
              their ledger with the method, date and a receipt. Each resident keeps a running balance across rent,
              utilities, part-payments, arrears and their deposit, so you always know who owes what, with no separate
              bookkeeping.
            </Lead>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              You decide how residents pay you; PulseHub keeps every payment, balance and deposit straight in one
              place.
            </p>
          </div>
          <figure className="mx-auto w-full max-w-[20rem]">
            <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
              <div className="max-h-[26rem] overflow-hidden rounded-lg [mask-image:linear-gradient(to_bottom,#000_82%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_82%,transparent)]">
                <ProductScreenshot
                  src={screenshots.memberLedger.src}
                  alt={screenshots.memberLedger.alt}
                  width={screenshots.memberLedger.width}
                  height={screenshots.memberLedger.height}
                  frame={false}
                  sizes="(max-width: 640px) calc(100vw - 3.5rem), 20rem"
                  className="rounded-lg"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              A resident ledger · rent, utilities &amp; deposit
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Multi-property */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <ProductScreenshot
              src={screenshots.allProperties.src}
              alt={screenshots.allProperties.alt}
              width={screenshots.allProperties.width}
              height={screenshots.allProperties.height}
              label="All properties · occupancy, collections & profit"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Whole portfolio</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Manage your whole US portfolio from one account
            </h2>
            <Lead>
              Run one property or many. Switch between them from the dashboard, or open All Properties to compare
              occupancy, collections, outstanding dues, costs and net profit side by side. Give managers access to
              only the properties they run.
            </Lead>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              New to running shared housing on software? Learn how to{' '}
              <A href="/blog/hmo-rent-tracking">track rent, payments and arrears</A> and how to{' '}
              <A href="/blog/manage-multiple-hmo-properties-without-spreadsheets">
                manage multiple properties without spreadsheets
              </A>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Resident channels */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Residents, without an app</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Complaints, maintenance and reminders in one place
            </h2>
            <Lead>
              Residents raise maintenance requests and complaints by scanning a code, with no account or app to
              install, and you track each one to resolution with a full history against the room. Payment reminders
              go out automatically, and residents can leave private feedback through a one-time link.
            </Lead>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={screenshots.complaints.src}
              alt={screenshots.complaints.alt}
              width={screenshots.complaints.width}
              height={screenshots.complaints.height}
              label="Complaints · status and history"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      <PricingGrid
        heading="United States pricing"
        subtitle="Billed in USD. Every plan includes the full PulseHub platform, for 1, 3 or 10 properties. 14-day free trial, no card required."
        initialRegionCode="default"
        showSelector={false}
        unitLabel={{ singular: 'property', plural: 'properties' }}
      />

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
            Frequently asked questions
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        heading="Run your US shared housing from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your rooms and residents in mind."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Property management for shared housing"
      />
    </SiteShell>
  )
}
