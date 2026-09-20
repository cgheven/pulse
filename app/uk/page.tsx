import type { ReactNode } from 'react'
import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import PricingGrid from '@/components/pricing-grid'
import { ProductVideo } from '@/components/product-video'
import { DashboardImage } from '@/components/product-visual'
import SiteShell from '@/components/site-shell'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

const PATH = routes.uk

export const metadata = pageMetadata({
  title: 'Accommodation Management Software for the UK',
  languages: marketHreflang,
  description:
    'HMO, student, co-living and hostel management software for UK operators. Manage rooms, residents, rent, payments and multiple properties, with GBP pricing.',
  path: PATH,
})

const useCases = [
  { icon: Home, title: 'HMO management', description: 'Licensed HMOs and shared houses, at the room and tenant level.', href: routes.hmo },
  { icon: GraduationCap, title: 'Student accommodation', description: 'Halls and student houses through the letting cycle.', href: routes.student },
  { icon: Building2, title: 'Co-living', description: 'Shared-living sites, utilities and resident payments.', href: routes.coliving },
  { icon: BedDouble, title: 'Hostels & shared', description: 'Bed-level occupancy and payments for high-turnover sites.', href: routes.features },
]

const faqs = [
  {
    question: 'What accommodation types does PulseHub support in the UK?',
    answer:
      'HMOs, student accommodation, co-living, hostels and other room-based operations. It manages the property at the room and bed level rather than treating it as a single tenancy.',
  },
  {
    question: 'Is pricing shown in GBP?',
    answer:
      'Yes. UK plans are billed in GBP: Basic (1 property), Standard (up to 3) and Business (up to 10), with a 14-day free trial and no card required.',
  },
  {
    question: 'Can I manage multiple properties across the UK?',
    answer:
      'Yes. Run every property from one account, switch between them, and use the All Properties view to compare occupancy, collections and outstanding balances.',
  },
  {
    question: 'Does PulseHub handle HMO room and rent management?',
    answer:
      'Yes. Rooms, beds, resident records, rent schedules, part-payments, deposits and maintenance are all covered. See the HMO management page for detail.',
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
      name: 'Accommodation Management Software for the UK',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'United Kingdom', item: `${SITE_URL}${PATH}` },
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

export default function UkPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Accommodation management · United Kingdom"
        heading="Accommodation Management Software for the UK"
        text="PulseHub helps UK operators manage rooms, residents, rent, payments and multiple properties from one platform, for HMO, student, co-living and hostel accommodation."
        visual={<DashboardImage priority sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem" />}
        split
      />

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            heading="Built for UK accommodation operators"
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
              Rooms, residents, rent and payments in one place
            </h2>
            <Lead>
              Organise properties, rooms and beds, keep a record for every resident, and track rent, part-payments,
              deposits and overdue balances without rebuilding a spreadsheet each month.
            </Lead>
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

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <ProductVideo
              src="/videos/property-switcher.mp4"
              width={3024}
              height={1576}
              label="All properties · portfolio"
              ariaLabel="PulseHub property switcher moving between properties and comparing occupancy, collections, costs and profit in the All Properties view"
            />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Multiple properties</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Manage your whole UK portfolio from one account
            </h2>
            <Lead>
              Switch between sites from the dashboard, or open All Properties to compare occupancy, collections and
              outstanding dues. Give managers access to only the properties they run.
            </Lead>
          </div>
        </div>
      </section>

      <PricingGrid
        heading="UK pricing"
        subtitle="Billed in GBP. Every plan includes the full PulseHub platform, for 1, 3 or 10 properties."
        initialRegionCode="gb"
        showSelector={false}
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
        heading="Run your UK properties from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your properties in mind."
      />
    </SiteShell>
  )
}
