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

const post = getBlogPost('hostel-management-software')!
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
    question: 'What is hostel management software?',
    answer:
      'It is software for running a residential hostel day to day: allocating beds, keeping resident records, billing rent, meals and utilities, tracking occupancy and deposits, and logging maintenance, across one or more hostels from a single account. It is built for long-stay residents rather than nightly guests.',
  },
  {
    question: 'Is hostel management software the same as hostel booking software?',
    answer:
      'No. Booking software serves backpacker and tourist hostels: nightly reservations, an availability calendar and links to booking channels. Hostel management software serves residents who pay monthly rent, with deposits, part-payments, meals, utility bills and notice periods. If people stay for months rather than nights, you need the management kind.',
  },
  {
    question: 'What features should hostel management software have?',
    answer:
      'Bed-level allocation; a record for each resident; admissions and check-out; rent, deposits and part-payments; meal and utility billing; occupancy with a waiting list; maintenance and complaints; a way to run several hostels from one account; reports; and staff access you can limit by site.',
  },
  {
    question: 'Can it manage multiple hostels or branches?',
    answer:
      'Yes. The point of good software is to run every hostel from one login, switch between them quickly, and compare them on occupancy and collections. PulseHub does this with a site switcher and an all-sites view, and its plans cover 1, 3 or 10 properties.',
  },
  {
    question: 'Does hostel management software handle meals and utility bills?',
    answer:
      'It should, because many hostels include meals and recharge electricity. Rather than a side spreadsheet, those charges belong on the resident’s monthly statement next to rent. PulseHub bills meals and metered utilities alongside rent.',
  },
  {
    question: 'Is it suitable for student, worker or PG hostels?',
    answer:
      'Yes. Student halls, staff or worker hostels, and paying guest (PG) accommodation all let beds by the month and share the same core operations, so one system fits. The currency, the local payment methods and some terminology change by country; the workflow does not.',
  },
  {
    question: 'How much does hostel management software cost?',
    answer:
      'It usually scales with the number of hostels or beds. PulseHub is priced per property, with plans for 1, 3 or 10 and a 14-day free trial that needs no card. The pricing page shows current figures for your region.',
  },
]

const vsBookingRows = [
  {
    aspect: 'Core job',
    booking: 'Nightly reservations and availability',
    mgmt: 'Beds let by the month on a tenancy',
  },
  {
    aspect: 'Who stays',
    booking: 'Short-stay travellers',
    mgmt: 'Residents on monthly rent: students, workers, tenants',
  },
  {
    aspect: 'Billing',
    booking: 'Nightly rates, folios, channel commissions',
    mgmt: 'Monthly rent, deposits, part-payments, meals and utilities',
  },
  {
    aspect: 'Finding occupants',
    booking: 'Booking channels and OTAs',
    mgmt: 'Your own listing page and a waiting list',
  },
  {
    aspect: 'Occupancy',
    booking: 'Nightly calendar, high churn',
    mgmt: 'Month to month, with notice periods and empty beds to re-let',
  },
  {
    aspect: 'Best fit',
    booking: 'Backpacker and tourist hostels',
    mgmt: 'Student, worker, PG and residential hostels',
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
        { '@type': 'ListItem', position: 3, name: 'Hostel management software', item: url },
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

export default function HostelManagementSoftwarePost() {
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
            If you run a hostel where people stay for months rather than nights, hostel management software is
            the tool that holds the whole operation together: who sleeps in each bed, what they owe, which beds
            are free, and the running jobs like meals, bills and repairs. It works for one hostel or a dozen,
            from a single login.
          </P>
          <P>
            One distinction clears up most of the confusion around the word. A hostel can be two very different
            businesses. A backpacker or tourist hostel sells beds by the night and lives on booking channels. A
            residential hostel houses students, workers or long-stay tenants who pay by the month and stay for a
            term, a contract or longer. The two run on different numbers and need different software. This guide
            is about the residential kind.
          </P>
          <P>
            What follows is what the software does, how it differs from a booking system and from spreadsheets,
            and how to pick one that matches the way you let beds.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Hostel management software runs a residential hostel at the bed and resident level, on monthly rent.</li>
              <li>It is not hostel booking software, which exists for nightly, short-stay guests.</li>
              <li>It should bill rent, meals and utilities together, and track deposits, occupancy and maintenance.</li>
              <li>Across several hostels, the real payoff is catching empty beds and arrears before they cost you.</li>
              <li>Choose for bed-level allocation, monthly billing, a usable waiting list, and a trial on your own data.</li>
            </ul>
          </aside>

          <H2 id="what-is-it">What is hostel management software?</H2>
          <P>
            At its core, the software replaces the clipboard, the rent diary and the group chat. Every bed
            either has a current resident or sits empty. Every resident has a rent amount, a deposit and a
            move-in date. The admin that used to live in your head, and in three different places, lives in one
            record instead.
          </P>
          <P>
            A hostel is not a block of flats, and that is the whole point. You let individual beds, often several
            to a room, each to a different person on their own terms. Software made for this has to understand
            rooms and beds rather than whole units, so a single bed can be allocated, billed and tracked on its
            own. PulseHub is organised around property, building, floor, room and bed for exactly that reason.
          </P>
          <P>
            Residential hostels go by many names: student halls, worker or staff hostels, paying guest (PG)
            accommodation in India, or boarding houses elsewhere. The day-to-day work barely changes between
            them, which is why one system can serve them all. For the broader category this sits inside, see our
            guide to the <A href={postPath('accommodation-management-system')}>accommodation management system</A>.
          </P>

          <H2 id="vs-booking">Hostel management software vs hostel booking systems</H2>
          <P>
            This is the comparison that trips operators up, because both deal with beds. What really separates
            them is how long people stay, and the rest follows from that. A booking system is tuned for nightly
            guests and the channels that deliver them. A management system is tuned for residents who pay rent
            month after month.
          </P>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">
                Comparison of hostel booking software and hostel management software across common operational aspects.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">Aspect</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Booking software (backpacker)</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">Management software (residential)</th>
                </tr>
              </thead>
              <tbody>
                {vsBookingRows.map((row) => (
                  <tr key={row.aspect} className="border-b border-border/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium">{row.aspect}</th>
                    <td className="px-4 py-3 text-muted-foreground">{row.booking}</td>
                    <td className="py-3 pl-4 text-foreground/85">{row.mgmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            The quick test: price by the night and depend on booking sites, and you want a booking system. Sign
            residents onto monthly rent, hold deposits and chase part-payments, and you want hostel management
            software. PulseHub is the second kind.
          </P>

          <H2 id="who-uses">Who uses hostel management software?</H2>
          <P>It fits any operator housing people for months rather than nights:</P>
          <UL>
            <li>
              <strong>Student hostels and halls,</strong> run by colleges or private operators across the
              academic year. See our guide to{' '}
              <A href={postPath('student-accommodation-management')}>student accommodation management</A>.
            </li>
            <li>
              <strong>Paying guest (PG) accommodation,</strong> common in India, letting beds with rent, meals
              and deposits.
            </li>
            <li><strong>Staff and worker hostels,</strong> housing employees on one or more sites.</li>
            <li><strong>Boarding houses</strong> and other long-stay shared accommodation.</li>
            <li>
              <strong>Operators with several hostels</strong> who have outgrown a spreadsheet but do not want
              heavyweight enterprise software.
            </li>
          </UL>
          <P>
            The product follows the local market. PulseHub has regional versions, for example for{' '}
            <A href={routes.india}>India</A>, the <A href={routes.philippines}>Philippines</A>,{' '}
            <A href={routes.pakistan}>Pakistan</A> and the <A href={routes.uk}>UK</A>, each with pricing in the
            local currency and the payment methods operators there actually use.
          </P>

          <H2 id="features">Essential features of hostel management software</H2>
          <P>
            Product labels vary, but a hostel system worth paying for should cover the jobs below. Here is what
            each looks like in practice, and how PulseHub handles it.
          </P>

          <H3>Bed-level allocation</H3>
          <P>
            The first thing to check is whether the software can let a single bed, not just a whole room. In a
            four-bed dorm you might fill the beds with four residents on four different move-in dates and four
            different rents. PulseHub lets you allocate bed by bed and shows how each room is filling as people
            arrive and leave.
          </P>

          <H3>Resident records and onboarding</H3>
          <P>
            Every resident needs a record: contact details, ID or documents, move-in date, deposit and what they
            have paid. Keep those in one place and answering a query or settling a deposit takes seconds instead
            of a scroll back through old messages. PulseHub gives each resident a running timeline, so their
            admission, bed changes, bills, payments and any complaints read as a single story.
          </P>
          <Figure
            src={screenshots.residentsWaiting.src}
            alt={screenshots.residentsWaiting.alt}
            width={screenshots.residentsWaiting.width}
            height={screenshots.residentsWaiting.height}
            label="Residents & waiting list"
            caption="Incoming residents on the waiting list, with move-in dates and deposits received"
          />

          <H3>Rent, meals and utility billing</H3>
          <P>
            Few hostels charge rent and nothing else. Meals are often included or billed on top, and electricity
            is frequently recharged, sometimes by meter reading. The software should pull all of it onto one
            monthly statement per resident, handle part-payments and deposits properly, and make overdue amounts
            easy to spot. PulseHub can bill rent, meals and metered utilities on the same statement, and keeps
            collections and arrears on their own screen so the figures stay readable. Our guide to{' '}
            <A href={postPath('hmo-rent-tracking')}>tracking rent, payments and arrears</A> goes deeper on this one job.
          </P>
          <Figure
            src={screenshots.payments.src}
            alt={screenshots.payments.alt}
            width={screenshots.payments.width}
            height={screenshots.payments.height}
            label="Payments"
            caption="Rent and utility charges with paid, pending and overdue status, per resident"
          />

          <H3>Occupancy and a waiting list</H3>
          <P>
            Empty beds are the quiet drain on a hostel, because nobody emails to say a bed went unused last
            month. A clear occupancy view shows which beds are taken, free or reserved, and a waiting list lets
            you line up the next arrival before the current resident moves out, so the gap between them shrinks.
            PulseHub keeps a waiting list of incoming residents with their move-in dates for exactly this.
          </P>

          <H3>Maintenance and complaints</H3>
          <P>
            Shared living produces a steady stream of small repairs, and the forgotten ones are the ones that
            become complaints. You want to log an issue, put someone on it, and keep a record of what happened
            and when. In PulseHub a resident can report a problem by scanning a QR code in the hostel, and each
            issue carries its status and history.
          </P>

          <H3>Running several hostels</H3>
          <P>
            A second or third hostel should not mean a second or third spreadsheet. The software should hold
            every site in one account and let you compare them without exporting anything. PulseHub switches
            between hostels in a click and has an all-sites view that lines up occupancy, collections, costs and
            profit side by side.
          </P>
          <Figure
            src={screenshots.properties.src}
            alt={screenshots.properties.alt}
            width={screenshots.properties.width}
            height={screenshots.properties.height}
            label="All properties"
            caption="Every hostel lined up on occupancy, revenue, costs and net profit"
          />

          <H3>A public listing page</H3>
          <P>
            Filling beds is easier when enquiries come to you. A simple public page, showing rooms, rent and
            what is included, with a way to enquire or join a waiting list, turns your hostel into something
            people can find and ask about. PulseHub publishes a page like this for each hostel.
          </P>
          <Figure
            src={screenshots.website.src}
            alt={screenshots.website.alt}
            width={screenshots.website.width}
            height={screenshots.website.height}
            label="Listing page"
            caption="A public hostel page with rooms, rent, amenities and a join-waitlist button"
          />

          <H3>Reports and staff access</H3>
          <P>
            You should be able to see how one hostel and the whole group are doing without rebuilding a
            spreadsheet: occupancy, rent collected, what is outstanding and what you spent. And when a warden or
            manager runs a site, you can give them access to that site without handing over the rest of the
            business. The <A href={routes.features}>features page</A> has the full list.
          </P>

          <H2 id="vs-spreadsheets">Hostel management software vs spreadsheets</H2>
          <P>
            A spreadsheet is where most hostels begin, and for one small site it can hold up. The cracks show
            with scale: more beds, meal charges, part-payments and a second site to reconcile. A cell you forgot
            to update becomes a bed you forgot to re-let. Software earns its place by building the structure and
            the history in for you, in exchange for a monthly fee and a short setup. For the move off Excel step
            by step, see{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple properties without spreadsheets</A>.
          </P>

          <H2 id="choosing">How to choose the right hostel management software</H2>
          <UL>
            <li><strong>It lets a single bed.</strong> If it only handles whole rooms or units, it was not built for hostels.</li>
            <li><strong>Monthly rent, not nightly rates.</strong> Rent schedules, deposits, part-payments and clear arrears.</li>
            <li><strong>Meals and utilities on the bill.</strong> If you feed residents or recharge power, the statement should show it.</li>
            <li><strong>Occupancy and a waiting list</strong> you can actually act on.</li>
            <li><strong>One account for every hostel,</strong> with a view that compares them.</li>
            <li><strong>An interface</strong> your wardens and residents will use without training.</li>
            <li><strong>Pricing that fits your size,</strong> with a trial so you can test it on your own beds first.</li>
          </UL>
          <P>
            PulseHub charges by the number of properties, with plans for 1, 3 or 10 and a 14-day free trial that
            needs no card. Compare them on the <A href={routes.pricing}>pricing page</A>, or{' '}
            <A href={routes.contact}>talk to the team</A> if you run a larger group of hostels.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub works for hostels
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  PulseHub maps onto the way a hostel actually runs, one step handing to the next:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  Hostel → Rooms &amp; beds → Admission → Rent &amp; meals → Payments → Check-out → All sites
                </p>
                <ol className="mt-5 max-w-xl space-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
                  <li><strong>Hostel.</strong> Add each site, with its rooms and beds.</li>
                  <li><strong>Admission.</strong> Take an applicant off the waiting list and give them a bed.</li>
                  <li><strong>Rent and meals.</strong> Set what they pay each month, including food and metered power.</li>
                  <li><strong>Payments.</strong> Log rent and part-payments as they arrive, and hold the deposit.</li>
                  <li><strong>Check-out.</strong> Settle the final bill against the deposit when they leave.</li>
                  <li><strong>Timeline.</strong> Everything about a resident stays on one record.</li>
                  <li><strong>All sites.</strong> Compare every hostel in a single view.</li>
                </ol>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  Each step here is something PulseHub does today, not a roadmap.
                </p>
              </div>
              <figure className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                <ProductScreenshot
                  src="/screenshots/member-ledger.png"
                  alt="A resident timeline in PulseHub, showing rent charges, part-payments, a deposit held, a room move and a check-out notice in one record"
                  width={866}
                  height={1522}
                  frame={false}
                  sizes="300px"
                  className="shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
                />
                <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground lg:text-left">
                  A resident’s timeline
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

          <H2 id="start">Run your hostel on PulseHub</H2>
          <P>
            Letting beds by the month across more than one hostel outgrows a spreadsheet quickly: occupancy
            drifts, part-payments get lost, and meal and electricity charges never quite reconcile. PulseHub
            pulls beds, residents, rent, meals, utilities, occupancy and maintenance into one account, with a
            view across every hostel. Browse the <A href={routes.features}>platform features</A>, compare plans
            on the <A href={routes.pricing}>pricing page</A>, or start a free trial and set up your first hostel
            in minutes.
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
        heading="Run every hostel from one place."
        text="Start a 14-day free trial with no card, or book a demo to see PulseHub set up around how your hostel actually works."
      />
    </SiteShell>
  )
}
