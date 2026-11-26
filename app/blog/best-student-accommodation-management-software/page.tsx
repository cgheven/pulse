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

const post = getBlogPost('best-student-accommodation-management-software')!
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
    question: 'What is the best student accommodation management software?',
    answer:
      'There is no single best one; it depends on what you run. Large purpose-built student accommodation (PBSA) and universities are served by enterprise systems like StarRez, Kinetic and Entrata. Landlords letting whole flats use general tools like Landlord Vision or Buildium. Independent operators renting student rooms or beds one by one are a better fit for room-level software such as PulseHub.',
  },
  {
    question: 'What software do universities use for student housing?',
    answer:
      'Universities and large PBSA providers typically use enterprise platforms built around the full student-housing lifecycle, such as StarRez, Kinetic or Entrata Student. These handle applications, room lottery and allocation, and integration with student information systems. They are powerful but usually more than an independent operator with a handful of student houses needs.',
  },
  {
    question: 'Is PulseHub a student information system?',
    answer:
      'No, and it is worth being clear about it. PulseHub is a room-by-room operations platform for operators who rent student rooms or beds. It does not do campus room-lottery, dining plans or integrate with a university student information system. If you need those, an enterprise PBSA system fits better. If you rent rooms to students as an independent landlord or operator, PulseHub is built for that.',
  },
  {
    question: 'What should I look for in student accommodation software?',
    answer:
      'Start with how you actually let: whole flats on one tenancy, or rooms and beds let individually. If it is by the room, you need bed-level occupancy, one bill per resident, deposits tracked per resident, and ideally a public page to advertise rooms. Then weigh your size and budget: enterprise systems suit large PBSA, lighter tools suit independent operators.',
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
        { '@type': 'ListItem', position: 3, name: 'Best student accommodation software', item: url },
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

export default function BestStudentAccommodationSoftwarePost() {
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
              There is no single best student accommodation management software, because the people searching for it run
              very different operations. A university housing office, a landlord with three student flats, and an operator
              letting forty rooms one bed at a time all need different tools.
            </strong>{' '}
            The honest way to pick is to find your segment first, then shortlist within it. Here are the three, and who
            each suits.
          </P>

          <H2 id="pbsa">Enterprise PBSA and university systems</H2>
          <P>
            If you are a university or a large purpose-built student accommodation (PBSA) provider, the serious options are
            enterprise platforms like <strong>StarRez</strong>, <strong>Kinetic</strong> and <strong>Entrata Student</strong>.
            They cover the full lifecycle: applications, room lottery and allocation, roommate matching, tenancy agreements,
            and integration with a university student information system. They are deep and capable. The flip side is cost
            and setup: they are institution-priced, usually quote-based rather than published, and take weeks or months to
            roll out. For an independent operator with a handful of student houses, that is far more tool, and far more
            process, than the job needs.
          </P>

          <H2 id="general">General landlord and property software</H2>
          <P>
            Tools like <strong>Landlord Vision</strong>, <strong>TurboTenant</strong> and <strong>Buildium</strong> serve
            landlords and agents letting whole units, usually on a published per-unit or flat monthly subscription. They
            are solid for a portfolio of flats or houses on standard tenancies. The catch for student operators is the
            model underneath: they assume one tenant on one tenancy for one unit. The moment you let a house room by room,
            with a separate resident, bill and deposit per bed, that model starts to fight you.
          </P>

          <H2 id="room-level">Room-by-room operator software</H2>
          <P>
            The third group is built for exactly that: operators who rent student rooms or beds individually.{' '}
            <A href={routes.student}>PulseHub</A> sits here. It models each property as rooms and beds, so a six-bed house
            with four students reads as four sixths full, bills each resident separately for rent and a metered share of
            utilities, tracks a deposit per resident, and gives every property a public page to advertise rooms with live
            availability. It is for independent and mid-sized operators of student houses, HMOs and off-campus shared
            housing, and it starts on a published plan with a free trial rather than a sales call, so you can be set up in
            a day.
          </P>
          <P>
            Being straight about the edges: PulseHub is <strong>not</strong> a university student information system, so it
            does not run campus room-lottery or dining plans or plug into a university SIS. It records payments and chases
            them, but it is not a payment gateway, and it records deposits rather than lodging them with a government
            protection scheme. If you need those, the enterprise PBSA systems above are built for it; if you rent rooms to students yourself, this is the
            lane PulseHub is built for.
          </P>

          <H2 id="choose">How to choose, in four questions</H2>
          <UL>
            <li><strong>Whole units or rooms?</strong> If you let by the room or bed, prioritise bed-level occupancy and one bill per resident over whole-unit accounting.</li>
            <li><strong>University-affiliated or independent?</strong> PBSA tied to a university usually needs an enterprise system; independent operators rarely do.</li>
            <li><strong>How many beds?</strong> A few hundred beds under a PBSA brand is a different buy from forty rooms across a few houses.</li>
            <li><strong>Budget and effort?</strong> Enterprise systems cost more and take longer to roll out; lighter tools start in minutes.</li>
          </UL>

          <H2 id="next">Where to go next</H2>
          <P>
            If you rent student rooms by the room, see how{' '}
            <A href={routes.student}>PulseHub manages student accommodation</A>, read the{' '}
            <A href={postPath('how-to-choose-student-accommodation-management-software')}>buyer&rsquo;s checklist</A>, the{' '}
            <A href={postPath('pbsa-management-software')}>PBSA guide</A>, or how to handle{' '}
            <A href={postPath('student-accommodation-rent-collection')}>student rent collection</A>.
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
        heading="Built for renting student rooms by the room"
        text="If you let student houses bed by bed, see PulseHub on your own rooms. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation software"
      />
    </SiteShell>
  )
}
