import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('co-living-management-software-guide')!
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
    question: 'What is co-living management software?',
    answer:
      'Co-living management software runs the operational side of a co-living business: rooms and their occupancy across shared flats or buildings, resident records, all-inclusive rent, shared costs and utilities, deposits, maintenance and reporting, across one or more properties from one account. It is the operations layer, as distinct from a resident community or social app.',
  },
  {
    question: 'Is it also a resident community or events app?',
    answer:
      'Some products do and some do not, and the two jobs are different. PulseHub is the operations side: occupancy, residents, payments, shared costs, maintenance and reporting. It is not a community, events or resident social app. If community features matter to you, treat them as a separate tool from the system that runs your rooms and rent.',
  },
  {
    question: 'What should co-living management software do?',
    answer:
      'Let each room in a shared space on its own; keep a record for each resident on their own agreement; bill an all-inclusive monthly price; allocate shared utilities and costs across rooms; track deposits and part-payments; show room-by-room occupancy and a waiting list; log maintenance; run several buildings from one account; and report on it.',
  },
  {
    question: 'Can it handle all-inclusive rent and shared bills?',
    answer:
      'Yes, and for co-living that is central. The monthly price usually bundles rent with utilities, internet and sometimes cleaning, and shared costs have to be apportioned fairly across rooms. PulseHub bills a monthly amount per resident and allocates utilities and shared costs rather than leaving them on a separate spreadsheet.',
  },
  {
    question: 'Can it manage rooms and occupancy across several buildings?',
    answer:
      'Yes. You run every building under one login and switch between them, with a roll-up that stacks them for comparison on occupancy and collections. PulseHub ships a building switcher and a combined all-properties view, and plans scale across 1, 3 and 10 properties.',
  },
  {
    question: 'How is co-living software different from a hotel or hostel booking system?',
    answer:
      'Booking systems are built for nightly stays and availability calendars. Co-living residents take a room on a membership or tenancy that runs for months, with an all-inclusive monthly price, a deposit and a notice period. The software has to manage long-stay occupancy and recurring billing, not nightly reservations.',
  },
  {
    question: 'How much does co-living management software cost?',
    answer:
      'Pricing usually scales with the number of properties or rooms. PulseHub is priced by the number of properties, with plans for 1, 3 or 10 and a 14-day free trial that needs no card. See the pricing page for current figures in your region.',
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
        { '@type': 'ListItem', position: 3, name: 'Co-living management software', item: url },
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
  return <h3 className="mt-8 text-xl font-semibold tracking-tight sm:text-2xl">{children}</h3>
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

/** An inline product screenshot that breaks up the text and shows the real platform. */
function Figure({
  src,
  alt,
  width,
  height,
  label,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  label: string
  caption: string
}) {
  return (
    <figure className="mt-8">
      <ProductScreenshot
        src={src}
        alt={alt}
        width={width}
        height={height}
        label={label}
        sizes="(max-width: 1023px) calc(100vw - 2rem), 50rem"
      />
      <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}

export default function CoLivingManagementSoftwarePost() {
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
            Co-living management software runs the operational side of a co-living business: the rooms and who
            is in them, the all-inclusive rent, the shared bills, the deposits, the maintenance, and how every
            building is performing. It takes the parts of the job that would otherwise live in spreadsheets and
            message threads and puts them in one place.
          </P>
          <P>
            Co-living sits between a flatshare and a serviced building. Residents, usually working
            professionals, take a private room in a shared home and pay one monthly price that rolls rent and
            bills together, often on a flexible term. That model is pleasant to live in and fiddly to operate:
            the income is per room, the stays are shorter than a standard tenancy, and the bills you bundle have
            to be paid by someone. This guide covers what the software does, how to think about the community
            side versus the operational side, and how to choose a tool that fits.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Co-living management software runs the operations: rooms, residents, all-inclusive rent, shared costs and occupancy.</li>
              <li>It is a different job from a resident community or events app, and the two are often separate tools.</li>
              <li>Co-living income is per room, with shorter stays, so occupancy and turnover need close attention.</li>
              <li>All-inclusive pricing means the software has to bundle rent with bills and apportion shared costs.</li>
              <li>Choose for room-level letting, all-inclusive billing, multi-building operations and a trial on your own data.</li>
            </ul>
          </aside>

          <H2 id="what-is-it">What is co-living management software?</H2>
          <P>
            Co-living management software is the system an operator uses to run shared living day to day. It
            holds each room and its availability across your buildings, a record for every resident, the monthly
            bill, the shared costs, and the maintenance, so the business can be run from one account instead of
            a folder of spreadsheets.
          </P>
          <P>
            The defining feature is that you let and bill by the room, not by the flat. One four-bedroom
            co-living home carries four agreements, four move-in dates and four monthly bills, with the kitchen,
            bathrooms and bills shared between the people in it. The software has to treat each room as its own
            lettable, billable unit. PulseHub organises each property as individual rooms you can let and bill
            one at a time.
          </P>
          <P>
            This sits inside the wider category covered by our guide to the{' '}
            <A href={postPath('accommodation-management-system')}>accommodation management system</A>, and in
            the UK a shared co-living house can also fall under HMO rules, which our{' '}
            <A href={postPath('hmo-management-software')}>HMO management software</A> guide covers.
          </P>

          <H2 id="operations-vs-community">Operations software vs a community app</H2>
          <P>
            &ldquo;Co-living software&rdquo; is used for two different things, and it helps to keep them apart. One is the
            resident experience: a community app, event sign-ups, social feeds and messaging. The other is
            operations: rooms, occupancy, residents, billing, shared costs, maintenance and reporting. A big
            community app does not collect your rent, and a solid operations platform does not run your socials.
          </P>
          <P>
            PulseHub is firmly the operations side. It manages occupancy, residents, payments, shared costs,
            maintenance and reporting, and it is not a community, events or resident social app. That is worth
            knowing before you shortlist: decide whether you are buying the system that runs your rooms and rent,
            the tool that runs your community, or one of each.
          </P>

          <H2 id="why-different">What makes co-living different to run</H2>
          <P>A few things separate co-living from a standard buy-to-let or a block of flats:</P>
          <UL>
            <li>
              <strong>Income is per room.</strong> A vacancy is one empty room, not an empty building, so you
              track occupancy and re-lets room by room.
            </li>
            <li>
              <strong>Stays are shorter.</strong> Co-living terms often run months rather than years, so more of
              your time goes on move-ins, move-outs and keeping rooms filled.
            </li>
            <li>
              <strong>The price is all-inclusive.</strong> One monthly figure usually covers rent, utilities,
              internet and sometimes cleaning, so the bills you bundle still have to be tracked and paid.
            </li>
            <li>
              <strong>Agreements are per resident.</strong> Letting each room on its own agreement means one
              person leaving does not unravel everyone else&rsquo;s arrangement.
            </li>
            <li>
              <strong>Costs are shared.</strong> Utilities and communal expenses need apportioning across rooms
              in a way you can explain.
            </li>
            <li>
              <strong>Buildings add up.</strong> Run co-living across several sites and the admin multiplies
              unless it lives in one place.
            </li>
          </UL>

          <H2 id="features">What the software should do</H2>
          <P>
            The labels vary by product, but the operational jobs below are the ones that matter, and here is how
            PulseHub approaches each.
          </P>

          <H3>Rooms and occupancy across shared spaces</H3>
          <P>
            The system should let each room on its own and show, per building, which rooms are let, vacant or
            being held for an incoming resident. That room-level view is what co-living runs on, and it is the
            number you check first every morning. PulseHub keeps room availability current across every shared
            space as residents are allocated and move on.
          </P>
          <Figure
            src={screenshots.residents.src}
            alt={screenshots.residents.alt}
            width={screenshots.residents.width}
            height={screenshots.residents.height}
            label="Residents"
            caption="Residents, allocations, deposits and move-outs across shared spaces"
          />

          <H3>Resident records on individual agreements</H3>
          <P>
            Each resident should have their own record and their own room agreement, with their ID and
            paperwork, their term dates, the deposit and what they have paid. Individual agreements are the
            point: they let one person move on without disturbing anyone else in the house. PulseHub keeps a
            record and a running timeline for each resident.
          </P>

          <H3>All-inclusive billing and shared costs</H3>
          <P>
            A co-living bill is one monthly price that bundles rent with the services you include, and behind it
            sit utilities and communal costs that have to be apportioned across rooms. The software should bill
            the inclusive amount and allocate the shared costs, not leave them in a side spreadsheet. PulseHub
            bills each resident monthly and records utility and shared-cost allocation alongside the rent.
          </P>
          <Figure
            src={screenshots.payments.src}
            alt={screenshots.payments.alt}
            width={screenshots.payments.width}
            height={screenshots.payments.height}
            label="Payments"
            caption="Monthly bills, utility charges and payment status, per room and resident"
          />

          <H3>Occupancy, turnover and the waiting list</H3>
          <P>
            Because stays are shorter, the gap between one resident leaving and the next arriving is where
            co-living quietly loses money. A room-by-room occupancy view plus a queue of confirmed arrivals lets
            you refill a room for the week after it empties rather than the month after. PulseHub tracks
            occupancy building by building and queues each incoming resident against the room and date they are
            due.
          </P>

          <H3>Maintenance and upkeep</H3>
          <P>
            Communal kitchens, bathrooms and living space take heavy daily use, so something always needs
            attention. What matters is that a reported fault does not fall through the gaps: a resident flags it,
            it reaches whoever handles repairs, and the thread stays attached to the room it came from. In
            PulseHub a resident scans a QR code in the house to report a fault, and each one keeps its own status
            and history.
          </P>
          <Figure
            src={screenshots.complaints.src}
            alt={screenshots.complaints.alt}
            width={screenshots.complaints.width}
            height={screenshots.complaints.height}
            label="Maintenance & complaints"
            caption="Issues logged, assigned and tracked through to resolution"
          />

          <H3>Several buildings in one place</H3>
          <P>
            Co-living operators rarely stop at one house. Instead of a separate login or sheet per building, the
            whole portfolio should sit in one place you can read without exporting. PulseHub stacks every
            building into a single all-properties screen, so you can read occupancy and collections for the
            portfolio side by side rather than opening each one in turn.
          </P>

          <H3>A public page and reporting</H3>
          <P>
            A public page for each building, listing the rooms, the all-inclusive price and what is bundled in,
            gives prospective residents somewhere to look and a way to enquire. Paired with reporting on how each
            building and the portfolio are performing, it closes the loop from enquiry to occupancy. PulseHub
            publishes a listing page per property and reports on the numbers that matter. The{' '}
            <A href={routes.features}>features page</A> has the full list.
          </P>
          <Figure
            src={screenshots.website.src}
            alt={screenshots.website.alt}
            width={screenshots.website.width}
            height={screenshots.website.height}
            label="Listing page"
            caption="A public page per building with rooms, the all-inclusive price, amenities and an enquiry button"
          />

          <H2 id="choosing">How to choose the right system</H2>
          <UL>
            <li><strong>It lets a room on its own,</strong> with room-by-room occupancy across buildings.</li>
            <li><strong>All-inclusive billing</strong> that bundles rent with bills and allocates shared costs.</li>
            <li><strong>Individual resident agreements,</strong> so one departure does not disturb the rest.</li>
            <li><strong>Deposits, part-payments and clear arrears.</strong></li>
            <li><strong>Multi-building operations</strong> from one account, with a view that compares sites.</li>
            <li><strong>A clear line on community features.</strong> Decide whether you need them, and from which tool.</li>
            <li><strong>Sensible pricing and a trial</strong> so you can test it on your own rooms and rents.</li>
          </UL>
          <P>
            PulseHub is built for the operational side of co-living and is priced by the number of properties,
            with plans for 1, 3 or 10 and a 14-day free trial with no card. See{' '}
            <A href={routes.coliving}>PulseHub for co-living operators</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or <A href={routes.contact}>talk to the team</A> if you
            run a larger portfolio.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub covers co-living operations
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  PulseHub handles the operational side in the order the work happens:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  Building → Rooms → Resident → All-inclusive rent → Payments → Shared costs → All buildings
                </p>
                <ol className="mt-5 max-w-xl space-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
                  <li><strong>Building.</strong> Set up each property and the rooms inside it.</li>
                  <li><strong>Room.</strong> Make each room lettable on its own, with its price.</li>
                  <li><strong>Resident.</strong> Add a resident on their own room agreement.</li>
                  <li><strong>All-inclusive rent.</strong> Set one monthly price for the rent and bundled bills.</li>
                  <li><strong>Payments.</strong> Record what comes in, with deposits and any part-payments.</li>
                  <li><strong>Shared costs.</strong> Allocate utilities and communal costs across rooms.</li>
                  <li><strong>All buildings.</strong> Compare every property in one view.</li>
                </ol>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  These are the operational steps PulseHub handles today; the community side is deliberately left to tools built for it.
                </p>
              </div>
              <figure className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                <ProductScreenshot
                  src="/screenshots/member-ledger.png"
                  alt="A resident timeline in PulseHub, showing the monthly bill, part-payments, a deposit held, a room move and a check-out notice in one record"
                  width={866}
                  height={1522}
                  frame={false}
                  sizes="300px"
                  className="shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
                />
                <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground lg:text-left">
                  A resident&rsquo;s timeline
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-[50rem] sm:mt-16">
          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>

          <H2 id="start">Run your co-living operation on PulseHub</H2>
          <P>
            The appeal of co-living for residents is exactly what makes it work for operators: one simple price,
            a room of their own, a bit of community. Behind that simplicity sit per-room income, short stays and
            bundled bills that still have to be paid. PulseHub runs that operational layer, from rooms and
            residents to billing, shared costs, occupancy and maintenance, for every building you own. See{' '}
            <A href={routes.coliving}>PulseHub for co-living operators</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or start a free trial and set up your first building in
            minutes.
          </P>
          <div className="mt-6">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            />
          </div>
        </div>
      </article>

      <CtaBand
        heading="Run your co-living portfolio from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub set up for your co-living operation."
      />
    </SiteShell>
  )
}
