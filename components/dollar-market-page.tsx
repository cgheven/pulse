import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { CtaBand } from '@/components/cta-band'
import { DemoSection } from '@/components/demo-section'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import PricingGrid from '@/components/pricing-grid'
import { PublicWebsiteSection } from '@/components/public-website-section'
import { routes } from '@/lib/navigation'
import { usScreenshots as screenshots } from '@/lib/screenshots'
import { SITE_URL } from '@/lib/site'

type UseCase = { icon: LucideIcon; title: string; description: string; href: string }
export type Faq = { question: string; answer: string }

export type DollarMarketContent = {
  /** Country name used in shared section copy, e.g. "Australia". */
  country: string
  path: string
  eyebrow: string
  heading: string
  heroText: string
  useCasesHeading: string
  useCases: UseCase[]
  faqs: Faq[]
  pricingHeading: string
  ctaHeading: string
  ctaText: string
}

/** Builds the WebPage + Breadcrumb + FAQ JSON-LD graph for a dollar-market page. */
export function marketJsonLd(name: string, path: string, faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name,
        url: `${SITE_URL}${path}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
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

export function DollarMarketPage({ content }: { content: DollarMarketContent }) {
  const { country } = content
  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        heading={content.heading}
        text={content.heroText}
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
            heading={content.useCasesHeading}
            subtitle="One platform, shaped around the kind of shared housing you run."
          />
          <CardGrid items={content.useCases} columns="four" />
        </div>
      </section>

      {/* Room & bed level */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Residents &amp; records</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Run every property at the room and bed level
            </h2>
            <Lead>
              Organise each property into rooms and beds, keep one record for every resident with their documents,
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

      {/* Rent & utilities */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Per-resident utility billing</p>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
            Rent and utilities on one bill, allocated per resident
          </h2>
          <Lead>
            Each resident gets one bill covering their rent and their share of metered electricity, with part-payments
            tracked as installments and a true running balance so arrears never build up unnoticed. PulseHub meters
            each room and splits the usage between residents by their move-in dates, and water, gas and other
            recurring charges can ride on the same bill.
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

      {/* Multi-property */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
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
              Manage your whole {country} portfolio from one account
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
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Residents, without an app</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              Complaints, maintenance and reminders in one place
            </h2>
            <Lead>
              Residents raise maintenance requests and complaints by scanning a code, with no account or app to
              install, and you track each one to resolution with a full history against the room. Payment reminders go
              out automatically, and residents can leave private feedback through a one-time link.
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

      <PublicWebsiteSection
        eyebrow="Free listing page"
        heading="List your rooms and take enquiries online"
        lead="Every property gets a public page showing its available rooms, beds, prices and amenities, that stays in sync with your live occupancy. Prospects can see what is free, then join the waitlist or message you."
        features={[
          'Live room and bed availability',
          'Photos, amenities and prices',
          'Built-in application form and waitlist',
          'Message or enquire in one tap',
          'Structured data for search and AI',
          'A web address for every property',
        ]}
        screenshot={screenshots.website}
        imageLabel="Your public listing page · live availability"
      />

      <PricingGrid
        heading={content.pricingHeading}
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
          <FaqList items={content.faqs} />
        </div>
      </section>

      <CtaBand
        heading={content.ctaHeading}
        text={content.ctaText}
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Property management for shared housing"
      />
    </>
  )
}
