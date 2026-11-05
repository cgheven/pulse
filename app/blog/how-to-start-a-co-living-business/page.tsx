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

const post = getBlogPost('how-to-start-a-co-living-business')!
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
    question: 'How much does it cost to start a co-living business?',
    answer:
      'It depends mostly on whether you lease or buy, and on how much the property needs in furniture and conversion. Leasing (renting a property and sub-letting rooms) keeps the upfront cost low: a deposit, furnishing and a few months of running costs before you fill up. Buying needs far more capital but keeps more of the profit. There is no single figure, so build a model for your own property and market rather than trusting a headline number.',
  },
  {
    question: 'Is a co-living business profitable?',
    answer:
      'It can be, and the single biggest driver is occupancy. Industry guidance commonly points to keeping occupancy in the high 80s to mid 90s percent and operating costs well under a third of revenue, with rent or mortgage as the largest cost. Below that occupancy, margins thin quickly. Treat these as general benchmarks, not guarantees, and do not build your model around full occupancy from day one.',
  },
  {
    question: 'Do you need to own the property?',
    answer:
      'No. Many operators lease a property and run co-living in it (sometimes called rental arbitrage), which needs far less capital than buying but gives thinner margins and depends on the landlord allowing it. Owning needs more upfront investment and keeps more profit. Whichever you choose, make sure the lease or title actually permits letting rooms separately.',
  },
  {
    question: 'What occupancy do you need to break even?',
    answer:
      'Your break-even occupancy is whatever covers your rent or mortgage plus running costs. Work it out before you sign: total your fixed monthly costs, divide by the rent per room, and that is how many rooms you must keep filled every month just to cover costs. The gap between that and full is your margin, and voids eat straight into it.',
  },
  {
    question: 'Do I need a licence to run co-living?',
    answer:
      'It depends entirely on where you are. Many places regulate renting rooms separately through zoning, shared-housing or rooming-house rules, and some require a licence or registration. Check with your local council or authority before you commit to a property. This is general information, not legal advice.',
  },
  {
    question: 'How do you fill the rooms?',
    answer:
      'Give the property a public listing with photos, prices and live availability, and a way to enquire or join a waitlist, then drive traffic to it. Keep the listing in sync with real occupancy so you are never chasing enquiries for rooms that are gone, and build a waitlist so a room that frees up is filled fast rather than sitting empty.',
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
        { '@type': 'ListItem', position: 3, name: 'How to start a co-living business', item: url },
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

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]">{children}</h3>
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">{children}</ul>
}

function OL({ children }: { children: ReactNode }) {
  return <ol className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary marker:font-semibold [&>li]:ml-5 [&>li]:list-decimal sm:text-lg">{children}</ol>
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

export default function HowToStartCoLivingPost() {
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
            Co-living, renting private rooms in a shared, serviced home with communal space, has gone from a niche
            idea to a real business that fills a gap between a hotel and a flat. Search how to start one, though, and
            you mostly find two things: thin posts that stop at &ldquo;find a property and build a community,&rdquo;
            and paid courses promising riches from leasing other people&rsquo;s houses. Both skip the parts that
            actually decide whether a co-living business works: the numbers, and the day-to-day running.
          </P>
          <P>
            This guide is operations-first. It covers the two ways to start (lease or own), the figures that make or
            break the margin, a practical step-by-step to launch, and the operational reality of running rooms,
            residents and bills, which is where most new operators get caught out. It is general guidance for
            operators anywhere, not legal or financial advice.
          </P>
          <P>
            <strong>
              To start a co-living business: secure a property to lease or buy, work out your break-even occupancy
              before you sign, design and price it per room, fill it from a listing with live availability, then run
              the monthly operations (admissions, one bill per resident, arrears and voids) tightly.
            </strong>
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>You can lease and run (low capital, thinner margin, landlord-dependent) or own (more capital, more profit and control).</li>
              <li>Occupancy is the number that decides profit. Work out your break-even occupancy before you sign anything.</li>
              <li>Voids are the silent killer. A room empty for a month is that month&rsquo;s margin gone.</li>
              <li>Filling rooms needs a real listing with live availability and a waitlist, not just a classifieds ad.</li>
              <li>The hard part is the operations: admissions, one bill per resident, chasing arrears and keeping occupancy true. A spreadsheet creaks fast.</li>
            </ul>
          </aside>

          <H2 id="what">What a co-living business actually is</H2>
          <P>
            A co-living business rents out private rooms (or beds) in a shared property, with communal kitchens and
            living space, usually bills included, and often light services like cleaning and a bit of community. The
            resident rents a room on a flexible term, not a whole flat on a long lease. For the operator that means
            more revenue per property than a single let, but also more work: several residents, several agreements,
            shared bills and constant turnover. It is run like a small hospitality business, not a passive buy-to-let.
          </P>

          <H2 id="lease-or-own">Lease or own: the two ways in</H2>
          <P>
            Before anything else, decide how you will hold the property, because it changes your capital, your margin
            and your risk.
          </P>
          <H3>Lease and run (rental arbitrage)</H3>
          <P>
            You rent a property on a normal lease, furnish it, and let the rooms individually for more than you pay
            in rent. The upfront cost is low, a deposit, furniture and a few months of running costs, so it is how
            most people start. The trade-off is a thinner margin and total dependence on the landlord: the lease has
            to permit letting rooms separately, and if the landlord ends it, your business ends with it. The model
            itself is legitimate, it is how most operators start; it is the get-rich hype around it that is not.
          </P>
          <H3>Own the property</H3>
          <P>
            You buy, convert and let. This needs far more capital and carries the risks of ownership, but you keep
            more of the profit, you control the asset, and you are not exposed to a landlord. Many operators start by
            leasing to prove the model, then buy once they know it works.
          </P>

          <H2 id="numbers">The numbers that decide it</H2>
          <P>
            This is the part the &ldquo;find a property and build a community&rdquo; guides skip, and it is the part
            that determines whether you have a business. Three figures matter most.
          </P>
          <UL>
            <li>
              <strong>Occupancy.</strong> This is the lever. Industry guidance commonly points at keeping occupancy in
              the high 80s to mid 90s percent; below that, the margin thins fast. Do not build your model around full
              occupancy from day one, because it takes time to fill and rooms turn over.
            </li>
            <li>
              <strong>Margin and costs.</strong> Rent or mortgage is almost always your largest cost, followed by
              bills, cleaning and maintenance. A common rough marker is keeping operating costs well under a third of
              revenue, but it varies, so model your own.
            </li>
            <li>
              <strong>Cost and revenue per room or bed.</strong> Co-living lives or dies by the room, so track revenue
              and cost at that level, not just for the property as a whole.
            </li>
          </UL>
          <Box title="Work out your break-even occupancy">
            <P>
              Before you sign a lease or buy, add up your fixed monthly costs (rent or mortgage, bills, cleaning,
              software, everything), then divide by the rent you can charge per room. That is the number of rooms you
              must keep filled every single month just to cover costs. If a property needs seven of its eight rooms
              filled to break even, you have almost no margin for voids, and you should probably walk away. The
              numbers here are illustrative; your market sets the real ones.
            </P>
          </Box>

          <H2 id="steps">A step-by-step to launch</H2>
          <OL>
            <li><strong>Validate demand and pick the property.</strong> Choose a location people actually want: near transit, workplaces or a university, with a layout that gives each resident a real private room plus genuine shared space.</li>
            <li><strong>Check zoning and licensing.</strong> Many places regulate letting rooms separately, and some require a licence or registration. Confirm it before you commit, not after.</li>
            <li><strong>Design the space.</strong> Balance private rooms against communal areas, and sort the practical things residents judge you on: wifi, a usable kitchen, storage, and enough bathrooms.</li>
            <li><strong>Set your pricing.</strong> Price per room or bed, decide what is included (bills-included is popular but puts the utility risk on you), and set a deposit.</li>
            <li><strong>Furnish and write the house rules.</strong> Furnish for shared living and wear, and write clear rules on guests, cleaning, utilities and conduct so expectations are set from day one.</li>
            <li><strong>Fill the rooms.</strong> Put the property online with photos, prices and live availability, make it easy to enquire or join a waitlist, and drive traffic to it.</li>
            <li><strong>Run it.</strong> Admissions, billing, utilities, maintenance and community, month after month. This is the real job, and the next section is about getting it right.</li>
          </OL>

          <H2 id="operations">The operations that make or break it</H2>
          <P>
            Most co-living content stops at the launch. But a co-living business is won or lost in the monthly grind,
            and it is where new operators underestimate the load. Each resident is a separate agreement, a separate
            balance and a separate set of shared costs, and they move in and out constantly. The jobs that pile up:
          </P>
          <UL>
            <li><strong>Admissions and turnover:</strong> onboarding each resident with their documents and deposit, and turning a room around fast when someone leaves.</li>
            <li><strong>One bill per resident:</strong> gathering rent and each resident&rsquo;s share of the bills into a single monthly charge, and tracking part-payments.</li>
            <li><strong>Arrears:</strong> knowing exactly who owes what, and chasing it before it builds up.</li>
            <li><strong>Occupancy and voids:</strong> keeping a true, live picture of which rooms and beds are free so you fill them before they cost you.</li>
            <li><strong>Maintenance and community:</strong> logging issues, getting them fixed, and keeping the house a place people want to stay.</li>
          </UL>
          <P>
            A spreadsheet handles a room or two. Add a few residents, bills to split and people coming and going, and
            the copying between tabs starts costing you time and the odd expensive mistake, a missed arrear, a
            double-booked bed, a room left empty because nobody updated the sheet.
          </P>

          <H2 id="software">Run it on software built for rooms and residents</H2>
          <P>
            <A href={routes.coliving}>PulseHub</A> is property management software built for exactly this model:
            renting by the room and the bed. It keeps occupancy true down to the bed so a room is never double-booked,
            gives each resident one monthly bill that gathers rent and their share of metered electricity and other
            shared costs, tracks part-payments and arrears, and shows occupancy, collections and voids across every
            property at a glance. Each property also gets a public listing page with live availability and a waitlist,
            so you fill rooms from your own site, and residents raise maintenance and get reminders without an app.
          </P>
          <div className="mt-8">
            <ProductScreenshot
              src={screenshots.payments.src}
              alt="PulseHub payments screen showing each co-living resident's rent and metered electricity on one monthly bill, with paid and overdue status"
              width={screenshots.payments.width}
              height={screenshots.payments.height}
              label="Payments · each resident's rent & metered electricity"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>
          <P>
            For the wider picture, see{' '}
            <A href={routes.coliving}>co-living management software</A> and{' '}
            <A href="/blog/co-living-management-software-guide">how to choose a co-living platform</A>, the broader{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>, and{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              Decide lease or own, work out the break-even occupancy before you sign, design a property people want to
              live in, fill it from a real listing with a waitlist, and then run the operations tightly, because
              co-living is a business won in the monthly detail, not the launch.
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
        heading="Starting a co-living business? Run it on one system."
        text="Rooms and residents, one bill each, live occupancy and a listing to fill rooms. Start a 14-day free trial with no card required."
        secondaryHref={routes.coliving}
        secondaryLabel="Co-living management software"
      />
    </SiteShell>
  )
}
