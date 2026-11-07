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

const post = getBlogPost('how-to-run-a-hostel')!
const url = `${SITE_URL}${postPath(post.slug)}`
const imageUrl = `${SITE_URL}${post.image.src}`

const base = pageMetadata({ title: post.title, description: post.description, path: postPath(post.slug) })

export const metadata: Metadata = {
  ...base,
  openGraph: {
    ...base.openGraph,
    type: 'article',
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    images: [{ url: imageUrl, width: post.image.width, height: post.image.height, alt: post.image.alt }],
  },
  twitter: { ...base.twitter, images: [imageUrl] },
}

const faqs = [
  {
    question: 'How do you run a hostel efficiently?',
    answer:
      'Keep the three things that matter in one place: who is in which bed, what each person owes, and what has been paid. Model the building down to the bed so occupancy stays true, put rent and any extras on one bill per resident, record part-payments with a receipt each time, and watch collections and costs on one dashboard. Once that is in a system rather than a notebook, a single person can run a busy hostel.',
  },
  {
    question: 'What software do you need to run a hostel?',
    answer:
      'You need a management system that works at bed level: a record for every resident, true occupancy down to the bed, one bill that gathers rent, meals and metered electricity, payments and receipts against it, and reporting across one or several hostels. That is different from a booking site, which lists rooms and takes reservations but does not run your money or your beds.',
  },
  {
    question: 'Is PulseHub a hostel booking system?',
    answer:
      'PulseHub is a management system, not a booking channel. It runs the beds, the residents, the bills and the money, and gives each hostel its own public page with live availability so guests enquire with you directly. It does not distribute your rooms to online travel agents such as Hostelworld or Booking.com, and it is not a channel manager. If you rely on OTA distribution, you would pair a channel manager with PulseHub for the operations and money.',
  },
  {
    question: 'Can it handle nightly guests and monthly residents together?',
    answer:
      'Yes. PulseHub bills by the night or by the month, and a hostel with short-stay guests and longer-term residents can run both on the same system, even within one property. The difference from a hotel system is that PulseHub is built around the bed and the resident, not a front desk and channel distribution.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your hostel.',
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
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${SITE_URL}${BLOG_BASE}#blog` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${BLOG_BASE}` },
        { '@type': 'ListItem', position: 3, name: 'How to run a hostel', item: url },
      ],
    },
    { '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ],
}

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="mt-12 scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">{children}</h2>
}
function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">{children}</ul>
}
function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  const className = 'font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
  if (external) return <a href={href} className={className} rel="noopener noreferrer" target="_blank">{children}</a>
  return <Link href={href} className={className}>{children}</Link>
}
function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
      <div className="mt-4 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 sm:text-lg">{children}</div>
    </div>
  )
}

export default function HowToRunAHostelPost() {
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
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-tight">{post.heading}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time> · {post.readingMinutes} min read
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <ProductScreenshot src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} priority label={post.image.label} sizes="(max-width: 1024px) calc(100vw - 2rem), 64rem" />
        </div>

        <div className="mx-auto mt-10 max-w-[50rem]">
          <P>
            <strong>
              Running a hostel well comes down to three things kept straight: who is in which bed, what each person owes,
              and what has been paid.
            </strong>{' '}
            Get those into one system instead of a notebook and a pile of chat messages, and a single person can run a
            busy hostel without the end-of-month scramble. This guide walks through setting a hostel up and running it
            day to day, and where software earns its place.
          </P>
          <P>
            It is written for owner-operators: people who let beds to students or working guests, by the night or by the
            month, and often run more than one place. The order below is roughly the order you meet each job, from
            building the rooms to collecting the rent to keeping residents happy.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Model the building down to the bed, so occupancy stays true and a room cannot be over-filled.</li>
              <li>Put rent, meals and metered electricity on one bill per resident, and record part-payments with a receipt each time.</li>
              <li>Give the hostel its own public page with live availability, so you fill beds from your own link.</li>
              <li>A management system runs your beds and money; a booking site only lists rooms. They are not the same tool.</li>
              <li>PulseHub bills by the night or the month, but is not a channel manager and does not distribute to OTAs.</li>
            </ul>
          </aside>

          <H2 id="set-up">Set up the building: floors, rooms and beds</H2>
          <P>
            A hostel is let by the bed, so model it that way: floors, then rooms, then the beds in each room. A four-bed
            room with three guests reads as three-quarters full, not as one occupied unit. Keeping occupancy at bed level
            is the single thing that stops double-booking and lets you see, at a glance, exactly how many beds are free
            tonight and this month. Good software keeps this true automatically, so a bed cannot be filled twice or a
            room deleted while someone is in it.
          </P>

          <H2 id="price">Price it: seater rates, packages and meals</H2>
          <P>
            Set a rate once per seat count and condition, for example a bed in a six-share versus a four-share, with or
            without air conditioning, and every matching room prices itself. Then decide what a bed includes. Many
            hostels sell the bed alone, and others bundle food, so meals are worth handling as their own add-on:
            breakfast, lunch and dinner priced individually or as a package, flagged on the resident&rsquo;s bill. Deciding
            this once, up front, saves arguments later.
          </P>

          <H2 id="fill">Fill the beds: your own page and applications</H2>
          <P>
            Before paying commission to a listing site, give the hostel its own public page: cover photo, amenities, room
            cards with live availability and real prices, and a way to message you or apply. When availability updates
            itself as guests move in and out, the page is never wrong, and enquiries come straight to you. Walk-ins, an
            online application form and a waiting list for busy periods should all land as one resident record, so nobody
            is retyped.
          </P>

          <H2 id="admissions">Take people in: admissions, deposits and documents</H2>
          <P>
            Each resident becomes one record: ID and photo, phone, an emergency or guardian contact, their room and bed,
            their package, and any deposit. Upload their documents against the record so they are not in a drawer. A
            deposit is tracked and settled at check-out against any final dues. Keeping this as one timeline per stay,
            rather than scattered notes, is what makes a dispute months later a thirty-second look-up.
          </P>

          <H2 id="bill">Bill and collect: one bill, part-payments, receipts</H2>
          <P>
            This is where most hostels lose money quietly. Put everything a resident owes on one bill: rent, any meals,
            metered electricity and recurring charges. Rent rarely arrives in one piece, so record part-payments as
            instalments, each with its own date and a numbered receipt, and carry the balance forward as one running
            figure rather than counting it twice. A receipt that goes out the moment you record a payment, shareable on
            WhatsApp, ends the &ldquo;but I paid you&rdquo; conversation before it starts.
          </P>
          <P>
            Automatic reminders do the chasing for you: a message when rent is due and a gentle nudge when it is late, so
            you are not the one sending awkward texts every week.
          </P>

          <div className="mt-8">
            <ProductScreenshot src={screenshots.payments.src} alt="A payments screen showing monthly rent collection, with rent and metered electricity charged per resident and paid, unpaid and partial status" width={screenshots.payments.width} height={screenshots.payments.height} label="Payments · rent, part-payments & receipts" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
          </div>

          <H2 id="money">Run the money side: electricity, kitchen, staff and reports</H2>
          <P>
            The costs that eat a hostel&rsquo;s margin are the ones nobody totals. Split metered electricity between the
            residents on a meter by their join dates, not a flat share. Record kitchen spend so you know the real cost per
            person per meal. Keep staff wages and any salary advances in one place. Then a dashboard shows collected,
            outstanding, occupancy and profit for the month, and a portfolio view compares every hostel if you run more
            than one.
          </P>

          <div className="mt-8">
            <ProductScreenshot src={screenshots.properties.src} alt="A portfolio view comparing occupancy, rent collected, costs and profit across several hostels" width={screenshots.properties.width} height={screenshots.properties.height} label="Every hostel · occupancy, rent & profit" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
          </div>

          <H2 id="residents">Keep residents happy: complaints and feedback</H2>
          <P>
            A simple way to raise an issue keeps a small problem from becoming a bad review. A QR code or short code on
            the wall lets a resident log a complaint that lands in your list with a status, with no app for them to
            install. A private feedback link after check-out tells you what to fix, without it becoming a public star
            rating you cannot control.
          </P>

          <H2 id="software">Management software vs booking software</H2>
          <P>
            These two get confused, and it matters. A <strong>booking system</strong> or online travel agent lists your
            rooms and takes reservations; it fills beds but does not run your money, your residents or your costs. A{' '}
            <strong>management system</strong> runs the operation behind the beds: occupancy, one bill per resident,
            part-payments and receipts, electricity and kitchen costs, staff and reporting. Most hostels need the
            management side first, because that is where the money is kept straight, and can add distribution later.
          </P>
          <P>
            <A href={routes.hostel}>PulseHub</A> is the management side. It bills by the night or by the month, keeps
            occupancy true down to the bed, gives each hostel a free public page with live availability, and rolls every
            hostel into one view. One honest boundary: it is not a channel manager and does not push your rooms to
            Hostelworld or Booking.com, and it records payments rather than collecting them as a gateway. If OTA
            distribution is central to how you fill beds, pair a channel manager with PulseHub for the operations and the
            money. New to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>, or see the
            product for a single market, such as{' '}
            <A href="/blog/hostel-management-software-nigeria">Nigeria</A> or{' '}
            <A href="/blog/hostel-management-software-pakistan">Pakistan</A>.
          </P>

          <Box title="In short">
            <P>
              Run a hostel on three things kept straight: who is in which bed, what they owe, and what they have paid.
              Model the building down to the bed, put everything on one bill per resident with part-payments and receipts,
              fill beds from your own page, and total the costs most operators miss. A management system does that; a
              booking site does not.
            </P>
          </Box>

          <div className="mt-8">
            <StartTrialButton location="other" size="lg" className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90" />
          </div>
        </div>
      </article>

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8"><FaqList items={faqs} /></div>
        </div>
      </section>

      <CtaBand
        heading="Run your hostel on one system."
        text="Beds, residents, one bill each with part-payments and receipts, costs and every hostel in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.hostel}
        secondaryLabel="Hostel management software"
      />
    </SiteShell>
  )
}
