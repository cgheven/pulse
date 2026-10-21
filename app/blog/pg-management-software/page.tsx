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
import { indiaScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('pg-management-software')!
// Sibling article shipped in a separate PR; link only lights up once it exists on this branch.
const hostelPost = getBlogPost('hostel-management-software')
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
    question: 'What is PG management software?',
    answer:
      'PG management software runs a paying guest accommodation at the bed and resident level. It records who is in each bed, bills rent along with meals and electricity, tracks deposits and part-payments, shows which beds are free, and keeps it all in one place, across one PG or several. It takes over from the register, the calculator and the WhatsApp group a PG often runs on.',
  },
  {
    question: 'Is PG management software different from hostel software?',
    answer:
      'Not really. A PG and a residential hostel both let beds by the month with rent, meals, deposits and shared facilities, so the same software fits both. PG is the common term in India for smaller, owner-run houses; hostel often means a larger or institutional building. The day-to-day operations are the same.',
  },
  {
    question: 'What should PG management software include?',
    answer:
      'Bed-level allocation; a profile for each resident with documents; rent billed with meals and electricity; deposits, part-payments and clear dues; payment recording with receipts you can share on WhatsApp; occupancy and a waiting list; check-out settlement; a way to run several PGs from one account; and reports in rupees.',
  },
  {
    question: 'Can it bill meals and electricity along with rent?',
    answer:
      'Yes. For a PG, meals and electricity often belong on the same bill as the rent. Good software puts rent, meal charges and metered or shared electricity on one monthly bill, so nothing lives on a separate sheet. PulseHub bills rent, food and metered electricity together on each resident’s statement.',
  },
  {
    question: 'Can it record UPI, bank transfer and cash payments?',
    answer:
      'Yes. Staff can record a payment made by UPI, bank transfer or cash against the right resident and bank account, and share a receipt online or over WhatsApp. PulseHub records these payments; it is not a payment gateway that collects money on your behalf.',
  },
  {
    question: 'Can it manage multiple PGs or branches?',
    answer:
      'Yes. You can run every PG from one account, switch between them, and compare them on occupancy, collections, dues and costs. PulseHub includes a branch switcher and an all-branches view, and its plans cover 1, 3 or 10 properties.',
  },
  {
    question: 'How much does PG management software cost in India?',
    answer:
      'Pricing usually scales with the number of PGs or beds. PulseHub is priced in rupees by the number of properties, with plans for 1, 3 or 10 and a 14-day free trial that needs no card. See the India page or the pricing page for current figures.',
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
        { '@type': 'ListItem', position: 3, name: 'PG management software', item: url },
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

export default function PgManagementSoftwarePost() {
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
            PG management software is the tool a paying guest operator uses to run the whole PG from one place:
            which bed each resident is in, what they owe for rent, meals and electricity, who has paid, and which
            beds are free. It takes over from the register, the calculator and the pile of WhatsApp messages, and
            it works whether you run one PG or several across a city.
          </P>
          <P>
            In India a PG usually means letting beds by the month to students and working professionals, often
            with meals included and electricity billed on top. That combination, rent plus food plus power plus
            a deposit, spread across beds that fill and empty on different dates, is what makes a PG awkward to
            run on paper. This guide covers what the software does, the features that actually matter, and how to
            choose one that fits the way you operate.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>PG management software runs a paying guest accommodation at the bed and resident level, on monthly rent.</li>
              <li>For a PG, meals and electricity belong on the same bill as the rent, not a separate sheet.</li>
              <li>It should record payments by UPI, bank transfer or cash and share receipts on WhatsApp.</li>
              <li>Deposits, part-payments and dues per resident are where paper records usually break down.</li>
              <li>Across several PGs it shows occupancy, collections and costs in one place, in rupees.</li>
            </ul>
          </aside>

          <H2 id="what-is-it">What is PG management software?</H2>
          <P>
            PG management software is a tool for running a paying guest accommodation day to day. It records who
            sleeps in each bed, bills rent along with meals and electricity, tracks what each resident has paid
            and owes, and shows which beds are free, across one PG or a group of them from a single account.
          </P>
          <P>
            A PG is let bed by bed, not flat by flat. Several residents share a room, each on their own rent and
            move-in date, so the software has to understand rooms and beds rather than whole units. PulseHub
            shows each PG as rooms and beds, with the room type, capacity, rent, AC status and whether the room
            has an attached washroom, so a single bed can be allocated and billed on its own.
          </P>
          <P>
            PG and hostel are close cousins. PG is the usual word in India for a smaller, owner-run house, while
            hostel tends to mean a larger or institutional building, but the operations are the same, so the same
            software serves both.{' '}
            {hostelPost ? (
              <>
                If your property is more of a hostel, our guide to{' '}
                <A href={postPath(hostelPost.slug)}>hostel management software</A> covers the same ground from
                that angle.{' '}
              </>
            ) : null}
            The wider category sits in our guide to the{' '}
            <A href={postPath('accommodation-management-system')}>accommodation management system</A>.
          </P>

          <H2 id="why-hard">Why running a PG gets hard on paper</H2>
          <P>The jobs that push PG owners off a register are usually these:</P>
          <UL>
            <li>
              <strong>Rent that never lines up.</strong> Beds fill on different dates, so each resident is on a
              different cycle. Add a few part-payments and a single paid-or-unpaid list stops telling the truth.
            </li>
            <li>
              <strong>Electricity arguments.</strong> Power recharged to residents, by meter or share, is a
              regular source of disputes, and of money you never recover once someone has left.
            </li>
            <li>
              <strong>Meals on top of rent.</strong> If food is included or charged, it has to sit on the same
              bill as the rent, not on a separate note you reconcile later.
            </li>
            <li>
              <strong>Deposits at check-out.</strong> Settling a deposit gets messy when the final month, the
              last electricity reading and any dues all have to come off it at once.
            </li>
            <li>
              <strong>Everything in different places.</strong> A register for rent, a calculator for power,
              WhatsApp for reminders, and your memory for the rest.
            </li>
            <li>
              <strong>More than one PG.</strong> Run two or three across the city and the paperwork grows faster
              than the income.
            </li>
          </UL>

          <H2 id="features">What PG management software should do</H2>
          <P>
            Product names differ, but a PG system worth paying for should cover the jobs below, and here is the
            way PulseHub does each of them.
          </P>

          <H3>Beds and rooms</H3>
          <P>
            The software should let you set up each room and allocate individual beds, and show each room filling
            up as residents come and go. PulseHub lays out each PG as rooms and beds with rent, AC and washroom
            details, so you are managing beds, not guessing from a flat-level list.
          </P>
          <Figure
            src={indiaScreenshots.spaces.src}
            alt={indiaScreenshots.spaces.alt}
            width={indiaScreenshots.spaces.width}
            height={indiaScreenshots.spaces.height}
            label="Spaces"
            caption="PG rooms and beds with room type, capacity, rent, AC and attached-washroom status"
          />

          <H3>Resident profiles and onboarding</H3>
          <P>
            Each resident should have a profile holding their contact details, documents, bed allocation,
            deposit and payment history, so anything you need about them sits on one screen rather than buried in
            old chats. PulseHub keeps a profile and a running timeline for each resident, plus a waiting list of
            who is due to move in and when.
          </P>

          <H3>Rent, meals and electricity on one bill</H3>
          <P>
            This is the part that separates PG software from a plain rent tracker. On a PG statement, food and
            the month&rsquo;s electricity sit under the rent line, not on a second sheet you reconcile later. PulseHub
            puts all three on one monthly bill per resident, carries any advance or part-payment forward, and
            keeps the collections-and-dues list on a separate screen so a busy week of partial payments stays
            legible.
          </P>
          <Figure
            src={indiaScreenshots.payments.src}
            alt={indiaScreenshots.payments.alt}
            width={indiaScreenshots.payments.width}
            height={indiaScreenshots.payments.height}
            label="Payments"
            caption="Rent and metered electricity in rupees, with paid, pending and overdue status"
          />

          <H3>Recording payments and receipts</H3>
          <P>
            Residents pay in different ways, so the software should let staff record a payment by UPI, bank
            transfer or cash against the right resident, and hand back a receipt. PulseHub records payments made
            by UPI, bank transfer or cash and generates a receipt you can share online or over WhatsApp. It
            records the money that comes in; it is not a payment gateway that collects it for you.
          </P>

          <H3>Deposits and check-out</H3>
          <P>
            A deposit should stay visible against each resident until they leave, and check-out should pro-rate
            the final month and settle the last electricity reading and any dues against the deposit, so the
            refund or balance is clear to both sides. PulseHub holds the deposit on the resident&rsquo;s record and
            settles it at check-out against the final bill.
          </P>

          <H3>Occupancy and a waiting list</H3>
          <P>
            A vacant bed is the easiest cost to miss, because nothing in a PG announces it. The occupancy screen
            marks each bed occupied, vacant or held, and the waiting list holds the next intake with their dates,
            so you can slot an arrival into the week a resident gives notice rather than the week after they have
            gone.
          </P>

          <H3>Running several PGs</H3>
          <P>
            Once you run more than one PG, you want them on one screen rather than a separate register for each.
            PulseHub moves between PGs in a click and lines them up on occupancy, collections, dues, costs and
            profit.
          </P>
          <Figure
            src={indiaScreenshots.branches.src}
            alt={indiaScreenshots.branches.alt}
            width={indiaScreenshots.branches.width}
            height={indiaScreenshots.branches.height}
            label="All branches"
            caption="Every PG compared on occupancy, collections, dues, costs and net profit"
          />

          <H3>A public page for your PG</H3>
          <P>
            Enquiries are easier to convert when they land in one place instead of across five phone numbers.
            PulseHub can publish a page for each PG with photos, the beds currently free, the rent, and what is
            included, from meals and WiFi to power backup, plus a WhatsApp enquiry or waitlist button so a
            prospective resident can reach you directly.
          </P>
          <Figure
            src={indiaScreenshots.website.src}
            alt={indiaScreenshots.website.alt}
            width={indiaScreenshots.website.width}
            height={indiaScreenshots.website.height}
            label="PG page"
            caption="A public PG page with rooms, rent, amenities and a join-waitlist button"
          />

          <H2 id="vs-register">PG software vs a register and WhatsApp</H2>
          <P>
            A register and a WhatsApp group carry one small PG fine. The strain starts with the second floor of
            beds and the first set of electricity meters: rent falling due on a dozen different dates,
            part-payments noted in the margin, and a deposit that has to square with a final meter reading when
            someone leaves on short notice. A register tells you who paid last month, not who still owes for
            power this month. Software takes that bookkeeping off you and keeps each resident&rsquo;s full history in
            one place you can actually search. For the move off manual records step by step, see our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple properties without spreadsheets</A>.
          </P>

          <H2 id="choosing">How to choose PG management software</H2>
          <UL>
            <li><strong>It manages beds, not just rooms.</strong> Allocate and bill a single bed.</li>
            <li><strong>Rent, meals and electricity on one bill,</strong> with part-payments and deposits handled properly.</li>
            <li><strong>Payment recording with receipts.</strong> UPI, bank transfer and cash, with a receipt you can share on WhatsApp.</li>
            <li><strong>Check-out that settles the deposit</strong> against the final month, electricity and dues.</li>
            <li><strong>Occupancy and a waiting list</strong> you can act on.</li>
            <li><strong>One account for every PG,</strong> with a view that compares them.</li>
            <li><strong>Rupee pricing and a trial,</strong> plus an interface your staff can use without training.</li>
          </UL>
          <P>
            PulseHub is priced in rupees by the number of properties, with plans for 1, 3 or 10 and a 14-day free
            trial that needs no card. See <A href={routes.india}>PulseHub for India</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or <A href={routes.contact}>talk to the team</A> if you run
            a larger group of PGs.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub runs a PG
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  A PG runs in a repeating cycle, and PulseHub is built to follow it:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  Waiting list → Allocate bed → Bill rent, food &amp; meter → Collect &amp; receipt → Settle deposit → Compare PGs
                </p>
                <ol className="mt-5 max-w-xl space-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
                  <li><strong>Waiting list.</strong> Hold prospective residents with the dates they want to move in.</li>
                  <li><strong>Allocate.</strong> Give an incoming resident a specific bed in a specific room.</li>
                  <li><strong>Bill.</strong> Set the monthly rent, add the food package and the electricity meter.</li>
                  <li><strong>Collect.</strong> Record each UPI, bank-transfer or cash payment and send the receipt.</li>
                  <li><strong>Move-out.</strong> Read the final meter, clear dues and refund the balance of the deposit.</li>
                  <li><strong>Compare.</strong> See every PG together, in rupees.</li>
                </ol>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  A PG you set up today uses every step above; none of it is a roadmap item.
                </p>
              </div>
              <figure className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                <ProductScreenshot
                  src={indiaScreenshots.memberLedger.src}
                  alt={indiaScreenshots.memberLedger.alt}
                  width={indiaScreenshots.memberLedger.width}
                  height={indiaScreenshots.memberLedger.height}
                  frame={false}
                  sizes="300px"
                  className="shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
                />
                <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground lg:text-left">
                  A resident&rsquo;s payment timeline
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

          <H2 id="start">Run your PG on PulseHub</H2>
          <P>
            A single PG on a register is manageable. Add food bills, meter readings, deposits to refund and a
            second or third PG across town, and the arithmetic stops fitting in a notebook. PulseHub holds the
            beds, residents, monthly bills, payments and deposits for every PG in one rupee account, with a
            single view that compares them. See <A href={routes.india}>PulseHub for India</A>, compare plans on
            the <A href={routes.pricing}>pricing page</A>, or start a free trial and set up your first PG in
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
        heading="Run your PG from one place."
        text="Start a 14-day free trial with no card, or book a demo to see PulseHub set up for your PG in rupees."
      />
    </SiteShell>
  )
}
