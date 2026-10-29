import type { ReactNode } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { DemoSection } from '@/components/demo-section'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import PricingGrid from '@/components/pricing-grid'
import { ProductVideo } from '@/components/product-video'
import { PublicWebsiteSection } from '@/components/public-website-section'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const PATH = routes.student

export const metadata = pageMetadata({
  title: 'Student Accommodation Management Software',
  description:
    'Student accommodation management software for independent operators: track rooms, beds, rent, deposits and occupancy across every property. Free 14-day trial.',
  path: PATH,
})

const memberLedger = { src: '/screenshots/member-ledger.png', width: 866, height: 1522 }

const capabilities = [
  'Rooms and beds, let by the bed',
  'Residents and admissions',
  'Monthly rent and part-payments',
  'Deposits and refunds',
  'Utility and electricity billing',
  'Occupancy and waiting list',
  'Maintenance and complaints',
  'Multiple properties in one portfolio',
  'Reports and dashboards with export',
  'A public listing page per property',
  'Bulk import from spreadsheets',
  'UK compliance tracking (England)',
]

const timelineCaptures = [
  'Admissions and check-in',
  'Room and bed allocation',
  'Rent and charges',
  'Part-payments',
  'Deposits held',
  'Discounts and refunds',
  'Room and property transfers',
  'Notices and check-out',
]

const billingSteps = [
  {
    number: '01',
    title: 'Generate invoices',
    description: 'Build one monthly bill per resident covering rent, utilities and any add-ons, with a clear breakdown.',
    shot: screenshots.invoice,
  },
  {
    number: '02',
    title: 'Record payments and issue receipts',
    description: 'Record each payment, including part-payments, and issue a numbered receipt the resident can keep.',
    shot: screenshots.receipt,
  },
  {
    number: '03',
    title: 'Settle at check-out',
    description: 'Bring the final charges and any dues together against the deposit, and see the refund or balance due.',
    shot: screenshots.checkout,
  },
]

const comparisonRows = [
  { aspect: 'Records', manual: 'Separate sheets and paper registers', pulsehub: 'One system for every property' },
  { aspect: 'Rent and part-payments', manual: 'Manual sums, part-payments easy to lose', pulsehub: 'Installments and a running balance per resident' },
  { aspect: 'Occupancy', manual: 'Checked room by room', pulsehub: 'True at the bed level, no over-filling' },
  { aspect: 'Multiple properties', manual: 'A separate file per site', pulsehub: 'One portfolio view across every site' },
  { aspect: 'Reporting', manual: 'Added up at month end', pulsehub: 'Collected, outstanding and occupancy as you go' },
]

const websiteFeatures = [
  'Live room and bed availability',
  'Monthly rent shown in pounds',
  'Amenities like WiFi, laundry and security',
  'Join-waitlist enquiries in your dashboard',
  'One-tap WhatsApp or direct enquiries',
  'A web address for each property',
]

const faqs = [
  {
    question: 'How much does student accommodation management software cost?',
    answer:
      'PulseHub is priced by the number of properties, not per bed: Basic (1 property), Standard (up to 3) and Business (up to 10). There is a 14-day free trial with no card required. See the pricing page for current figures in your currency.',
  },
  {
    question: 'Who is PulseHub built for?',
    answer:
      'Independent and mid-market operators, roughly 50 to 500 beds across 1 to 10 properties. It is operational software for running the building day to day: rooms, residents, rent, occupancy, maintenance and reporting.',
  },
  {
    question: 'Can I manage student accommodation by the bed?',
    answer:
      'Yes. Each property is modelled as floors, rooms and beds, so a four-bed room with three residents shows as three-quarters full. Occupancy stays true automatically: you cannot over-fill a room or delete one that still has a resident in it.',
  },
  {
    question: 'Is this the same as student housing management software?',
    answer:
      'Yes. Student housing and student accommodation are two names for the same thing. PulseHub serves independent operators who let by the room or the bed under either name.',
  },
  {
    question: 'How does rent and overdue tracking work?',
    answer:
      'Each resident gets one monthly bill. You can record part-payments as separate installments, carry an unpaid balance forward as a single running total, hold a deposit to settle at move-out, and issue numbered receipts and invoices. You see upcoming, paid and overdue amounts per resident and across the property.',
  },
  {
    question: 'How does rent billing work: monthly or by term?',
    answer:
      'PulseHub bills on a clear monthly cycle. You can pro-rate a mid-month move-in, record part-payments as installments, carry a balance forward and hold a deposit on each resident, so the amount owed is always accurate.',
  },
  {
    question: 'Can it bill shared electricity or utilities?',
    answer:
      'Yes. You record a meter reading per room, price it against the property tariff, and split it between residents by their join dates rather than a flat share. The charge appears on the same monthly bill as rent.',
  },
  {
    question: 'How are resident payments recorded?',
    answer:
      'You record the payments you take, in cash, by bank transfer or your usual methods, and PulseHub issues numbered receipts and invoices and keeps one running balance per resident, including part-payments.',
  },
  {
    question: 'Can I move my data over from spreadsheets?',
    answer:
      'Yes. You can bulk import residents and rooms from a spreadsheet rather than entering them by hand, so you can bring an existing property across without re-keying every record. Residents and rooms are imported separately.',
  },
  {
    question: 'Can I give a manager access to only one property?',
    answer:
      'Yes. A manager gets a login scoped to a single property, and access is checked on every action, so a manager cannot reach another property even by changing the URL.',
  },
  {
    question: 'Does it help with UK compliance like gas safety or HMO licences?',
    answer:
      'For properties in England, you can track certificate and licence deadlines, gas safety, EICR, EPC, fire alarm and HMO licence, per property, with evidence files and reminders and a portfolio view of what is compliant. This is a tracker to help you stay organised, not legal advice.',
  },
  {
    question: 'Is a free trial available?',
    answer:
      'Yes. You can start a 14-day free trial with no card required from the Start Free Trial button, then book a demonstration if you would like a walkthrough focused on student accommodation operations.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Student Accommodation Management Software',
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
        'Student accommodation management software for independent operators: rooms and beds, residents, rent, deposits, utilities, occupancy, maintenance and multiple properties.',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Student Accommodation Management Software', item: `${SITE_URL}${PATH}` },
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

/** A large, contained app screenshot shown at a legible size. */
function BigShot({ shot, label, priority = false }: { shot: Shot; label: string; priority?: boolean }) {
  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <ProductScreenshot
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        label={label}
        priority={priority}
        sizes="(max-width: 1151px) calc(100vw - 2rem), 1152px"
      />
    </div>
  )
}

export default function StudentPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Student accommodation software"
        heading="Student Accommodation Management Software for Independent Operators"
        text="PulseHub is student accommodation and student housing management software for independent operators who let by the room or the bed. Manage rooms, residents, rent and occupancy across every property, from one platform."
        supporting="Built for independent and mid-market operators running roughly 50 to 500 beds across 1 to 10 properties."
        visual={
          <ProductScreenshot
            src={screenshots.dashboard.src}
            alt={screenshots.dashboard.alt}
            width={screenshots.dashboard.width}
            height={screenshots.dashboard.height}
            priority
            label="Dashboard · occupancy, rent & performance"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem"
          />
        }
        split
        secondaryCta="watch"
      />

      <DemoSection subtitle="See how PulseHub brings properties, students, rooms, rent and daily operations together in one platform." />

      {/* Everything in one platform */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Everything a student accommodation operator runs, in one platform</H2>
          <Lead>
            The jobs you deal with every week, in one place instead of spreadsheets, paper registers and chat
            threads.
          </Lead>
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

      {/* Occupancy centerpiece */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Rooms, beds & occupancy</p>
          <H2>Let by the room and the bed, not the flat</H2>
          <Lead>
            Model each property as floors, rooms and beds, so a four-bed room with three residents shows as
            three-quarters full, not simply occupied. Availability stays true automatically: you cannot over-fill a
            room or delete one that still has a resident in it. Move a resident to another room, or transfer them to
            another property, and their record moves with them.
          </Lead>
        </div>
        <BigShot
          shot={screenshots.residentsWaiting}
          label="Residents · waiting list & move-ins"
        />
      </section>

      {/* Rent, part-payments, deposits */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Rent & deposits</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              One monthly bill per resident, with the balance that is actually owed
            </h2>
            <Lead>
              Record part-payments as separate installments, each with its own date, method and receipt, and the
              real balance updates as money comes in. Unpaid amounts carry forward as a single running total, and a
              deposit is held on every record to settle at move-out. Shared electricity is split between residents
              by their join dates and lands on the same bill as rent.
            </Lead>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              PulseHub records the payments you take and issues numbered receipts and invoices, so each resident
              keeps one clear running balance.
            </p>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={screenshots.payments.src}
              alt={screenshots.payments.alt}
              width={screenshots.payments.width}
              height={screenshots.payments.height}
              label="Payments · rent, part-payments & balances"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 44rem"
            />
          </div>
        </div>
      </section>

      {/* Resident timeline callout */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-5 sm:p-8 lg:grid-cols-[200px_1fr] lg:items-center lg:gap-12">
            <div className="mx-auto w-full max-w-[200px] lg:mx-0">
              <ProductScreenshot
                src={memberLedger.src}
                alt="A student resident timeline in PulseHub showing rent charged, part-payments, a deposit held, room changes and check-out notices"
                width={memberLedger.width}
                height={memberLedger.height}
                frame={false}
                sizes="200px"
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The resident timeline</p>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight sm:text-2xl">
                Everything about a resident, on one timeline
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                From application and check-in through billing, part-payments, room changes and notices to
                check-out, one record answers any question about a resident on one screen. The timeline captures:
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-base text-foreground/85 sm:grid-cols-2">
                {timelineCaptures.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Billing lifecycle 3-up */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>From monthly billing to final checkout</H2>
          <Lead>Invoices, receipts and the move-out settlement, generated for every resident.</Lead>
          <ol className="mt-10 grid gap-8 sm:gap-6 lg:grid-cols-3">
            {billingSteps.map((step) => (
              <li key={step.number} className="flex flex-col">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{step.number}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{step.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{step.description}</p>
                <div className="mt-5 rounded-xl border border-border bg-card p-3 shadow-sm">
                  <div className="mx-auto w-full max-w-[17rem]">
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

      {/* Mid-page CTA */}
      <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-tight">
            See PulseHub with your own rooms and residents
          </h2>
          <StartTrialButton
            location="other"
            size="lg"
            className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
          />
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            14-day free trial · no card required
          </p>
        </div>
      </section>

      {/* Multiple properties video */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <ProductVideo
              src="/videos/property-switcher.mp4"
              width={3024}
              height={1576}
              label="All properties · portfolio"
              ariaLabel="PulseHub switching between student accommodation properties and comparing occupancy, income, costs and outstanding balances in one portfolio view"
            />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Multiple properties</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Run every property from one login
            </h2>
            <Lead>
              Switch between properties in one account, with each property's data kept separate. A portfolio view
              compares occupancy, income, costs and outstanding balances across every site, so month end is not a
              spreadsheet-stitching exercise.
            </Lead>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Give a site manager a login scoped to just their property. Every action is checked against their
              role, so they cannot reach another property even by changing the URL.
            </p>
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Maintenance & complaints</p>
          <H2>Residents report issues without needing an account</H2>
          <Lead>
            Students scan a QR code on the wall or use a short public code to raise a complaint, which lands in your
            list with a status you can track to resolution. There is no resident app or login to manage, and the
            record sits next to the room and resident it relates to.
          </Lead>
        </div>
        <BigShot shot={screenshots.complaints} label="Maintenance & complaints · status and history" />
      </section>

      {/* Public listing page */}
      <PublicWebsiteSection
        eyebrow="Free listing website"
        heading="Fill beds faster with a public listing page for every property"
        lead="Every property gets its own public page with photos, amenities, a map, and room cards showing live availability and real prices, at its own web address. Students can enquire or join the waitlist straight from it, and it stays in sync with your occupancy, so a bed shown online is really free."
        features={websiteFeatures}
        imageLabel="Your public listing page"
        screenshot={screenshots.website}
      />

      {/* UK compliance */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl border-l-2 border-primary pl-6 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">United Kingdom</p>
          <H2>Stay on top of UK accommodation compliance</H2>
          <Lead>
            For properties in England, track certificate and licence deadlines, gas safety, EICR, EPC, fire alarm
            and HMO licence, per property, with evidence files and daily reminders and a portfolio view of which
            sites are compliant and which are not.
          </Lead>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            This is a tracker to help you stay organised, not legal advice, and it is specific to England. For the
            detail, read our guide to <A href="/blog/hmo-compliance">HMO compliance in England</A>.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Move beyond spreadsheets and manual registers</H2>
          <Lead>
            PulseHub is sized for independent and mid-market operators, not the thousands-of-beds enterprise PBSA
            platforms, and not the manual work of spreadsheets.
          </Lead>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">Comparison of spreadsheets and PulseHub for student accommodation management.</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">Task</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Spreadsheets and registers</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">PulseHub</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.aspect} className="border-b border-border/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium">{row.aspect}</th>
                    <td className="px-4 py-3 text-muted-foreground">{row.manual}</td>
                    <td className="py-3 pl-4 text-foreground/85">{row.pulsehub}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingGrid
        heading="Plans and pricing"
        subtitle="Property-based plans: 1, 3 or 10 properties. 14-day free trial, no card required. Annual billing saves two months."
        geoAware
      />

      {/* Related + FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            Related: <A href={routes.uk}>PulseHub for UK operators</A>, <A href={routes.hmo}>HMO management software</A>,{' '}
            <A href={routes.coliving}>co-living management software</A>, or explore{' '}
            <A href={routes.features}>the full platform</A>. New to running accommodation on software? Read our guide to{' '}
            <A href="/blog/student-accommodation-management">student accommodation management</A>.
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
        heading="Make student accommodation management easier."
        text="Start a 14-day free trial with no card required, or book a demonstration to see PulseHub organise rooms, residents, rent and occupancy."
        secondaryHref={routes.contact}
        secondaryLabel="Book a Demo"
        note="Student accommodation management software for independent and mid-market operators."
      />
    </SiteShell>
  )
}
