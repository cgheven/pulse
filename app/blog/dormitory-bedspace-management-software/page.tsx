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
import { philippinesScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('dormitory-bedspace-management-software')!
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
    question: 'What is dormitory and bedspace management software?',
    answer:
      'It is the system a dormitory or bedspace operator uses to keep the whole business in one place: a bed assigned to each tenant, a monthly bill built from their rent, meals and electricity, a record of what they have paid, and a live count of which beds are earning. One account covers a single building or branches in several cities, so the owner stops working from memory, a wall calendar and a stack of chat threads.',
  },
  {
    question: 'What is the difference between a dormitory, a bedspace and a boarding house?',
    answer:
      'They overlap more than they differ. A bedspace rents a single bed inside a shared room, a dormitory is a whole building of shared rooms let that way, and a boarding house usually folds meals into the deal. The operating job is the same in each: assign a bed, bill it monthly, hold a deposit, and share the kitchens, bathrooms and power. That is why one system handles all three.',
  },
  {
    question: 'What should dormitory software do for a Philippine operator?',
    answer:
      'The non-negotiables are letting and billing at the level of a single bed, and putting rent, the meal plan and electricity on one monthly peso bill rather than three. Around that it should hold a tenant record with ID and contract, track deposits and part-payments, log cash, bank-transfer and e-wallet payments with a receipt, keep a waiting list that serves both student cohorts and rolling worker intakes, settle deposits cleanly at move-out, and let one owner run and compare several branches.',
  },
  {
    question: 'Can it bill rent together with meals and electricity?',
    answer:
      'Yes, and in a dormitory that is the whole reason to use software over a spreadsheet. Meal uptake differs bed to bed and air-conditioned rooms often carry their own power charge, so no two bills in a room are identical. PulseHub assembles each tenant’s monthly statement from their own rent, meal plan and electricity, in pesos, and rolls any part-payment into the next month.',
  },
  {
    question: 'Can it record cash, bank transfer and e-wallet payments?',
    answer:
      'Yes. Whoever is on the desk can log a payment as cash, bank transfer or e-wallet against the right tenant and hand over a numbered receipt to share online or on chat. PulseHub keeps the record and produces the receipt, while the money itself keeps moving through your own drawer and bank. It is a ledger, not a payment collector sitting between you and the tenant.',
  },
  {
    question: 'Can it run several dormitory branches from one account?',
    answer:
      'Yes. One login covers every branch, you switch between them from the top of the screen, and an all-branches view lines them up on occupancy, collections, dues, costs and profit. PulseHub’s plans are sized for 1, 3 or 10 properties, so a growing operator adds a branch without changing systems.',
  },
  {
    question: 'How much does dormitory and bedspace software cost?',
    answer:
      'Most tools charge by the number of buildings or beds. PulseHub charges by the number of properties, with tiers for 1, 3 or 10 and a 14-day free trial that needs no card. The Philippines page and the pricing page carry the current figures.',
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
        { '@type': 'ListItem', position: 3, name: 'Dormitory and bedspace management software', item: url },
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

export default function DormitoryBedspaceManagementSoftwarePost() {
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
            Run a dormitory in the Philippines and you are really keeping two calendars at once. Students arrive
            together for the school year and leave together when the term closes. The bedspacers working in the
            BPO towers and the service trade come and go one at a time, on night shifts and their own notice.
            Both groups rent a single bed rather than a room, and both pay by the month. Dormitory and bedspace
            management software is what lets one operator hold both populations, with their beds, bills and
            deposits, without losing the plot.
          </P>
          <P>
            On paper that job is a notebook of names, a calculator for the power bill and a phone full of
            screenshots. It works until the building fills up. This guide sets out what the software does, why
            letting by the bed and juggling two intakes changes the work, and how to judge a tool that fits a
            Philippine operation rather than a generic property manager.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>A dormitory, bedspace or boarding house is let and billed by the bed, not by the unit.</li>
              <li>Philippine operators run two intakes at once: student cohorts on the school year, workers on a rolling schedule.</li>
              <li>Rent, the meal plan and air-con or electricity resolve on one peso bill, which rarely matches the bed next door.</li>
              <li>The school-year move-out makes fast re-letting and clean deposit settlement the difference between a full quarter and an empty one.</li>
              <li>Across branches, one account compares occupancy, collections and costs without stitching sheets together.</li>
            </ul>
          </aside>

          <H2 id="terms">Dormitory, bedspace and boarding house</H2>
          <P>
            The words get used loosely, so it helps to set them side by side. A <strong>bedspace</strong> is the
            smallest unit, a single bed rented inside a shared room and taken by a bedspacer for a monthly fee. A{' '}
            <strong>dormitory</strong> is a whole building of shared rooms let that way, usually near a campus or
            an office district. A <strong>boarding house</strong> is much the same, with meals more often part of
            the arrangement. What they share outweighs what sets them apart: each lets space by the bed, bills
            monthly, holds a deposit, and shares kitchens, bathrooms and power. A tool built around the bed runs
            any of them, which is why this guide treats them as one.
          </P>
          <P>
            This is one corner of a larger subject. For the overview, our guide to the{' '}
            <A href={postPath('accommodation-management-system')}>accommodation management system</A> covers the
            whole family of room-by-room operations.{' '}
            {hostelPost ? (
              <>
                If your building runs more like a hostel, the{' '}
                <A href={postPath(hostelPost.slug)}>hostel management software</A> guide looks at it from there.{' '}
              </>
            ) : null}
          </P>

          <H2 id="two-calendars">Two calendars under one roof</H2>
          <P>
            The thing that makes a Philippine dormitory distinct is who sleeps in it. Most buildings hold a mix
            of students and working bedspacers, and the two live on different clocks. Students move as a cohort
            tied to the academic year: a wave of them arrives before classes, and a wave checks out within the
            same fortnight at the end of a term. Workers in the BPO and service sectors sign up whenever a job
            starts, keep odd hours, and give notice on no particular schedule.
          </P>
          <P>
            Those two rhythms pull the operation in opposite directions, and it is where paper quietly fails:
          </P>
          <UL>
            <li>
              <strong>The end-of-term cliff.</strong> When a floor empties across two weeks, every one of those
              deposits has to be settled and every bed re-let before the next intake, all at once.
            </li>
            <li>
              <strong>One waiting list, two kinds of arrival.</strong> You are holding beds for a student group
              booked months ahead and for a worker who wants somewhere by Friday, and both need to be visible.
            </li>
            <li>
              <strong>Air-con is a real line item.</strong> In the heat, an air-conditioned room is worth paying
              for and worth metering, so power is a charge tenants will question rather than a rounding error.
            </li>
            <li>
              <strong>Meals split the room.</strong> Some bedspacers take the food plan and some cook for
              themselves, so even people in the same room owe different totals each month.
            </li>
            <li>
              <strong>Staggered due dates.</strong> Beds that filled on a dozen different days fall due on a dozen
              different days, and a single paid-or-not column cannot keep that straight for long.
            </li>
            <li>
              <strong>Branches on different clocks.</strong> A dorm beside Makati offices and one by a Cebu
              campus peak at different times, yet one owner has to read them together.
            </li>
          </UL>

          <H2 id="features">What dormitory and bedspace software should do</H2>
          <P>
            Call them what you like; the jobs that follow are what separate a dormitory tool from a generic rent
            app, and PulseHub is built around each of them.
          </P>

          <H3>See the building as rooms and beds</H3>
          <P>
            Because you let a bed, the software has to see the building the way you do, as floors and rooms with
            individual beds inside them. In PulseHub each branch is built from its rooms, every room carrying its
            capacity, its monthly rate and whether it is air-conditioned, and a bed is the thing you hand to a
            person. You fill a room seat by seat, and the occupied count stays honest as people come and go.
          </P>
          <Figure
            src={philippinesScreenshots.spaces.src}
            alt={philippinesScreenshots.spaces.alt}
            width={philippinesScreenshots.spaces.width}
            height={philippinesScreenshots.spaces.height}
            label="Spaces"
            caption="Dormitory rooms and beds with type, capacity, rent in pesos and AC status"
          />

          <H3>Hold a record for every tenant</H3>
          <P>
            A bedspacer’s record should carry the things you reach for when they call: the bed they hold, their
            contract and ID, the deposit you are keeping, and the history of what they have paid. When a student
            cohort and a dozen workers are in the building at once, that record is how you answer any question
            without digging through chats. PulseHub keeps a profile and a dated timeline for each tenant, and a
            waiting list behind it for whoever is booked in next.
          </P>

          <H3>Build one monthly bill, not three</H3>
          <P>
            A dormitory bill is rarely just rent. A student on full board, a worker who skips the meal plan, and
            an air-conditioned room with its own meter all come out to different numbers, and they should land on
            one statement instead of three running notes. PulseHub builds each tenant’s monthly bill from their
            own rent, meal plan and electricity in pesos, rolls any part-payment into the following month, and
            keeps the arrears on a list of their own so a heavy collection day stays readable.
          </P>
          <Figure
            src={philippinesScreenshots.payments.src}
            alt={philippinesScreenshots.payments.alt}
            width={philippinesScreenshots.payments.width}
            height={philippinesScreenshots.payments.height}
            label="Payments"
            caption="Rent, meals and AC in pesos, with paid, pending and partial status"
          />

          <H3>Record payments the way tenants actually pay</H3>
          <P>
            Tenants settle in cash, by bank transfer, or through an e-wallet, and whoever is on the desk should
            be able to put any of those against the right person in seconds and hand back a receipt. PulseHub does
            the recording and the numbered receipt, which a tenant can keep online or on chat, while the money
            itself still moves through your own drawer and bank. It is a ledger, not a collector standing between
            you and your tenant.
          </P>

          <H3>Know which beds are earning tonight</H3>
          <P>
            The number that decides whether a dormitory makes money is how many beds are paying right now.
            PulseHub shows each bed as taken, free or held, and the waiting list carries both kinds of arrival,
            the cohort booked for next term and the worker who wants a bed this week. So when notice comes in you
            can line up the next tenant for the day the bed opens, which is the whole game in the fortnight a term
            empties a floor.
          </P>
          <Figure
            src={philippinesScreenshots.residents.src}
            alt={philippinesScreenshots.residents.alt}
            width={philippinesScreenshots.residents.width}
            height={philippinesScreenshots.residents.height}
            label="Residents"
            caption="Active residents, the waiting list, deposits, notices and check-out in one place"
          />

          <H3>Settle the deposit in the open</H3>
          <P>
            The deposit is the part a tenant remembers, so the move-out arithmetic has to be one they can see.
            PulseHub holds the deposit on the tenant record for the whole stay and, at check-out, brings the final
            part-month, any last charges and outstanding dues together against it, so the refund or balance is on
            the screen for both of you. That matters most in the week a cohort leaves together and the
            settlements all fall due at once.
          </P>

          <H3>Fill beds from a public page</H3>
          <P>
            Most bedspacers find a building online before they ever ring it. PulseHub gives each branch a public
            page that lists its rooms with photos, what a bed costs, which beds are open at that moment, and the
            amenities that actually settle the decision, from air-con and WiFi to meals, with a button to message
            you or join the waitlist. It reads from your live occupancy, so it never advertises a bed that filled
            yesterday.
          </P>
          <Figure
            src={philippinesScreenshots.website.src}
            alt={philippinesScreenshots.website.alt}
            width={philippinesScreenshots.website.width}
            height={philippinesScreenshots.website.height}
            label="Branch page"
            caption="A public page per branch with rooms, rent in pesos, amenities and a waitlist button"
          />

          <H2 id="vs-logbook">Why a notebook gives out</H2>
          <P>
            A notebook can carry one small bedspace with a steady set of faces. It gives out the first time the
            school year turns over. A floor of students checks out across a fortnight, every deposit needs
            settling against a final bill, and a fresh cohort needs beds assigned and bills started before
            classes begin, all while the working bedspacers keep paying on their own dates in the background. A
            page of columns cannot hold that churn, and it will not surface a tenant’s history a year later when a
            deposit is questioned. Software absorbs the bookkeeping and keeps every tenant on file, searchable long
            after they move out. The step-by-step version of that move lives in our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple properties without spreadsheets</A>.
          </P>

          <H2 id="choosing">How to choose dormitory and bedspace software</H2>
          <UL>
            <li><strong>It lets a single bed,</strong> with the building modelled as rooms and beds rather than whole units.</li>
            <li><strong>It bills rent, meals and air-con together</strong> on one peso statement, with part-payments and deposits handled cleanly.</li>
            <li><strong>It records cash, bank transfer and e-wallet payments</strong> and issues a receipt your tenant can keep.</li>
            <li><strong>It settles the deposit in the open</strong> at move-out, against the final month and any dues.</li>
            <li><strong>Its waiting list serves both intakes,</strong> the booked student cohort and the walk-up worker.</li>
            <li><strong>It runs every branch from one account,</strong> with a view that reads them side by side.</li>
            <li><strong>It is priced for the Philippines and has a trial,</strong> with an interface the desk can use untrained.</li>
          </UL>
          <P>
            PulseHub is priced by the number of properties, with tiers for 1, 3 or 10 and a 14-day free trial that
            needs no card. See <A href={routes.philippines}>PulseHub for the Philippines</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or <A href={routes.contact}>talk to the team</A> if you run
            several branches.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub runs a dormitory
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  From a bed on the public page to the figures across every branch, the work runs in one line:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  List a bed → Move a tenant in → Bill rent, meals &amp; air-con → Record payment → Settle at move-out → Read all branches
                </p>
                <ol className="mt-5 max-w-xl space-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
                  <li><strong>List.</strong> Publish the branch page so an open bed takes enquiries and waitlist sign-ups.</li>
                  <li><strong>Move in.</strong> Put a student or a worker into a named bed and start their record.</li>
                  <li><strong>Bill.</strong> Draw the month from their rent, the meal plan they chose and the room’s power.</li>
                  <li><strong>Record.</strong> Mark each cash, transfer or e-wallet payment and issue the receipt.</li>
                  <li><strong>Move out.</strong> Settle the final bill against the deposit and show the balance.</li>
                  <li><strong>Read all branches.</strong> Compare occupancy, collections and costs in pesos.</li>
                </ol>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  Every branch on PulseHub already works this way; nothing in the loop is waiting on a future release.
                </p>
              </div>
              <figure className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                <ProductScreenshot
                  src={philippinesScreenshots.checkout.src}
                  alt={philippinesScreenshots.checkout.alt}
                  width={philippinesScreenshots.checkout.width}
                  height={philippinesScreenshots.checkout.height}
                  frame={false}
                  sizes="300px"
                  className="shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
                />
                <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground lg:text-left">
                  Settling a deposit at check-out
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

          <H2 id="start">Run your dormitory on PulseHub</H2>
          <P>
            One bedspace with a handful of regulars is a notebook job. Put students and shift-workers under one
            roof, add meal plans, metered rooms, a term-end wave of move-outs and a second branch across town, and
            the sums stop fitting on a page. PulseHub carries the beds, tenants, bills, payments and deposits for
            every branch in one place, and reads them back to you in pesos. See{' '}
            <A href={routes.philippines}>PulseHub for the Philippines</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or start a free trial and set up your first branch in
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
        heading="Run your dormitory branches from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub set up for your dormitory or bedspace operation."
      />
    </SiteShell>
  )
}
