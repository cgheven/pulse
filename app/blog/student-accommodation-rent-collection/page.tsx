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

const post = getBlogPost('student-accommodation-rent-collection')!
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
    question: 'How does rent collection work in student accommodation software?',
    answer:
      'Each resident has one bill. Rent, and any shared costs, sit on that bill, and every payment is recorded against it as it comes in, with a receipt. Part-payments are kept as installments with their own date, and the balance carries forward, so you always see who has paid, who is short and by how much, by the bed rather than by the whole flat.',
  },
  {
    question: 'Does PulseHub actually take the money, like a payment gateway?',
    answer:
      'No, and this matters. PulseHub records payments and issues receipts; it is not a payment gateway or direct-debit processor and does not move money. You collect by your usual method, bank transfer, card or a provider you already use, and log what was paid so the resident’s balance, arrears and receipts stay correct. It is the record and the chasing, not the rails.',
  },
  {
    question: 'How are arrears handled?',
    answer:
      'Overdue balances are visible per resident and across the portfolio, so a student who is short does not disappear into a flat total. Automatic reminders go out, WhatsApp-first, so rent is chased without you doing it by hand, and the full payment history sits on each record for when you need to escalate to the guarantor.',
  },
  {
    question: 'Can it chase the guarantor?',
    answer:
      'PulseHub keeps each resident’s guarantor as a contact on their record, with uploaded documents and the full payment history alongside, so when a balance needs escalating you have the details and the evidence in one place. It records the guarantor relationship; it is not a guarantor service and does not underwrite or guarantee the rent itself.',
  },
  {
    question: 'Does it handle students who pay in instalments or at different times?',
    answer:
      'Yes. Students rarely all pay on the same day, and many pay by term or in parts. Each part-payment is recorded as an installment against the one bill, the balance carries forward, and arrears visibility is per resident, so staggered payments stay clear instead of turning into a reconciliation puzzle.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your properties.',
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
        { '@type': 'ListItem', position: 3, name: 'Student accommodation rent collection', item: url },
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

export default function StudentRentCollectionPost() {
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
              Rent collection in student accommodation is hard for one reason: you are not chasing one rent on one flat,
              you are tracking a bill per resident, per bed, that people pay in parts and at different times.
            </strong>{' '}
            The right software keeps each resident&rsquo;s balance, receipts and arrears straight, and chases what is
            overdue for you, so a busy month does not turn into a reconciliation puzzle.
          </P>
          <P>
            A six-bed house can carry six separate balances, some paid in full, some paid by term, one short since
            September. On a spreadsheet that is where arrears hide and receipts go missing. This guide covers how
            by-the-bed rent collection should work, how arrears and guarantors are handled, and one honest line on what
            the software does and does not do with the money itself.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Student rent is collected by the bed, one bill per resident, not one rent per flat.</li>
              <li>Part-payments are recorded as installments with receipts, and the balance carries forward.</li>
              <li>Arrears are visible per resident, so a short-paying student does not hide in a flat total.</li>
              <li>Automatic reminders, WhatsApp-first, chase overdue rent without you doing it by hand.</li>
              <li>PulseHub records payments and chases them; it is not a payment gateway and not a guarantor service.</li>
            </ul>
          </aside>

          <H2 id="by-the-bed">Why student rent collection is a by-the-bed problem</H2>
          <P>
            In most lettings one tenant signs for one unit and pays one rent, so collection is one line to watch. Student
            accommodation is the opposite: several residents share a house or flat, each on their own bed with their own
            rent, deposit and guarantor. Collect that on a whole-unit tool and you cannot see who within a flat is behind,
            you cannot issue a receipt per resident, and the student who is short disappears into the flat total until the
            end of the year.
          </P>
          <P>
            By-the-bed collection fixes that: each resident is one record with one bill, and every payment lands against
            that bill. You see the whole house and each bed within it, so arrears are a name, not a guess.
          </P>

          <H2 id="installments">Part-payments, terms and running balances</H2>
          <P>
            Students rarely pay the full year in one go, and they rarely all pay on the same day. Many pay by term, some
            pay in parts as a loan instalment or a parent&rsquo;s transfer comes in. Good software records each of those
            as an installment against the one bill, dates it, issues a receipt, and carries the balance forward. The
            effect is that staggered, partial payment, which is normal for students, stays clear instead of breaking your
            records.
          </P>

          <div className="mt-8">
            <ProductScreenshot src={screenshots.payments.src} alt={screenshots.payments.alt} width={screenshots.payments.width} height={screenshots.payments.height} label="Payments · rent, part-payments & receipts" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={screenshots.receipt.src} alt={screenshots.receipt.alt} width={screenshots.receipt.width} height={screenshots.receipt.height} label="Receipt · issued per resident, shareable" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={screenshots.residents.src} alt={screenshots.residents.alt} width={screenshots.residents.width} height={screenshots.residents.height} label="Residents · balances, deposits & guarantor" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="arrears">Arrears and chasing, without doing it by hand</H2>
          <P>
            The point of good collection is that you stop chasing manually. Overdue balances are visible per resident and
            across the portfolio, and automatic reminders go out, WhatsApp-first, as rent falls due and when it is late.
            Most students pay once reminded, and the ones who do not are a short, clear list rather than a surprise at
            year end.
          </P>
          <P>
            When a balance does need escalating, the guarantor is already on the resident&rsquo;s record as a contact,
            with uploaded documents and the full payment history alongside, so you escalate with the evidence in one
            place. PulseHub records the guarantor relationship; it does not underwrite or guarantee the rent, which is a
            separate guarantor service if you use one.
          </P>

          <H2 id="not-a-gateway">The honest line: records and chasing, not the rails</H2>
          <P>
            This is the part most tools blur, so to be clear: PulseHub records payments and issues receipts, but it is not
            a payment gateway or direct-debit processor and does not move money. You collect by your usual method, a bank
            transfer, a card payment, or a provider you already use, and you log what was paid so the balance, arrears and
            receipts stay correct. What you get is the record, the receipts and the chasing done properly, not a new set
            of payment rails you have to adopt.
          </P>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.student}>PulseHub</A> is built for letting by the room and the bed, so rent collection is
            by-the-bed by default. Each resident is one record with one bill, part-payments are recorded as installments
            with receipts, arrears are visible per resident and across the portfolio, and reminders are chased
            automatically. The guarantor and documents sit on the same record for escalation. For the product in general,
            see <A href={routes.student}>student accommodation management software</A> and our{' '}
            <A href="/blog/student-accommodation-management">UK guide to student accommodation management</A>; running a
            purpose-built scheme? Read <A href="/blog/pbsa-management-software">PBSA management software</A>, and if you
            are still comparing tools, <A href="/blog/how-to-choose-student-accommodation-management-software">how to choose student accommodation management software</A>{' '}
            walks through it.
          </P>

          <Box title="In short">
            <P>
              Student rent collection is a by-the-bed problem: a bill per resident, paid in parts and at different times,
              with arrears that must not hide in a flat total. Look for one bill per resident, part-payments as
              installments with receipts, arrears visible per bed, automatic reminders, and guarantor details on record,
              and be clear whether the tool processes the money or, like PulseHub, records and chases it while you collect
              your own way.
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
        heading="Collect student rent without the chase."
        text="One bill per resident, part-payments and receipts, arrears visible per bed, and reminders sent automatically. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation management software"
      />
    </SiteShell>
  )
}
