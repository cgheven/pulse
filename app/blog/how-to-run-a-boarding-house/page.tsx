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

const post = getBlogPost('how-to-run-a-boarding-house')!
// Sibling software guide ships in its own PR; this link only lights up once it exists on this branch.
const softwarePost = getBlogPost('boarding-house-management-software')
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
    question: 'How do you start a boarding house in the Philippines?',
    answer:
      'In rough order: secure the property and, if you do not own it, the owner’s written permission to take in boarders; sort out your permits with the barangay, city hall and BIR; lay the building out as rooms and beds; set a room-and-board rate that covers your kitchen; then take your first boarders with a simple contract, their ID and a deposit. The running of it, rent, meals, deposits and keeping rooms full, is what this guide is about.',
  },
  {
    question: 'How much should I charge for a bedspace with board?',
    answer:
      'Price from your costs, not from the house down the street. Add up the monthly cost of the room, then the real cost of feeding one boarder (groceries, gas and the cook’s wage divided by how many eat), then the power an air-conditioned room draws, and put a margin on top. That gives you a floor for a full-board bed, a room-only rate, and an air-con premium, all defensible when a boarder asks why.',
  },
  {
    question: 'How much deposit should a boarding house ask for?',
    answer:
      'One month advance and one month deposit is the common arrangement, though the exact terms are yours to set within what the law allows. Whatever you choose, write it into the contract, record what you are holding against each boarder, and settle it in the open at move-out against the final bill. A deposit a boarder feels was handled fairly is the quietest way to protect your reputation.',
  },
  {
    question: 'Do I need permits to run a boarding house in the Philippines?',
    answer:
      'Yes, generally: a barangay clearance, a mayor’s or business permit from the city or municipality, and registration with the BIR, with fire-safety and sanitary requirements on top. The exact list and any zoning rules depend on your local government, and this is not legal advice, so confirm what applies with your own city or municipal hall before you open.',
  },
  {
    question: 'How do I keep my boarding house full?',
    answer:
      'Three things carry most houses: word of mouth from boarders who left happy, a simple online listing that shows what is free and what it costs, and a waiting list so a room that opens has someone ready for it. An empty room pays nothing while its share of the bills carries on, so the aim is to have the next boarder lined up before the current one leaves.',
  },
  {
    question: 'How do I stop losing money on meals?',
    answer:
      'Run the kitchen as its own small business with its own books. Each month, tally only the boarders who genuinely eat, set the grocery, gas and cook bills against what the meal plans brought in, and nudge the plan up the moment the gap closes. Prices creep, so a meal rate you fixed last year can fall behind your costs without a single boarder noticing; only a monthly look catches it.',
  },
  {
    question: 'What is the best software to run a boarding house?',
    answer:
      'Look for a tool that lets by the bed, puts rent, board and power on one monthly bill, records cash, transfer and e-wallet payments with a receipt, tracks your kitchen costs, and runs more than one house from a single account. PulseHub is built for exactly this in the Philippines, with pricing per property and a free trial.',
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
        { '@type': 'ListItem', position: 3, name: 'How to run a boarding house in the Philippines', item: url },
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

export default function HowToRunABoardingHousePost() {
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
            A boarding house looks like a simple business from the outside: rent out the rooms, serve meals, collect
            the money. Run one for a month and you find it is really three businesses stacked together, a small
            landlord, a canteen and a cashier, and the owner is all three at once. This guide walks through how to
            run a boarding house in the Philippines as those jobs actually arrive: pricing room and board, filling
            the rooms, collecting the rent, feeding the house without losing money, and keeping it all steady enough
            that you can one day open a second one.
          </P>
          <P>
            It is written for the owner who is past the idea stage and into the daily work, whether you have one
            house near a campus or a few near the BPO towers. Nothing here is legal advice; where permits and rules
            come up, the one safe rule is to check with your own local government before you act.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Price room and board from your own costs, especially the kitchen, not from the house next door.</li>
              <li>Keep the rooms full: lean on word of mouth, a simple online listing, and a waiting list.</li>
              <li>Collect rent on one or two fixed dates, on one bill, with a receipt every time.</li>
              <li>Run the kitchen as its own small business and check the meal plan still covers what it spends.</li>
              <li>Settle deposits in the open at move-out; it is the cheapest reputation insurance you can buy.</li>
            </ul>
          </aside>

          <H2 id="setup">Before you open: the setup</H2>
          <P>
            Most of what makes a boarding house easy or painful to run is decided before the first boarder arrives.
            Two things are worth getting right at the start. The first is permission and paperwork: if you do not
            own the building, get the owner’s written consent to take in boarders, and square away the usual
            permits, a barangay clearance, a mayor’s or business permit, and BIR registration, with fire and
            sanitary requirements on top. What exactly you need varies by local government, so treat your city or
            municipal hall as the authority, not a blog.
          </P>
          <P>
            The second is how you think about the building. A boarding house is let by the bed, not by the unit, so
            it pays to map it that way from day one: floors, then rooms, then the number of beds in each, with a
            rate attached and a note of whether the room has air-con. Once the house is drawn as rooms and beds,
            everything after it, pricing, occupancy, billing, follows naturally. If you want the wider picture of
            running rooms this way, our{' '}
            <A href={postPath('accommodation-management-system')}>accommodation management system</A> guide covers
            it across every kind of shared housing.
          </P>

          <H2 id="rates">Set your room-and-board rates</H2>
          <P>
            The most common pricing mistake is to copy the rate of the house down the road and hope it works. Price
            from your own costs instead, because yours are the only ones that have to be covered. Build the number
            up in layers:
          </P>
          <UL>
            <li><strong>The room.</strong> What a bed in that room costs you a month once you divide rent, water and the shared bills across its beds.</li>
            <li><strong>The board.</strong> The real cost of feeding one boarder: groceries, gas and the cook’s wage, divided by how many actually eat.</li>
            <li><strong>The power.</strong> An air-conditioned room draws more, so an air-con bed should carry a premium a boarder can see the reason for.</li>
            <li><strong>The margin.</strong> What is left after all of that is the business, so the margin goes on top, not into the gaps.</li>
          </UL>
          <P>
            Do that once and you have three clean prices to offer: a full-board bed, a room-only bed for those who
            cook for themselves, and an air-con premium. Lay the rooms and their rates out in one place so you are
            quoting from a list, not from memory, and so a half-empty four-bed room is obvious at a glance.
          </P>
          <Figure
            src={philippinesScreenshots.spaces.src}
            alt="A Philippine boarding house laid out as rooms and beds with room type, capacity, monthly rent in pesos and AC status"
            width={philippinesScreenshots.spaces.width}
            height={philippinesScreenshots.spaces.height}
            label="Spaces"
            caption="The house mapped as rooms and beds, each with its rate in pesos and AC status"
          />

          <H2 id="fill">Fill the rooms, and keep them full</H2>
          <P>
            An empty bed earns nothing and still costs you, so filling rooms is not a one-time launch job, it is
            the thing you never stop doing. Three channels carry most Philippine boarding houses. Word of mouth is
            the strongest: a boarder who left happy sends their batchmate or workmate, which is why a fair move-out
            matters as much as a good move-in. An online listing is now the first place a stranger looks, so a page
            that shows your rooms, what they cost with board, and which beds are open today does the work a gate
            sign used to. And a waiting list turns a notice into an opportunity: when someone gives notice, you
            already know who is next.
          </P>
          <P>
            When a boarder does move in, keep it simple but complete: a short written agreement, a copy of their
            ID, an emergency contact, the deposit recorded, and the meal plan they are taking. That one record,
            captured at the door, is what saves you an argument a year later.
          </P>
          <Figure
            src={philippinesScreenshots.website.src}
            alt="A public listing page for a Philippine boarding house showing rooms with photos, monthly rent in pesos, live bed availability, amenities and a WhatsApp or contact button"
            width={philippinesScreenshots.website.width}
            height={philippinesScreenshots.website.height}
            label="Listing page"
            caption="A simple public page showing open beds, rent in pesos and amenities"
          />

          <H2 id="rent">Collect the rent without chasing</H2>
          <P>
            Rent is where a boarding house quietly leaks money, not through bad boarders but through a dozen small
            amounts falling due on a dozen different days and nobody tracking them. The fix is less effort, not
            more. Put everyone on one or two fixed dates rather than their own anniversary. Bill each boarder once
            for everything they owe, rent, board and power on a single statement, instead of three separate asks.
            Take whatever they pay, cash on payday, a bank transfer, an e-wallet, and record it against them with a
            receipt the moment it lands, so nobody can honestly say later that they paid when they did not.
          </P>
          <P>
            When a boarder pays only part of the month, record the part and carry the rest forward as a balance, so
            the amount owing is always a real figure and never a guess. A short, standard reminder a few days
            before the due date collects far more than chasing after it. Done this way, the whole house pays on a
            rhythm you set rather than on thirty different ones. For the version of this that scales across more
            than one house, see our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple properties without spreadsheets</A>.
          </P>
          <Figure
            src={philippinesScreenshots.payments.src}
            alt="A payments screen for a Philippine boarding house showing rent, meals and AC charges in pesos with paid, pending and partial status"
            width={philippinesScreenshots.payments.width}
            height={philippinesScreenshots.payments.height}
            label="Payments"
            caption="One bill per boarder in pesos, with paid, pending and partial status"
          />

          <H2 id="meals">Feed the house without losing money</H2>
          <P>
            Board is what makes a boarding house a boarding house, and it is also where profit disappears if nobody
            is watching. The trap is that the kitchen feels like a household, not a business, so its spending never
            gets counted against the meal charges. Run it the other way. Each month, take a headcount of the
            boarders who actually eat, since anyone paying for the room alone should not carry the food bill. Add up
            the kitchen’s spend on groceries, gas and wages. Then put that total next to what the meal plans
            brought in: if the spend has overtaken the charges, the plan is due a rise, and you catch it in time
            only by looking every month rather than once a year.
          </P>
          <P>
            A weekly menu helps on both sides of this. It tells boarders what they are paying for, and it lets you
            buy to a plan instead of improvising, which is usually cheaper. Keep the kitchen’s costs in the same
            place as the rest of the house’s numbers so the food business is never a mystery bolted onto the side.
          </P>
          <Figure
            src={philippinesScreenshots.dashboard.src}
            alt="A dashboard for a Philippine boarding house in pesos showing net profit, rent collected, outstanding dues, electricity and kitchen costs"
            width={philippinesScreenshots.dashboard.width}
            height={philippinesScreenshots.dashboard.height}
            label="Dashboard"
            caption="Kitchen costs sitting beside rent, dues and profit, in pesos"
          />

          <H2 id="rules">Keep the peace</H2>
          <P>
            Boarders live on top of one another and share the kitchen, the bathrooms and the quiet, so most of the
            friction in a boarding house is between boarders, not with the owner. A short set of house rules,
            agreed at move-in, heads off the worst of it: quiet hours, guest and curfew rules, who cleans what, and
            how to report a problem. Rules that are written down and reasonable hold up; rules that live only in the
            owner’s head do not. Give boarders an easy way to flag a leaking tap or a broken lock and deal with it
            quickly, because a small repair ignored is how a good boarder starts looking elsewhere.
          </P>

          <H2 id="move-out">Handle move-out cleanly</H2>
          <P>
            How a boarder leaves decides what they say about you afterwards, and in a business built on word of
            mouth that matters more than almost anything. Do the sums out loud: add up their last days in the
            house and any balance still owing, subtract it from the deposit you held, and walk the boarder through
            the figure you are handing back or asking for, line by line, before they leave. A boarder sent off with
            a fair, itemised settlement is the one who sends you the next three.
          </P>

          <H2 id="numbers">Know your numbers, then grow</H2>
          <P>
            Running a boarding house well comes down to watching a few figures without letting them run you.
            Occupancy tells you how much of your capacity is earning. Collections against what was billed tells you
            whether the rent is actually arriving. And income minus every cost, the kitchen included, tells you
            whether the house is a business or a hobby. Once those numbers are steady and you are not holding them
            all in your head, a second house stops being a leap. The owners who grow are the ones who turned the
            work into a system first, so that a new house is one more of something that already runs, not a fresh
            improvisation.
          </P>

          <H2 id="software">Where software earns its place</H2>
          <P>
            Every job above can be done on paper, and for one small house it often is. What changes the maths is
            the moment there is more than one person needs to remember, or more than one house to remember it for.
            Software earns its place by holding the beds, boarders, bills, payments, deposits and kitchen costs in
            one record the whole house can read, and by doing the monthly billing and the move-out arithmetic for
            you.{' '}
            {softwarePost ? (
              <>
                Our guide to <A href={postPath(softwarePost.slug)}>boarding house management software</A> goes
                through what to look for.{' '}
              </>
            ) : null}
            PulseHub is built for Philippine boarding houses, priced by the number of properties, with a free
            trial: see <A href={routes.philippines}>PulseHub for the Philippines</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or <A href={routes.contact}>talk to the team</A>.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <h2 id="monthly-rhythm" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
              A boarding house in one monthly rhythm
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
              Most of running a house settles into the same loop, month after month:
            </p>
            <ol className="mt-5 grid gap-x-10 gap-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg md:grid-cols-2">
              <li><strong>Bill.</strong> Send each boarder one statement for rent, board and power.</li>
              <li><strong>Collect.</strong> Record every payment and hand over a receipt as it comes in.</li>
              <li><strong>Buy.</strong> Feed the house to the menu and log what the kitchen spends.</li>
              <li><strong>Check.</strong> Compare meal charges against kitchen cost and arrears against the bill.</li>
              <li><strong>Fill.</strong> Work the waiting list so any notice has a replacement ready.</li>
              <li><strong>Settle.</strong> Close out every move-out against its deposit, in the open.</li>
            </ol>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
              Get that rhythm steady in one house and it is the same rhythm, not a harder one, in the next.
            </p>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-[50rem] sm:mt-16">
          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>

          <H2 id="start">Run your boarding house on PulseHub</H2>
          <P>
            Once the house is full, the kitchen is feeding a table of boarders, and the money is coming in three
            different ways, the running of it stops fitting in a notebook. PulseHub keeps the rooms, boarders,
            bills, payments, deposits and kitchen costs for every house in one place and does the monthly billing
            for you, in pesos. See <A href={routes.philippines}>PulseHub for the Philippines</A>, compare plans on
            the <A href={routes.pricing}>pricing page</A>, or start a free trial and set up your house in minutes.
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
        heading="Run your boarding house the easy way."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub set up for a Philippine boarding house."
      />
    </SiteShell>
  )
}
