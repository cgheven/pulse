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

const post = getBlogPost('spacebasic-alternative')!
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
    question: 'Is PulseHub a direct replacement for SpaceBasic?',
    answer:
      'Not exactly, and that is the point. SpaceBasic is built around campus and institutional hostels, with features like biometric attendance and student and parent apps tied to a college. PulseHub is built for commercial PG and hostel operators who run the property as a business. If you are an institution, SpaceBasic may suit you better. If you are an operator billing paying residents yourself, PulseHub fits that lane.',
  },
  {
    question: 'Does PulseHub do biometric attendance or a parent app?',
    answer:
      'No. PulseHub does not run biometric attendance, and it is not a student information system tied to a college roll. Those are institutional features. PulseHub focuses on the operator side: bed-level occupancy, one monthly bill per resident, deposits, meal packages and a public listing page for your property.',
  },
  {
    question: 'Can PulseHub handle meals and electricity the way a PG needs?',
    answer:
      'Yes. If your package includes food, PulseHub costs the mess per person per meal and lets you publish a weekly menu. Metered electricity is split across residents by their join dates, so a person who moved in mid-month pays only their share. Rent, that electricity share, recurring water or gas and meals all land on one automatic monthly bill per resident.',
  },
  {
    question: 'Does PulseHub verify Aadhaar or collect rent by UPI?',
    answer:
      'No to both. PulseHub keeps each resident&rsquo;s ID and documents on file, but it does not run Aadhaar or e-KYC and does not verify identities. It also records payments rather than processing them, so it is not a UPI or card gateway. Residents pay through your own methods and you mark it recorded, which produces numbered receipts and carries dues forward.',
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
        { '@type': 'ListItem', position: 3, name: 'SpaceBasic alternative', item: url },
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

export default function SpaceBasicAlternativePost() {
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
              If you run a PG or hostel as a business and SpaceBasic feels built for colleges, that is because it largely
              is. SpaceBasic leans campus and institutional, while PulseHub is built for commercial operators who need
              operational software, not a university system.
            </strong>{' '}
            Both are real, honest choices. The right one comes down to whether a college owns the building or you do.
          </P>

          <H2 id="spacebasic">What SpaceBasic is built for</H2>
          <P>
            SpaceBasic is India student-housing and hostel software with a strong campus and institutional lean. Its home
            turf is college and university hostels: biometric attendance, student and parent apps, and the workflows an
            institution expects when it houses its own enrolled students. For a university warden or a campus hostel
            office, that fit is genuine. If an institution runs the building and answers to parents and administration,
            SpaceBasic is designed for exactly that world and does it well for its segment.
          </P>
          <P>
            The mismatch shows up when a commercial operator tries to use it. A paying-guest house or a private hostel is
            not a campus. You are not tracking attendance for a college, you are running a business where beds are
            revenue and every resident is a billing relationship you own.
          </P>

          <H2 id="operator-needs">What a commercial PG or hostel operator actually needs</H2>
          <P>
            Run a PG or hostel for profit and your daily questions are different from a warden&rsquo;s. They look like this:
          </P>
          <UL>
            <li><strong>Bed-level occupancy</strong> across floors, rooms and beds, so a half-full room reads as half-full and a vacancy shows the day it opens.</li>
            <li><strong>One monthly bill per resident</strong> for rent plus a metered electricity share, with recurring water and gas added on.</li>
            <li><strong>Meal and mess packages</strong> where you feed residents, costed per person per meal, with a weekly menu.</li>
            <li><strong>Deposits per resident</strong>, tracked through the stay and settled against the final bill at move-out.</li>
            <li><strong>A free public listing page</strong> showing live availability and an application form, plus a multi-branch view if you run more than one property.</li>
          </UL>

          <H2 id="pulsehub">What PulseHub does for commercial operators</H2>
          <P>
            <A href={routes.pg}>PulseHub</A> is built around that operator reality, in India and across other markets. It
            keeps your structure as floors, then rooms, then beds, and holds bed-level occupancy true. Each resident gets
            one automatic monthly bill: rent, their metered electricity share split by join dates, any recurring water or
            gas, and meals if the package includes food. You can set seater pricing, a rate per seat count across AC and
            non-AC rooms, so a four-sharing AC bed and a six-sharing non-AC bed price themselves.
          </P>
          <P>
            Payments are recorded the moment a resident pays you, with partial payments, dues carried forward, discounts
            and numbered receipt PDFs you can share by link. Deposits sit per resident until move-out. Your free listing
            page advertises live beds and takes applications, and amounts read in rupees with lakh grouping. If you run
            several branches, the portfolio view keeps them in one place. For teams that want it, <A href={routes.india}>Ask
            Pulse</A>, a WhatsApp AI assistant, is available as a separate paid add-on.
          </P>

          <H2 id="not">Being clear about what PulseHub is not</H2>
          <P>
            Honesty matters more than a feature race, so here is what PulseHub does not try to be. It is not a campus or
            university system and not a student information system, so if you need institutional enrolment records or
            college attendance, SpaceBasic is the better fit. It records payments and is not a UPI or card gateway, so
            residents pay through your own methods and the software logs it. It keeps resident IDs and documents but does
            not run Aadhaar or e-KYC and does not verify identities. And its listing page is not a marketplace or channel
            manager that finds tenants for you.
          </P>
          <P>
            If your building is a business rather than a campus, start with the <A href={postPath('how-to-manage-a-pg')}>guide
            to managing a PG</A>, or compare another option in the <A href={postPath('rentok-alternative')}>RentOk
            alternative</A> write-up.
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
        heading="Software for operators, not campuses"
        text="If you run your PG or hostel as a business, see PulseHub on your own beds. Start a 14-day free trial with no card required."
        secondaryHref={routes.pg}
        secondaryLabel="PG management software"
      />
    </SiteShell>
  )
}
