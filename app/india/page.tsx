import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BedDouble,
  Building2,
  Check,
  CreditCard,
  FileText,
  MessageCircle,
  Receipt,
  Wallet,
  Zap,
} from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import { PublicWebsiteSection } from '@/components/public-website-section'
import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { routes } from '@/lib/navigation'
import { indiaScreenshots } from '@/lib/screenshots'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

const PATH = routes.india

export const metadata = pageMetadata({
  title: 'PG & Hostel Management Software in India',
  languages: marketHreflang,
  description:
    'PG and hostel management software for India. Manage rooms, beds, residents, rent, payments, receipts and multiple branches in INR with PulseHub.',
  path: PATH,
})

// Confirmed workflows the product handles, kept as a scannable checklist (not a wall of cards).
const workflows = [
  'Rooms and beds',
  'Residents and tenants',
  'Monthly rent',
  'Partial and advance payments',
  'Security deposits',
  'Metered electricity charges',
  'Admissions and check-in',
  'Check-out and room transfers',
  'Outstanding balances',
  'Receipts',
  'Multiple branches',
  'Staff access',
  'Complaints and maintenance',
  'Reporting',
]

// Real elements of the public PG website (shown beside the website screenshot).
const websiteFeatures = [
  'Live room and bed availability',
  'Monthly rent shown in rupees',
  'Amenities like meals, WiFi, laundry and power backup',
  'Packages and menu',
  'Join-waitlist enquiries in your dashboard',
  'One-tap WhatsApp enquiries',
]

// What a resident's member timeline captures (shown beside the timeline screenshot).
const timelineCaptures = [
  'Admissions & check-in',
  'Room & bed allocation',
  'Rent & charges',
  'Part-payments',
  'Security deposits',
  'Discounts & refunds',
  'Room changes',
  'Notices & check-out',
]

const indiaFeatures: { icon: typeof Wallet; title: string; description: string }[] = [
  { icon: Wallet, title: 'Rupee billing', description: 'Track monthly rent, deposits and charges in INR.' },
  { icon: CreditCard, title: 'Local payment recording', description: 'Log UPI, bank transfer or cash against each resident.' },
  { icon: Receipt, title: 'Online receipts', description: 'Generate a receipt and share it online or on WhatsApp.' },
  { icon: MessageCircle, title: 'WhatsApp workflows', description: 'Share receipts and reminders over WhatsApp.' },
  { icon: FileText, title: 'Resident documents', description: 'Keep ID and documents on each resident record.' },
  { icon: Zap, title: 'Metered electricity', description: 'Bill usage-based electricity alongside rent.' },
  { icon: Building2, title: 'Multi-branch', description: 'Run several PGs and hostels from one account.' },
  { icon: BedDouble, title: 'PG & hostel operations', description: 'Rooms, beds, admissions and check-outs.' },
]

const billingSteps = [
  {
    number: '01',
    title: 'Generate invoices',
    description: 'Automatically generate monthly rent and metered electricity charges with a clear breakdown.',
    shot: indiaScreenshots.invoice,
  },
  {
    number: '02',
    title: 'Record payments and issue receipts',
    description: 'Record payments and instantly generate clear receipts you can share online or over WhatsApp.',
    shot: indiaScreenshots.receipt,
  },
  {
    number: '03',
    title: 'Handle check-outs',
    description: 'Pro-rate the final month by nights stayed, settle outstanding dues against the deposit, and see exactly what to collect or refund.',
    shot: indiaScreenshots.checkout,
  },
]

const comparisonRows = [
  { aspect: 'Records', manual: 'Separate spreadsheets and paper registers', pulsehub: 'One central system for every branch' },
  { aspect: 'Rent and payments', manual: 'Manual calculations, easy to miss', pulsehub: 'Tracked per resident, including partial payments' },
  { aspect: 'Receipts', manual: 'Written or messaged by hand', pulsehub: 'Generated and shared online or over WhatsApp' },
  { aspect: 'Occupancy', manual: 'Checked room by room', pulsehub: 'Vacancies visible at a glance' },
  { aspect: 'Multiple branches', manual: 'A separate file per PG', pulsehub: 'All branches in one dashboard' },
  { aspect: 'Reporting', manual: 'Added up at month end', pulsehub: 'Collections and dues updated as you go' },
]

const steps = [
  { title: 'Create your branch', description: 'Add each PG or hostel as a branch.' },
  { title: 'Add rooms and beds', description: 'Set up floors, rooms and beds the way your site is laid out.' },
  { title: 'Add residents', description: 'Record resident details and allocate them to a bed.' },
  { title: 'Manage rent and operations', description: 'Track rent, payments, receipts, complaints and reports.' },
]

const faqs = [
  {
    question: 'What is PG and hostel management software?',
    answer:
      'Software that manages a PG, hostel or shared accommodation at the room and bed level: residents, rent, payments, receipts, occupancy and daily operations, across one or more branches from one place.',
  },
  {
    question: 'Can PulseHub manage multiple PGs and hostels in India?',
    answer:
      'Yes. You can run more than one branch from a single account, switch between them, and compare occupancy, collections and outstanding dues across every PG and hostel.',
  },
  {
    question: 'Can I manage rooms and beds with PulseHub?',
    answer:
      'Yes. PulseHub is organised as buildings, rooms and beds, so you can allocate residents to a specific bed, see vacancies, and handle room transfers, check-ins and check-outs.',
  },
  {
    question: 'Can I track monthly rent and partial payments?',
    answer:
      'Yes. You can set monthly rent, record partial and advance payments, security deposits, discounts and refunds, and see outstanding balances for each resident.',
  },
  {
    question: 'Can I record UPI, bank-transfer and cash payments?',
    answer:
      'Yes. Staff can record payments made through UPI, bank transfer or cash, against the right bank account. PulseHub records these payments; it is not a payment gateway that collects money on your behalf.',
  },
  {
    question: 'Can PulseHub generate and share payment receipts?',
    answer:
      'Yes. Each payment can produce a receipt that you can share online or over WhatsApp with the resident.',
  },
  {
    question: 'Can I manage security deposits?',
    answer:
      'Yes. Deposits are held against each resident and stay visible alongside their payment history until they check out, when they are settled against any dues.',
  },
  {
    question: 'Can I track electricity or utility charges?',
    answer:
      'Yes. You can record metered electricity usage and bill it alongside rent, with a clear per-unit breakdown on the invoice.',
  },
  {
    question: 'Can I keep resident records and documents?',
    answer:
      'Yes. Each resident has a profile with documents, allocation, and billing and payment history, so a question about any resident is answered on one screen.',
  },
  {
    question: 'Does PulseHub include a website for my PG?',
    answer:
      'Yes. Every branch gets a free public page showing rooms, beds, rent, amenities and available seats. Students and families can join the waitlist or message you on WhatsApp, and the page stays in sync with your live occupancy.',
  },
  {
    question: 'Can I try PulseHub before subscribing?',
    answer: 'Yes. You can start a 14-day free trial with no card required.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'PG & Hostel Management Software in India',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'India', item: `${SITE_URL}${PATH}` },
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

export default function IndiaPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="PG & hostel management · India"
        heading="PG & Hostel Management Software for India"
        text="PulseHub helps Indian PG and hostel operators manage branches, rooms, beds, residents, rent, payments, receipts and daily operations from one platform, with far less manual work."
        visual={
          <ProductScreenshot
            src={indiaScreenshots.dashboard.src}
            alt={indiaScreenshots.dashboard.alt}
            width={indiaScreenshots.dashboard.width}
            height={indiaScreenshots.dashboard.height}
            priority
            label="PG dashboard"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem"
          />
        }
        split
      />

      {/* Built for how PGs and hostels operate in India */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Built for PG and hostel operators in India</H2>
          <Lead>
            If you run a PG, hostel or shared accommodation, these are the jobs you deal with every day. PulseHub
            keeps them in one place instead of across spreadsheets, notebooks and WhatsApp.
          </Lead>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-base text-foreground/85">
                <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rooms, beds and occupancy */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Rooms, beds & occupancy</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Know exactly who is staying where
            </h2>
            <Lead>
              PulseHub is organised as buildings, floors, rooms and beds. Allocate residents to a specific bed,
              see which beds are vacant or occupied, and handle room transfers, check-ins and check-outs
              without rebuilding a spreadsheet each month.
            </Lead>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={indiaScreenshots.spaces.src}
              alt={indiaScreenshots.spaces.alt}
              width={indiaScreenshots.spaces.width}
              height={indiaScreenshots.spaces.height}
              label="Rooms and occupancy"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      {/* Residents, admissions and timeline */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 min-w-0 lg:order-1">
              <ProductScreenshot
                src={indiaScreenshots.residents.src}
                alt={indiaScreenshots.residents.alt}
                width={indiaScreenshots.residents.width}
                height={indiaScreenshots.residents.height}
                label="Resident records"
                sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
              />
            </div>
            <div className="order-1 min-w-0 lg:order-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Residents & admissions</p>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
                Keep every resident record in one place
              </h2>
              <Lead>
                Each resident has a profile with admission details, documents, bed allocation, and billing and
                payment history. Track deposits, log complaints, and keep a waiting list of incoming residents.
                The full lifecycle, from admission and room allocation through billing, payments, room changes
                and check-out, sits on one timeline.
              </Lead>
            </div>
          </div>

          {/* Full-width timeline callout so the section reads dense, not empty. */}
          <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-card p-5 sm:mt-12 sm:p-8 lg:grid-cols-[200px_1fr] lg:items-center lg:gap-12">
            <div className="mx-auto w-full max-w-[200px] lg:mx-0">
              <ProductScreenshot
                src={indiaScreenshots.memberLedger.src}
                alt={indiaScreenshots.memberLedger.alt}
                width={indiaScreenshots.memberLedger.width}
                height={indiaScreenshots.memberLedger.height}
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
                Admissions, charges, payments, deposits, room changes and notices in one record, so a question
                about any resident is answered on one screen. The timeline captures:
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

      {/* Rent, payments and receipts */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Rent, payments & receipts</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Make rent and payments easier to track
            </h2>
            <Lead>
              Set monthly rent in rupees and keep partial payments, advance payments, security deposits,
              discounts and refunds in order. Record payments made through UPI, bank transfer or cash, and bill
              metered electricity alongside rent.
            </Lead>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Every payment can produce a receipt you can share online or over WhatsApp. PulseHub records the
              payments your staff take; it is not a payment gateway that collects money for you.
            </p>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={indiaScreenshots.payments.src}
              alt={indiaScreenshots.payments.alt}
              width={indiaScreenshots.payments.width}
              height={indiaScreenshots.payments.height}
              label="Payments and receipts"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      {/* Billing lifecycle: invoice, receipt, checkout */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>From monthly billing to final checkout</H2>
          <Lead>
            Manage rent, electricity charges, payments, deposits and final settlements for every resident in one place.
          </Lead>
          <ol className="mt-8 grid gap-8 sm:gap-6 lg:grid-cols-3">
            {billingSteps.map((step) => (
              <li key={step.number} className="flex flex-col">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{step.number}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{step.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{step.description}</p>
                {/* Fixed-height viewport so the three documents (portrait invoice/receipt and the
                    taller check-out modal) line up at an even height instead of the modal stretching
                    its card. Each image fits the height; width follows its own aspect ratio. */}
                <div className="mt-5 flex h-[20rem] items-start justify-center rounded-xl border border-border bg-card p-3 shadow-sm sm:h-[22rem]">
                  <Image
                    src={step.shot.src}
                    alt={step.shot.alt}
                    width={step.shot.width}
                    height={step.shot.height}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 14rem"
                    className="h-full w-auto max-w-full rounded-lg object-contain"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Multi-branch */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <ProductScreenshot
              src={indiaScreenshots.branches.src}
              alt={indiaScreenshots.branches.alt}
              width={indiaScreenshots.branches.width}
              height={indiaScreenshots.branches.height}
              label="All branches"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Multiple branches</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Manage multiple PGs and hostels from one place
            </h2>
            <Lead>
              Run every branch from a single account, whether your PGs are in one city or spread across Bengaluru,
              Pune, Hyderabad and beyond. Switch between branches from the dashboard, or compare every branch side
              by side on occupancy, collections and outstanding dues as reporting updates while you go.
            </Lead>
          </div>
        </div>
      </section>

      {/* Reporting and analytics */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Reporting & analytics</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              See income, expenses and profit at a glance
            </h2>
            <Lead>
              Reports bring collections, electricity, discounts, expenses, salaries and profit together for any
              day, month or custom range. Drill into revenue, reconciliation and unit cost, then export to PDF or
              Excel for your own records.
            </Lead>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={indiaScreenshots.reports.src}
              alt={indiaScreenshots.reports.alt}
              width={indiaScreenshots.reports.width}
              height={indiaScreenshots.reports.height}
              label="Reports and analytics"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      {/* Complimentary public website */}
      <PublicWebsiteSection
        eyebrow="Free PG website"
        heading="Every PG gets its own public website, free"
        lead="PulseHub gives each PG and hostel a public page where students and families can browse rooms, beds, rent and amenities, then join the waitlist or message you on WhatsApp. It stays in sync with your rooms and occupancy, so seats shown online are always current."
        features={websiteFeatures}
        imageLabel="Your public PG page"
        screenshot={indiaScreenshots.website}
      />

      {/* India-specific summary */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>What makes PulseHub fit India</H2>
          <Lead>The workflows Indian PG and hostel operators actually rely on, in one platform.</Lead>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {indiaFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-3 w-fit rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Move beyond spreadsheets */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Move beyond spreadsheets and manual registers</H2>
          <Lead>The same operations, without the copying between files, the paper registers and the month-end totting up.</Lead>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">Comparison of manual processes and PulseHub for PG and hostel management.</caption>
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

      {/* How it works */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Get your PG up and running</H2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            />
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Want more detail first? Explore the{' '}
            <A href={routes.features}>full platform</A>, see{' '}
            <A href={routes.pricing}>plans and pricing</A>, read our{' '}
            <A href={routes.blog}>accommodation management guides</A>, or see how PulseHub works for{' '}
            <A href={routes.student}>student accommodation</A>.
          </p>
        </div>
      </section>

      {/* Pricing (India tiered INR model) */}
      <PricingGrid
        heading="India pricing"
        subtitle="Billed in INR. Every plan includes the full PulseHub platform, for 1, 3 or 10 branches. Two months free on annual billing."
        initialRegionCode="in"
        showSelector={false}
        unitLabel={{ singular: 'branch', plural: 'branches' }}
      />

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
            Frequently asked questions
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        heading="Manage your PG with less manual work."
        text="Manage rooms, residents, rent, payments and multiple branches from one platform. Start a 14-day free trial with no card required."
        secondaryHref={routes.contact}
        secondaryLabel="Contact Us"
        note="PG & hostel management software for operators in India."
      />
    </SiteShell>
  )
}
