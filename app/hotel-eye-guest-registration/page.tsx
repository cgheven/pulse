import type { ReactNode } from 'react'
import Link from 'next/link'
import { Building2, Check, MessageCircle, Wallet } from 'lucide-react'
import { CardGrid } from '@/components/card-grid'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { ProductVideo } from '@/components/product-video'
import { PageHero } from '@/components/page-hero'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { routes } from '@/lib/navigation'
import { hotelEyeScreenshots } from '@/lib/screenshots'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

const PATH = routes.hotelEye

export const metadata = pageMetadata({
  title: 'Hotel Eye Guest Registration Software',
  languages: marketHreflang,
  description:
    'PulseHub files your hostel guests to the Hotel Eye police portal in Pakistan, from your resident records. Track filed and pending guests and CNIC details.',
  path: PATH,
})

const provinces = ['Punjab', 'Islamabad', 'Sindh']

const fileSteps = [
  {
    number: '01',
    title: 'Connect your portal once',
    description:
      'Save your province’s official Hotel Eye address and username. The password is encrypted at rest and used only to log in to the portal on your behalf.',
  },
  {
    number: '02',
    title: 'Read the login CAPTCHA',
    description:
      'The portal asks a person to read a CAPTCHA at login, so you type it once per session. PulseHub does not bypass it.',
  },
  {
    number: '03',
    title: 'File pending guests in the background',
    description:
      'PulseHub files the pending guests one after another, taking each one’s details straight from the resident record you already keep.',
  },
]

const knows = [
  'Separates filed guests from pending ones',
  'Stamps every filing with its date',
  'Skips guests already on the portal, so none are filed twice',
  'Flags anyone missing a CNIC',
  'Flags a missing province or district',
  'Pulls each guest’s details from their resident record',
]

const nextCards = [
  {
    icon: Building2,
    title: 'PulseHub for Pakistan',
    description: 'Rooms, residents, rent and receipts in rupees, across every branch.',
    href: routes.pakistan,
  },
  {
    icon: Wallet,
    title: 'Pricing',
    description: 'Per-branch plans in rupees, with a 14-day free trial.',
    href: routes.pricing,
  },
  {
    icon: MessageCircle,
    title: 'Talk to the team',
    description: 'Ask about Hotel Eye or book a walkthrough for your hostel.',
    href: routes.contact,
  },
]

const faqs = [
  {
    question: 'What is Hotel Eye?',
    answer:
      'Hotel Eye is the guest-registration system run by provincial police in Pakistan, where hostels, guest houses and hotels record who is staying with them. Punjab runs it at hoteleye.punjab.gov.pk, and Islamabad and Sindh have their own portals. Whichever province you are in, each guest’s details have to reach the police portal.',
  },
  {
    question: 'How does PulseHub file guests to Hotel Eye?',
    answer:
      'You add your province’s official Hotel Eye address and your portal username once. PulseHub lists each guest as pending or filed, and when you sync you read the portal’s login CAPTCHA once and PulseHub then files the pending guests in the background, taking their details straight from the resident records you already keep.',
  },
  {
    question: 'Which provinces does PulseHub support for Hotel Eye?',
    answer:
      'PulseHub files to the provincial portals it supports today: Punjab, Islamabad and Sindh. The resident’s province and district on their profile decide where their details are filed.',
  },
  {
    question: 'Does PulseHub store my Hotel Eye portal password?',
    answer:
      'Your portal username and address are saved so filing is one click. The password is encrypted at rest and used only to log in to your provincial portal on your behalf. You can leave it blank to keep a saved password, and change it whenever you need to.',
  },
  {
    question: 'Does PulseHub solve the portal CAPTCHA for me?',
    answer:
      'No. The provincial portal asks a person to read a CAPTCHA at login, so you type that once per session. PulseHub does not bypass it. Once you are in, PulseHub does the repetitive part, filing the pending guests one after another instead of you keying each CNIC by hand.',
  },
  {
    question: 'Can it tell which guests still need filing?',
    answer:
      'Yes. PulseHub separates filed guests from pending ones and flags anyone who cannot be filed yet because their CNIC, province or district is missing, so you know exactly whose profile to complete. Guests already on the portal are left alone, so nobody is filed twice, and each filing is stamped with its date.',
  },
  {
    question: 'Does PulseHub guarantee I am compliant with Hotel Eye rules?',
    answer:
      'No. PulseHub helps you file guests to your provincial portal, but what is required, and of whom, is set by your provincial authorities. This is not legal advice, and you remain responsible for meeting your own obligations.',
  },
  {
    question: 'Is Hotel Eye filing available outside Pakistan?',
    answer:
      'No. Hotel Eye is a Pakistan guest-registration system, so this feature is for Pakistani operators. PulseHub manages rooms, residents, rent and payments for operators in other countries, without the Hotel Eye step.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Hotel Eye Guest Registration Software',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Hotel Eye guest registration', item: `${SITE_URL}${PATH}` },
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

export default function HotelEyePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHero
        eyebrow="Guest registration · Pakistan"
        heading="Hotel Eye Guest Registration, Built Into Your Hostel Software"
        text="PulseHub files your hostel guests to the official Hotel Eye police portal from the same place you manage rooms, residents and rent, so registration stops being a nightly chore done one CNIC at a time."
        visual={
          <div className="rounded-3xl bg-muted/40 p-6 sm:p-8">
            <div className="mx-auto max-w-[300px]">
              <ProductVideo
                src="/videos/hotel-eye.mp4"
                width={1080}
                height={1350}
                label="Hotel Eye in PulseHub"
                ariaLabel="A PulseHub demo showing hostel guests being filed to the Hotel Eye portal instead of entering each one by hand"
              />
            </div>
          </div>
        }
        split
      />

      {/* What Hotel Eye is */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>What Hotel Eye is</H2>
          <Lead>
            Hotel Eye is the guest-registration system run by provincial police in Pakistan, where hostels, guest
            houses and hotels record who is staying with them. Punjab runs it at hoteleye.punjab.gov.pk, and
            Islamabad and Sindh have their own portals. Whatever the province, the job is the same: every guest’s
            details have to reach the police portal, and doing it by hand, one CNIC at a time, is the part operators
            dread.
          </Lead>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            What is required, and of whom, is set by your provincial authorities, so treat them as the source of
            truth. This page describes how PulseHub helps you file; it is not legal advice.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Supported portals</span>
            {provinces.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-foreground/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How PulseHub files: 3 steps */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>How PulseHub files to Hotel Eye</H2>
          <Lead>Connect your portal once, then filing is a sync, not a night of data entry.</Lead>
          <ol className="mt-10 grid gap-8 sm:gap-6 lg:grid-cols-3">
            {fileSteps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-mono text-sm text-primary">{step.number}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Knows who still needs filing + status screenshot */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Always know where you stand</p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              It knows who still needs filing
            </h2>
            <Lead>
              PulseHub builds each filing from the resident record you already keep, so you are never retyping
              CNICs. It shows you exactly who is filed, who is pending, and who cannot be filed yet.
            </Lead>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {knows.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base text-foreground/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure className="mx-auto w-full max-w-[300px] rounded-2xl border border-border bg-card p-3 shadow-sm lg:mx-0">
            <ProductScreenshot
              src={hotelEyeScreenshots.status.src}
              alt={hotelEyeScreenshots.status.alt}
              width={hotelEyeScreenshots.status.width}
              height={hotelEyeScreenshots.status.height}
              frame={false}
              sizes="(max-width: 640px) calc(100vw - 3.5rem), 300px"
              className="rounded-lg"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Guests filed and pending
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Part of PulseHub for Pakistan */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>One part of running your hostel on PulseHub</H2>
          <Lead>
            Hotel Eye filing sits alongside the rest of the daily work: rooms and beds, residents and CNIC records,
            monthly rent and deposits in rupees, receipts over WhatsApp, and multi-branch reporting, all from one
            account.
          </Lead>
          <div className="mt-8">
            <CardGrid items={nextCards} columns="three" />
          </div>
          <div className="mt-8">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            />
          </div>
        </div>
      </section>

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
        heading="Clear Hotel Eye filing from your desk."
        text="Run rooms, residents, rent and Hotel Eye guest registration from one platform. Start a 14-day free trial with no card required."
        secondaryHref={routes.pakistan}
        secondaryLabel="PulseHub for Pakistan"
        note="Hotel Eye guest registration for hostels and accommodation operators in Pakistan."
      />
    </SiteShell>
  )
}
