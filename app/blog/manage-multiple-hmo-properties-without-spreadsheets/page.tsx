import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import { ProductVideo } from '@/components/product-video'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('manage-multiple-hmo-properties-without-spreadsheets')!
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
    question: 'Can I run multiple HMOs in one system?',
    answer:
      'Yes. A capable HMO system runs every property from one account, with a way to switch between them and compare them, so you don’t need a separate login or file per property.',
  },
  {
    question: 'How do I track rent across several properties?',
    answer:
      'Record rent due, paid, part-paid and overdue per room and tenant as payments land, and use a portfolio view to see collections and arrears across every property at once.',
  },
  {
    question: 'How do I move my HMO spreadsheet into software?',
    answer:
      'Set up your properties, rooms and beds, add tenants with their opening balances and deposits, then run the new system alongside the spreadsheet for one rent cycle before you switch.',
  },
  {
    question: 'Can staff see only their own property?',
    answer:
      'Yes, with role-based access. In PulseHub you can give a manager access to the properties they run without exposing the rest of the portfolio.',
  },
  {
    question: 'How are part-payments handled across properties?',
    answer:
      'Each payment, including a partial one, is recorded against the tenant, so the outstanding balance stays accurate per room and rolls up across the portfolio.',
  },
  {
    question: 'Is software worth it for just two or three HMOs?',
    answer:
      'Often yes. The point where a spreadsheet costs more time than it saves usually arrives around the second or third property, especially once part-payments and voids are involved.',
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
        { '@type': 'ListItem', position: 3, name: 'Managing multiple HMO properties without spreadsheets', item: url },
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

function OL({ children }: { children: ReactNode }) {
  return <ol className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-decimal sm:text-lg">{children}</ol>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
    >
      {children}
    </Link>
  )
}

export default function ManageMultipleHmoPost() {
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
            Managing one HMO on a spreadsheet is workable. Managing four or five is where it starts to cost you:
            a void nobody spotted, rent that was half-paid and never chased, a deposit no one can find. This is a
            practical way to run several HMOs without spreadsheets, and how to move off them if you already have.
          </P>
          <P>
            It’s written for UK operators letting by the room across more than one property. Nothing here needs a
            big system or a finance background, just a clear method and one place to keep it. If you’re still
            weighing up tools first, our guide to{' '}
            <A href={postPath('hmo-management-software')}>what HMO management software is and how to choose one</A>{' '}
            covers the basics.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Spreadsheets fail at scale because HMO data is per room and per tenant, not per property, and it changes constantly.</li>
              <li>Track four things across the portfolio: properties, rooms and beds, tenants, and payments (including part-payments and deposits).</li>
              <li>A weekly rhythm (voids, arrears, maintenance) keeps the whole portfolio current in minutes.</li>
              <li>Give each manager access to only their property, and compare sites in one portfolio view.</li>
              <li>You can move off spreadsheets without losing data by running the new system in parallel for one rent cycle first.</li>
            </ul>
          </aside>

          <H2 id="why-spreadsheets-break">Why spreadsheets stop working past your first HMO</H2>
          <P>
            Spreadsheets break because an HMO is a set of rooms and tenancies, not a single unit, and once you
            have several of them the same small problems multiply faster than you can keep up by hand. The
            patterns are always similar:
          </P>
          <UL>
            <li><strong>Tab sprawl.</strong> A file per property, or one enormous sheet, and you’re forever scrolling to find the room you need.</li>
            <li><strong>Part-payments and mixed dates.</strong> A paid/unpaid column can’t represent “£600 of £1,200 in, the rest due on the 20th” across dozens of rooms.</li>
            <li><strong>Voids you notice late.</strong> An empty room at property three stays invisible until the month’s totals come in light.</li>
            <li><strong>Two people, one file.</strong> A manager edits the sheet while you do, and someone’s change quietly disappears.</li>
            <li><strong>Deposits and history in your head.</strong> What was held, what was refunded, who moved rooms back in May.</li>
            <li><strong>No portfolio view.</strong> “How is the portfolio doing?” becomes a weekend of adding up tabs.</li>
          </UL>

          <H2 id="what-to-track">What you need to track across an HMO portfolio</H2>
          <P>At portfolio scale, four things need to stay current for every property:</P>
          <UL>
            <li><strong>Properties.</strong> Each site, its rooms and beds, and who is responsible for it.</li>
            <li><strong>Rooms and beds.</strong> Which are occupied, available or allocated, and from when.</li>
            <li><strong>Tenants.</strong> Contact and tenancy details, documents, deposit, and a running history.</li>
            <li><strong>Payments.</strong> Rent due, paid, part-paid and overdue, plus deposits, utilities and any other charges.</li>
          </UL>
          <P>
            The reason a spreadsheet struggles is that these are related: a tenant belongs to a bed, a bed to a
            property, a payment to a tenant. Software holds those relationships for you, which is most of the work.
          </P>

          <H2 id="a-simple-system">A simple system for running several HMOs</H2>
          <P>The operators who stay on top of several HMOs tend to run the same few habits.</P>

          <H3>Keep one source of truth</H3>
          <P>Put every property, tenant, rent and repair in one place. Half in software and half in a spreadsheet is worse than either, because you never trust which is right.</P>

          <H3>Standardise rooms and rents</H3>
          <P>Use consistent room names and rent schedules across sites. It sounds trivial, but it’s what makes a portfolio view meaningful and comparisons between properties honest.</P>

          <H3>Run a weekly rhythm</H3>
          <P>Once a week, do a five-minute pass across the portfolio: which rooms are empty and from when, who is in arrears, what maintenance is still open. Small and current always beats a month-end scramble.</P>

          <H3>Record payments as they happen</H3>
          <P>Log each payment, including part-payments and deposits, when it lands rather than in a monthly catch-up. Arrears then stay accurate instead of running a month behind reality.</P>

          <H3>Scope access per property</H3>
          <P>Give each manager access to only the property they run. They see what they need, and you keep the whole picture without handing over everything.</P>

          <H3>Compare sites in a portfolio view</H3>
          <P>Keep one screen that shows occupancy, collections, costs and outstanding dues per property, so a weak site shows up early instead of at year end.</P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-6 lg:p-8">
            <ProductVideo
              src="/videos/property-switcher.mp4"
              width={3024}
              height={1576}
              label="Switching properties · All Properties"
              ariaLabel="PulseHub property switcher changing the selected property and opening the All Properties view to compare occupancy, collections, costs and profit"
            />
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Switch between sites, or compare them all in one view
            </p>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-[50rem] sm:mt-16">
          <H2 id="move-off-spreadsheets">How to move off spreadsheets without losing anything</H2>
          <P>
            You don’t have to switch overnight. The safe way is to run the new system alongside your spreadsheet
            for one rent cycle, then retire the sheet once the numbers match.
          </P>
          <OL>
            <li>Pick one system and one cut-over date.</li>
            <li>Set up each property, then its rooms and beds.</li>
            <li>Add tenants and allocate them to rooms.</li>
            <li>Enter opening balances: the current rent position, deposits held, and any arrears.</li>
            <li>Run in parallel for one rent cycle, recording payments in both, and check the totals agree.</li>
            <li>Switch over, and keep the spreadsheet as a read-only archive.</li>
          </OL>
          <P>A free trial is the low-risk way to do the parallel run before you commit to anything.</P>

          <H2 id="where-pulsehub-fits">Where PulseHub fits</H2>
          <P>
            PulseHub is built for exactly this: property, rooms and beds; a record and timeline for each tenant;
            rent, part-payments and deposits on a payments screen; a property switcher and an All Properties view
            for the portfolio; and role-based access per property. See it in context on the{' '}
            <A href={routes.hmo}>HMO management page</A>, or explore the{' '}
            <A href={routes.features}>full platform</A>.
          </P>

          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>

          <H2 id="start">Bring your portfolio into one place</H2>
          <P>
            If you’re managing more than one HMO, the win isn’t a fancier spreadsheet, it’s not needing one.
            PulseHub keeps rooms, tenants, rent, payments and every property in a single account, with a portfolio
            view across the lot. Start a free trial and set up your first property in minutes.
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
        heading="Run your HMO portfolio without the spreadsheet."
        text="Bring every property, room, tenant and payment into one platform. Start a 14-day free trial with no card required, or book a demo."
      />
    </SiteShell>
  )
}
