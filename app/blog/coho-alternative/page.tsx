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

const post = getBlogPost('coho-alternative')!
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
    question: 'What is COHO?',
    answer:
      'COHO is a UK-focused property management platform for shared housing: HMOs, co-living, student and mixed lets. It handles room-level rent, UK compliance tracking, a tenant message centre, and a "Find a Home" marketplace that advertises your available rooms. It was launched in 2019 and positions itself as tenant-focused proptech.',
  },
  {
    question: 'Is PulseHub a good COHO alternative?',
    answer:
      'If you run HMOs or co-living and want more than the UK, bill shared utilities and meals on one per-resident bill, let by the bed or the night, or run hostels, PG and worker housing alongside HMOs, PulseHub fits well. It also tracks England HMO compliance, so you do not lose that by switching. If you are a UK-only landlord who mainly wants COHO’s tenant marketplace and housemate-matching, COHO may suit you better.',
  },
  {
    question: 'Does PulseHub handle UK HMO compliance like COHO?',
    answer:
      'Yes, for England. PulseHub tracks gas safety, EICR, EPC, fire-alarm and HMO-licence dates per property, shows a compliant-or-not view across your portfolio, holds the evidence files and sends reminders before deadlines. It is a tracker to keep you organised, not legal advice, and it covers England specifically rather than every UK nation.',
  },
  {
    question: 'How does PulseHub pricing compare with COHO?',
    answer:
      'They price differently. COHO publishes per-unit pricing, where a unit is roughly a bedroom, so your bill scales with the number of rooms you let. PulseHub uses per-property plans instead. Which works out cheaper depends on how many rooms each property has, so compare both against your own portfolio. Check each provider’s current pricing page before you decide.',
  },
  {
    question: 'Can PulseHub split a shared electricity bill between residents?',
    answer:
      'Yes. PulseHub meters electricity per room, prices a reading against the tariff, and splits it between the residents who shared it by their move-in dates, rather than a flat split. Water and gas can be added as recurring charges and meals as a package, so each resident gets one monthly bill for their actual share.',
  },
  {
    question: 'Can I move from COHO to PulseHub without re-keying everything?',
    answer:
      'Yes. PulseHub has bulk import for residents and rooms, so you can bring a portfolio across rather than typing it in, and export to PDF and spreadsheet whenever you want. Start a 14-day free trial to test it with your own data before you commit.',
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
        { '@type': 'ListItem', position: 3, name: 'COHO alternative', item: url },
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

const comparisonRows: { dimension: string; coho: string; pulsehub: string }[] = [
  {
    dimension: 'Primary market',
    coho: 'UK-focused, with lettings and compliance built around UK rules',
    pulsehub: 'Multi-market: UK, US, UAE, Singapore, Malaysia, India, Pakistan, the Philippines and more, with currency and terminology set per country',
  },
  {
    dimension: 'Property types',
    coho: 'HMOs, co-living, student and mixed lets',
    pulsehub: 'HMOs, co-living, student, hostels, PG and boarding houses, worker dormitories and bedspaces',
  },
  {
    dimension: 'How you let space',
    coho: 'By the room',
    pulsehub: 'By the room, the bed, or the night',
  },
  {
    dimension: 'Resident billing',
    coho: 'Room-level rent',
    pulsehub: 'One bill per resident: rent, a metered share of electricity, water and gas, and meals',
  },
  {
    dimension: 'Finding tenants',
    coho: '“Find a Home” marketplace and partner portals, with housemate matching',
    pulsehub: 'A branded public listing site per property, with live availability and an application form',
  },
  {
    dimension: 'HMO compliance',
    coho: 'Yes: certificates and licences tracked with reminders',
    pulsehub: 'Yes, for England: gas safety, EICR, EPC, fire alarm and HMO licence, with reminders',
  },
  {
    dimension: 'Tenant experience',
    coho: 'Message centre and “vibe check” feedback',
    pulsehub: 'Complaints inbox, private feedback and announcements',
  },
  {
    dimension: 'Pricing model',
    coho: 'Per unit (roughly per bedroom)',
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
              COHO
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
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.coho}</td>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.pulsehub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CohoAlternativePost() {
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
              COHO is a UK-focused platform for shared housing, strong on tenant experience, a room marketplace and UK
              compliance. PulseHub is a multi-market COHO alternative that runs HMOs and co-living by the room, the bed
              or the night, puts rent, metered utilities and meals on one bill per resident, and still tracks England
              HMO compliance.
            </strong>{' '}
            Pick COHO for a UK-only, tenant-first portfolio; pick PulseHub if you want more markets, shared-cost
            billing, a wider range of property types, or your own listing site.
          </P>
          <P>
            If you run HMOs or co-living and are weighing up COHO, this is an honest comparison rather than a takedown.
            COHO is a real, well-regarded product, and for some operators it is the right call. The aim here is to show
            what each tool is built for and who each one suits, so you can tell quickly which side of the line you are
            on. We make PulseHub, so treat this as our considered case, not a neutral review, and check both products
            against your own portfolio.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>COHO is built around the UK: UK compliance, UK lettings, and a UK tenant marketplace with housemate matching.</li>
              <li>PulseHub is multi-market and lets you run by the room, the bed or the night, across HMOs, hostels, PG and worker housing.</li>
              <li>PulseHub puts rent, a metered share of electricity, water and gas, and meals on one bill per resident; COHO tracks room-level rent.</li>
              <li>Both track HMO compliance (PulseHub for England specifically), so switching to PulseHub does not cost you the certificate and licence reminders.</li>
              <li>The two price differently (COHO per unit, PulseHub per property), so the cheaper option depends on your room counts.</li>
            </ul>
          </aside>

          <H2 id="what-coho-is">What COHO is</H2>
          <P>
            COHO is a UK proptech platform for shared housing, launched in 2019 and pitched as tenant-focused. It is
            aimed at HMO landlords, co-living operators, management companies, letting agents and rent-to-rent
            operators, and it covers HMOs, co-living, student and mixed portfolios. Its strengths are clear and worth
            stating plainly:
          </P>
          <UL>
            <li><strong>UK compliance tracking</strong> for certificates and licences such as gas safety, EICR and HMO licences, with reminders before they expire.</li>
            <li><strong>A tenant marketplace,</strong> &ldquo;Find a Home&rdquo;, that advertises your available rooms and feeds partner portals, with housemate matching to help fill rooms with compatible people.</li>
            <li><strong>A tenant message centre</strong> and a &ldquo;vibe check&rdquo; feedback feature, reflecting its focus on tenant experience and community.</li>
            <li><strong>Room-level rent tracking</strong> across mixed portfolios of HMOs, single lets and student lets.</li>
          </UL>
          <P>
            On pricing, COHO publishes a per-unit model, where a unit is roughly a bedroom, so your bill scales with the
            number of rooms you let. Check COHO&rsquo;s own pricing page for current rates, as published figures and
            third-party listings do not always agree.
          </P>

          <H2 id="what-pulsehub-is">What PulseHub is</H2>
          <P>
            <A href="/">PulseHub</A> is an operating system for shared living: hostels, student accommodation,
            co-living and HMOs, where the operator rents a bed rather than a whole flat and money arrives in pieces
            through the month. It models each property as floors, rooms and beds, keeps occupancy true so a bed is never
            double-booked, and runs across many markets with the currency, terminology and date format set per country.
          </P>
          <P>
            Its centre of gravity is billing. Each resident gets one monthly bill that gathers rent, a metered share of
            electricity split between the residents who shared it by their move-in dates, recurring charges such as
            water and gas, and meals where you provide them. Partial payments, deposits, discounts and receipts are all
            handled, and dues carry forward as a single running balance. PulseHub records payments and issues receipts;
            it is not a payment gateway, so money still moves through your own bank or wallet.
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

          <H2 id="at-a-glance">PulseHub vs COHO at a glance</H2>
          <P>
            The table below sets the two side by side on the things operators ask about most. The detail, and the
            honest caveats, follow underneath.
          </P>
          <ComparisonTable />
          <P>
            Feature lists change, so treat this as a map rather than a contract, and confirm the current detail with
            each provider. The row that matters most is usually &ldquo;primary market&rdquo;, because it shapes
            everything else.
          </P>

          <H2 id="where-pulsehub-differs">Where PulseHub differs</H2>
          <P>
            Four differences tend to decide it for operators who choose PulseHub over COHO:
          </P>
          <UL>
            <li>
              <strong>More than one market.</strong> COHO is built for the UK. PulseHub runs the same model across the{' '}
              <A href={routes.uk}>UK</A>, the US, the UAE, Singapore, Malaysia, India, Pakistan, the Philippines and
              more, so if your portfolio crosses borders, or might, you are not stuck with a UK-only tool.
            </li>
            <li>
              <strong>Shared-cost billing.</strong> Beyond rent, PulseHub meters electricity and splits it between
              residents fairly, adds water and gas as recurring charges, and bills meals, all on one per-resident bill.
              This is the core of running a shared house, and it is where a room-rent tracker leaves you doing sums by
              hand. See <A href={routes.hmoBilling}>HMO utility billing</A> for how that works.
            </li>
            <li>
              <strong>A wider range of property types.</strong> PulseHub handles not just HMOs and co-living but
              hostels, PG and boarding houses, student halls and worker dormitories, by the bed or the night. If your
              operation is broader than classic HMOs, one system covers it.
            </li>
            <li>
              <strong>Your own listing site.</strong> Rather than only advertising rooms on a shared marketplace,
              PulseHub gives each property its own branded public page with live availability, prices, photos and an
              application form, marked up so search engines and AI assistants can read it. You build demand on your own
              site and brand, not under someone else&rsquo;s.
            </li>
          </UL>
          <P>
            One thing you do not give up by moving: PulseHub tracks England HMO compliance too, including gas safety,
            EICR, EPC, fire-alarm and HMO-licence dates with reminders and evidence files. It is a tracker to keep you
            organised, not legal advice.
          </P>

          <H2 id="where-coho-suits">Where COHO may suit you better</H2>
          <P>
            It would not be an honest comparison without this section. COHO is the better fit when:
          </P>
          <UL>
            <li><strong>You are UK-only and intend to stay that way.</strong> COHO&rsquo;s whole design assumes the UK, which is a strength if that is your entire world.</li>
            <li><strong>You want a ready-made tenant marketplace.</strong> COHO&rsquo;s &ldquo;Find a Home&rdquo; brings its own stream of room-seekers and housemate matching, a genuine demand network a new operator can tap into. PulseHub gives you your own site to fill instead, which you drive.</li>
            <li><strong>Tenant experience and community are your main focus,</strong> and features like the vibe check and a polished tenant message centre are what you are buying the software for.</li>
          </UL>
          <P>
            If those describe you, COHO is a reasonable choice and you should trial it. PulseHub earns its place when the
            billing, the breadth of property types, or more than one market start to matter.
          </P>

          <H2 id="other-alternatives">Other COHO alternatives worth knowing</H2>
          <P>
            PulseHub is not the only option, and a fair comparison should say so. The UK shared-housing market also
            includes tools such as Arthur, Crib and Togetha, along with broader landlord platforms that bolt on HMO
            features. Review directories like Capterra and GetApp list more. When you shortlist, judge each one on the
            same handful of questions rather than the length of its feature list:
          </P>
          <UL>
            <li>Does it bill a <strong>room and a bed</strong>, and can it split a shared utility bill, or only track whole-unit rent?</li>
            <li>Does it match your <strong>markets and property types</strong>, now and where you are heading?</li>
            <li>Does it keep you on top of <strong>compliance</strong> for the places you operate?</li>
            <li>Can you get your <strong>data in and out</strong> cleanly, so you are never locked in?</li>
            <li>Does the <strong>pricing model</strong> suit your room counts, not just the headline number?</li>
          </UL>

          <H2 id="who-should-pick-which">Who should pick which</H2>
          <P>
            The short version: <strong>choose COHO</strong> if you are a UK-only HMO or co-living operator whose main
            needs are a tenant marketplace, housemate matching and a tenant-experience focus.{' '}
            <strong>Choose PulseHub</strong> if you want to bill rent, metered utilities and meals on one per-resident
            bill, run across more than one market, let by the bed or the night, or manage hostels, PG and worker housing
            alongside HMOs, while still tracking England HMO compliance.
          </P>
          <P>
            If you are leaning PulseHub, the quickest way to be sure is to see it on your own property type:{' '}
            <A href={routes.hmo}>HMO management</A>, <A href={routes.coliving}>co-living management</A>,{' '}
            <A href={routes.student}>student accommodation</A>, or the wider{' '}
            <A href={routes.sharedHousing}>shared-housing</A> overview. New to the category? Start with{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              COHO and PulseHub both run shared housing well; they are built for different operators. COHO is a
              UK-first, tenant-marketplace platform. PulseHub is a multi-market, bill-everything-per-resident platform
              that still covers England HMO compliance. Match the tool to where you operate, how you bill, and the kind
              of property you run, then trial the one that fits.
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
        heading="See PulseHub on your own portfolio."
        text="Run HMOs and co-living by the room, the bed or the night, with rent, metered utilities and meals on one bill per resident. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
