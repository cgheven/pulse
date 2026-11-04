import type { ReactNode } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { DemoSection } from '@/components/demo-section'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { PageHero } from '@/components/page-hero'
import PricingGrid from '@/components/pricing-grid'
import { PublicWebsiteSection } from '@/components/public-website-section'
import SiteShell from '@/components/site-shell'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const PATH = routes.hostel

export const metadata = pageMetadata({
  title: 'Hostel Management Software',
  description:
    'Hostel management software to run dorm beds and private rooms by the night or the month: one bill per guest, direct bookings, housekeeping and every hostel in one view.',
  path: PATH,
})

const capabilities = [
  'Dorm beds and private rooms, not whole units',
  'Let by the night or by the month',
  'One bill per guest for their stay and extras',
  'Partial payments tracked as installments',
  'Deposits held and settled at check-out',
  'Occupancy kept true automatically',
  'Direct bookings from your own listing page',
  'Housekeeping, complaints and maintenance',
  'Expenses and profit per hostel',
  'Every hostel in one portfolio view',
]

const faqs = [
  {
    question: 'What is hostel management software?',
    answer:
      'It is software that runs the day-to-day of a hostel, where people rent a bed in a dorm or a private room rather than a whole unit. It handles bookings and admissions, bed-level occupancy, one bill per guest for the stay and any extras, deposits, housekeeping and maintenance, and reporting, for a single hostel or a group.',
  },
  {
    question: 'Can PulseHub handle nightly bookings as well as long-stay guests?',
    answer:
      'Yes. PulseHub bills a stay by the night or by the month, so backpackers staying a few nights and long-stay or worker guests staying for months can run on the same system, even in the same hostel. Occupancy and billing stay correct whichever way a bed is let.',
  },
  {
    question: 'Is PulseHub a channel manager that syncs with Hostelworld and Booking.com?',
    answer:
      'If by hostel booking software you mean a channel manager that lists you on the big travel sites, then no, and we want to be clear about it. PulseHub runs your hostel operations and takes direct bookings through your own public listing page; it does not distribute to or sync inventory with OTAs such as Hostelworld or Booking.com. Many hostels keep an OTA alongside it and use PulseHub to run the beds, billing and day-to-day once guests are in.',
  },
  {
    question: 'Can it manage dorm beds and private rooms together?',
    answer:
      'Yes. PulseHub models a hostel as floors, rooms and beds, so a mixed-dorm bed, a female-only dorm and a private twin all sit in the same map. A dorm with three of its six beds taken reads as half full, and a bed can never be double-booked.',
  },
  {
    question: 'Can I bill extras like meals, laundry and shared utilities?',
    answer:
      'Yes. Alongside the bed fee you can charge extras such as meals and laundry, and for long-stay guests add a metered share of electricity and recurring charges, so each guest gets one bill covering their whole stay.',
  },
  {
    question: 'Does it handle more than one hostel?',
    answer:
      'Yes. Switch between hostels on one login, move a guest or a bed between them, and see every hostel together in a portfolio view with occupancy, revenue and costs side by side. A manager can be given access to just their own hostel.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. You can start a 14-day free trial with no card required, then book a demonstration if you would like a walkthrough for your hostel.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Hostel Management Software',
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
        'Hostel management software: dorm beds and private rooms, let by the night or the month, with one bill per guest, direct bookings, housekeeping and portfolio reporting.',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Hostel management software', item: `${SITE_URL}${PATH}` },
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

export default function HostelManagementSoftwarePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Hostel Management Software"
        heading="Hostel Management Software, Built Around the Bed"
        text="Run dorm beds and private rooms from one place, let by the night or the month, with one bill per guest for their stay and extras, direct bookings from your own page, housekeeping and every hostel in one view."
        supporting="For independent, backpacker and traveller hostels, and long-stay or worker hostels."
        visual={
          <ProductScreenshot
            src={screenshots.properties.src}
            alt="PulseHub portfolio view comparing occupancy, revenue and costs across several hostels"
            width={screenshots.properties.width}
            height={screenshots.properties.height}
            priority
            label="Every hostel · occupancy, revenue & costs"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem"
          />
        }
        split
        secondaryCta="watch"
      />

      <DemoSection subtitle="See how PulseHub runs beds, guests, bookings and billing across a hostel or a whole group." />

      {/* Beds and dorms, not whole units */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Built for the model</p>
          <H2>Dorm beds and private rooms, down to the bed</H2>
          <Lead>
            Most hostel software, and most property and booking tools, assume one guest takes one whole room. A hostel
            does not work like that. A six-bed dorm with three guests is half full, each bed is let on its own, and the
            money arrives by the night or the month. As hostel management software built around the bed, PulseHub models
            your hostel as floors, rooms and beds, keeps occupancy true so a bed can never be double-booked, and prices
            each bed from the rate you set, dorm or private.
          </Lead>
        </div>
        <BigShot
          shot={screenshots.dashboard}
          label="Dashboard · beds, occupancy, revenue & costs"
        />
      </section>

      {/* By the night or by the month */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Any length of stay</p>
          <H2>By the night or by the month, on one system</H2>
          <Lead>
            Hostels rarely house just one kind of guest. Backpackers come for a few nights, while students, workers and
            long-stay guests settle in for months. PulseHub bills a stay by the night or by the month, so both run on
            the same system, even in the same hostel, and occupancy and revenue stay correct whichever way a bed is let.
          </Lead>
        </div>
      </section>

      {/* One bill per guest */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Billing</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              One bill per guest, for the stay and the extras
            </h2>
            <Lead>
              Each guest gets one bill that gathers their bed fee and any extras, meals, laundry, and for long-stay
              guests a metered share of electricity and recurring charges, into a single balance. A part-payment is
              recorded as an installment with its own date and receipt, the real balance carries forward with no
              double-counting, and a numbered receipt is issued when it is paid.
            </Lead>
          </div>
          <DocCard
            shot={screenshots.invoice}
            alt="A PulseHub guest invoice showing a bed fee and extras with the total amount due"
            caption="The stay and the extras on one bill"
          />
        </div>
      </section>

      {/* Direct bookings from your own site */}
      <PublicWebsiteSection
        eyebrow="Direct bookings"
        heading="Take direct bookings from your own page"
        lead={
          <>
            Every hostel gets a public page showing its dorms and rooms, photos, prices and real-time bed availability,
            with an enquiry and application form built in. It is for building your own direct bookings, not a channel
            manager: PulseHub does not sync inventory to OTAs, so you can keep Hostelworld or Booking.com alongside it
            and use PulseHub to run the beds and billing.
          </>
        }
        features={[
          'Live dorm and bed availability',
          'Photos, amenities and prices',
          'Built-in enquiry and application form',
          'A web address for every hostel',
          'Structured data for search and AI',
          'Your own brand, not a marketplace',
        ]}
        screenshot={{
          src: screenshots.website.src,
          alt: 'A public PulseHub hostel website showing rooms with photos, prices, available beds, amenities and an enquiry button',
          width: screenshots.website.width,
          height: screenshots.website.height,
        }}
        imageLabel="Your public page · live bed availability"
      />

      {/* Payments and tracking */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Payments</p>
          <H2>Know who has paid, and who still owes</H2>
          <Lead>
            See every guest's balance at a glance: paid, part-paid or outstanding, with each payment kept separately by
            date, method and receipt. Deposits are held and settled against the final bill at check-out, and automatic
            reminders chase what is due so you are not doing it by hand.
          </Lead>
        </div>
        <BigShot
          shot={screenshots.payments}
          label="Payments · each guest's balance, paid & pending"
        />
      </section>

      {/* Housekeeping and front desk */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <ProductScreenshot
              src={screenshots.complaints.src}
              alt="The PulseHub complaints screen showing guest and housekeeping requests with their status and history"
              width={screenshots.complaints.width}
              height={screenshots.complaints.height}
              label="Complaints · status and history"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Front desk, without an app</p>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-medium leading-tight tracking-tight">
              Admissions, housekeeping and maintenance in one place
            </h2>
            <Lead>
              Guests check in at the desk or apply through the hostel page, and each becomes one record with their
              documents, deposit and ledger. Housekeeping and maintenance issues are logged and tracked to resolution,
              guests raise them by scanning a code on the wall, and none of it needs the guest to download an app.
            </Lead>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">One portfolio</p>
          <H2>Every bed, every hostel, one view</H2>
          <Lead>
            Run one hostel or a whole group. Switch between hostels on a single login, move a guest or a bed from one to
            another, and see them together: occupancy, revenue, outstanding dues, costs and profit, side by side. A
            manager can be given access to just their own hostel.
          </Lead>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Everything a hostel operator needs</H2>
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
        subtitle="Property-based plans that grow with your group. Every feature on this page is included on every plan. 14-day free trial, no card required."
        geoAware
      />

      {/* Related */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            Want the detail first? Read our guide to{' '}
            <A href="/blog/hostel-management-software">hostel management software</A> and{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>. For a related
            type of accommodation, see{' '}
            <A href={routes.student}>student accommodation software</A>,{' '}
            <A href={routes.coliving}>co-living management software</A>, or the wider{' '}
            <A href={routes.sharedHousing}>shared-housing platform</A>.
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
        heading="Run your hostel on one system."
        text="Dorm beds and private rooms, let by the night or the month, one bill per guest and every hostel in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Shared-housing platform"
      />
    </SiteShell>
  )
}
