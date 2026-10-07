import type { ReactNode } from 'react'
import Link from 'next/link'
import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { CtaBand } from '@/components/cta-band'
import { DemoSection } from '@/components/demo-section'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import { PublicWebsiteSection } from '@/components/public-website-section'
import PricingGrid from '@/components/pricing-grid'
import { ProductVideo } from '@/components/product-video'
import SiteShell from '@/components/site-shell'
import { routes } from '@/lib/navigation'
import { philippinesScreenshots as screenshots } from '@/lib/screenshots'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

const PATH = routes.philippines

export const metadata = pageMetadata({
  title: 'Dormitory & Bedspace Management Software for the Philippines',
  languages: marketHreflang,
  description:
    'Dormitory, boarding house and bedspace management software for the Philippines. Manage rooms, beds, tenants, rent, deposits and multiple branches in USD with PulseHub.',
  path: PATH,
})

const useCases = [
  { icon: BedDouble, title: 'Bedspace & dormitories', description: 'Bed-level occupancy and payments for high-turnover bedspaces and dorms.', href: routes.features },
  { icon: Home, title: 'Boarding houses', description: 'Rooms, tenants and monthly rent for boarding house operators.', href: routes.features },
  { icon: GraduationCap, title: 'Student accommodation', description: 'Dormitories and student housing through the letting cycle.', href: routes.student },
  { icon: Building2, title: 'Co-living & shared', description: 'Shared-living sites, utilities and resident payments.', href: routes.coliving },
]

const billingSteps = [
  {
    number: '01',
    title: 'Generate invoices',
    description: 'Automatically generate monthly rent, food and utility charges with a clear breakdown.',
    shot: screenshots.invoice,
  },
  {
    number: '02',
    title: 'Record payments and issue receipts',
    description: 'Record payments and instantly generate clear, professional receipts for residents.',
    shot: screenshots.receipt,
  },
  {
    number: '03',
    title: 'Handle check-outs',
    description: 'Calculate final utility charges, apply outstanding dues against the deposit, and see exactly what to collect or refund.',
    shot: screenshots.checkout,
  },
]

const faqs = [
  {
    question: 'What accommodation types does PulseHub support in the Philippines?',
    answer:
      'Bedspaces, dormitories, boarding houses, student accommodation and other room-based operations. It manages each branch at the room and bed level rather than treating it as a single tenancy.',
  },
  {
    question: 'Is pricing shown in USD?',
    answer:
      'Yes. Philippines plans are billed in USD: Basic (1 branch), Standard (up to 3) and Business (up to 10), with a 14-day free trial and no card required.',
  },
  {
    question: 'Can I manage multiple branches across the Philippines?',
    answer:
      'Yes. Run every branch from one account, switch between them, and use the All Branches view to compare occupancy, collections and outstanding balances.',
  },
  {
    question: 'Does PulseHub handle room and bed management?',
    answer:
      'Yes. Rooms, beds, resident records, rent schedules, part-payments, deposits and maintenance are all covered, down to individual bedspaces.',
  },
  {
    question: 'Does PulseHub include a website for my branch?',
    answer:
      'Yes. Every branch gets a free public page showing available rooms, beds, rent and amenities. People can join the waitlist or message you, and the page stays in sync with your live occupancy.',
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
      name: 'Dormitory & Bedspace Management Software for the Philippines',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Philippines', item: `${SITE_URL}${PATH}` },
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

export default function PhilippinesPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Bedspace & dormitory software · Philippines"
        heading="Dormitory & Bedspace Management Software for the Philippines"
        text="PulseHub is accommodation management software for the Philippines: manage rooms, beds, tenants, rent, deposits and multiple branches from one platform, built for dormitory, boarding house, and bedspace operators."
        visual={
          <ProductScreenshot
            src={screenshots.dashboard.src}
            alt={screenshots.dashboard.alt}
            width={screenshots.dashboard.width}
            height={screenshots.dashboard.height}
            priority
            sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem"
          />
        }
        split
        secondaryCta="watch"
      />

      <DemoSection subtitle="See how PulseHub brings branches, residents, rent, payments and operations together in one platform." />

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            heading="Built for Philippines accommodation operators"
            subtitle="One platform, shaped around the kind of accommodation you run."
          />
          <CardGrid items={useCases} columns="four" />
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Day-to-day operations</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Run your dormitories at the room and bed level
            </h2>
            <Lead>
              Organise each branch into rooms and beds, keep a record for every tenant, and track rent, part-payments,
              deposits and overdue balances without rebuilding a spreadsheet each month. Attach documents to a
              tenant record and log maintenance and complaints as they come in.
            </Lead>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              For the full feature set, see{' '}
              <A href={routes.features}>the PulseHub platform</A>.
            </p>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              src={screenshots.spaces.src}
              alt={screenshots.spaces.alt}
              width={screenshots.spaces.width}
              height={screenshots.spaces.height}
              label="Rooms and occupancy"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            heading="From monthly billing to final checkout"
            subtitle="Manage rent, utility charges, payments, deposits and final settlements for every resident in one place."
          />
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

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <ProductVideo
              src="/videos/ph-multi-branch.mp4"
              width={1898}
              height={1080}
              label="All branches · portfolio"
              ariaLabel="PulseHub moving between dormitory branches in Makati, Quezon City and Cebu and comparing occupancy, collections, deposits, costs and net profit in the All Branches view, in pesos"
            />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Multiple branches</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Manage your whole Philippines portfolio from one account
            </h2>
            <Lead>
              Switch between sites from the dashboard, or open All Branches to compare occupancy, collections and
              outstanding dues. Give managers access to only the branches they run.
            </Lead>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Arrears & vacancies</p>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
            Stay on top of arrears and vacancies across your branches
          </h2>
          <Lead>
            See overdue balances per tenant so arrears do not build up unnoticed, and check which rooms and beds
            are vacant so they get filled sooner. Across a portfolio, the All Branches view compares occupancy
            and collections for every branch in one place.
          </Lead>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            New to running accommodation on software? Learn how to{' '}
            <A href="/blog/hmo-rent-tracking">track rent, payments and arrears</A>, how to{' '}
            <A href="/blog/manage-multiple-hmo-properties-without-spreadsheets">
              manage multiple branches without spreadsheets
            </A>
            , or read our guide to{' '}
            <A href="/blog/student-accommodation-management">student accommodation management</A>.
          </p>
        </div>
      </section>

      <PublicWebsiteSection
        eyebrow="Free branch website"
        heading="List your rooms and take enquiries online"
        lead="PulseHub gives every branch a public page where students and professionals can see available rooms, beds, monthly rent in pesos and amenities, then join the waitlist or message you. It stays in sync with your live occupancy, so listings are always current."
        features={[
          'Live room and bed availability',
          'Rent shown in Philippine pesos',
          'Amenities like WiFi, laundry, gym and security',
          'Packages and menu',
          'Join-waitlist enquiries in your dashboard',
          'One-tap WhatsApp or direct enquiries',
        ]}
        screenshot={screenshots.website}
      />

      <PricingGrid
        heading="Philippines pricing"
        subtitle="Billed in USD. Every plan includes the full PulseHub platform, for 1, 3 or 10 branches."
        initialRegionCode="ph"
        showSelector={false}
        unitLabel={{ singular: 'branch', plural: 'branches' }}
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
        heading="Run your Philippines branches from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your branches in mind."
      />
    </SiteShell>
  )
}
