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

const post = getBlogPost('how-to-choose-student-accommodation-management-software')!
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
    question: 'What is student accommodation management software?',
    answer:
      'It is software that runs the day-to-day of student housing, where people rent a room or a bed rather than a whole flat: applications and admissions, room and bed occupancy, rent and shared costs on one bill per resident, deposits, arrears, maintenance and reporting, for a single property or a whole portfolio.',
  },
  {
    question: 'How is it different from HMO, hotel or general rental software?',
    answer:
      'Hotel software is built around nightly stays and a front desk; general rental software is built around one tenant on one whole-unit lease. Student accommodation sits closer to HMO and co-living: many residents under one roof, each renting a room or bed, each with their own rent and deposit. The software has to model occupancy down to the bed and bill each resident, which whole-unit tools cannot do.',
  },
  {
    question: 'Should I pick per-bed or per-property pricing?',
    answer:
      'It depends on your bed count. Per-bed pricing is predictable but scales up quickly once rooms fill, so a large property can cost much more than a small one. Per-property pricing is flat regardless of how many beds you let, which usually suits operators with well-filled properties. Work both models out against your actual portfolio before you decide.',
  },
  {
    question: 'Does it need to handle UK compliance?',
    answer:
      'If you operate in England and your properties are HMOs, yes: you want certificate and licence dates (gas safety, EICR, EPC, fire alarm and HMO licence) tracked with reminders so nothing lapses. A tracker keeps you organised; it is not legal advice, and larger purpose-built schemes have their own regimes, so confirm what applies to you.',
  },
  {
    question: 'Can PulseHub handle termly or flexible rent schedules?',
    answer:
      'PulseHub bills each resident monthly or by the night and records part-payments as installments, each with its own date and receipt, against a running balance, so a termly amount can be collected in parts. It does not run a dedicated UK academic-term billing cycle out of the box, so if termly-by-default billing is essential to you, confirm the exact setup with us first.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. You can start a 14-day free trial with no card required, then book a demonstration if you would like a walkthrough for your properties.',
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
        { '@type': 'ListItem', position: 3, name: 'How to choose student accommodation management software', item: url },
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

export default function ChooseStudentSoftwarePost() {
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
              To choose student accommodation management software, start from how you actually operate, not the feature
              list: match it to your rent cycles, insist on occupancy down to the room and bed, check it tracks the UK
              compliance that applies to you, make sure you can fill beds and get your data in and out, and weigh the
              pricing model against your real bed count.
            </strong>{' '}
            Everything below expands on that, with the questions worth asking before you sign.
          </P>
          <P>
            Student housing is one of the harder things to run on general tools. Rooms and beds fill and empty around
            the academic year, rent arrives termly or monthly rather than in one lump, deposits and arrears pile up at
            turn season, and in England many properties are HMOs with compliance attached. A tool built for whole-unit
            lets or nightly hotel stays fights you every step. This guide walks through how to pick one that fits,
            whether you run a single house or a large portfolio.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Start from your own operation: rent cycles, property types, portfolio size and who you report to.</li>
              <li>Non-negotiables: room and bed-level occupancy, one bill per resident, arrears tracking and deposits.</li>
              <li>In England, insist on HMO compliance tracking (certificates and licences) if your properties need it.</li>
              <li>Pricing model matters as much as price: per-bed pricing scales up fast, per-property pricing stays flat.</li>
              <li>Match the tool to your size: enterprise purpose-built schemes and small-to-mid operators need different things.</li>
            </ul>
          </aside>

          <H2 id="start-with-operation">Start with how you actually operate</H2>
          <P>
            The best tool for someone else may be the wrong one for you, so begin with your own operation rather than a
            comparison table. Three things shape the shortlist more than any feature:
          </P>
          <UL>
            <li><strong>Your rent cycles.</strong> Students often pay termly or across the academic year, not in equal monthly chunks. Make sure the software can bill the way you actually collect, and handle part-payments against a running balance.</li>
            <li><strong>Your property types.</strong> Shared houses, HMOs, studio clusters and purpose-built blocks behave differently. If your portfolio is mixed, you want one system that handles all of it by the room and the bed.</li>
            <li><strong>Your size and who you report to.</strong> A single house needs simplicity; a portfolio needs a view across every property, and if you manage for owners or investors, reporting back to them matters.</li>
          </UL>

          <H2 id="features-that-matter">The features that actually matter</H2>
          <P>Use this as a checklist. If a tool is weak on the first few, it does not matter how long the rest of its list is:</P>
          <UL>
            <li><strong>Room and bed-level occupancy</strong> that cannot be over-filled, so a four-bed flat with three residents reads as three-quarters full, not one let unit.</li>
            <li><strong>Billing that matches your rent cycle,</strong> with one bill per resident that gathers rent and shared costs such as utilities, and records part-payments as installments.</li>
            <li><strong>Arrears tracking and automated reminders,</strong> so overdue rent is chased without you doing it by hand at the busiest time of year.</li>
            <li><strong>Deposits and move-in / move-out,</strong> held and settled against final dues, with the turn-season churn handled rather than rebuilt each year.</li>
            <li><strong>UK compliance tracking</strong> for England HMOs: gas safety, EICR, EPC, fire alarm and HMO licence dates, with reminders before they lapse.</li>
            <li><strong>Guarantor and guardian records</strong> kept against each resident, alongside their documents and emergency contact.</li>
            <li><strong>A way to fill beds,</strong> such as a public listing page with live availability and an application form, so you are not reliant on a single portal.</li>
            <li><strong>Portfolio and owner reporting,</strong> with occupancy, collection and cost per property, and a clean report if you answer to owners.</li>
            <li><strong>Roles and permissions,</strong> so a site manager sees only their own property.</li>
            <li><strong>Data in and out:</strong> bulk import to start, and export whenever you want, so you are never locked in.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot
              src={screenshots.payments.src}
              alt="A student accommodation payments screen showing each resident's rent and shared costs on one bill, with paid and pending status"
              width={screenshots.payments.width}
              height={screenshots.payments.height}
              label="Payments · each resident's rent & shared costs"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="demo-questions">Questions to ask on a demo</H2>
          <P>A demo is where the feature list meets reality. Ask the vendor to show you, not tell you:</P>
          <UL>
            <li>Bill a resident the way we actually collect rent, and take a part-payment. Where does the balance go?</li>
            <li>Mark a room part-occupied, then move a resident between rooms or properties. Does occupancy stay correct?</li>
            <li>Show a property with a certificate about to expire. How, and when, am I warned?</li>
            <li>Advertise an available room and take an application. Where does the enquiry land?</li>
            <li>Export my residents and payments. What format, and how complete is it?</li>
            <li>What happens at turn season when a whole house checks out and refills?</li>
          </UL>

          <H2 id="match-your-size">Match the tool to your size</H2>
          <P>
            Software for student housing really splits into two camps, and buying from the wrong one is a common, costly
            mistake. Large purpose-built schemes often need enterprise platforms with academic-year leasing engines,
            guarantor automation and investor-grade reporting, and pay accordingly. Small and mid-sized operators, the
            landlord with a handful of HMOs, the operator running shared houses and studio clusters, usually need the
            opposite: one straightforward system that lets by the room and the bed, bills each resident, and does not
            charge a fee per bed. Buying an enterprise platform for a dozen houses means paying for complexity you will
            never use; stretching a basic rental tool across a growing portfolio means outgrowing it. Be honest about
            which camp you are in.
          </P>

          <H2 id="how-pulsehub-fits">How PulseHub fits</H2>
          <P>
            <A href={routes.student}>PulseHub is student accommodation management software</A> aimed at the second camp:
            operators of any size who let by the room and the bed and want one system without per-bed fees. It models
            each property as floors, rooms and beds, keeps occupancy true, and gives every resident one bill that
            gathers rent and shared costs such as a metered share of electricity, with part-payments recorded as
            installments against a running balance. Deposits are held and settled at check-out, overdue rent is chased
            with automatic reminders, and every property rolls up into one portfolio view with manager logins scoped to
            a single site. For England HMOs it tracks gas safety, EICR, EPC, fire-alarm and HMO-licence dates with reminders, and
            each property gets a public listing page with live availability to help fill beds.
          </P>
          <P>
            Two honest boundaries so you can judge the fit. PulseHub bills monthly or by the night with installments
            rather than running a dedicated UK academic-term cycle, so confirm termly billing with us if that is
            essential, and it keeps guardian and guarantor records rather than automating full guarantor agreements. It
            is built for operators who want a clear, affordable system, not an enterprise PBSA leasing suite. For the
            full picture, see the <A href={routes.student}>student accommodation management software</A> page and our{' '}
            <A href="/blog/student-accommodation-management">UK guide to student accommodation management</A>; for the
            wider category, read <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              Choosing student accommodation management software is less about the longest feature list and more about
              fit: pick the tool that bills the way you collect rent, keeps occupancy true down to the bed, tracks the
              compliance that applies to you, lets you fill beds and move your data freely, and prices in a way that
              suits your bed count. Shortlist two or three, run your own workflows through a demo, and choose the one
              that fits how you actually operate.
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
        heading="See PulseHub on your own student properties."
        text="Rooms and beds, one bill per resident, deposits, arrears and England HMO compliance, across every property. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation management software"
      />
    </SiteShell>
  )
}
