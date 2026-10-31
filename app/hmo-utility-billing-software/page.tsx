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

const PATH = routes.hmoBilling

export const metadata = pageMetadata({
  title: 'HMO Utility Billing & Bill-Splitting Software',
  description:
    'HMO utility billing software that meters each room, prices usage at your own tariff, splits it between residents, and puts it on one bill with the rent.',
  path: PATH,
})

const steps = [
  {
    number: '01',
    title: 'Record a meter reading',
    description: 'Enter the reading for a room or property, with a photo of the meter kept as evidence. Opening readings are captured at move-in.',
  },
  {
    number: '02',
    title: 'Price it at your own tariff',
    description: 'The usage is priced against the tariff you set, so the charge is the units used at the rate you actually pay your supplier.',
  },
  {
    number: '03',
    title: 'Split it by the people in the room',
    description: 'The charge is split between residents by their move-in dates, not a flat share, and lands on the same monthly bill as their rent.',
  },
]

const capabilities = [
  'Metered electricity, billed in kWh',
  'Split by resident move-in dates, not flat share',
  'Rent and utilities on one monthly bill',
  'Priced at your own tariff',
  'Meter photos kept as evidence',
  'Corrections re-price in place',
  'Recurring water, gas and broadband charges',
  'Final reading settled at move-out',
  'Across one property or a whole portfolio',
]

const faqs = [
  {
    question: 'How does PulseHub split utility bills between tenants?',
    answer:
      'You record a meter reading, it is priced against the tariff you set, and the charge is split between residents by their move-in dates. Each resident pays for the share of the period they were actually there, rather than a flat split, and it shows on the same monthly bill as their rent.',
  },
  {
    question: 'Can I pass on exactly what I pay for energy?',
    answer:
      'Yes. Set your tariff to the rate your supplier charges you, and PulseHub bills the units used at that rate. Under Ofgem’s resale rules you can recover your cost but not make a profit on resold energy, so charging at your own rate keeps you within them. This is general information, not legal advice; see our guide to fair-usage billing for the detail.',
  },
  {
    question: 'Do I need a sub-meter for every room?',
    answer:
      'No. You record a meter reading, PulseHub splits the usage between the residents by their move-in dates, and a photo of the reading is kept as evidence. Where you have per-room sub-meters fitted, you can bill each room for its own usage.',
  },
  {
    question: 'Can it bill water, gas and broadband too?',
    answer:
      'Yes. Alongside metered electricity, you can add recurring charges such as water, gas and broadband, so a resident’s whole set of charges sits on one bill.',
  },
  {
    question: 'What happens to the utility charge when a resident moves out?',
    answer:
      'At check-out, the final reading is charged and settled against the deposit, so the refund or balance reflects their actual usage. A new resident’s share starts from their move-in date.',
  },
  {
    question: 'Is a free trial available?',
    answer:
      'Yes. You can start a 14-day free trial with no card required, then book a demonstration if you would like a walkthrough focused on utility billing.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'HMO Utility Billing and Bill-Splitting Software',
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
        'HMO utility billing and bill-splitting software: meter each room, price usage at your tariff, split it between residents by their dates, and bill it alongside rent.',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'HMO utility billing software', item: `${SITE_URL}${PATH}` },
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

export default function HmoUtilityBillingPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="HMO utility billing"
        heading="HMO Utility Billing and Bill-Splitting Software"
        text="Record a meter reading and PulseHub prices it against your tariff, splits it between residents by their move-in dates, and puts it on the same monthly bill as the rent. Everyone pays for their actual share."
        supporting="For landlords and operators running one HMO or a whole portfolio."
        visual={
          <ProductScreenshot
            src={screenshots.properties.src}
            alt="PulseHub multi-property dashboard showing occupancy, rent collected, costs and net profit across a portfolio of HMOs in pounds"
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

      <DemoSection subtitle="See how PulseHub meters usage, splits it between residents, and bills it alongside rent." />

      {/* How bill splitting works */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>How bill splitting works</H2>
          <Lead>Three steps turn a meter reading into a fair charge on every resident’s bill.</Lead>
          <ol className="mt-10 grid gap-8 sm:gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-mono text-sm text-primary">{step.number}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Meter each room, split by the people in it */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Metered, not flat-share</p>
          <H2>Charge each resident for their actual share</H2>
          <Lead>
            A flat split is easy and unfair: the person away all month pays the same as the one running the heating
            around the clock. PulseHub splits metered usage between residents by their move-in dates, so the charge
            follows who was actually in the room and when. Usage is billed in kWh at the tariff you set, and a
            correction re-prices in place rather than forcing a manual recalculation.
          </Lead>
        </div>
        <BigShot
          shot={{
            ...screenshots.payments,
            alt: 'PulseHub payments screen with a row per resident showing rent and metered electricity charged separately, so each resident pays for their own usage',
          }}
          label="Payments · each resident's rent & metered electricity"
        />
      </section>

      {/* Rent and utilities on one bill */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">One bill</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Rent and utilities on one bill, with a clear breakdown
            </h2>
            <Lead>
              A resident gets one monthly bill covering rent and their metered utilities, with the units and the
              rate shown, so there is no surprise invoice to chase separately. Add recurring charges such as water,
              gas and broadband to the same bill, and issue a numbered receipt when it is paid.
            </Lead>
          </div>
          <DocCard
            shot={screenshots.invoice}
            alt="A PulseHub HMO invoice showing monthly rent and metered electricity charges with the total amount due in pounds"
            caption="Rent and metered electricity on one bill"
          />
        </div>
      </section>

      {/* Pass on exactly what you pay */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl border-l-2 border-primary pl-6 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">At your own cost</p>
          <H2>Pass on exactly what you pay</H2>
          <Lead>
            Because usage is priced at the tariff you set, the charge is the units used at your own supplier rate.
            That keeps a bills-included let fair and helps you stay within Ofgem’s resale rules, which let a
            landlord recover cost but not profit on resold energy.
          </Lead>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            For how to set a fair-usage allowance and bill the excess within those rules, read our guide to{' '}
            <A href="/blog/bills-included-hmo-fair-usage">bills-included HMO fair-usage caps</A>.
          </p>
        </div>
      </section>

      {/* Settle the final reading at move-out */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <DocCard
            shot={screenshots.checkout}
            alt="The PulseHub check-out screen calculating a resident final electricity charge from meter readings and settling it against the deposit to show the refund due in pounds"
            caption="Final reading settled at check-out"
          />
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Move-out</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Settle the final reading against the deposit
            </h2>
            <Lead>
              When a resident leaves, take the closing reading and PulseHub charges their final usage and settles it
              against the deposit, so the refund or balance reflects what they actually used. The next resident’s
              share starts from their move-in date, with no manual tenant-day arithmetic.
            </Lead>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Everything the utility side of an HMO needs</H2>
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
        subtitle="Property-based plans for 1, 3 or 10 properties, with custom plans for larger portfolios. Utility billing is included on every plan. 14-day free trial, no card required."
        geoAware
      />

      {/* Related + FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            Utility billing is one part of PulseHub. See{' '}
            <A href={routes.hmo}>HMO management software</A> for the whole platform, read how to{' '}
            <A href="/blog/bills-included-hmo-fair-usage">set a fair-usage cap and bill the excess</A>, or how to{' '}
            <A href="/blog/hmo-rent-tracking">track HMO rent, payments and arrears</A>.
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
        heading="Bill HMO utilities fairly, without the spreadsheet."
        text="Meter each room, split charges by occupancy, and put rent and utilities on one bill per resident. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
