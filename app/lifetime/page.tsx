import type { ReactNode } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import LifetimeGrid from '@/components/lifetime-grid'
import LtdSeatsPill from '@/components/ltd-seats-pill'
import { DashboardImage } from '@/components/product-visual'
import SiteShell from '@/components/site-shell'
import { getLtdSpots } from '@/lib/ltd-spots'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { LIFETIME_CHECKOUT_URL, SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Lifetime Deal: Pay Once, Not Every Month',
  description:
    'Pay once and keep PulseHub for life. A founder lifetime deal for HMO and accommodation operators, with limited spots. Core platform and all future updates.',
  path: routes.lifetime,
})

const faqs = [
  {
    question: 'What is the PulseHub lifetime deal?',
    answer:
      'It is a one-time payment that gives you your chosen PulseHub plan for the life of the product, with no recurring monthly or yearly fee for the core platform. It is a founder offer with a limited number of spots, meant to reward early operators who back us now.',
  },
  {
    question: 'How many spots are there, and is there a deadline?',
    answer:
      'There is a fixed number of spots, shown live on this page, and no time limit. We deliberately chose not to run a countdown timer: the only thing that ends the deal is the spots selling out. When they are all claimed, it closes.',
  },
  {
    question: 'What does "lifetime" actually cover?',
    answer:
      'Your plan at its property tier, all future core-platform updates, and support, for the life of the product. It is honest to say this is the lifetime of PulseHub as a product, used within your plan’s property limit, not an unconditional promise regardless of what happens to the company.',
  },
  {
    question: 'Are the Marketplace add-ons included in the lifetime deal?',
    answer:
      'No. The Marketplace add-ons are Ask Pulse, WhatsApp Reminders, Custom Email Domain, Late Return Alerts and Attendance Terminals. Each has its own running costs and stays a separate paid subscription. The lifetime deal covers the core platform; you can add any of these whenever you want them.',
  },
  {
    question: 'Will I ever pay anything else?',
    answer:
      'Not for the core platform on your tier. Optional extras are separate and always your choice: any of the Marketplace add-ons, and any done-for-you data migration if you want help moving in. There is no hidden renewal.',
  },
  {
    question: 'Which currency am I charged in?',
    answer:
      'Pricing is shown in your local currency. Pick your country on the pricing panel above to see the exact one-time price for each plan.',
  },
  {
    question: 'How do I claim a spot?',
    answer:
      'Pick your plan and country, then use the claim button to go to secure checkout in the Pulse billing section and pay once. Your spot is confirmed as soon as the payment goes through.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'PulseHub Founder Lifetime Deal',
      url: `${SITE_URL}${routes.lifetime}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      description:
        'A founder lifetime deal for PulseHub accommodation management software: pay once, keep your plan for life, with a limited number of spots.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Lifetime deal', item: `${SITE_URL}${routes.lifetime}` },
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

function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-tight tracking-tight ${className}`}>
      {children}
    </h2>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-5 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}

export default async function LifetimePage() {
  const spots = await getLtdSpots()

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <section className="relative overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8">
        <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div className="min-w-0 max-w-xl text-center lg:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Founder offer · limited spots</p>
            <h1 className="mt-5 text-balance font-display text-[clamp(2.2rem,5.2vw,3.75rem)] font-medium leading-[1.04] tracking-tight">
              The PulseHub Founder <span className="text-primary">Lifetime Deal</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              Pay once and keep PulseHub for life. No monthly bill for the core platform, ever. A limited number of
              spots, with no countdown: it ends only when the spots are gone.
            </p>
            <ul className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-x-5 gap-y-2 lg:mx-0 lg:justify-start">
              {['Pay once, own it for life', 'Not a subscription, no renewals', 'All future core updates'].map((point) => (
                <li key={point} className="flex items-center gap-2 text-[15px] font-medium text-foreground/80">
                  <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={LIFETIME_CHECKOUT_URL}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-7 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Claim your spot
              </a>
              <a
                href="#lifetime-pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-primary px-7 text-base font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See the plans
              </a>
            </div>
            <LtdSeatsPill className="mt-6" remaining={spots.remaining} total={spots.total} />
          </div>

          <div className="relative min-w-0 lg:-mr-8 xl:-mr-16">
            <DashboardImage
              priority
              label="Everything you keep, for life"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 50rem"
            />
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-wide text-muted-foreground lg:text-left lg:pl-4">
              The full platform, yours with one payment
            </p>
          </div>
        </div>
      </section>

      <LifetimeGrid allClaimed={spots.remaining <= 0} />

      <section className="px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-[48rem]">
          <H2>How to claim your spot</H2>
          <ol className="mt-6 space-y-4">
            {[
              {
                step: 'Review the lifetime plans',
                detail:
                  'Compare Basic, Standard and Business and see the one-time price in your currency on the panel above.',
              },
              {
                step: 'Open the billing section',
                detail:
                  'Hit "Claim this spot" to open the billing section in your Pulse account. If you are new, create your account first.',
              },
              {
                step: 'Get Lifetime and pay once',
                detail:
                  'At the top of billing, under "Pay once, own it forever", pick your tier, click Get Lifetime, and complete the one-time checkout. Your spot is confirmed as soon as the payment goes through.',
              },
            ].map((item, index) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[1.0625rem] font-semibold sm:text-lg">{item.step}</p>
                  <p className="mt-1 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[48rem]">
          <H2>Why we are running it, honestly</H2>
          <P>
            PulseHub is young, and early operators who commit now are worth more to us than a few months of
            subscription. The lifetime deal is a straight trade: you get the software for a single payment, and we get
            the cash and the trust to keep building. We would rather be upfront about that than dress it up.
          </P>
          <P>
            That is also why it is capped at a fixed number of spots and why we left off a ticking timer. A countdown
            that resets every time you reload is a cheap trick, and you would see through it. The real limit is the
            number of spots, shown live above: once they are all claimed, the deal is closed for good.
          </P>
          <H2 className="mt-14">What you are and are not getting</H2>
          <P>
            You get your plan, at its property tier, with every future update to the core platform and support, for the
            life of the product. What you are not getting is unlimited everything forever: the Marketplace add-ons (Ask
            Pulse, WhatsApp Reminders, Custom Email Domain, Late Return Alerts and Attendance Terminals) each run on real
            costs and stay separate paid subscriptions, and the deal is tied to your plan&rsquo;s property allowance. No
            hidden renewal, no asterisks beyond those.
          </P>
          <P>
            Want to try it before you commit to a lifetime spot? Start a{' '}
            <Link href={routes.pricing} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              free trial on a normal plan
            </Link>{' '}
            first, then claim a spot when you are sure.
          </P>
        </div>
      </section>

      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[48rem]">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Claim a lifetime spot"
        text="Pay once, keep PulseHub for life, and skip the monthly bill for the core platform. When the spots are gone, so is the deal."
        secondaryHref={LIFETIME_CHECKOUT_URL}
        secondaryLabel="Claim your spot"
        note={`Founder lifetime deal · ${SITE_NAME} · limited spots`}
      />
    </SiteShell>
  )
}
