import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { indiaScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('how-to-manage-a-pg')!
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
    question: 'How do I manage a PG digitally instead of on paper?',
    answer:
      'Move the four things that eat your day into one place: resident records, the monthly bill, payments, and complaints. With PG management software you set up the property as rooms and beds, add each resident with their documents and deposit, and the software raises one monthly bill per resident for rent, mess and electricity, tracks who has paid, and sends reminders. The register, the rent diary and the pile of receipts become one screen.',
  },
  {
    question: 'How should a PG bill rent, mess and electricity together?',
    answer:
      'On one bill per resident. PulseHub gathers the room rent, the mess charge from their meal package, a metered share of electricity, and any add-ons into a single monthly bill, with part-payments recorded as instalments and a numbered receipt when it is paid. That is far cleaner than a rent book for rent, a separate note for food, and a shared electricity bill split by hand.',
  },
  {
    question: 'Does PulseHub collect rent by UPI or auto-debit?',
    answer:
      'No, and it is worth being clear about it. PulseHub records payments and issues numbered receipts; it is not a payment gateway, so money moves through your own bank, cash or UPI as it does now, and you mark it received. What it automates is the chasing: reminders go out on WhatsApp or email before and after the due date, with a shareable link to the bill or receipt.',
  },
  {
    question: 'Can it handle the mess and kitchen costs?',
    answer:
      'Yes. You publish a weekly menu, set meals as a package on each resident’s plan, and record kitchen spend such as groceries and cook wages separately. PulseHub works out the cost per person from the kitchen spend and who is on a meal plan. It handles meals as a package and a menu, rather than counting individual meal tokens day by day.',
  },
  {
    question: 'How does it track deposits and ID documents?',
    answer:
      'Each resident has one record holding their documents, ID and deposit. The deposit is tracked and settled against the final bill at check-out, with the refundable balance visible. PulseHub keeps the ID and documents you collect on file; it does not run Aadhaar-based e-KYC or verify government IDs for you, so that check stays part of your own admissions process.',
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
        { '@type': 'ListItem', position: 3, name: 'How to manage a PG', item: url },
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

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
      {children}
    </Link>
  )
}

function Shot({ shot, alt, label }: { shot: { src: string; width: number; height: number }; alt: string; label: string }) {
  return (
    <div className="mt-8">
      <ProductScreenshot src={shot.src} alt={alt} width={shot.width} height={shot.height} label={label} sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
    </div>
  )
}

export default function HowToManageAPgPost() {
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
              Managing a PG is really four jobs repeated every month: fill the beds, raise one bill per resident for rent
              and mess and electricity, collect it, and keep the place running. Done in a register and a rent diary it is
              a scramble; done digitally it is a few screens.
            </strong>{' '}
            This is a practical, step-by-step guide to running a paying guest accommodation, and where software takes the
            load off.
          </P>

          <H2 id="setup">1. Set up the property, down to the bed</H2>
          <P>
            Start by mapping the PG the way it actually is: floors, rooms and beds, with each bed let on its own. A
            three-sharing room with one bed free should read as one bed free, not simply occupied. Record the rent for
            each bed, whether a room is AC or non-AC, and sharing type. Getting this right once means occupancy and dues
            stay correct afterwards, and a bed can never be double-allotted.
          </P>
          <Shot shot={indiaScreenshots.spaces} alt="A PulseHub spaces screen mapping a PG as rooms and beds, with each bed's rent and sharing type" label="Rooms and beds, each let on its own" />

          <H2 id="admissions">2. Admissions and resident records</H2>
          <P>
            Add each resident as one record holding their contact, documents, ID and deposit. New residents can also
            apply through the PG&rsquo;s own public listing page, which shows live availability and an enquiry form, so
            enquiries reach you directly rather than only through brokers. PulseHub keeps the ID and documents you
            collect; it does not run Aadhaar-based e-KYC or verify government IDs for you, so that check stays part of
            your own admissions routine.
          </P>

          <H2 id="billing">3. One monthly bill for rent, mess and electricity</H2>
          <P>
            This is where most PGs lose time. Instead of a rent book for rent, a separate note for food and a shared
            electricity bill split by hand, PulseHub raises one monthly bill per resident that gathers the room rent, the
            mess charge from their meal package, a metered share of electricity, and any add-ons. A part-payment is
            recorded as an instalment with its own date and receipt, the balance carries forward with no double-counting,
            and a numbered receipt is issued when it is paid.
          </P>
          <Shot shot={indiaScreenshots.payments} alt="A PulseHub payments screen in rupees showing each resident's bill for rent, mess and electricity with paid and pending status" label="One bill per resident, in rupees" />

          <H2 id="mess">4. Run the mess without guesswork</H2>
          <P>
            Publish a weekly menu, set meals as a package on each resident&rsquo;s plan, and record kitchen spend such as
            groceries and the cook&rsquo;s wage separately. PulseHub works out the cost per person from the kitchen spend
            and who is on a meal plan, so you can see whether the mess is run at the price you set. It handles meals as a
            package and a menu rather than counting individual meal tokens day by day.
          </P>

          <H2 id="electricity">5. Split electricity fairly</H2>
          <P>
            Shared electricity is the argument no PG owner wants. Take a meter reading, price it against the tariff, and
            PulseHub splits it between the residents who shared it by their join dates, rather than a flat division that
            charges a resident who arrived on the 25th the same as one who was there all month. The share lands on each
            resident&rsquo;s bill automatically. See <A href={routes.hmoBilling}>utility billing</A> for the detail.
          </P>

          <H2 id="payments">6. Collect rent and chase dues</H2>
          <P>
            See every resident&rsquo;s balance at a glance: paid, part-paid or outstanding. PulseHub records payments and
            issues receipts; it is not a payment gateway, so money still moves through your own bank, cash or UPI and you
            mark it received. What it automates is the chasing: reminders go out on WhatsApp or email before and after the
            due date, each with a shareable link to the bill or receipt, so you are not messaging residents one by one.
          </P>

          <H2 id="running">7. Keep the place running</H2>
          <P>
            Residents raise complaints and maintenance issues by scanning a code on the wall, each is logged and tracked
            to resolution, and you can give a manager access to just their own PG. Reports pull occupancy, collections,
            dues and kitchen costs together, so the monthly picture is one screen rather than a reconciliation exercise.
          </P>

          <H2 id="next">Putting it together</H2>
          <P>
            Managing a PG well is mostly about not letting the small things slip: a bed sitting empty, a bill raised late,
            a deposit no one can find at check-out. Bringing residents, billing, mess, electricity and reminders into one
            place is what frees you from the paperwork. See <A href={routes.pg}>PG management software</A> for the full
            picture, PulseHub for <A href={routes.india}>India</A>, or compare it with{' '}
            <A href={postPath('rentok-alternative')}>RentOk</A> if you are weighing options.
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
        heading="Run your PG from one screen"
        text="Beds, residents, one monthly bill for rent, mess and electricity, deposits and WhatsApp reminders, all in one place. Start a 14-day free trial with no card required."
        secondaryHref={routes.pg}
        secondaryLabel="PG management software"
      />
    </SiteShell>
  )
}
