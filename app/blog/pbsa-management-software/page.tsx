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

const post = getBlogPost('pbsa-management-software')!
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
    question: 'What is PBSA management software?',
    answer:
      'PBSA management software runs purpose-built student accommodation: applications, room and bed occupancy, one bill per resident, deposits and guarantor records, maintenance, arrears and reporting across one scheme or a portfolio. Large schemes often run enterprise platforms with their own booking engines; smaller and independent operators need a lighter system that still manages beds, residents and rent properly.',
  },
  {
    question: 'Does PulseHub distribute rooms to booking channels like the big PBSA platforms?',
    answer:
      'No. PulseHub is not a booking engine or channel manager, and it does not distribute rooms to third-party student-housing marketplaces or handle university nomination agreements. It gives each property its own public page with live availability so prospects enquire with you directly, and it runs the operations behind the booking: beds, residents, billing, deposits, maintenance and reporting.',
  },
  {
    question: 'Is it only for large purpose-built schemes?',
    answer:
      'No, the opposite. The enterprise PBSA platforms are built, and priced, for large towers with hundreds of beds. PulseHub fits independent and mid-sized operators: a converted block, a cluster of student houses, or a smaller scheme, where you want one straightforward system without per-bed fees or a long implementation.',
  },
  {
    question: 'How does it handle by-the-bed billing?',
    answer:
      'Each property is organised into rooms and beds, occupancy cannot be over-filled, and every resident is one record with one bill. Part-payments are recorded as installments with their own date and receipt, and the balance carries forward, so a studio-heavy block and a cluster flat are both billed the way they are actually let.',
  },
  {
    question: 'Does it keep guarantor and compliance records?',
    answer:
      'It keeps each resident, their guarantor and their uploaded documents on one record, with the full payment history alongside. PulseHub records this information and keeps it organised; it does not lodge deposits with a protection scheme or file compliance for you, which stays the operator’s responsibility.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your scheme.',
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
        { '@type': 'ListItem', position: 3, name: 'PBSA management software', item: url },
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

export default function PbsaManagementSoftwarePost() {
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
              PBSA management software runs purpose-built student accommodation from one place: applications, room and
              bed occupancy, one bill per resident, deposits and guarantor records, maintenance, and every scheme in one
              view.
            </strong>{' '}
            The enterprise platforms are built, and priced, for large towers. This guide is for the independent and
            mid-sized operator who wants that control without the weight, and it is honest about where PulseHub fits and
            where it does not.
          </P>
          <P>
            Purpose-built student accommodation has grown fast, and most of the software written for it assumes a big
            scheme with its own booking engine, channel distribution and university nomination agreements. If you run a
            converted block, a cluster of student houses, or a smaller scheme, those systems are heavier and more
            expensive than you need, while a generic landlord tool cannot bill a bed or see a flat as part full. This
            guide covers what the category does, what the large platforms include, and the lighter way to run a smaller
            PBSA operation.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>PBSA is let by the room and the bed, so it needs bed-level software, not a whole-unit landlord tool.</li>
              <li>Enterprise PBSA platforms bundle booking engines, channel distribution and nominations, and price per bed to match.</li>
              <li>Independent and mid-sized operators rarely need all that, and should not pay for it.</li>
              <li>PulseHub is the lighter alternative: beds, residents, one bill each, deposits, maintenance and portfolio reporting, flat per property.</li>
              <li>It is not a booking engine or channel manager, and compliance stays the operator&rsquo;s responsibility.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What PBSA management software does</H2>
          <P>
            At its core it runs a scheme&rsquo;s daily operations: a record for every resident with their guarantor,
            deposit and documents, true occupancy down to the bed, one bill that gathers rent and any shared costs, the
            payments against it, maintenance issues as they come in, and a clear view of how each property is performing.
            Instead of a bed list in one spreadsheet and a rent tracker in another, it keeps them together, for one
            scheme or a whole portfolio.
          </P>

          <H2 id="enterprise">What the large PBSA platforms add, and what it costs</H2>
          <P>
            Platforms built for large schemes layer a booking engine, a marketing website, distribution to student-housing
            marketplaces, and university nomination workflows on top of the operations. For a tower releasing hundreds of
            beds in a single cycle, that distribution machinery earns its keep. It also comes with per-bed pricing, longer
            implementations, and more system to learn.
          </P>
          <P>
            A smaller operator rarely fills beds that way. You let through your own enquiries, a local agent, or returning
            residents, and the cost of a per-bed enterprise suite is hard to justify. What you actually need is the
            operations layer done well: beds that cannot be over-filled, one bill per resident, deposits and guarantors on
            record, maintenance tracked, and the numbers in one place.
          </P>

          <H2 id="features">The features that matter for an independent operator</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>By-the-bed occupancy</strong> that cannot be over-filled, so a six-bed cluster flat with four residents reads as two-thirds full.</li>
            <li><strong>One bill per resident,</strong> with part-payments tracked as installments and the real balance carried forward.</li>
            <li><strong>Guarantor and document records,</strong> keeping a parent or guarantor as a contact on the resident&rsquo;s record, with signed documents uploaded and the full payment history alongside.</li>
            <li><strong>Deposits</strong> held against each record and settled at check-out.</li>
            <li><strong>Arrears tracking and automatic reminders,</strong> so overdue rent is chased without you doing it by hand.</li>
            <li><strong>Maintenance</strong> that residents can report without needing an account, routed to your team.</li>
            <li><strong>Your own public page,</strong> with live bed availability, so prospects enquire with you directly.</li>
            <li><strong>Portfolio reporting,</strong> with occupancy and collections per property, and manager access scoped to one scheme.</li>
            <li><strong>Flat per-property pricing,</strong> rather than a fee for every bed.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={screenshots.payments.src} alt={screenshots.payments.alt} width={screenshots.payments.width} height={screenshots.payments.height} label="Payments · rent & receipts per resident" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={screenshots.residents.src} alt={screenshots.residents.alt} width={screenshots.residents.width} height={screenshots.residents.height} label="Residents · deposits, waiting list & check-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={screenshots.properties.src} alt={screenshots.properties.alt} width={screenshots.properties.width} height={screenshots.properties.height} label="Every scheme · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.student}>PulseHub</A> is built for letting by the room and the bed, which is exactly the PBSA
            model. It organises each property into rooms and beds, keeps occupancy true, and every resident is one record
            with their guarantor, deposit and documents. Each resident gets one bill, with part-payments recorded as
            installments, arrears chased automatically, and maintenance tracked from report to fix. Every property sits in
            one portfolio view, each gets a free public page with live availability so you fill beds from your own link,
            and plans are flat per property, with no per-bed fees.
          </P>
          <P>
            One honest boundary: PulseHub runs the operations and records payments, but it is not a booking engine or
            channel manager, it does not distribute rooms to third-party marketplaces or handle university nomination
            agreements, and compliance stays your responsibility. If you need channel distribution for a large scheme,
            pair it with a dedicated booking platform; if you run an independent or mid-sized operation, it may be all the
            system you need. For the product in general, see{' '}
            <A href={routes.student}>student accommodation management software</A> and our{' '}
            <A href="/blog/student-accommodation-management">UK guide to student accommodation management</A>; comparing
            tools? Read <A href="/blog/how-to-choose-student-accommodation-management-software">how to choose student accommodation management software</A>,
            and keeping rent on track is covered in{' '}
            <A href="/blog/student-accommodation-rent-collection">student accommodation rent collection</A>.
          </P>

          <Box title="In short">
            <P>
              If you run purpose-built student accommodation as an independent or mid-sized operator, you need the
              operations layer done properly, not a per-bed enterprise suite built for distribution you do not use. Look
              for true by-the-bed occupancy, one bill per resident, guarantor and deposit records, maintenance, your own
              page to fill beds, portfolio reporting, and flat per-property pricing.
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
        heading="Run your PBSA scheme on one system."
        text="Beds, one bill per resident, guarantor and deposit records, maintenance and every property in one view, with no per-bed fees. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation management software"
      />
    </SiteShell>
  )
}
