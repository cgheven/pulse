import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { indiaScreenshots as shots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('rentok-alternative')!
const url = `${SITE_URL}${postPath(post.slug)}`
const imageUrl = `${SITE_URL}${post.image.src}`

const base = pageMetadata({
  title: post.title,
  description: post.description,
  path: postPath(post.slug),
})

export const metadata: Metadata = {
  ...base,
  openGraph: {
    ...base.openGraph,
    type: 'article',
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    images: [{ url: imageUrl, width: post.image.width, height: post.image.height, alt: post.image.alt }],
  },
  twitter: {
    ...base.twitter,
    images: [imageUrl],
  },
}

const faqs = [
  {
    question: 'What is RentOk?',
    answer:
      'RentOk is an India-focused, mobile-app-first management tool for PG, hostel and flat owners, built by EazyApp Tech. It handles rent collection with UPI AutoPay, tenant verification with Aadhaar e-KYC, reminders, lead generation, expenses and maintenance, mainly for the Indian market.',
  },
  {
    question: 'Is PulseHub a good RentOk alternative?',
    answer:
      'If you want deeper operations, true bed-level occupancy, one bill per resident for rent, food and a metered share of electricity, kitchen costs, deposits and a view across several PGs, PulseHub fits well, and it is not locked to India alone. If the one thing you need is native UPI auto-debit on a phone app, an India-specific tool like RentOk may suit you better.',
  },
  {
    question: 'Does PulseHub do UPI AutoPay and Aadhaar e-KYC like RentOk?',
    answer:
      'No, and we are clear about that. PulseHub records payments and issues receipts rather than acting as a payment gateway, so it does not auto-debit rent through UPI AutoPay, and it keeps each resident’s ID and document on file rather than running automated Aadhaar e-KYC. Residents pay the way you already collect and you record it, with automatic WhatsApp reminders chasing what is due.',
  },
  {
    question: 'Can PulseHub split a shared electricity bill between residents?',
    answer:
      'Yes, and this is a core difference. PulseHub meters each room, prices the units at your tariff, and splits the charge between the residents who shared the room by their join dates, rather than a flat split, landing it on the same monthly bill as rent and food.',
  },
  {
    question: 'How does pricing compare?',
    answer:
      'They price differently. RentOk publishes per-tenant pricing (for example a monthly charge per tenant on AutoPay), so your bill scales with tenant count. PulseHub uses per-property plans instead. Which is cheaper depends on how full your PGs are, so compare both against your own numbers, and check each provider’s current pricing.',
  },
  {
    question: 'Can I switch from RentOk to PulseHub without re-entering everything?',
    answer:
      'Yes. PulseHub has bulk import for residents and rooms, so you can bring a PG across rather than typing it in, and export to PDF and spreadsheet whenever you want. Start a 14-day free trial to test it with your own data before you commit.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.heading,
      description: post.description,
      image: [imageUrl],
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${SITE_URL}${BLOG_BASE}#blog` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${BLOG_BASE}` },
        { '@type': 'ListItem', position: 3, name: 'RentOk alternative', item: url },
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

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
      {children}
    </h2>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">{children}</ul>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  const className =
    'font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
  if (external) {
    return (
      <a href={href} className={className} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
      <div className="mt-4 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 sm:text-lg">{children}</div>
    </div>
  )
}

const comparisonRows: { dimension: string; rentok: string; pulsehub: string }[] = [
  {
    dimension: 'Primary market',
    rentok: 'India, built around Indian PG and rental operators',
    pulsehub: 'India and beyond, adapting currency, wording and payment methods per market',
  },
  {
    dimension: 'Platform',
    rentok: 'Mobile-app first',
    pulsehub: 'Web-based, works on any device',
  },
  {
    dimension: 'Rent payments',
    rentok: 'UPI AutoPay auto-debit and online payments',
    pulsehub: 'Records payments (cash, bank, wallet) with automatic WhatsApp reminders',
  },
  {
    dimension: 'Tenant KYC',
    rentok: 'Automated Aadhaar e-KYC',
    pulsehub: 'ID type, number and document kept on file',
  },
  {
    dimension: 'Shared electricity',
    rentok: 'Rent and expense tracking',
    pulsehub: 'Metered and split between residents by join dates',
  },
  {
    dimension: 'Food and mess',
    rentok: 'Rent-collection focus',
    pulsehub: 'Food packages with kitchen cost tracked per resident',
  },
  {
    dimension: 'Filling vacancies',
    rentok: 'Lead generation',
    pulsehub: 'Your own public PG page with live vacancies and a waitlist',
  },
  {
    dimension: 'Pricing model',
    rentok: 'Per tenant',
    pulsehub: 'Per property',
  },
]

function ComparisonTable() {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[40rem] border-collapse text-left text-[0.95rem] leading-[1.6] sm:text-base">
        <thead>
          <tr className="bg-muted/60">
            <th scope="col" className="w-[22%] px-4 py-3 align-top font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:px-5">
              &nbsp;
            </th>
            <th scope="col" className="w-[39%] px-4 py-3 align-top font-display text-base font-medium tracking-tight sm:px-5">
              RentOk
            </th>
            <th scope="col" className="w-[39%] px-4 py-3 align-top font-display text-base font-medium tracking-tight text-primary sm:px-5">
              PulseHub
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.dimension} className="border-t border-border align-top">
              <th scope="row" className="px-4 py-4 text-left font-medium text-foreground/90 sm:px-5">
                {row.dimension}
              </th>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.rentok}</td>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.pulsehub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function RentOkAlternativePost() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <article className="px-4 pb-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="px-1.5" aria-hidden="true">/</span>
            <Link href={BLOG_BASE} className="hover:text-primary">Blog</Link>
          </nav>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-primary">{post.category}</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-tight">
            {post.heading}
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time> · {post.readingMinutes} min read
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <ProductScreenshot
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            priority
            label={post.image.label}
            sizes="(max-width: 1024px) calc(100vw - 2rem), 64rem"
          />
        </div>

        <div className="mx-auto mt-10 max-w-[50rem]">
          <P>
            <strong>
              RentOk is an India-native, mobile-first app for PG, hostel and flat owners, strong on UPI AutoPay and
              Aadhaar e-KYC. PulseHub is a web-based RentOk alternative with deeper operations: true bed-level occupancy,
              one bill per resident for rent, food and a metered share of electricity, kitchen costs and a view across
              every PG, running in India and other markets.
            </strong>{' '}
            If native UPI auto-debit on a phone is your one must-have, an India-specific app fits that; if deep
            operations, or more than one market, matter, PulseHub is built for it.
          </P>
          <P>
            If you run a PG or hostel and are weighing up RentOk, this is a straight comparison rather than a takedown:
            RentOk is a real, popular product and the facts about it below are accurate. The aim is to show what each
            tool is built for, so you can tell quickly which one fits how you operate. We make PulseHub, so treat this as
            our considered case rather than a neutral review, and check both against your own PG.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>RentOk is India-native and mobile-first, with UPI AutoPay auto-debit and Aadhaar e-KYC built in.</li>
              <li>PulseHub is web-based and goes deeper on operations: bed-level occupancy, rent, food and metered electricity on one bill.</li>
              <li>PulseHub records payments and sends WhatsApp reminders; it does not auto-debit via UPI AutoPay.</li>
              <li>PulseHub is not built for India alone; it adapts currency, wording and local payment methods to your market.</li>
              <li>Pricing differs: RentOk per tenant, PulseHub per property, so the cheaper option depends on your occupancy.</li>
            </ul>
          </aside>

          <H2 id="what-rentok-is">What RentOk is</H2>
          <P>
            RentOk is an Indian property-management app for PG, hostel, flat and co-living owners, made by EazyApp Tech
            and built mobile-first. It is aimed squarely at the Indian market, and in outline it does these things:
          </P>
          <UL>
            <li><strong>Rent collection with UPI AutoPay,</strong> so rent can be auto-debited from a tenant, plus online payments.</li>
            <li><strong>Aadhaar e-KYC</strong> for tenant verification at onboarding.</li>
            <li><strong>Reminders and lead generation,</strong> chasing dues and bringing in enquiries for vacant beds.</li>
            <li><strong>Rooms, expenses and maintenance,</strong> with reports exportable to PDF and Excel.</li>
          </UL>
          <P>
            Those India-native payment and KYC features are a genuine strength if you operate only in India and want
            everything on a phone. On pricing, RentOk publishes a per-tenant model (for example a monthly charge per
            tenant on AutoPay), so your bill scales with tenant count. Check RentOk’s own pricing for current rates, as
            published figures and third-party listings do not always agree.
          </P>

          <H2 id="what-pulsehub-is">What PulseHub is</H2>
          <P>
            <A href={routes.pg}>PulseHub is PG and hostel management software</A> built around the operations of running
            shared accommodation. It models each PG as floors, rooms and beds, keeps occupancy true so a bed is never
            double-booked, and gives every resident one monthly bill that gathers rent, food where it is part of the
            package, and a metered share of electricity, with part-payments recorded as installments against a running
            balance. The kitchen’s own costs are tracked so you can see the real cost per resident, deposits are held and
            settled at check-out, and every PG rolls up into one portfolio view. It records payments and chases dues with
            automatic WhatsApp reminders, with numbered receipts to share; it is web-based and runs across India and
            other markets.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={shots.payments.src}
              alt={shots.payments.alt}
              width={shots.payments.width}
              height={shots.payments.height}
              label="Payments · rent, metered electricity & WhatsApp receipts"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="at-a-glance">PulseHub vs RentOk at a glance</H2>
          <P>
            The table sets the two side by side on what PG operators ask about most. The honest detail follows
            underneath.
          </P>
          <ComparisonTable />
          <P>
            Feature lists change, so treat this as a map rather than a contract, and confirm the current detail with each
            provider. The rows that usually decide it are payments and market: how you want to collect rent, and whether
            you operate only in India.
          </P>

          <H2 id="where-pulsehub-differs">Where PulseHub differs</H2>
          <P>Four differences tend to decide it for operators who choose PulseHub:</P>
          <UL>
            <li>
              <strong>Metered electricity, split fairly.</strong> PulseHub meters each room and splits the charge between
              the residents who shared it by their join dates, onto the same bill as rent. A flat share, or tracking it
              outside the system, is where a rent-first tool leaves you doing sums by hand.
            </li>
            <li>
              <strong>Food and mess, costed properly.</strong> Food can sit in a resident’s package, and the kitchen’s
              groceries, gas and cook wages are recorded, so you can see the real cost per resident rather than guessing
              whether the mess pays for itself.
            </li>
            <li>
              <strong>Not built for India alone.</strong> PulseHub runs PGs and hostels in{' '}
              <A href={routes.india}>India</A> and other markets, adapting currency and local payment methods, so if you
              ever operate beyond India, one system comes with you.
            </li>
            <li>
              <strong>Your own listing page.</strong> Rather than only feeding a lead marketplace, each PG gets its own
              public page with live vacancies, rent, amenities and a WhatsApp button, so enquiries come to you.
            </li>
          </UL>
          <P>
            One honest boundary, so you can judge the fit. PulseHub records payments rather than auto-debiting them, so
            it does not do UPI AutoPay, and it keeps ID and documents rather than running automated Aadhaar e-KYC. If
            native UPI auto-debit on a phone app is the single thing you are buying for, an India-specific tool does that
            more directly. PulseHub earns its place when the operations, or more than one market, start to matter.
          </P>

          <H2 id="who-should-pick-which">Who should pick which</H2>
          <P>
            The short version: <strong>PulseHub</strong> is the one to pick if you want bed-level occupancy with rent,
            food and metered electricity on one bill, kitchen costs tracked, your own listing page, and one system that
            is not locked to India alone. RentOk is narrower by design: an India-only, phone-first tool centred on UPI
            auto-debit and Aadhaar, so the more your needs go beyond collecting rent on a phone in India, the more
            PulseHub gives you.
          </P>
          <P>
            If you are leaning PulseHub, the quickest way to be sure is to see it on your own setup:{' '}
            <A href={routes.pg}>PG management software</A>, <A href={routes.hostel}>hostel management software</A>, or{' '}
            <A href={routes.india}>PulseHub for India</A>. New to the category? Read our guide to{' '}
            <A href="/blog/pg-management-software">PG management software in India</A>.
          </P>

          <Box title="In short">
            <P>
              RentOk and PulseHub both run PGs, but they are built for different operators. RentOk is an India-first,
              phone-first tool centred on UPI auto-debit and Aadhaar. PulseHub is an operations-first, web-based platform
              that bills rent, food and metered electricity per resident, tracks kitchen costs, and is not locked to
              India alone. Match the tool to how you collect rent, how deep your operations go, and the markets you run
              in, then trial the one that fits.
            </P>
          </Box>
        </div>
      </article>

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        heading="See PulseHub on your own PG."
        text="Rooms and beds, one bill per resident for rent, food and metered electricity, and every PG in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.pg}
        secondaryLabel="PG management software"
      />
    </SiteShell>
  )
}
