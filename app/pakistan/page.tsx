import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  BedDouble,
  Building2,
  Check,
  CreditCard,
  FileText,
  Landmark,
  MessageCircle,
  Receipt,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { ProductVideo } from '@/components/product-video'
import { DashboardImage } from '@/components/product-visual'
import { PageHero } from '@/components/page-hero'
import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

const PATH = routes.pakistan

export const metadata = pageMetadata({
  title: 'Hostel & Accommodation Management Software in Pakistan',
  description:
    'Manage hostels, residents, rooms, rent, payments, receipts and multiple properties with PulseHub, accommodation management software built for operators in Pakistan.',
  path: PATH,
})

// Confirmed workflows the product handles, kept as a scannable checklist (not a wall of cards).
const workflows = [
  'Rooms and beds',
  'Residents and tenants',
  'Monthly rent',
  'Partial and advance payments',
  'Security deposits',
  'Utility and AC charges',
  'Admissions and check-in',
  'Check-out and room transfers',
  'Outstanding balances',
  'Receipts',
  'Multiple branches',
  'Staff access',
  'Complaints and maintenance',
  'Reporting',
]

const pakistanFeatures: { icon: typeof Wallet; title: string; description: string }[] = [
  { icon: Wallet, title: 'Rupee billing', description: 'Track monthly rent, deposits and charges in PKR.' },
  { icon: CreditCard, title: 'Local payment recording', description: 'Log bank transfer, Easypaisa, JazzCash or cash.' },
  { icon: Receipt, title: 'Online receipts', description: 'Generate a receipt and share it online.' },
  { icon: MessageCircle, title: 'WhatsApp workflows', description: 'Share receipts and reminders over WhatsApp.' },
  { icon: FileText, title: 'CNIC records', description: 'Store CNIC details on each resident record.' },
  { icon: Zap, title: 'Utility & AC billing', description: 'Record usage-based AC and utility charges.' },
  { icon: Building2, title: 'Multi-branch', description: 'Run several hostels from one account.' },
  { icon: BedDouble, title: 'Hostel operations', description: 'Rooms, beds, admissions and check-outs.' },
]

const comparisonRows = [
  { aspect: 'Records', manual: 'Separate spreadsheets and paper registers', pulsehub: 'One central system for every property' },
  { aspect: 'Rent and payments', manual: 'Manual calculations, easy to miss', pulsehub: 'Tracked per resident, including partial payments' },
  { aspect: 'Receipts', manual: 'Written or messaged by hand', pulsehub: 'Generated and shared online or over WhatsApp' },
  { aspect: 'Occupancy', manual: 'Checked room by room', pulsehub: 'Vacancies visible at a glance' },
  { aspect: 'Multiple branches', manual: 'A separate file per hostel', pulsehub: 'All branches in one dashboard' },
  { aspect: 'Reporting', manual: 'Added up at month end', pulsehub: 'Collections and dues updated as you go' },
]

const steps = [
  { title: 'Create your property', description: 'Add each hostel or building as a property.' },
  { title: 'Add rooms and beds', description: 'Set up floors, rooms and beds the way your site is laid out.' },
  { title: 'Add residents', description: 'Record resident details and allocate them to a bed.' },
  { title: 'Manage rent and operations', description: 'Track rent, payments, receipts, complaints and reports.' },
]

const faqs = [
  {
    question: 'What is hostel management software?',
    answer:
      'Software that manages a hostel or shared accommodation at the room and bed level: residents, rent, payments, receipts, occupancy and daily operations, across one or more properties from one place.',
  },
  {
    question: 'Can PulseHub manage multiple hostels in Pakistan?',
    answer:
      'Yes. You can run more than one property from a single account, switch between them, and compare occupancy, collections and outstanding dues across your branches.',
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
    question: 'Can I record Easypaisa, JazzCash and bank-transfer payments?',
    answer:
      'Yes. Staff can record payments made through bank transfer, Easypaisa, JazzCash or cash. PulseHub records these payments; it is not a payment gateway that collects money on your behalf.',
  },
  {
    question: 'Can PulseHub generate and share payment receipts?',
    answer:
      'Yes. Each payment can produce a receipt that you can share online or over WhatsApp with the resident.',
  },
  {
    question: 'Can I manage security deposits?',
    answer:
      'Yes. Deposits are held against each resident and stay visible alongside their payment history until they check out.',
  },
  {
    question: 'Can I track utility or AC charges?',
    answer:
      'Yes. You can record usage-based utility and AC charges and bill them alongside rent.',
  },
  {
    question: 'Can I keep resident records and CNIC details?',
    answer:
      'Yes. Each resident has a profile with documents, allocation, and billing and payment history, and you can store CNIC details on the record.',
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
      name: 'Hostel & Accommodation Management Software in Pakistan',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Pakistan', item: `${SITE_URL}${PATH}` },
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

export default function PakistanPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Hostel & accommodation management · Pakistan"
        heading="Accommodation Management Software for Pakistan"
        text="PulseHub helps Pakistani hostel and accommodation operators manage properties, rooms, residents, rent, payments, receipts and daily operations from one platform, with far less manual work."
        visual={<DashboardImage priority sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem" />}
        split
      />

      {/* Built for how hostels operate in Pakistan */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Built for accommodation operators in Pakistan</H2>
          <Lead>
            If you run a hostel or shared accommodation, these are the jobs you deal with every day. PulseHub
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
              src={screenshots.properties.src}
              alt={screenshots.properties.alt}
              width={screenshots.properties.width}
              height={screenshots.properties.height}
              label="Occupancy across properties"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      {/* Residents, admissions and timeline */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <ProductScreenshot
              src={screenshots.residents.src}
              alt={screenshots.residents.alt}
              width={screenshots.residents.width}
              height={screenshots.residents.height}
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
              payment history. You can store CNIC details on the record, track deposits, and log complaints.
              The full lifecycle, from admission and room allocation through billing, payments, room changes
              and check-out, sits on one timeline.
            </Lead>
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-start sm:p-5">
              <div className="w-full max-w-[190px] shrink-0">
                <ProductScreenshot
                  src="/screenshots/member-ledger.png"
                  alt="A resident timeline in PulseHub showing rent charged, part-payments, a deposit held, room changes and check-out notices"
                  width={866}
                  height={1522}
                  frame={false}
                  sizes="190px"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A resident timeline keeps admissions, charges, payments, part-payments, deposits, room changes
                and notices together, so a question about any resident is answered on one screen.
              </p>
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
              discounts and refunds in order. Record payments made through bank transfer, Easypaisa, JazzCash
              or cash, and record usage-based utility and AC charges alongside rent.
            </Lead>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Every payment can produce a receipt you can share online or over WhatsApp. PulseHub records the
              payments your staff take; it is not a payment gateway that collects money for you.
            </p>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={screenshots.payments.src}
              alt={screenshots.payments.alt}
              width={screenshots.payments.width}
              height={screenshots.payments.height}
              label="Payments and receipts"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      {/* Multi-branch */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <ProductVideo
              src="/videos/property-switcher.mp4"
              width={3024}
              height={1576}
              label="All properties · portfolio"
              ariaLabel="PulseHub property switcher moving between properties and reviewing the All Properties view with occupancy, collections, costs and profit"
            />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Multiple branches</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Manage multiple hostels from one place
            </h2>
            <Lead>
              Run every hostel from a single account. Switch between branches from the dashboard, or open All
              Properties to compare occupancy, collections and outstanding dues. Reporting updates as you go,
              so you can see how each property is performing without adding it up by hand.
            </Lead>
          </div>
        </div>
      </section>

      {/* Pakistan-specific summary */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>What makes PulseHub fit Pakistan</H2>
          <Lead>The workflows Pakistani hostel and accommodation operators actually rely on, in one platform.</Lead>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pakistanFeatures.map((feature) => {
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
              <caption className="sr-only">Comparison of manual processes and PulseHub for hostel management.</caption>
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
          <H2>Get your hostel up and running</H2>
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
            <A href={routes.features}>full platform</A>, read our{' '}
            <A href={routes.blog}>accommodation management guides</A>, or see how PulseHub works for{' '}
            <A href={routes.student}>student accommodation</A>.
          </p>
        </div>
      </section>

      {/* Pricing (Pakistan per-branch model) */}
      <PricingGrid
        heading="Pakistan pricing"
        subtitle="Simple per-branch pricing in USD. Pay for the branches you run, with two months free on annual billing."
        initialRegionCode="pk"
        showSelector={false}
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
        heading="Manage your hostel with less manual work."
        text="Manage rooms, residents, rent, payments and multiple properties from one platform. Start a 14-day free trial with no card required."
        secondaryHref={routes.contact}
        secondaryLabel="Contact Us"
        note="Hostel & accommodation management software for operators in Pakistan."
      />
    </SiteShell>
  )
}
