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

const post = getBlogPost('hostel-mess-management-software-bangladesh')!
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
    question: 'What does PulseHub do for a hostel in Bangladesh?',
    answer:
      'PulseHub runs the whole monthly cycle of a hostel: it tracks beds and occupancy floor by floor and room by room, records each resident’s rent and deposit in taka, puts rent and a metered share of electricity on one monthly bill, sends receipts and reminders over WhatsApp, and gives the hostel its own public page so students can see free beds and apply. It is built for operators who have outgrown a register and a phone.',
  },
  {
    question: 'Does PulseHub handle mess management?',
    answer:
      'It handles meals as a package and tracks your kitchen spending, which fits hostels that charge a set monthly mess fee: you bill a meal package on each resident’s bill, keep a weekly menu, and record grocery and kitchen costs that feed your profit figure. If you run a daily meal-count mess where the rate changes each month with how much each person ate, that per-meal tallying is a dedicated mess-app feature, and PulseHub does not replace it.',
  },
  {
    question: 'Can PulseHub collect rent in taka, and does it take bKash or Nagad?',
    answer:
      'PulseHub records rent in taka and issues receipts, but it is not a payment gateway, so it does not take bKash, Nagad, card or bank payments inside the app. When rent arrives, however it arrives, you record it against the resident and the account or wallet it landed in, and a receipt can go straight to them over WhatsApp. Money moves through your own accounts; PulseHub keeps the record and the balance.',
  },
  {
    question: 'Can it split an electricity or utility bill between residents?',
    answer:
      'Yes. PulseHub meters electricity per room, prices a reading against your tariff, and splits it between the residents who shared it by their move-in dates, so each pays a fair share rather than a flat divide. Water, gas and internet can be added as recurring charges, so each resident gets one monthly bill for their actual costs.',
  },
  {
    question: 'Can students see free beds and apply online?',
    answer:
      'Yes. Each hostel gets a branded public page showing rooms, monthly rent, available beds and amenities, with a message button and a form to join a waiting list. Students apply themselves and land in a list you approve from, so filling empty beds does not depend on a dozen separate conversations.',
  },
  {
    question: 'Is PulseHub only for Bangladesh?',
    answer:
      'No. PulseHub runs the same model across many markets, with the currency, terminology and date format set per country, so it works for Bangladesh in taka and for operators elsewhere too. If you run hostels in more than one country, you are not tied to a single market.',
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
        { '@type': 'ListItem', position: 3, name: 'Hostel and mess management software Bangladesh', item: url },
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

export default function HostelMessBangladeshPost() {
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
              PulseHub runs hostels and messes in Bangladesh from one place: bed-level occupancy, monthly rent recorded
              in taka, a fair split of shared electricity, meals billed as a package, kitchen costs tracked, and WhatsApp
              receipts and reminders so collection does not depend on chasing people in person.
            </strong>{' '}
            It is built for operators who have outgrown a paper register and want the beds, the money and the costs in
            one clear place.
          </P>
          <P>
            One honest note first: PulseHub bills meals as a monthly package and tracks your kitchen spending, which fits
            a set monthly mess fee. If your mess runs on daily meal counts with a rate that changes each month, that
            per-meal tallying is a job for a dedicated mess app, not PulseHub. More on that below.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Bed-level occupancy: track every free and filled bed by floor and room, and never double-book one.</li>
              <li>Rent and deposits recorded per resident in taka, with WhatsApp receipts and automatic reminders for late payers.</li>
              <li>Shared electricity split between residents by move-in date, not a flat divide; water and internet added as recurring charges.</li>
              <li>Meals billed as a monthly package with a weekly menu, and kitchen and grocery costs tracked against profit.</li>
              <li>A public page per hostel so students see free beds and apply online, instead of filling beds through scattered chats.</li>
            </ul>
          </aside>

          <H2 id="the-job">Running a hostel in Bangladesh</H2>
          <P>
            A student or working hostel in Bangladesh is a monthly operation with a lot of moving parts: beds filling and
            emptying each term, rent due from everyone, a shared electricity bill to divide, a mess to run and pay for,
            and deposits to hold and return. A paper register and a phone cope at first, but once a hostel is full, or you
            run more than one, it gets hard to answer simple questions: who has not paid, which beds are free this month,
            and what each resident actually owes once the shared costs are worked out.
          </P>
          <P>
            That is the gap PulseHub fills. It keeps the beds, the rent, the shared costs and the mess in one place, so
            the monthly cycle runs on a system instead of memory.
          </P>

          <H2 id="what-pulsehub-does">What PulseHub does for a hostel</H2>
          <P>
            <A href="/">PulseHub</A> models each hostel as floors, rooms and beds, records money in taka, and covers the
            whole month:
          </P>
          <UL>
            <li><strong>Bed-level occupancy.</strong> Every free and occupied bed at a glance, who is in each and since when, with no double-booking and a waiting list for incoming students.</li>
            <li><strong>Rent and deposits.</strong> Each resident has their own rent, deposit and running balance; partial payments are fine and dues carry forward to the next month.</li>
            <li><strong>One bill per resident.</strong> Rent, a metered share of electricity, and recurring charges such as water or internet all land on one monthly bill.</li>
            <li><strong>WhatsApp receipts and reminders.</strong> A receipt for every payment, and automatic reminders to whoever has not paid, sent where residents read them.</li>
            <li><strong>Deposits settled at check-out.</strong> Deposits are recorded on arrival and settled against any balance when someone leaves, so nothing is lost track of.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot
              src={screenshots.payments.src}
              alt="PulseHub Payments screen showing each resident's rent and a metered share of electricity on one monthly bill, with paid and pending status"
              width={screenshots.payments.width}
              height={screenshots.payments.height}
              label="One bill per resident · rent + metered electricity"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="the-mess">The mess: meals and kitchen costs</H2>
          <P>
            PulseHub handles the mess the way many hostels actually charge for it: as a monthly package on each
            resident&rsquo;s bill, with a weekly menu residents can see, while you record grocery and kitchen spending
            that feeds your profit figure. That covers a hostel with a set monthly mess fee cleanly.
          </P>
          <P>
            Be clear about the edge, though. If your mess runs on daily meal counts, where each person&rsquo;s meals are
            tallied and the monthly rate changes with total consumption, that per-meal counting is what a dedicated mess
            app is for, and PulseHub does not replace it. PulseHub bills a package and tracks the cost; it does not count
            each plate. If a set monthly mess fee works for you, it is a good fit; if you need daily meal rates, pair it
            with a mess tool or keep that part separate.
          </P>

          <H2 id="splitting-costs">Splitting shared costs fairly</H2>
          <P>
            Shared electricity is where hostel billing causes arguments. PulseHub lets you enter a meter reading, prices
            it against your tariff, and divides the cost between the residents who shared that room, weighted by their
            move-in dates, so a student who joined mid-month does not pay for weeks they were not there. Each
            resident&rsquo;s share lands on their own bill next to the rent, and water or internet can be added the same
            way as recurring charges.
          </P>

          <H2 id="filling-beds">Filling empty beds</H2>
          <P>
            An empty bed is lost rent, so PulseHub gives each hostel a branded public page with rooms, monthly rent,
            available beds and amenities, a message button and a waitlist form, marked up so search engines and AI
            assistants can read it. Students apply themselves and land in a waiting list you approve from, so your intake
            is organised rather than scattered across messages.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={screenshots.residents.src}
              alt="PulseHub Residents screen showing active residents, the waiting list, deposits held and notice periods, with name and phone search"
              width={screenshots.residents.width}
              height={screenshots.residents.height}
              label="Residents, waiting list and deposits in one place"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="who-its-for">Who it is for</H2>
          <P>
            PulseHub fits an operator running one or more student or working hostels in Bangladesh who wants beds, rent,
            shared costs and the mess in one place, and who charges a set monthly mess fee rather than counting daily
            meals. If you run a single room and a handful of lodgers, it is more than you need; if you run a full hostel,
            it is built for you.
          </P>
          <P>
            See how PulseHub handles the wider category in{' '}
            <A href={routes.hostel}>hostel management software</A>, or read{' '}
            <A href="/blog/how-to-run-a-hostel">how to run a hostel</A> for the operations side. Running hostels in a
            neighbouring market too? See <A href="/blog/hostel-management-software-nepal">hostel software for Nepal</A>.
          </P>

          <Box title="In short">
            <P>
              PulseHub runs hostels in Bangladesh end to end: bed-level occupancy, rent and deposits in taka, a fair
              split of shared electricity, meals billed as a package with kitchen costs tracked, WhatsApp receipts and
              reminders, and a listing page to fill empty beds. It suits a set monthly mess fee rather than daily meal
              counts. Start a free trial and see it on your own hostel.
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
        heading="Run your hostel and mess from one place."
        text="Bed-level occupancy, rent and deposits in taka, a fair split of shared electricity, meals billed as a package, and WhatsApp receipts and reminders. Start a 14-day free trial with no card required."
        secondaryHref={routes.hostel}
        secondaryLabel="Hostel management software"
      />
    </SiteShell>
  )
}
