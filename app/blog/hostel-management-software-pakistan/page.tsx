import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { pakistanScreenshots as shots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('hostel-management-software-pakistan')!
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
      'It is software that runs the day-to-day of a hostel, where residents rent a bed or a room rather than a whole flat. It handles admissions, bed-level occupancy, one monthly bill per resident for rent, mess and electricity, deposits, complaints and reporting, for a single hostel or several branches.',
  },
  {
    question: 'Does it bill mess and electricity, not just rent?',
    answer:
      'Yes. Alongside rent you can charge for mess or meals, and meter electricity by AC units and split it between the residents who shared a room, so each resident gets one monthly bill in rupees covering their whole share. A geyser charge can be set to apply in winter only, scheduled automatically, and the kitchen’s own costs are tracked so you can see the real cost per resident.',
  },
  {
    question: 'Can residents pay with JazzCash, Easypaisa or SadaPay?',
    answer:
      'PulseHub records payments and issues receipts; it is not a payment gateway, so it does not auto-debit rent. You record a payment however the resident sent it, including local wallets like JazzCash, Easypaisa or SadaPay, cash or bank transfer, and a numbered receipt goes out, ready to share on WhatsApp. Automatic WhatsApp reminders chase what is due.',
  },
  {
    question: 'Does it help with police guest registration?',
    answer:
      'Yes, in the provinces it covers. PulseHub syncs resident check-ins to the Hotel Eye police portal in Punjab, Islamabad and Sindh in one click, and re-files nightly, so registration is not a manual job. It is a tool to help you stay registered, not legal advice, and you remain responsible for meeting the rules that apply to your hostel.',
  },
  {
    question: 'Can I run more than one hostel branch?',
    answer:
      'Yes. Switch between branches on one login, move a resident between them, and see every branch together with occupancy, collections, dues and profit side by side, in rupees. A warden or manager can be given access to just their own branch.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. You can start a 14-day free trial with no card required, then book a demonstration if you would like a walkthrough set up for your hostel.',
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
        { '@type': 'ListItem', position: 3, name: 'Hostel management software in Pakistan', item: url },
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

export default function HostelPakistanPost() {
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
              Hostel management software for Pakistan runs the day-to-day of a hostel from one place: beds and
              residents, one monthly bill per resident in rupees for rent, mess and AC electricity, deposits, WhatsApp
              reminders and receipts, guest registration, and every branch in one view.
            </strong>{' '}
            It is built for how hostels here actually work, bed by bed, not the whole-flat model a generic rental or
            hotel tool assumes.
          </P>
          <P>
            Whether you run a student hostel, a working men&rsquo;s or women&rsquo;s hostel or a PG in Lahore, Karachi,
            Islamabad or anywhere else, a register and a WhatsApp group stop coping once you have more than a few rooms.
            Rent comes in parts, the mess and electricity have to be split fairly, deposits need refunding, and in many
            cities you have to register residents with the police. This guide covers what the software does, why a
            school ERP or a hotel tool does not fit, the features that matter here, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Hostels here are let by the bed with shared mess and electricity, so they need bed-level software, not a hotel or whole-flat tool.</li>
              <li>One monthly bill per resident in rupees should gather rent, mess and AC electricity, with part-payments tracked.</li>
              <li>Payments are recorded, not auto-debited: you log cash, bank transfer or a wallet like JazzCash or Easypaisa, and WhatsApp handles reminders and receipts.</li>
              <li>Guest registration to the provincial police portal (Punjab, Islamabad, Sindh) can be filed automatically rather than by hand.</li>
              <li>Once you run more than one branch, a single view across all of them, with warden access per branch, is what keeps it manageable.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What hostel management software is</H2>
          <P>
            It is software that runs a hostel&rsquo;s daily operations from one place: a record for every resident, true
            occupancy down to the bed, one monthly bill that gathers rent, mess and electricity, the payments and
            deposits against it, and a clear view of how each branch is doing. Instead of a bed list in one register, a
            rent diary in another and mess accounts on loose paper, it keeps them together, and the same system runs a
            single hostel or a chain across cities.
          </P>

          <H2 id="why-generic">Why a school ERP or hotel tool does not fit</H2>
          <P>
            Most of what gets sold as hostel software in Pakistan is really something else. School and campus ERPs bolt
            a basic hostel module onto fee management: fine for a university warden, but not built to bill a private
            hostel&rsquo;s mess and electricity or run several branches as a business. Hotel systems are built around
            nightly stays and a front desk, not a resident who pays monthly, in parts, for a bed in a shared room.
          </P>
          <P>
            A hostel sits between the two and matches neither: many residents under one roof, each renting a bed,
            staying for months, sharing a mess and a meter, often paying in instalments. It needs software that models a
            room as several beds, keeps occupancy true, and bills each resident for their actual share in rupees.
          </P>

          <H2 id="features">The features that matter for a Pakistani hostel</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Bed-level occupancy</strong> that cannot be over-filled, so a four-seater room with three residents reads as three-quarters full.</li>
            <li><strong>One bill per resident in rupees,</strong> gathering rent, mess and electricity, with part-payments tracked as instalments.</li>
            <li><strong>AC electricity billed on usage:</strong> enter the meter reading and the charge is worked out and split automatically between the residents who shared the room.</li>
            <li><strong>Geyser billed for winter only,</strong> scheduled to switch on and off automatically with the season, so no one is charged for it through the summer.</li>
            <li><strong>Local payments recorded,</strong> whether cash, bank transfer or a wallet such as JazzCash, Easypaisa or SadaPay, with a numbered receipt to share on WhatsApp.</li>
            <li><strong>Automatic WhatsApp reminders,</strong> so overdue rent is chased without you doing it by hand.</li>
            <li><strong>One-click Hotel Eye sync</strong> that files resident check-ins straight to the provincial police portal (Punjab, Islamabad and Sindh), with a nightly re-file, rather than a manual register.</li>
            <li><strong>CNIC and documents</strong> held against each resident, with their deposit and full history.</li>
            <li><strong>Mess and kitchen costs</strong> tracked, so you can see the real cost per resident rather than guessing.</li>
            <li><strong>Deposits</strong> held and settled against final dues at check-out.</li>
            <li><strong>A free website, connected to the software,</strong> that shows your rooms and updates available beds automatically as residents move in and out.</li>
            <li><strong>Every branch in one view,</strong> with occupancy, collections and costs per branch, and warden access scoped to one branch.</li>
          </UL>

          <H2 id="pulsehub">How PulseHub runs a Pakistani hostel</H2>
          <P>
            <A href={routes.pakistan}>PulseHub</A> is built for renting by the room and the bed, which is exactly the
            hostel model. It organises each hostel into floors, rooms and beds and keeps occupancy true, and every
            resident is one record with their CNIC, documents, deposit and history. Each resident gets one monthly bill
            in rupees that gathers rent, mess where you provide it, and a share of AC electricity worked out
            automatically from the meter reading, plus a geyser charge that applies only through the winter. Part-payments
            are recorded as instalments against a running balance.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={shots.payments.src}
              alt={shots.payments.alt}
              width={shots.payments.width}
              height={shots.payments.height}
              label="Payments · rent, AC billing & WhatsApp receipts"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <P>
            On payments, PulseHub records what comes in rather than auto-debiting it: you log a payment however the
            resident sent it, including a wallet like JazzCash, Easypaisa or SadaPay, and a numbered receipt goes out,
            ready to share on WhatsApp, while automatic reminders chase what is due. On registration, a one-click Hotel
            Eye sync files resident check-ins straight to the provincial police portal in Punjab, Islamabad and Sindh and
            re-files nightly, so it is handled rather than left to a paper register. That is a tool to help you stay registered, not legal
            advice, and you remain responsible for the rules that apply to your hostel.
          </P>
          <P>
            Deposits are settled against final dues at check-out, every branch rolls up into one view, and a warden can
            be given access to just their own branch. Each hostel also gets a public listing page with live room
            availability and a WhatsApp button, so you can fill empty beds from your own page. For the market page, see{' '}
            <A href={routes.pakistan}>PulseHub for Pakistan</A>; for the product in general, see{' '}
            <A href={routes.hostel}>hostel management software</A>.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={shots.website.src}
              alt={shots.website.alt}
              width={shots.website.width}
              height={shots.website.height}
              label="Your free hostel website · live beds & WhatsApp"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <Box title="In short">
            <P>
              If you run a hostel in Pakistan, by the bed, with a shared mess and meter, and often more than one branch,
              you need software built for that, not a school ERP module or a hotel system bent to fit. Look for true
              bed-level occupancy, one rupee bill per resident for rent, mess and AC electricity, payments you record
              with WhatsApp reminders, guest registration, and a single view across every branch.
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
        heading="Run your hostel on one system."
        text="Beds and residents, one rupee bill per resident for rent, mess and AC electricity, WhatsApp reminders and every branch in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.pakistan}
        secondaryLabel="PulseHub for Pakistan"
      />
    </SiteShell>
  )
}
