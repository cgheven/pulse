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

const post = getBlogPost('student-accommodation-management-software-south-africa')!
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
    question: 'What is student accommodation management software?',
    answer:
      'It is software that runs student housing where people rent a room or a bed rather than a whole flat: applications and admissions, room and bed occupancy, rent and shared costs on one bill per resident, deposits, arrears and reporting, for a single residence or a whole portfolio.',
  },
  {
    question: 'Does it work for private student accommodation in South Africa, in rand?',
    answer:
      'Yes. PulseHub sets the currency, date format and wording to your market, so your rooms, rent and receipts are in rand. It suits private student residences and landlords near universities and TVET colleges, letting by the room and the bed.',
  },
  {
    question: 'Does it handle NSFAS accreditation and payments?',
    answer:
      'Being clear: PulseHub runs the operational side, who is housed where, their rent and deposits, occupancy and reporting. It does not submit NSFAS accreditation or claims for you; accreditation and the direct payments to accredited providers stay with NSFAS and your institution. You can record an NSFAS payment against a resident the same way you record any other.',
  },
  {
    question: 'Can students pay in parts, and how are payments handled?',
    answer:
      'Yes. Each resident has one bill, and part-payments are recorded as instalments with their own date and receipt, with the balance carried forward. PulseHub records payments and issues receipts; it is not a payment gateway, so you log what was paid (bank transfer, NSFAS, cash) and a receipt goes out.',
  },
  {
    question: 'Can I run more than one residence?',
    answer:
      'Yes. Switch between residences on one login, move a resident or a room between them, and see every residence together with occupancy, collections and costs side by side. A manager can be given access to just their own residence.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your residences.',
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
        { '@type': 'ListItem', position: 3, name: 'Student accommodation management software in South Africa', item: url },
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

export default function StudentSouthAfricaPost() {
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
              Student accommodation management software for South Africa runs a private student residence from one place:
              applications, room and bed occupancy, one bill per resident in rand, deposits and arrears, your own page to
              fill beds, and every residence in one view.
            </strong>{' '}
            It is built for letting by the room and the bed, the way private residences and landlords near South African
            campuses actually operate, not the whole-flat model a generic rental tool assumes.
          </P>
          <P>
            If you run a private residence or let rooms to students near a university or TVET college, in Johannesburg,
            Cape Town, Pretoria, Durban or Bloemfontein, a spreadsheet stops coping once you pass a few rooms. Beds fill
            and empty around the academic year, rent and NSFAS payments arrive in parts, deposits pile up, and turn
            season is chaos. This guide covers what the software does, why a generic tool does not fit, the features that
            matter here, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Private student residences are let by the bed, so they need bed-level software, not a whole-flat tool.</li>
              <li>One bill per resident in rand, with part-payments recorded as instalments and a running balance.</li>
              <li>PulseHub runs the operations and records payments, including NSFAS, but does not submit NSFAS accreditation or claims.</li>
              <li>Your own public page fills beds directly, with live availability.</li>
              <li>A single view across every residence keeps a growing portfolio manageable.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What student accommodation software is</H2>
          <P>
            It is software that runs a residence&rsquo;s daily operations from one place: a record for every student with
            their deposit and history, true occupancy down to the bed, one bill that gathers rent and shared costs, the
            payments against it, and a clear view of how each residence is doing. Instead of a bed list in one
            spreadsheet and a rent tracker in another, it keeps them together, for one residence or a whole portfolio.
          </P>

          <H2 id="why-generic">Why a generic rental tool does not fit</H2>
          <P>
            Most property tools assume one tenant signs for one whole flat and pays one rent. A student residence does
            not work like that: many students live under one roof, each renting a bed, each with their own rent, deposit
            and sometimes an NSFAS arrangement. Run that on a whole-unit tool and you fight it every year, you cannot
            bill a bed, you cannot see a room as part full, and the turn-season churn becomes a manual rebuild.
          </P>
          <P>
            University residence systems run the institution&rsquo;s own halls, not your private residence. A private
            operator needs software built to let beds, bill each student, and keep the money and the records
            straight.
          </P>

          <H2 id="features">The features that matter in South Africa</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Room and bed-level occupancy</strong> that cannot be over-filled, so a four-bed unit with three students reads as three-quarters full.</li>
            <li><strong>One bill per resident in rand,</strong> with part-payments tracked as instalments and the real balance carried forward.</li>
            <li><strong>Payments recorded with receipts,</strong> including NSFAS, bank transfer and cash, so collections are never a guess.</li>
            <li><strong>Arrears tracking and automatic reminders,</strong> so overdue rent is chased without you doing it by hand.</li>
            <li><strong>Deposits and move-in / move-out,</strong> held and settled, with turn season handled rather than rebuilt.</li>
            <li><strong>Your own public page,</strong> with live bed availability, so students enquire with you directly.</li>
            <li><strong>Portfolio reporting,</strong> with occupancy, collections and cost per residence, and manager access scoped to one residence.</li>
            <li><strong>Data in and out,</strong> with bulk import to start and export whenever you want.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={screenshots.properties.src} alt="A portfolio view comparing occupancy, rent collected, costs and profit across several student residences" width={screenshots.properties.width} height={screenshots.properties.height} label="Every residence · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.student}>PulseHub</A> is built for letting by the room and the bed, which is exactly the
            student-residence model. It organises each residence into floors, rooms and beds, keeps occupancy true, and
            every student is one record with their documents, deposit and history. Each resident gets one bill in rand,
            with part-payments recorded as instalments, arrears chased automatically, and every residence in one
            portfolio view. Each residence also gets a free public page with live availability, so you fill beds from
            your own link.
          </P>
          <P>
            One honest boundary: PulseHub runs the operations and records payments, including NSFAS payments, but it does
            not submit NSFAS accreditation or claims, which stay with NSFAS and your institution, and it is not a payment
            gateway. For the product in general, see{' '}
            <A href={routes.student}>student accommodation management software</A> and our guide to{' '}
            <A href="/blog/how-to-choose-student-accommodation-management-software">choosing student accommodation software</A>;
            new to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              If you run private student accommodation in South Africa, by the bed, in rand, and often more than one
              residence, you need software built for that model, not a whole-flat rental tool or a university system. Look
              for true bed-level occupancy, one rand bill per resident, NSFAS and other payments recorded with receipts,
              your own page to fill beds, and a single view across every residence.
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
        heading="Run your student residences on one system."
        text="Rooms and beds, one rand bill per resident, deposits, arrears and every residence in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation management software"
      />
    </SiteShell>
  )
}
