import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('how-to-start-a-student-accommodation-business')!
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
    question: 'Is a student accommodation business profitable?',
    answer:
      'It can be, because letting a house room by room to students usually earns more than a single family let, and demand near a campus is steady year on year. The returns come with more turnover around the academic calendar and more admin per property: several residents, several bills and several deposits. Software that works at room level is what keeps that workload manageable.',
  },
  {
    question: 'Do I need an HMO licence for student housing?',
    answer:
      'Often yes. A shared student house with enough unrelated occupants is usually a house in multiple occupation, which may need a licence from the council, and you will also need current gas, electrical (EICR), EPC and fire-safety paperwork. Requirements differ by council and change over time, so check locally before you let. This is general information, not legal advice.',
  },
  {
    question: 'How do student deposits and guarantors work in PulseHub?',
    answer:
      'PulseHub records each student’s deposit and helps you settle it against the final bill at move-out. It does not lodge the deposit with a protection scheme, so where protection is required that remains your responsibility. A guarantor, often a parent for a student let, is recorded as a contact with an uploaded document. PulseHub is not a cosigner or guarantor service; it stores the record, it does not stand behind the rent.',
  },
  {
    question: 'How do I let rooms for a full academic year?',
    answer:
      'Set each room’s rent and align tenancies to the academic year so the house fills and empties together, which simplifies turnover. PulseHub keeps occupancy true at bed level, bills each student once a month for rent plus a share of utilities, and gives the property a public listing page with an application form you can share during the busy letting season.',
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
        { '@type': 'ListItem', position: 3, name: 'How to start a student accommodation business', item: url },
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
  return (
    <Link href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
      {children}
    </Link>
  )
}

export default function HowToStartStudentAccommodationPost() {
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
              A student accommodation business is really a room-by-room letting business with an academic rhythm: pick a
              property students want, price it per room, sort the bills and deposits, fill it before term, and run it one
              resident at a time.
            </strong>{' '}
            Demand near a good campus is steady, and letting room by room earns more than a single family let. This
            step-by-step guide covers the setup and where software carries the admin.
          </P>

          <H2 id="property">Step 1: Choose a property students want</H2>
          <P>
            Location does most of the work. Students want to be near a campus or on a good transport route into it, within
            walking or a short bus ride of lectures, shops and somewhere to go out. A house that ticks those boxes lets
            quickly and keeps letting year after year, which matters more than square footage. Factor in how many bedrooms
            you can realistically create without crowding shared space, because that is what sets your income. It also pays
            to look at the competition nearby: if the purpose-built blocks around a campus are undercutting you on price or
            offering all-inclusive bills, a well-run shared house still wins on value when the rooms and the service are
            right.
          </P>

          <H2 id="rooms">Step 2: Set up rooms and rent</H2>
          <P>
            Price each room on its own merits (size, light, an en-suite) rather than dividing a whole-house figure, and set
            tenancies to the academic year so the house fills and empties together. PulseHub models floors, rooms and beds
            and keeps occupancy true at bed level, so you always know which rooms are let for the coming year and which
            still need a student. See <A href={postPath('student-housing-management-software')}>student housing
            management software</A> for how that is structured.
          </P>

          <H2 id="bills">Step 3: Sort bills and deposits</H2>
          <P>
            Students expect clarity, so give each one a metered or fair share of the bills rather than a vague house total.
            PulseHub bills each resident once a month: rent, plus a metered share of electricity split by join dates, plus
            recurring water and gas, plus meals if included. On deposits, record each student&rsquo;s deposit and settle it at
            move-out, but protect it in a scheme where that is required, which stays your job, not the software&rsquo;s. A
            guarantor (usually a parent) is recorded as a contact with an uploaded document; PulseHub stores that record, it
            is not a cosigner service, so the guarantee itself still rests on the agreement you sign with them. Many student
            landlords ask for a guarantor as standard, since students rarely have a rental history of their own, and keeping
            that document on file alongside the tenancy saves a scramble later. For the money side, see{' '}
            <A href={postPath('student-accommodation-rent-collection')}>student accommodation rent collection</A>.
          </P>

          <H2 id="find">Step 4: Find students</H2>
          <P>
            The student letting season is short and busy, so be ready to market on two fronts. Every PulseHub property gets
            a free public listing page with live availability and an application form, which is a link you can share with
            applicants, student groups and university noticeboards. Alongside that, list on the student room sites your
            applicants already use. The listing page advertises your rooms; it is not a marketplace or booking engine that
            sources students for you.
          </P>

          <H2 id="compliant">Step 5: Stay compliant</H2>
          <P>
            A shared student house is often a house in multiple occupation, which may need an HMO licence from the council.
            You will also be expected to keep gas safety, electrical (EICR), EPC and fire-safety certificates current, each
            with its own deadline. PulseHub includes an England compliance certificate tracker with per-property deadlines
            so nothing lapses quietly. Rules differ by council and change, so treat this as general information, not legal
            advice, and confirm your obligations locally. The{' '}
            <A href={postPath('how-to-choose-student-accommodation-management-software')}>guide to choosing student
            accommodation software</A> covers what to look for.
          </P>

          <H2 id="run">Step 6: Run it room by room</H2>
          <P>
            Through term, bed-level software keeps the operation calm: one bill per resident, true occupancy so a vacancy
            shows the day it happens, receipts, and automated reminders (WhatsApp-first) when rent is due. Across a growing
            portfolio it all rolls into one view. Remember that <A href={routes.student}>PulseHub</A> records payments
            rather than processing them (it is not a payment gateway) and helps you run the business, but it does not
            replace legal, tax or licensing advice, so always check the rules that apply where you let.
          </P>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6">
              <FaqList items={faqs} />
            </div>
          </section>
        </div>
      </article>

      <CtaBand
        heading="Run student lets room by room"
        text="One bill per student, true bed-level occupancy and a compliance tracker in one place. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation software"
      />
    </SiteShell>
  )
}
