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

const post = getBlogPost('boarding-house-management-software')!
// Sibling PH guide ships in its own PR; the link only lights up once it exists on this branch.
const dormPost = getBlogPost('dormitory-bedspace-management-software')
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
    question: 'What is boarding house management software?',
    answer:
      'It is the system a boarding house owner uses to run the whole house from one screen instead of a notebook: a room or bed held by each boarder, a monthly bill that already includes their board and power, a record of what they have paid, and a live count of which rooms are earning. One account can cover a single house or a few of them, so the owner is no longer the only place the numbers live.',
  },
  {
    question: 'How is a boarding house different from a dormitory or a bedspace?',
    answer:
      'The arrangements overlap, but board is the thing that sets a boarding house apart. A bedspace rents a bed and a dormitory rents beds by the building, usually without food. A boarding house folds meals into the monthly rate, so the kitchen becomes part of the business and the bill is for room and board together. That is why boarding house software has to price and track meals, not just the room.',
  },
  {
    question: 'Can it put room and board on one monthly bill?',
    answer:
      'Yes, and for a house that feeds its boarders that is the whole point of it. The rent, the meals a boarder takes and any air-con power are one arrangement, so PulseHub settles them into a single monthly statement in pesos rather than three figures the owner keeps in her head. A boarder who pays short just carries the balance into the next month, with nothing lost track of.',
  },
  {
    question: 'Does it help with meal and kitchen costs?',
    answer:
      'Yes. A boarding house lives or dies on whether the food plan covers what the kitchen spends. PulseHub lets you record kitchen expenses, groceries, gas and the cook’s wage, alongside how many boarders are on board, so you can see the cost of feeding the house against what the meal charges bring in rather than guessing at the end of the month.',
  },
  {
    question: 'Can it record cash, bank transfer and e-wallet payments?',
    answer:
      'Yes. The owner can mark a payment as cash, bank transfer or e-wallet against the right boarder and hand back a numbered receipt they keep on their phone. PulseHub records it and makes the receipt, while the money itself still goes into the owner’s own hands and bank. It keeps the books; it does not hold or move the cash, so there is nothing sitting between the owner and her boarders.',
  },
  {
    question: 'Can it run more than one boarding house from one account?',
    answer:
      'Yes. An owner with several houses runs them under one login and opens any of them from a dropdown, while a combined view puts each house on its own line: how full it is, what it collected, what is still owed, what the kitchen cost and what it cleared that month. Billing is sized by the number of properties, 1, 3 or 10, so a third house is one more line here, not another system to learn.',
  },
  {
    question: 'How much does boarding house software cost in the Philippines?',
    answer:
      'PulseHub does not charge per boarder or per room. It charges by the number of properties, with tiers for 1, 3 or 10 and a 14-day free trial that needs no card. Philippine plans are billed in USD while the portal itself runs in pesos; the Philippines page and the pricing page carry the current figures.',
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
        { '@type': 'ListItem', position: 3, name: 'Boarding house management software', item: url },
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

export default function BoardingHouseManagementSoftwarePost() {
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
            A boarding house is really a small kitchen with bedrooms attached. The boarders pay for a room, but
            what keeps most of them is that a meal is waiting when they get home, and that one arrangement, room
            and board together, is what sets a boarding house apart from a plain bedspace. It is also what makes it
            harder to run. The owner is landlady, cook’s boss and bookkeeper at once, and for a long while all of
            it fits in her head. Boarding house management software is what takes it out of her head before the
            house outgrows her memory.
          </P>
          <P>
            This guide is for Philippine owners weighing up that step. It sets out what the software actually does,
            why board and meals change the billing in ways a generic rent app never planned for, and how to judge
            a tool that fits a boarding house rather than an apartment block.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>A boarding house lets a room or bed and includes board, so meals are part of the deal, not an afterthought.</li>
              <li>Room and board land on one monthly peso bill, and because boarders eat differently no two bills in a room match.</li>
              <li>The kitchen is a real cost centre: the food plan only works if it covers groceries, gas and the cook.</li>
              <li>A clean, visible deposit settlement protects the word of mouth that fills a boarding house.</li>
              <li>Once a second house opens or a manager comes in, the numbers have to live somewhere other than the owner’s head.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">Room and board, in one place</H2>
          <P>
            Strip a boarding house down and the owner is doing four jobs for every boarder. There is the letting,
            which room or bed they hold and for how long. There is the billing, the rent plus whatever they eat and
            the power they burn. There is the money, the cash handed over on payday or the transfer that lands
            overnight. And there is the house itself, the kitchen, the bills, the repairs. Boarding house software
            is simply the one place those four jobs meet, so a question about any boarder has an answer that does
            not depend on the owner remembering it.
          </P>
          <P>
            Boarding houses sit inside a wider family of shared living. If yours leans more towards letting plain
            beds without food, our{' '}
            {dormPost ? (
              <>
                <A href={postPath(dormPost.slug)}>dormitory and bedspace management software</A> guide looks at it
                from that angle, and the broader{' '}
              </>
            ) : null}
            <A href={postPath('accommodation-management-system')}>accommodation management system</A> guide covers
            the whole picture of running rooms by the month.
          </P>

          <H2 id="the-kitchen">The kitchen is the business</H2>
          <P>
            In a bedspace the money question is simple: is the bed full and has the rent come in. In a boarding
            house there is a second question underneath it, and it decides whether the house makes money at all:
            does the food plan cover what the kitchen spends. That is the part owners most often guess at, and the
            part a notebook handles worst.
          </P>
          <P>
            It is harder than it looks because the house never eats as one. Some boarders are on full board, some
            take only dinner, a few cook for themselves and pay for the room alone. Groceries, the gas for the
            stove and the cook’s wage move week to week. So the true cost of feeding a single boarder is a moving
            number, and the only way to price the plan honestly is to watch both sides of it:
          </P>
          <UL>
            <li>
              <strong>Who is actually on board.</strong> The headcount eating this month, not the headcount in the
              house, is what the kitchen spend should be divided across.
            </li>
            <li>
              <strong>What the kitchen really costs.</strong> Groceries, gas and the cook’s wage are the food
              business, and they belong in the figures beside the rent, not in a separate pile of receipts.
            </li>
            <li>
              <strong>Whether the plan still pays.</strong> When prices climb, a meal charge set a year ago can
              quietly slip under cost, and you only notice if the two numbers sit next to each other.
            </li>
          </UL>
          <P>
            PulseHub records kitchen expenses and the cook’s wage alongside how many boarders are on board, so the
            cost of feeding the house sits beside the board income instead of surfacing as a shock at month end.
            That single comparison is the difference between a food plan that funds the house and one that slowly
            drains it.
          </P>

          <H2 id="features">What boarding house software should do</H2>
          <P>
            Meals aside, a boarding house still has to let rooms, bill them and settle up. These are the jobs that
            separate a tool built for board from a plain rent tracker, and PulseHub is built around each one.
          </P>

          <H3>See the house as rooms and beds</H3>
          <P>
            The owner knows every room by heart, until there are more rooms than one person can hold. The software
            has to carry that picture for her: the house laid out floor by floor, each room with the beds it holds,
            the monthly rate, and whether it has air-con. A bed is what she actually hands to a boarder, so the
            moment one is taken the room’s free count drops and she is never quoting a space that has already gone.
          </P>
          <Figure
            src={philippinesScreenshots.spaces.src}
            alt="PulseHub Spaces screen showing boarding house rooms with room type, capacity, monthly rent in pesos and AC status"
            width={philippinesScreenshots.spaces.width}
            height={philippinesScreenshots.spaces.height}
            label="Spaces"
            caption="Rooms with type, capacity, monthly rent in pesos and AC status"
          />

          <H3>Keep a record instead of a memory</H3>
          <P>
            In a small house the owner carries every boarder in her head: who is paid up, whose mother to call, who
            is leaving next month. That lasts until it fails, and it fails at the worst moment, in a deposit
            dispute or a parent’s phone call. The record is simply that memory written down, the room held, the
            contract and ID, the deposit, the meal plan and every payment made. PulseHub turns that into a profile
            per boarder with every event dated, and the people waiting for a space queue up on the same screen.
          </P>

          <H3>Build one bill for room and board</H3>
          <P>
            Because board is part of the deal, two boarders in the same room rarely owe the same thing. One is on
            full board, one takes only dinner, one cooks for himself and pays for the room alone, and an
            air-conditioned room carries its own power on top. By hand that is four small sums the owner redoes
            every month and occasionally gets wrong. PulseHub puts each boarder’s rent, meals and electricity onto
            a single peso statement, built once, so a short payment just leaves a balance that shows up the
            following month.
          </P>
          <Figure
            src={philippinesScreenshots.invoice.src}
            alt="A PulseHub boarding house invoice in pesos showing monthly rent and board charges with the total amount due"
            width={philippinesScreenshots.invoice.width}
            height={philippinesScreenshots.invoice.height}
            label="Invoice"
            caption="A monthly bill in pesos with rent and board on one statement"
          />

          <H3>Record payments without holding the money</H3>
          <P>
            In most houses the owner takes the money herself: a few notes in cash on payday, a transfer overnight,
            an e-wallet sent from work. The risk is not theft, it is memory, because a month later nobody agrees on
            what was paid. Logging each payment against the boarder, with a numbered receipt they can keep on their
            phone, settles that before it becomes an argument. PulseHub records the payment and issues the receipt
            while the cash still goes into the owner’s own hands and bank; it is keeping the books, not holding the
            money.
          </P>
          <Figure
            src={philippinesScreenshots.payments.src}
            alt={philippinesScreenshots.payments.alt}
            width={philippinesScreenshots.payments.width}
            height={philippinesScreenshots.payments.height}
            label="Payments"
            caption="Rent, meals and AC in pesos, with paid, pending and partial status"
          />

          <H3>Treat an empty room as money walking out</H3>
          <P>
            In a ten-room house an empty room is a tenth of the month gone, and a vacancy that drifts for a few
            weeks is income the house never gets back. The owner needs to see at a glance which beds are free and
            who is next in line, not work it out from a notebook the day someone gives notice. PulseHub marks every
            bed as taken, free or held and keeps the list of boarders waiting for a space, so a room that opens can
            be promised to the next person for the day it comes free.
          </P>
          <Figure
            src={philippinesScreenshots.residents.src}
            alt={philippinesScreenshots.residents.alt}
            width={philippinesScreenshots.residents.width}
            height={philippinesScreenshots.residents.height}
            label="Boarders"
            caption="Active boarders, the waiting list, deposits, notices and check-out in one place"
          />

          <H3>Settle the deposit where the boarder can see it</H3>
          <P>
            Nothing empties a boarding house faster than a deposit a boarder feels was pocketed, because students
            and their parents talk and the next enquiry hears about it. The answer is to make the move-out sum one
            the boarder can see for themselves. The deposit stays on the boarder’s record from the day they move
            in, and at check-out PulseHub lays the last part-month and anything still unpaid against it, totting up
            the refund or the shortfall on the spot while the boarder watches, so there is nothing to reopen weeks
            later.
          </P>

          <H3>Fill rooms from a public page</H3>
          <P>
            A boarding house used to fill by a sign on the gate and word among classmates. The first look now
            happens online, and a page that shows the rooms, what they cost with board, and what is free today does
            the job the sign used to. Each house gets its own page on PulseHub: photographs of the rooms, the price
            with board, what is open right now, and the handful of things a boarder actually asks about, meals,
            WiFi, laundry, a secure gate. One tap messages the owner or adds them to the list. The page is drawn
            from the live house, so a room drops off it the moment it fills and no one arrives for a bed that is
            already gone.
          </P>
          <Figure
            src={philippinesScreenshots.website.src}
            alt="A public PulseHub boarding house page showing rooms with photos, monthly rent in pesos, available beds, amenities, a WhatsApp button and a join waitlist button"
            width={philippinesScreenshots.website.width}
            height={philippinesScreenshots.website.height}
            label="House page"
            caption="A public page per house with rooms, rent in pesos, amenities and a waitlist button"
          />

          <H2 id="vs-notebook">When the owner’s memory runs out</H2>
          <P>
            A single house with a handful of long-staying boarders really does run on a notebook and a good memory.
            The strain shows when the house fills, a second one opens, or a manager comes in and the numbers
            suddenly have to live somewhere other than the owner’s head. Who paid, who owes, whose deposit is held,
            what the kitchen spent: none of that survives a handover on paper, and none of it is still findable a
            year on when a former boarder queries a deposit. Moving it into software is really moving it out of one
            person’s memory and into a record the whole house can read. The step-by-step version of that move lives
            in our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple properties without spreadsheets</A>.
          </P>

          <H2 id="choosing">How to choose boarding house software</H2>
          <UL>
            <li><strong>It lets a room or a single bed,</strong> and pictures the house as rooms and beds rather than one big tenancy.</li>
            <li><strong>It puts rent, board and power on one peso statement,</strong> and copes with short payments and deposits without a side ledger.</li>
            <li><strong>It tracks the kitchen,</strong> so meal income can be read against groceries, gas and the cook’s pay.</li>
            <li><strong>It logs cash, transfer and e-wallet payments</strong> and gives the boarder a receipt, without standing between them and the owner.</li>
            <li><strong>It shows the deposit and the final bill together</strong> at move-out, so a refund is never a guess.</li>
            <li><strong>It carries a second or third house in one account,</strong> with a single view that compares them.</li>
            <li><strong>It is built for Philippine prices and offers a trial,</strong> and is simple enough to run without training.</li>
          </UL>
          <P>
            PulseHub is priced by the number of properties, with tiers for 1, 3 or 10 and a 14-day free trial that
            needs no card. See <A href={routes.philippines}>PulseHub for the Philippines</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or <A href={routes.contact}>talk to the team</A> if you run
            more than one house.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub runs a boarding house
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  The whole month, from an empty room online to the figures across every house, runs as one loop:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  List a room → Move a boarder in → Bill room &amp; board → Record payment → Settle at move-out → Read every house
                </p>
                <ol className="mt-5 max-w-xl space-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
                  <li><strong>List.</strong> Put the house page online so an open room starts taking enquiries and waitlist sign-ups.</li>
                  <li><strong>Move in.</strong> Give a boarder a named room or bed and open their record.</li>
                  <li><strong>Bill.</strong> Build the month from the room, the board they take and the power they use.</li>
                  <li><strong>Record.</strong> Mark how the boarder paid, cash, transfer or e-wallet, and give them the receipt.</li>
                  <li><strong>Move out.</strong> Weigh the final bill against the deposit and show what is owed or returned.</li>
                  <li><strong>Read every house.</strong> Compare occupancy, collections and costs across houses, in pesos.</li>
                </ol>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  Every one of those steps is live in PulseHub today; none of it is a roadmap promise.
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

          <H2 id="start">Run your boarding house on PulseHub</H2>
          <P>
            One house with a few steady boarders is a job for a notebook and a good memory. Fill every room, feed
            them from a kitchen that has to pay for itself, start taking payments three different ways, then take on
            a second house down the road, and no single memory holds it any more. That is the point to put it on
            PulseHub, which keeps every room, boarder, bill, payment, deposit and kitchen cost for each house
            together and reports it in pesos. See <A href={routes.philippines}>PulseHub for the Philippines</A>, compare
            plans on the <A href={routes.pricing}>pricing page</A>, or start a free trial and set up your first
            house in minutes.
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
        heading="Run every boarding house, and its kitchen, from one place."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub set up for a boarding house that includes board."
      />
    </SiteShell>
  )
}
