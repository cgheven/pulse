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
import { saudiScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('labour-accommodation-software-saudi-arabia')!
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
    question: 'What is labour accommodation software?',
    answer:
      'It is software that runs worker housing, where people rent a bed rather than a whole unit: who is in which bed, what they or their employer owe, what has been paid, what needs fixing, and how each camp or building is performing. It is built for bed-level occupancy, high turnover and shared costs.',
  },
  {
    question: 'Does it work for staff and labour accommodation in Saudi Arabia, in riyals?',
    answer:
      'Yes. PulseHub sets the currency, date format and wording to your market, so your rooms, rent and receipts are in Saudi riyals. It suits contractors, manpower providers and employers running staff housing and worker camps across Riyadh, Jeddah, Dammam, NEOM and project sites.',
  },
  {
    question: 'Can I bill the employer instead of each worker?',
    answer:
      'Yes. PulseHub records who the payer is for each resident, so you can bill a worker directly or the employer that booked the beds, and track what each owes and has paid. It records payments and issues receipts; it is not a payroll system, so any salary deductions happen in your payroll, not here.',
  },
  {
    question: 'Does it handle Saudi labour-housing compliance and Qiwa?',
    answer:
      'Being clear: PulseHub runs the operational side, who is housed where, their records and documents, billing and occupancy across camps. It does not integrate with Qiwa, Musaned or a national labour-accommodation registry, and it is not legal advice, so meeting the Ministry’s requirements for worker housing stays your responsibility. It keeps the records that make that easier.',
  },
  {
    question: 'Does it handle multiple camps or buildings?',
    answer:
      'Yes. Run every camp from one account, switch between them, move a worker or a room between sites, and compare occupancy, collections and costs per site side by side. A site supervisor can be given access to only the site they run.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your accommodation.',
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
        { '@type': 'ListItem', position: 3, name: 'Labour accommodation software in Saudi Arabia', item: url },
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

export default function LabourSaudiPost() {
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
              Labour accommodation software for Saudi Arabia runs worker housing from one place: who is in which bed,
              one bill per resident or employer in riyals, deposits and payments, maintenance, and every camp or building
              in one view.
            </strong>{' '}
            It is built for bed-level housing with high turnover and shared costs, the way staff camps and worker
            accommodation actually run, not the whole-unit model a hotel or rental tool assumes.
          </P>
          <P>
            As the Kingdom formalises how worker housing is recorded and run, spreadsheets and paper registers stop
            coping. Beds fill and empty as projects ramp up and finish, several workers share a room and its costs, the
            employer is often the one paying, and sites are spread across cities. This guide covers what the software
            does, why a generic tool does not fit, the features that matter here, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Worker housing is rented by the bed with high turnover, so it needs bed-level software, not a whole-unit tool.</li>
              <li>The payer varies: the worker, the employer, or a split. The system should record who pays and track what each owes.</li>
              <li>One bill per resident in riyals should gather rent and shared costs, with deposits settled at move-out.</li>
              <li>A view across every camp, plus supervisor access per site, matters once you run more than one.</li>
              <li>It is operational software, not a payroll, Qiwa or labour-housing compliance system.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What labour accommodation software is</H2>
          <P>
            It is software that runs the day-to-day of housing provided to workers, from one place. Instead of a bed list
            in one spreadsheet, a rent tracker in another and maintenance notes on paper, it keeps them together: a record
            for every worker, true occupancy down to the bed, a running balance for whoever pays, and a clear view of
            occupancy and cost for each site. The same system runs a single staff building or a portfolio of camps.
          </P>

          <H2 id="why-generic">Why a hotel or rental tool does not fit</H2>
          <P>
            A hotel system is built around nightly stays and a front desk. A rental system is built around one tenant
            signing for one whole unit. Worker housing matches neither: many people live under one roof, each in a bed,
            staying weeks to months, sharing costs, with the employer frequently paying. Run that on a whole-unit tool and
            you cannot bill a bed, cannot bill an employer for the beds it booked, and a fast move-in as a project ramps up
            becomes a manual rebuild.
          </P>

          <H2 id="features">The features that matter in Saudi Arabia</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Bed-level occupancy</strong> that cannot be over-filled, so a room with three of four beds taken reads as three-quarters full.</li>
            <li><strong>Flexible billing:</strong> bill each worker or the employer, on one bill in riyals that gathers rent and shared costs, with part-payments tracked.</li>
            <li><strong>A record per worker,</strong> with documents, the employer, an emergency contact and the deposit in one place.</li>
            <li><strong>Deposits</strong> held and settled against final dues at move-out.</li>
            <li><strong>Complaints logged</strong> and tracked to resolution against the room.</li>
            <li><strong>A portfolio view</strong> across every camp, with occupancy, collections and cost per site side by side.</li>
            <li><strong>Roles and permissions,</strong> so a site supervisor sees only their own site.</li>
            <li><strong>Fast admissions and bulk import,</strong> so a camp that fills overnight is not a manual rebuild.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={saudiScreenshots.payments.src} alt={saudiScreenshots.payments.alt} width={saudiScreenshots.payments.width} height={saudiScreenshots.payments.height} label="Payments · rent & receipts in riyal" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={saudiScreenshots.tenants.src} alt={saudiScreenshots.tenants.alt} width={saudiScreenshots.tenants.width} height={saudiScreenshots.tenants.height} label="Residents · deposits, waiting list & check-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={saudiScreenshots.allProperties.src} alt={saudiScreenshots.allProperties.alt} width={saudiScreenshots.allProperties.width} height={saudiScreenshots.allProperties.height} label="Every site · occupancy, costs & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href="/blog/worker-accommodation-management-software">PulseHub</A> is built for renting by the room and the
            bed, which is exactly the worker-housing model. It organises each site into floors, rooms and beds, keeps
            occupancy true, and every worker is one record with their documents, employer and deposit. Each resident gets
            one bill in riyals, and you can bill the worker or the employer, with part-payments recorded as instalments.
            Deposits settle at move-out, every site rolls up into one portfolio view, and a supervisor can be given access
            to just their own site.
          </P>
          <P>
            One honest boundary: PulseHub handles the operations, not Saudi labour-housing licensing, the Ministry&rsquo;s
            registries, Qiwa or payroll. Those stay with the relevant authority and your payroll, and this is general
            information, not legal advice. For the wider category, see our guide to{' '}
            <A href="/blog/worker-accommodation-management-software">worker accommodation management software</A> and{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>; for the Gulf market, see{' '}
            <A href={routes.uae}>PulseHub for the UAE</A>.
          </P>

          <Box title="In short">
            <P>
              If you house workers by the bed in Saudi Arabia, across one camp or many, you need software built for that
              model, not a hotel system or a single-let tool. Look for true bed-level occupancy, billing that can charge
              the worker or the employer in riyals, deposits and maintenance, and a portfolio view across every site.
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
        heading="Run your worker accommodation on one system."
        text="Beds and workers, a bill per worker or employer in riyals, deposits, maintenance and every site in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Property management for shared housing"
      />
    </SiteShell>
  )
}
