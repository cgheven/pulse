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
import { indiaScreenshots as shots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const PATH = routes.pg

export const metadata = pageMetadata({
  title: 'PG Management Software',
  description:
    'PG management software for paying-guest operators in India: rooms and beds, one bill per resident for rent, food and metered electricity, kitchen costs and every PG in one view.',
  path: PATH,
})

const capabilities = [
  'Rooms and beds, not whole flats',
  'One bill per resident: rent, food and electricity',
  'Metered electricity split between residents',
  'Food and mess, with kitchen costs tracked',
  'Part-payments tracked as installments',
  'Deposits held and settled at check-out',
  'WhatsApp reminders and receipts',
  'A public PG page with live vacancies',
  'Every PG in one portfolio view',
  'Occupancy kept true automatically',
]

const faqs = [
  {
    question: 'What is PG management software?',
    answer:
      'It is software that runs a paying-guest accommodation, where residents rent a bed or a room rather than a whole flat. It handles admissions, room and bed occupancy, one monthly bill per resident for rent, food and electricity, part-payments and deposits, complaints and reporting, for a single PG or several.',
  },
  {
    question: 'Can it bill food and mess, not just rent?',
    answer:
      'Yes. Food can be part of a resident’s package or an add-on, and the kitchen’s own costs (groceries, gas, cook wages) are tracked so you can see the cost per resident. Rent, food and a metered share of electricity land on one monthly bill per resident.',
  },
  {
    question: 'How does electricity billing work?',
    answer:
      'PulseHub reads each room’s meter, prices it at the tariff you set, and splits it between the residents who shared the room by their join dates, rather than a flat split. It lands on the same bill as rent, with the units shown.',
  },
  {
    question: 'Does it support UPI AutoPay and Aadhaar e-KYC?',
    answer:
      'Being straight with you: PulseHub records payments and issues receipts, it is not a payment gateway, so it does not auto-debit rent through UPI AutoPay, and it keeps each resident’s ID type, number and document on file rather than running automated Aadhaar e-KYC. Residents pay the way you already collect (cash, bank transfer or wallet), you record it, and automatic WhatsApp reminders chase what is due. If native UPI auto-debit is essential, an India-specific app may suit you better.',
  },
  {
    question: 'Can I move my existing PG data into PulseHub?',
    answer:
      'Yes. PulseHub has bulk import for residents and rooms, so you can bring an existing PG across rather than typing it in, and export to PDF and spreadsheet whenever you want. Start a free trial to try it with your own data first.',
  },
  {
    question: 'Can I run more than one PG?',
    answer:
      'Yes. Switch between PGs on one login, move a resident or a bed between them, and see every PG together with occupancy, collections, dues and profit side by side. A manager can be given access to just their own PG.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. You can start a 14-day free trial with no card required, then book a demonstration if you would like a walkthrough for your PG.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'PG Management Software',
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
        'PG management software: rooms and beds, one bill per resident for rent, food and metered electricity, deposits, WhatsApp reminders and portfolio reporting, for PGs and hostels in India and beyond.',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'PG management software', item: `${SITE_URL}${PATH}` },
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

function DocCard({ shot, label }: { shot: Shot; label: string }) {
  return (
    <figure className="mx-auto w-full max-w-[20rem]">
      <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
        <ProductScreenshot
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          frame={false}
          sizes="(max-width: 640px) calc(100vw - 3.5rem), 20rem"
          className="rounded-lg"
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  )
}

export default function PgManagementSoftwarePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="PG Management Software"
        heading="PG Management Software, Built Around the Bed"
        text="Run your paying-guest accommodation from one place: rooms and beds, one monthly bill per resident for rent, food and a metered share of electricity, deposits, WhatsApp reminders and every PG in one view."
        supporting="For PG and hostel operators in India and beyond."
        visual={
          <ProductScreenshot
            src={shots.branches.src}
            alt={shots.branches.alt}
            width={shots.branches.width}
            height={shots.branches.height}
            priority
            label="Every PG · occupancy, collections & profit"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 42rem"
          />
        }
        split
        secondaryCta="watch"
      />

      <DemoSection subtitle="See how PulseHub runs rooms, residents, rent, food and electricity across a PG or a whole chain." />

      {/* Rooms and beds */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Built for the model</p>
          <H2>Rooms and beds, the way a PG actually works</H2>
          <Lead>
            Most rental software assumes one tenant signs for one whole flat. A PG does not work like that. A triple-sharing
            room with two residents is two-thirds full, each bed is let on its own, and rent, food and electricity are
            split between the people in the room. PulseHub models your PG as floors, rooms and beds, keeps occupancy true
            so a bed is never double-booked, and prices each bed from the rate you set for its sharing and AC type.
          </Lead>
        </div>
        <BigShot shot={shots.spaces} label="Rooms · sharing, rent & AC type, in rupees" />
      </section>

      {/* One bill per resident */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Billing</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              One bill per resident: rent, food and electricity
            </h2>
            <Lead>
              Each resident gets one monthly bill that gathers their rent, their food if it is part of the package, and a
              metered share of electricity, into a single balance. A part-payment is recorded as an installment with its
              own date and receipt, the real balance carries forward with no double-counting, and a numbered receipt is
              issued, ready to share on WhatsApp, when it is paid.
            </Lead>
          </div>
          <DocCard shot={shots.invoice} label="Rent and electricity on one bill" />
        </div>
      </section>

      {/* Metered electricity */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Shared costs</p>
          <H2>Metered electricity, split fairly</H2>
          <Lead>
            A flat electricity charge is unfair to whoever was barely in the room. PulseHub reads each room&rsquo;s meter,
            prices the units at the tariff you set, and splits the charge between the residents who shared the room by
            their join dates, so it follows who was actually there and when. It lands on the same monthly bill as rent and
            food, with the units shown.
          </Lead>
        </div>
        <BigShot shot={shots.payments} label="Payments · rent, metered electricity & WhatsApp receipts" />
      </section>

      {/* Food and mess */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Food and mess</p>
          <H2>Food costed properly, not guessed</H2>
          <Lead>
            Where you provide meals, food can be part of a resident&rsquo;s package or a separate add-on, and the
            kitchen&rsquo;s own costs, groceries, gas and cook wages, are recorded so you can see the real cost per
            resident rather than guessing whether the mess pays for itself. The food charge sits on the resident&rsquo;s
            bill alongside rent and electricity.
          </Lead>
        </div>
      </section>

      {/* Fill vacancies from your own site */}
      <PublicWebsiteSection
        eyebrow="Fill vacancies"
        heading="A public PG page with live vacancies"
        lead={
          <>
            Every PG gets a public page showing its rooms, photos, rent, amenities like meals, WiFi and power backup, and
            real-time available seats, with a join-waitlist button and a WhatsApp click-to-chat so enquiries reach you
            directly. The page carries structured data, so search engines and AI assistants can read it, which helps your
            own PG get found.
          </>
        }
        features={[
          'Live room and seat availability',
          'Photos, amenities and rent',
          'WhatsApp click-to-chat',
          'Join-waitlist and enquiries',
          'Structured data for search and AI',
          'A web address for every PG',
        ]}
        screenshot={{
          src: shots.website.src,
          alt: shots.website.alt,
          width: shots.website.width,
          height: shots.website.height,
        }}
        imageLabel="Your public PG page · live vacancies"
      />

      {/* Residents and reminders */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <ProductScreenshot
              src={shots.residents.src}
              alt={shots.residents.alt}
              width={shots.residents.width}
              height={shots.residents.height}
              label="Residents · deposits, notices & check-out"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
            />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Residents, without an app for them</p>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-medium leading-tight tracking-tight">
              Admissions, complaints and reminders in one place
            </h2>
            <Lead>
              Residents walk in or apply through the PG page, and each becomes one record with their ID, document, deposit
              and ledger. They raise complaints by scanning a code on the wall, and automatic WhatsApp reminders chase
              overdue rent, all without the resident needing to install anything.
            </Lead>
          </div>
        </div>
      </section>

      {/* Honest boundary */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl border-l-2 border-primary pl-6 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Where PulseHub fits</p>
          <H2>What it does, and what it does not</H2>
          <Lead>
            PulseHub is strongest on the operations of running a PG: true bed-level occupancy, one bill per resident for
            rent, food and metered electricity, kitchen costs, deposits and a view across every PG. It records payments
            and issues receipts; it is not a payment gateway, so it does not auto-debit rent through UPI AutoPay, and it
            keeps each resident’s ID and document rather than running automated Aadhaar e-KYC. It is web-based and
            works across India and other markets. If a native app with built-in UPI auto-debit is your main need, an
            India-specific app may suit you better; if deep operations across one or many PGs are, this is built for it.
          </Lead>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>Everything a PG operator runs, in one platform</H2>
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
        subtitle="Property-based plans that grow with your chain. Every feature on this page is included on every plan. 14-day free trial, no card required."
        geoAware
      />

      {/* Related */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            Want the detail first? Read our guide to{' '}
            <A href="/blog/pg-management-software">PG management software in India</A>. For related accommodation, see{' '}
            <A href={routes.hostel}>hostel management software</A> or the wider{' '}
            <A href={routes.sharedHousing}>shared-housing platform</A>. Operating in India?{' '}
            <A href={routes.india}>PulseHub for India</A> has a page of its own.
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
        heading="Run your PG on one system."
        text="Rooms and beds, one bill per resident for rent, food and electricity, and every PG in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.india}
        secondaryLabel="PulseHub in India"
      />
    </SiteShell>
  )
}
