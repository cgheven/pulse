import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('august-hmo-software-alternative')!
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
    question: 'What is August?',
    answer:
      'August is a UK property management app for self-managing buy-to-let and HMO landlords. It links your bank account to track and match rent automatically, tracks compliance deadlines such as gas safety, EICR, EPC, deposit protection and HMO licensing, stores documents and expenses, and supports Making Tax Digital for income tax. It is mobile-first and UK-focused, with room-level tracking for HMOs.',
  },
  {
    question: 'Is PulseHub a good August alternative?',
    answer:
      'If you run shared housing as an operation rather than a few buy-to-lets, PulseHub fits well: it bills rent, a metered share of electricity, water, gas and meals on one per-resident bill, lets by the bed as well as the room, runs hostels, PG and worker housing alongside HMOs, and works across markets, not just the UK. It also tracks England HMO compliance. August is the stronger pick if your priority is UK tax filing and automatic bank-feed rent matching, which PulseHub does not do.',
  },
  {
    question: 'Does PulseHub do Making Tax Digital like August?',
    answer:
      'No. August is HMRC-recognised for Making Tax Digital for income tax, so it is built to file in the UK. PulseHub is not a tax-filing tool. It records rent and expenses, reconciles collected rent to the account each payment landed in, and exports to Excel and PDF for your accountant, but it does not submit to HMRC. If MTD filing inside the app is essential to you, August has it and PulseHub does not.',
  },
  {
    question: 'Does PulseHub match rent from a bank feed like August?',
    answer:
      'Not automatically. August links your bank and matches incoming rent to tenancies through open banking. PulseHub records each payment against the resident and asks which of your accounts it landed in, so your reconciliation ties back to a real statement, but you record it rather than it being auto-matched from a feed. It is a different model: deliberate and reconciled, not automatic.',
  },
  {
    question: 'Can PulseHub split a shared electricity bill between residents?',
    answer:
      'Yes, and this is a core difference. PulseHub meters electricity per room, prices a reading against the tariff, and splits it between the residents who shared it by their move-in dates, rather than a flat split. Water and gas can be added as recurring charges and meals as a package, so each resident gets one monthly bill for their actual share. A room-rent tracker leaves that to you.',
  },
  {
    question: 'Does PulseHub track UK HMO compliance?',
    answer:
      'Yes, for England. PulseHub tracks gas safety, EICR, EPC, fire-alarm and HMO-licence dates per property, shows a compliant-or-not view across your portfolio, holds the evidence files and sends reminders before deadlines. It is a tracker to keep you organised, not legal advice, and it covers England specifically.',
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
        { '@type': 'ListItem', position: 3, name: 'August alternative', item: url },
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

const comparisonRows: { dimension: string; august: string; pulsehub: string }[] = [
  {
    dimension: 'Primary market',
    august: 'UK, built around UK lettings, tax and compliance',
    pulsehub: 'Multi-market: UK, UAE, US, South Asia, the Philippines and more, with currency and terminology set per country',
  },
  {
    dimension: 'Built for',
    august: 'Self-managing UK buy-to-let and HMO landlords',
    pulsehub: 'Operators of HMOs, co-living, hostels, PG, student and worker housing',
  },
  {
    dimension: 'Rent reconciliation',
    august: 'Links your bank and auto-matches rent through open banking',
    pulsehub: 'Records each payment against the resident and the account it landed in; reconciled, not an automatic bank feed',
  },
  {
    dimension: 'Tax filing',
    august: 'Making Tax Digital for income tax (HMRC-recognised)',
    pulsehub: 'Not a tax-filing tool; exports to Excel and PDF for your accountant',
  },
  {
    dimension: 'Resident billing',
    august: 'Room-level rent',
    pulsehub: 'One bill per resident: rent, a metered share of electricity, water and gas, and meals',
  },
  {
    dimension: 'How you let space',
    august: 'By the room',
    pulsehub: 'By the room, the bed, or the night',
  },
  {
    dimension: 'HMO compliance',
    august: 'UK deadlines: gas safety, EICR, EPC, deposit protection, HMO licence',
    pulsehub: 'England: gas safety, EICR, EPC, fire alarm and HMO licence, with reminders and evidence files',
  },
  {
    dimension: 'Filling empty rooms',
    august: 'Not a marketing tool',
    pulsehub: 'A branded public listing page per property, with live availability and an application form',
  },
  {
    dimension: 'Pricing model',
    august: 'Per the vendor’s current plans',
    pulsehub: 'Per-property plans',
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
              August
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
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.august}</td>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.pulsehub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AugustAlternativePost() {
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
              August is a UK app for self-managing buy-to-let and HMO landlords, built around bank-feed rent matching and
              Making Tax Digital. PulseHub is a multi-market August alternative built around one bill per resident: rent,
              a metered share of electricity, water, gas and meals, let by the room, the bed or the night, with England
              HMO compliance tracked too.
            </strong>{' '}
            They lean in different directions, so the right pick depends on whether your priority is UK tax or shared-house
            operations.
          </P>
          <P>
            This is a straight comparison, not a takedown. August is a real product and the facts below are accurate as
            far as its own material goes, including the things it does that PulseHub does not. We make PulseHub, so treat
            this as our considered case rather than a neutral review, and check both against your own portfolio.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>August is UK-first, tax-first: open-banking rent matching and Making Tax Digital filing in a mobile app.</li>
              <li>PulseHub is operations-first: one bill per resident for rent, a metered share of electricity, water, gas and meals.</li>
              <li>PulseHub lets by the bed as well as the room, and runs hostels, PG and worker housing alongside HMOs, across markets.</li>
              <li>Both track England or UK HMO compliance, so you do not lose that by switching to PulseHub.</li>
              <li>August is the stronger pick if MTD filing and automatic bank-feed rent matching are your priority; PulseHub does neither.</li>
            </ul>
          </aside>

          <H2 id="what-august-is">What August is</H2>
          <P>
            August is a UK property management app aimed at self-managing landlords, from accidental and buy-to-let
            landlords up to HMO operators. It is mobile-first and built around the UK landlord&rsquo;s year. In outline,
            it does four things:
          </P>
          <UL>
            <li><strong>Bank-feed rent tracking</strong>: link your account and August matches incoming rent to tenancies through open banking.</li>
            <li><strong>Compliance deadlines</strong>: gas safety, EICR, EPC, deposit protection and HMO licensing, with reminders, and room-level tracking for HMOs.</li>
            <li><strong>Making Tax Digital</strong>: August is HMRC-recognised for MTD for income tax, with expenses and document storage behind it.</li>
            <li><strong>Reminders and records</strong>: a compliance checklist, document store and smart reminders in one place.</li>
          </UL>
          <P>
            Check August&rsquo;s own pricing page for current plans. Its strengths are specifically UK ones: open banking
            and HMRC filing are built for the UK, which is also why it does not travel beyond it.
          </P>

          <H2 id="what-pulsehub-is">What PulseHub is</H2>
          <P>
            <A href="/">PulseHub</A> is an operating system for shared living: HMOs and co-living, hostels, student
            accommodation, PG and worker housing, where the operator rents a bed rather than a whole flat and money
            arrives in pieces through the month. It models each property as floors, rooms and beds, keeps occupancy true
            so a bed is never double-booked, and runs across many markets with the currency, terminology and date format
            set per country.
          </P>
          <P>
            Its centre of gravity is billing. Each resident gets one monthly bill that gathers rent, a metered share of
            electricity split between the residents who shared it by their move-in dates, recurring charges such as water
            and gas, and meals where you provide them. Partial payments, deposits, discounts and receipts are handled,
            and dues carry forward as a single running balance. PulseHub records payments and issues receipts; it is not
            a payment gateway and not a tax-filing tool, so money moves through your own bank and your accountant handles
            filing.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={screenshots.payments.src}
              alt="PulseHub payments screen showing each resident's rent and a metered share of electricity on one monthly bill, with paid and pending status"
              width={screenshots.payments.width}
              height={screenshots.payments.height}
              label="One bill per resident · rent + metered electricity"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="at-a-glance">PulseHub vs August at a glance</H2>
          <P>
            The table below sets the two side by side on the things landlords and operators ask about most. The detail,
            and the honest caveats, follow underneath.
          </P>
          <ComparisonTable />
          <P>
            Feature lists change, so treat this as a map rather than a contract, and confirm the current detail with each
            provider. Two rows usually decide it: whether you need UK tax filing, and whether you bill shared utilities.
          </P>

          <H2 id="where-august-is-stronger">Where August is stronger</H2>
          <P>
            It is worth being plain about this, because it decides the choice for some landlords. August does two things
            PulseHub does not:
          </P>
          <UL>
            <li><strong>Making Tax Digital filing.</strong> August is HMRC-recognised and built to file your UK income tax. PulseHub records and exports the numbers but does not submit them.</li>
            <li><strong>Automatic bank-feed rent matching.</strong> August links your bank and matches rent through open banking. PulseHub records each payment and ties it to the account it landed in, but you record it rather than it arriving from a feed.</li>
          </UL>
          <P>
            If you are a UK buy-to-let landlord whose main pain is tax and reconciliation, those two things may settle it
            in August&rsquo;s favour, and that is a fair call.
          </P>

          <H2 id="where-pulsehub-differs">Where PulseHub differs</H2>
          <P>
            For operators running shared housing rather than a handful of buy-to-lets, three differences tend to decide
            it for PulseHub:
          </P>
          <UL>
            <li>
              <strong>Shared-cost billing.</strong> PulseHub meters electricity and splits it between residents fairly,
              adds water and gas as recurring charges, and bills meals, all on one per-resident bill. See{' '}
              <A href={routes.hmoBilling}>HMO utility billing</A> for how that works. This is the core of running a
              shared house, and a room-rent tracker leaves you doing it by hand.
            </li>
            <li>
              <strong>By the bed, and more property types.</strong> PulseHub lets by the bed as well as the room, and
              runs <A href={routes.hostel}>hostels</A>, <A href={routes.pg}>PG</A>, student halls and worker dormitories
              alongside HMOs. If your operation is broader than classic buy-to-lets, one system covers it.
            </li>
            <li>
              <strong>More than one market, and your own listing site.</strong> PulseHub runs the same model beyond the
              UK, and gives each property a branded public page with live availability and an application form, so you
              fill empty rooms from your own site.
            </li>
          </UL>
          <P>
            And you do not give up compliance by moving: PulseHub tracks England HMO compliance too, including gas safety,
            EICR, EPC, fire-alarm and HMO-licence dates, with reminders and evidence files. It is a tracker to keep you
            organised, not legal advice.
          </P>

          <H2 id="who-should-pick-which">Who should pick which</H2>
          <P>
            The short version: <strong>August</strong> suits a self-managing UK landlord whose priority is bank-feed rent
            matching and Making Tax Digital in a simple mobile app. <strong>PulseHub</strong> suits an operator who bills
            rent, metered utilities and meals on one per-resident bill, lets by the bed, runs hostels, PG or worker
            housing alongside HMOs, or operates in more than one market, while still tracking England HMO compliance.
          </P>
          <P>
            If you are leaning PulseHub, the quickest way to be sure is to see it on your own property type:{' '}
            <A href={routes.hmo}>HMO management</A>, <A href={routes.coliving}>co-living management</A>, or the wider{' '}
            <A href={routes.sharedHousing}>shared-housing</A> overview. Weighing another UK tool? See the{' '}
            <A href="/blog/coho-alternative">COHO alternative</A> comparison too.
          </P>

          <Box title="In short">
            <P>
              August is a UK-first, tax-first app for self-managing landlords, with open-banking rent matching and MTD
              filing PulseHub does not have. PulseHub is an operations-first platform: one bill per resident for rent,
              metered utilities and meals, letting by the bed, a wider range of property types, more than one market, and
              England HMO compliance alongside. If you run shared housing as an operation, PulseHub is built for it.
              Start a free trial and see it on your own portfolio.
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
        heading="See PulseHub on your own HMO portfolio."
        text="Run HMOs and co-living by the room or the bed, with rent, metered utilities and meals on one bill per resident, and England HMO compliance tracked. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
