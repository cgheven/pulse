import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { uaeScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('bedspace-management-software-dubai')!
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
    question: 'What is bedspace and partition-room accommodation in Dubai?',
    answer:
      'It is shared accommodation let by the bed or the partitioned space rather than the whole unit. An operator takes a flat or villa and lets individual beds or partitions to several residents, each paying their own monthly rent. It is one of the most common ways people rent in Dubai and the wider UAE, and it means an operator may manage dozens of beds across several units.',
  },
  {
    question: 'Can PulseHub manage bedspaces and partition rooms?',
    answer:
      'Yes. PulseHub models each property as floors, rooms and beds, so a bed is the unit you let, price and bill. It keeps occupancy true so a bed is never double-booked, tracks who is in which bed and since when, and records rent and the deposit per resident in dirhams. That bed-level model is exactly what a bedspace or partition operation needs.',
  },
  {
    question: 'Does PulseHub handle DEWA electricity bills?',
    answer:
      'It handles the split, not the DEWA account. PulseHub lets you enter a meter reading, prices it against your tariff, and divides the cost between the residents sharing that space by their move-in dates, so each pays their fair share on one monthly bill. It does not connect to DEWA or pay the bill for you; it works out and charges each resident’s share.',
  },
  {
    question: 'Does PulseHub do Ejari or tenancy-contract registration?',
    answer:
      'No. Ejari registration and compliance with Dubai’s tenancy and subleasing rules remain your responsibility as the operator. PulseHub records rent, deposits, residents and occupancy and keeps your paperwork organised, but it does not register contracts with Ejari or the DLD, and it is not legal advice. Check what your own licence and tenancy arrangements require.',
  },
  {
    question: 'Can residents pay rent through PulseHub, and does it take cards?',
    answer:
      'PulseHub records payments and issues receipts; it is not a payment gateway, so it does not take card or bank payments inside the app. When rent arrives, cash or bank transfer, you record it against the resident and the account it landed in, and a receipt can go straight to them over WhatsApp. Money moves through your own bank or wallet, and your books stay reconciled.',
  },
  {
    question: 'Can I manage several buildings in one place?',
    answer:
      'Yes. PulseHub is multi-property, so you can run several flats, villas or buildings from one account, compare occupancy and collection across them, and give a manager access to only the sites they handle. It is built for an operator with beds spread across the city, not a single landlord with one flat.',
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
        { '@type': 'ListItem', position: 3, name: 'Bedspace management software Dubai', item: url },
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

export default function BedspaceDubaiPost() {
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
              Bedspace and partition-room operators in Dubai and the UAE let by the bed, not the flat, and manage dozens
              of beds across several units. PulseHub is built for exactly that: bed-level occupancy, rent and deposits in
              dirhams, a fair split of the electricity bill, WhatsApp receipts and reminders, and a public listing page
              to fill empty beds.
            </strong>{' '}
            It keeps the money and the occupancy straight so you are not running a growing operation out of a notebook
            and a group chat.
          </P>
          <P>
            One thing up front, because it matters in the UAE: PulseHub records rent, deposits and occupancy and keeps
            you organised, but it does not register contracts with Ejari or move money for you. Those stay your job. More
            on that below.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>A bed is the unit you let, price and bill: PulseHub models floors, rooms and beds and never double-books one.</li>
              <li>Rent and deposits are recorded per resident in dirhams, with WhatsApp receipts and automatic reminders for late payers.</li>
              <li>The electricity bill is split between the residents who shared it, by their move-in dates, not a flat divide.</li>
              <li>Each property gets a public listing page with live availability, so you fill empty beds from your own site.</li>
              <li>Ejari registration and UAE tenancy rules stay your responsibility; PulseHub records and organises, it does not file.</li>
            </ul>
          </aside>

          <H2 id="the-business">The bedspace business in Dubai</H2>
          <P>
            Renting by the bed or the partition is one of the most common ways people live in Dubai and across the UAE.
            An operator takes a flat or villa, fits it out, and lets individual beds or partitioned spaces to several
            residents who each pay their own monthly rent. Done at any scale, it stops being a side arrangement and
            becomes a real operation: many beds, across several units, with people moving in and out, deposits to hold
            and return, a shared electricity bill to divide, and rent to chase every month.
          </P>
          <P>
            Spreadsheets and chat groups hold that together only up to a point. Once you have beds in more than one
            building, the questions pile up fast: which beds are free this week, who has not paid, whose deposit is still
            held, and what each resident actually owes once the electricity is shared out. That is the job PulseHub is
            built for.
          </P>

          <H2 id="what-pulsehub-does">What PulseHub does for a bedspace operation</H2>
          <P>
            <A href="/">PulseHub</A> models each property as floors, rooms and beds, so the bed is the thing you manage.
            It runs in the UAE with dirhams and local terminology, and it covers the whole monthly cycle:
          </P>
          <UL>
            <li><strong>Bed-level occupancy.</strong> See every free and occupied bed at a glance, who is in each one and since when, and never double-book a space.</li>
            <li><strong>Rent and deposits in dirhams.</strong> Each resident has their own rent, deposit and running balance; partial payments are fine and dues carry forward.</li>
            <li><strong>One bill per resident.</strong> Rent, a metered share of electricity, and any recurring charges such as water or internet land on a single monthly bill for each person.</li>
            <li><strong>WhatsApp receipts and reminders.</strong> A receipt for every payment, and automatic reminders for whoever has not paid, sent the way residents actually read them.</li>
            <li><strong>Deposits tracked and settled.</strong> Deposits are recorded on move-in and settled at check-out against any balance, so nothing is lost or argued over.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot
              src={uaeScreenshots.payments.src}
              alt="PulseHub Payments screen for a UAE bedspace operation, showing each resident's rent and a metered share of electricity in dirhams with paid and pending status"
              width={uaeScreenshots.payments.width}
              height={uaeScreenshots.payments.height}
              label="One bill per resident · rent + electricity in dirhams"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="splitting-electricity">Splitting the electricity bill fairly</H2>
          <P>
            Shared electricity is where bedspace billing gets fiddly, and where a flat split causes arguments. PulseHub
            lets you enter a meter reading, prices it against your tariff, and divides the cost between the residents who
            shared that space, weighted by their move-in dates, so someone who joined mid-month does not pay for weeks
            they were not there. Each resident&rsquo;s share lands on their own bill, next to the rent. PulseHub works
            out and charges the share; it does not connect to DEWA or pay the bill for you.
          </P>

          <H2 id="filling-beds">Keeping beds full</H2>
          <P>
            An empty bed is lost rent, so filling beds matters as much as billing them. PulseHub gives each property a
            branded public listing page with live availability, prices, photos and amenities, plus a message button and
            a waitlist form, marked up so search engines and AI assistants can read it. New residents apply themselves
            and land in a waiting list you approve from, so your pipeline is not scattered across a dozen chats.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={uaeScreenshots.tenants.src}
              alt="PulseHub Residents screen for a UAE operation, showing active residents, the waiting list, deposits held and notice periods, with name and phone search"
              width={uaeScreenshots.tenants.width}
              height={uaeScreenshots.tenants.height}
              label="Residents, waiting list and deposits in one place"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="honest-note">An honest note on UAE compliance</H2>
          <P>
            Bedspace and partition letting sits inside UAE rules, and software does not change that. Ejari registration,
            the DLD&rsquo;s tenancy and subleasing requirements, and occupancy limits are your responsibility as the
            operator. PulseHub keeps your rent, deposits, residents and occupancy organised and easy to show, but it does
            not register contracts, file with any authority, or tell you what the law requires. Treat it as the tool that
            runs the operation, and keep your own compliance in order alongside it.
          </P>

          <H2 id="who-its-for">Who it is for</H2>
          <P>
            PulseHub fits an operator letting beds and partitions for rent across one or more units in Dubai or the wider
            UAE, who has outgrown spreadsheets and wants occupancy, rent, deposits and shared costs in one place. If you
            are a single landlord with one tenancy, it is more than you need. If you run beds at any real scale, it is
            built for you.
          </P>
          <P>
            See how it looks for the <A href={routes.uae}>UAE</A>, or the wider{' '}
            <A href={routes.sharedHousing}>shared-housing</A> overview. If you also run staff or worker housing, see{' '}
            <A href="/blog/worker-accommodation-management-software">worker accommodation management</A>.
          </P>

          <Box title="In short">
            <P>
              Bedspace and partition operations in Dubai and the UAE are bed-level businesses, and PulseHub is bed-level
              software: occupancy, rent and deposits in dirhams, a fair split of the electricity bill, WhatsApp receipts
              and reminders, and a listing page to fill empty beds, across as many buildings as you run. Ejari and
              tenancy compliance stay your job; everything that keeps the operation running is here. Start a free trial
              and see it on your own beds.
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
        heading="Run your Dubai bedspaces from one place."
        text="Bed-level occupancy, rent and deposits in dirhams, a fair split of the electricity bill, WhatsApp receipts and a listing page to fill empty beds. Start a 14-day free trial with no card required."
        secondaryHref={routes.uae}
        secondaryLabel="PulseHub for the UAE"
      />
    </SiteShell>
  )
}
