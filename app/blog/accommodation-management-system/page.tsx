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

const post = getBlogPost('accommodation-management-system')!
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
    question: 'What is an accommodation management system?',
    answer:
      'An accommodation management system is software for running residential or shared accommodation at the room and resident level. It keeps rooms and beds, residents, rent and payments, occupancy, utilities and maintenance in one place, across one or more properties, so an operator can run day-to-day operations without disconnected spreadsheets.',
  },
  {
    question: 'What is the difference between an accommodation management system and a hotel PMS?',
    answer:
      'A hotel property management system is built around nightly reservations, folios and distribution channels for short-stay guests. An accommodation management system is built around longer stays: residents on monthly rent, deposits, part-payments, utility bills and notice periods. If you let rooms by the month rather than by the night, the second model fits.',
  },
  {
    question: 'Who needs accommodation management software?',
    answer:
      'It suits operators who manage accommodation by the room or bed rather than by the whole property: HMO and shared-house landlords, student accommodation operators, hostels and boarding houses, co-living operators, and staff or worker accommodation providers. It is most useful once you run more than one property or juggle part-payments and voids.',
  },
  {
    question: 'What features should an accommodation management system have?',
    answer:
      'At a minimum: a structure of property, rooms and beds; resident records; admissions, allocation and check-in or check-out; rent and payment tracking with deposits and part-payments; utility or bill allocation; occupancy and voids; maintenance and complaints; multi-property management; reports; and staff access with permissions.',
  },
  {
    question: 'Can accommodation management software manage multiple properties?',
    answer:
      'Yes. A capable system runs every property or branch from one account, with an easy way to switch between them and a portfolio view that compares them. PulseHub includes a property switcher and an all-properties view, and its plans cover 1, 3 or 10 properties.',
  },
  {
    question: 'Does accommodation management software work in different countries?',
    answer:
      'The core operations (rooms, residents, rent, occupancy, utilities and maintenance) are the same everywhere, so the software is useful internationally. What changes between countries is terminology, currency, payment methods and local legal or licensing rules. Regional versions of PulseHub add locally relevant details, but no software removes your obligation to follow local law.',
  },
  {
    question: 'How much does accommodation management software cost?',
    answer:
      'Pricing varies by provider and usually scales with the number of properties or rooms. PulseHub is priced by the number of properties, with plans for 1, 3 or 10, and a 14-day free trial with no card required. See the pricing page for current figures in your region.',
  },
]

const vsPmsRows = [
  {
    aspect: 'Core unit',
    pms: 'Room-nights and nightly reservations',
    ams: 'Rooms and beds let for months, with ongoing tenancies',
  },
  {
    aspect: 'Who stays',
    pms: 'Short-stay guests on nightly rates',
    ams: 'Residents or tenants on monthly rent',
  },
  {
    aspect: 'Billing',
    pms: 'Folios, nightly rates, channel commissions',
    ams: 'Monthly rent, deposits, part-payments and utility bills',
  },
  {
    aspect: 'Getting occupants',
    pms: 'OTA and GDS channel management',
    ams: 'Own listing page and waitlist; no OTA needed',
  },
  {
    aspect: 'Occupancy',
    pms: 'Nightly availability calendar',
    ams: 'Long-stay occupancy, voids and notice periods',
  },
  {
    aspect: 'Best fit',
    pms: 'Hotels, B&Bs and short-stay lets',
    ams: 'HMOs, student housing, hostels, co-living and staff accommodation',
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
        { '@type': 'ListItem', position: 3, name: 'Accommodation management system', item: url },
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

export default function AccommodationManagementSystemPost() {
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
            An accommodation management system is software for running residential or shared accommodation at
            the room and resident level. It keeps rooms and beds, residents, rent and payments, occupancy,
            utilities and maintenance in one place, across one or more properties, so you can run the operation
            from a single account instead of a stack of spreadsheets.
          </P>
          <P>
            The phrase covers a lot of ground, and search results for it mix hotel booking software, campus
            tools and facilities systems. This guide is written for a specific reader: an operator who lets
            rooms or beds by the month rather than by the night. That includes HMOs and shared houses, student
            accommodation, hostels and boarding houses, co-living, and staff or worker accommodation.
          </P>
          <P>
            If that is you, the sections below explain what the software does, the features that actually
            matter, how it differs from a hotel system and from spreadsheets, and how to choose one that fits
            how you operate.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>An accommodation management system runs accommodation at the room and resident level, not as a single tenancy.</li>
              <li>It keeps rooms and beds, residents, rent, occupancy, utilities and maintenance in one place, across several properties.</li>
              <li>It is built for monthly stays, which makes it different from a hotel PMS or a booking marketplace.</li>
              <li>The biggest gains are visible occupancy, accurate arrears, bills split fairly, and a portfolio view.</li>
              <li>When choosing, look for room-and-bed structure, clear rent and arrears, real multi-property support, and a trial on your own data.</li>
            </ul>
          </aside>

          <H2 id="what-is-it">What is an accommodation management system?</H2>
          <P>
            Put plainly, it replaces the pile of spreadsheets, document folders and chat threads that most
            operators run on. It records who lives in each room, what rent and charges they owe, which rooms
            sit empty, and the recurring jobs such as utility bills, maintenance and complaints, and it holds
            all of that across every property behind one login.
          </P>
          <P>
            The defining idea is the unit of management. General lettings or sales software treats a property
            as one unit with one tenancy. Accommodation operators do not work that way. A single building can
            hold many rooms and beds, each with its own resident, start date, rent and deposit, plus shared
            kitchens and bathrooms and bills that need splitting. Software built for this models the property as
            a structure of rooms and beds, so a room is something you can fill, bill and track on its own.
          </P>
          <P>
            Terminology varies by country and by property type. Some operators say residents, others say
            tenants or boarders; some charge rent, others call it accommodation fees. The property itself has
            different names: a house in multiple occupation (HMO) in the UK, a paying guest (PG) accommodation
            or hostel in India, a dormitory or bedspace in the Philippines, a rooming house or shared housing in the
            United States, and a boarding house in many other
            markets. Some of these carry local licensing rules, the UK HMO among them, but the underlying
            operations are the same wherever you are, which is why one system can serve all of them.
          </P>

          <H2 id="who-needs">Who needs an accommodation management system?</H2>
          <P>It is most useful for anyone managing accommodation by the room or bed rather than by the whole property:</P>
          <UL>
            <li>
              <strong>HMO and shared-housing operators</strong> renting rooms individually in houses that share
              facilities. See our guide to{' '}
              <A href={postPath('hmo-management-software')}>HMO management software</A>.
            </li>
            <li>
              <strong>Student accommodation operators</strong>, known as student housing operators in the US,
              running halls or student houses through the letting cycle. See{' '}
              <A href={postPath('student-accommodation-management')}>student accommodation management</A>.
            </li>
            <li>
              <strong>Hostels, boarding houses, dormitories and PG accommodation</strong> with longer-stay
              residents rather than nightly tourists.
            </li>
            <li>
              <strong>Co-living operators</strong> running{' '}
              <A href={routes.coliving}>shared-living sites</A> with communal space and shared bills.
            </li>
            <li>
              <strong>Staff and worker accommodation providers</strong> housing employees across one or more
              sites.
            </li>
            <li>
              <strong>Small and mid-sized portfolios</strong> that have outgrown a spreadsheet but do not need
              heavyweight enterprise software. A typical fit is a portfolio of 1 to 10 properties.
            </li>
          </UL>

          <H2 id="features">Essential features of an accommodation management system</H2>
          <P>
            The exact labels differ between products, but a system worth adopting should cover the jobs below.
            Here is what each one looks like in practice, with how PulseHub handles it where relevant.
          </P>

          <H3>Rooms, beds and property structure</H3>
          <P>
            The software should mirror how the building is actually laid out: a property, the rooms inside it,
            and the beds inside shared rooms. In a hostel dorm or a student flat you let an individual bed; in a
            co-living house, an individual room. PulseHub is organised around property, building, floor, room
            and bed, so the smallest lettable space can be allocated, billed and tracked on its own rather than
            disappearing inside one whole-property tenancy.
          </P>

          <H3>Resident and tenant records</H3>
          <P>
            Each resident should have their own record: contact details, dates, documents, deposit and payment
            history. The value is having that history in one place instead of rebuilding it from email. In
            PulseHub, each resident has a timeline that gathers admissions, room changes, charges, payments,
            deposits and complaints in a single view, so a question about one person is answered on one screen.
          </P>
          <Figure
            src={screenshots.residents.src}
            alt={screenshots.residents.alt}
            width={screenshots.residents.width}
            height={screenshots.residents.height}
            label="Residents"
            caption="Resident records, with deposits, notices and check-outs in one place"
          />

          <H3>Admissions, allocation and check-in or check-out</H3>
          <P>
            Moving someone in and out is a process, not a single action. Good software handles applications or a
            waiting list, allocates a room or bed, records the deposit, and later runs a clean check-out that
            settles any final charges against the deposit. Keeping this inside the system means the record is
            complete rather than scattered across messages.
          </P>

          <H3>Rent and payment tracking</H3>
          <P>
            This is the part that pays for itself. At any moment you should be able to see what is owed, what
            has been paid and what is overdue, for each resident and each room, without rebuilding a spreadsheet
            at the start of every month. In practice that means rent schedules, advance and part-payments,
            deposits and receipts held together. PulseHub keeps these on a payments screen that sits apart from
            each resident&rsquo;s history, so collections and arrears stay readable even when a dozen part-payments
            land in a single week. For a closer look at this one job, see{' '}
            <A href={postPath('hmo-rent-tracking')}>tracking rent, payments and arrears</A>.
          </P>
          <Figure
            src={screenshots.payments.src}
            alt={screenshots.payments.alt}
            width={screenshots.payments.width}
            height={screenshots.payments.height}
            label="Payments"
            caption="Rent, utility charges and payment status, per room and resident"
          />

          <H3>Utility and bill allocation</H3>
          <P>
            Shared accommodation usually means shared costs. Electricity, gas, water and internet often sit with
            the operator and have to be divided fairly across rooms or residents, sometimes from meter readings.
            Adding those charges to the bill alongside rent, instead of tracking them in a parallel spreadsheet,
            keeps a resident&rsquo;s statement complete and quick to produce. PulseHub supports utility charges,
            including metered electricity, on a resident&rsquo;s bill.
          </P>

          <H3>Occupancy and voids</H3>
          <P>
            Empty space is the quietest cost in accommodation: nobody emails to say a bed is sitting unused.
            Occupancy tracking shows at a glance which rooms and beds are taken, free or reserved, so a void
            becomes a re-let plan rather than a gap you notice on the next bank statement. For a hostel or
            student site turning over dozens of beds a term, that visibility is most of the job.
          </P>

          <H3>Maintenance and complaints</H3>
          <P>
            Repairs and complaints never stop in shared housing, and a lost request turns into a bigger problem
            fast. The software should let you log an issue, assign it to someone, and keep a dated record of
            what was done, which protects you and keeps residents informed. PulseHub tracks maintenance and
            complaints with their status and history, and lets a resident raise an issue from the property by
            scanning a QR code.
          </P>
          <Figure
            src={screenshots.complaints.src}
            alt={screenshots.complaints.alt}
            width={screenshots.complaints.width}
            height={screenshots.complaints.height}
            label="Maintenance & complaints"
            caption="Issues logged, assigned and tracked through to resolution"
          />

          <H3>Multi-property management</H3>
          <P>
            The moment you run a second site, the goal is to stop treating each one as a separate island with
            its own spreadsheet. A capable system pulls every property into one account, with a quick switch
            between them and a portfolio view that puts them side by side. PulseHub has a property switcher and
            an all-properties view that compares occupancy, collections, costs and profit across sites. For the
            wider version of this problem, see{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple properties without spreadsheets</A>.
          </P>
          <Figure
            src={screenshots.properties.src}
            alt={screenshots.properties.alt}
            width={screenshots.properties.width}
            height={screenshots.properties.height}
            label="All properties"
            caption="Every property compared on occupancy, revenue, costs and net profit"
          />

          <H3>Reports and financial visibility</H3>
          <P>
            Numbers you cannot see do not help you. Reporting should let you answer how one property is doing
            and how the whole operation is doing without a weekend of adding up tabs: occupancy, rent collected,
            outstanding balances, expenses and a per-property comparison, enough to catch a problem while it is
            still small. You can see the full set of tools on the <A href={routes.features}>features page</A>.
          </P>

          <H3>Staff access and permissions</H3>
          <P>
            If a manager looks after one site, role-based access lets them see and do what they need without
            handing over the whole business. Shared access also avoids the overwriting and version problems that
            come with a spreadsheet passed between people.
          </P>

          <H2 id="benefits">Benefits of an accommodation management system</H2>
          <P>
            The features matter because of the outcomes they produce. In day-to-day terms, a good system gives
            you:
          </P>
          <UL>
            <li><strong>Fewer surprises.</strong> Voids and arrears are visible early, while you can still act on them.</li>
            <li><strong>Accurate money.</strong> Rent, part-payments, deposits and utility charges add up correctly, per room and per resident.</li>
            <li><strong>Less admin.</strong> One source of truth replaces email, spreadsheets and chat threads, so routine questions take seconds.</li>
            <li><strong>A portfolio view.</strong> You can compare properties and see how the whole operation is performing without rebuilding the numbers.</li>
            <li><strong>A record you can trust.</strong> Each resident&rsquo;s history is kept automatically, which helps with disputes, deposits and handovers.</li>
          </UL>
          <P>
            None of this requires the software to be clever. The gain comes from a structure that is already
            built for rooms, residents and rent, keeping a history you did not have to maintain by hand.
          </P>

          <H2 id="vs-pms">Accommodation management system vs hotel PMS</H2>
          <P>
            This is the comparison that causes the most confusion, because both deal with rooms. The difference
            is the length of stay and everything that follows from it. A hotel property management system (PMS)
            is built around nightly reservations and distribution; an accommodation management system is built
            around monthly stays and ongoing residents.
          </P>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">
                Comparison of a hotel property management system and an accommodation management system across common operational aspects.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">Aspect</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Hotel PMS / booking system</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">Accommodation management system</th>
                </tr>
              </thead>
              <tbody>
                {vsPmsRows.map((row) => (
                  <tr key={row.aspect} className="border-b border-border/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium">{row.aspect}</th>
                    <td className="px-4 py-3 text-muted-foreground">{row.pms}</td>
                    <td className="py-3 pl-4 text-foreground/85">{row.ams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            A simple test: if you quote a nightly rate and rely on booking channels, you are closer to the hotel
            model. If you sign residents onto monthly rent, hold deposits and chase part-payments, you need
            accommodation management software. Some operators run a mix, but most lean clearly one way.
          </P>

          <H2 id="vs-spreadsheets">Accommodation management system vs spreadsheets</H2>
          <P>
            Most operators start with a spreadsheet, and for a single small property it can be enough. It is
            free, flexible and familiar. The strain shows as you add properties, rooms and part-payments: room
            structure has to be maintained by hand, part-payments are easy to get wrong, voids are checked
            manually, and a shared file risks people overwriting each other. Software removes that overhead
            because the structure and the history are built in, at the cost of a monthly subscription and a
            short setup. For a step-by-step view of moving off Excel, see our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple properties without spreadsheets</A>.
          </P>

          <H2 id="choosing">How to choose the right accommodation management system</H2>
          <P>When you compare options, weigh them against how you actually operate:</P>
          <UL>
            <li><strong>Built for rooms and beds.</strong> If it cannot let a room or a bed, it is not accommodation management software.</li>
            <li><strong>Clear rent and arrears.</strong> Part-payments, deposits and overdue balances handled properly, not bolted on.</li>
            <li><strong>Real multi-property support.</strong> One account, easy switching, and a portfolio view.</li>
            <li><strong>Occupancy you can act on.</strong> Voids and availability visible at a glance.</li>
            <li><strong>Utility and bill handling,</strong> if you recharge electricity, gas or water to residents.</li>
            <li><strong>A simple interface.</strong> Software only helps if your team will actually use it, so a low learning curve matters.</li>
            <li><strong>Sensible pricing and a trial.</strong> Matched to your number of properties, with a free trial so you can test it on your own rooms and rents.</li>
            <li><strong>A regional fit.</strong> Currency, terminology and payment methods that match how you operate.</li>
          </UL>

          <H2 id="global">Does an accommodation management system work across countries?</H2>
          <P>
            Yes, because the core operations do not change with the border. Rooms and beds, residents, rent,
            occupancy, utilities and maintenance are universal. What changes is the wrapper around them:
            currency, the words operators use (a PG, a dormitory, an HMO and a boarding house all describe the
            same core model), accepted payment methods, and local legal or licensing rules.
          </P>
          <P>
            A system that serves multiple markets handles the universal parts the same way and adapts the local
            details. PulseHub publishes regional versions, for example for the{' '}
            <A href={routes.uk}>UK</A>, <A href={routes.india}>India</A>, the{' '}
            <A href={routes.philippines}>Philippines</A> and <A href={routes.pakistan}>Pakistan</A>, with pricing
            in the local currency and locally relevant details such as accepted payment methods. One point is
            worth stating plainly: software helps you run the operation, but it does not
            remove your responsibility to follow the law where you operate, including licensing, tax and tenancy
            rules. In the UK, for example, HMO licensing is your obligation regardless of the tools you use. See
            our guide to <A href={postPath('hmo-compliance')}>HMO compliance in England</A> for what that
            involves.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub works as an accommodation management system
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  PulseHub is built around the sequence accommodation actually follows, each step feeding the next:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  Property → Rooms &amp; beds → Resident → Rent → Payments → Timeline → Portfolio
                </p>
                <ol className="mt-5 max-w-xl space-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
                  <li><strong>Property.</strong> Set up each site.</li>
                  <li><strong>Rooms and beds.</strong> Organise the spaces inside it.</li>
                  <li><strong>Resident.</strong> Add residents and allocate them to rooms.</li>
                  <li><strong>Rent.</strong> Set a rent schedule, with any utility charges.</li>
                  <li><strong>Payments.</strong> Record what comes in, including part-payments and deposits.</li>
                  <li><strong>Timeline.</strong> Each resident&rsquo;s history stays in one place.</li>
                  <li><strong>Portfolio.</strong> Compare every site in one view.</li>
                </ol>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  Every step above uses functionality that exists in PulseHub today.
                </p>
              </div>
              <figure className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                <ProductScreenshot
                  src="/screenshots/member-ledger.png"
                  alt="A resident timeline in PulseHub, showing rent charged, part-payments, a deposit held, room moves and check-out notices in one record"
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

          <H2 id="start">Choosing the right system for your accommodation business</H2>
          <P>
            An accommodation management system earns its place when you manage by the room and run more than one
            property: occupancy, arrears and bills stop slipping through spreadsheets and chat threads, and the
            whole operation fits on one screen. The right choice is the one built for monthly stays and rooms,
            that your team will actually use, priced for your number of properties.
          </P>
          <P>
            PulseHub brings rooms and beds, residents, rent, occupancy, utilities and maintenance into one
            account, with a portfolio view across every property. See how it fits your operation on the{' '}
            <A href={routes.features}>features page</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or start a free trial and set up your first property in
            minutes. If you run a larger portfolio, you can also{' '}
            <A href={routes.contact}>talk to the team</A>.
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
        heading="Run every property from one accommodation management system."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub set up for your accommodation."
      />
    </SiteShell>
  )
}
