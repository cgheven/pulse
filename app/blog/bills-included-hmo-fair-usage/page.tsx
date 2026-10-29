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

const post = getBlogPost('bills-included-hmo-fair-usage')!
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
    question: 'Can I charge tenants more than I pay for their energy?',
    answer:
      'No. Under Ofgem’s Maximum Resale Price rules, if you resell gas or electricity to tenants you cannot charge more than you paid per unit, plus a fair share of the standing charge. A fair-usage charge recovers your cost for the extra units, it is not a profit. This is general information, not legal advice; check the current rules with Ofgem.',
  },
  {
    question: 'Should the fair-usage cap be in units or in pounds?',
    answer:
      'Units (kWh). A cash cap breaks the moment energy prices move: a tenant can blow through a pound cap without using more, or stay under it while wasting energy. A unit allowance tracks real use, survives price changes, and maps cleanly onto the cost-only rule, because you charge the excess units at the rate your supplier charges you.',
  },
  {
    question: 'What if a tenant leaves part-way through a billing period?',
    answer:
      'Pro-rate it. Work out each tenant’s share of the allowance and of any excess by the number of days they occupied a room in the period, and let a replacement tenant pick up from their move-in date. A flat split is simpler but unfair once people come and go mid-period.',
  },
  {
    question: 'Can I keep part of the deposit when someone exceeds fair usage?',
    answer:
      'Treat energy overuse as a cost to recover with the supplier’s bill as evidence, not as a deposit deduction. Deposit disputes over fair usage are hard to win unless the tenancy clearly allows it and your figures are evidenced. Billing the excess at cost, separately and transparently, is cleaner and more defensible.',
  },
  {
    question: 'Is a fair-usage clause legal in a bills-included tenancy?',
    answer:
      'It can be, if it is written into the tenancy, worded clearly and fairly, agreed by the tenants, and the charges never exceed your actual cost per unit. A vague or one-sided clause, or any attempt to profit, is what gets challenged. This is general information, not legal advice; have your clause checked by a solicitor or your redress scheme.',
  },
  {
    question: 'Do I need a smart meter or sub-meters to do this?',
    answer:
      'No, but you do need evidence. At a minimum, take and photograph meter readings at the start and end of each period. A smart meter makes readings easier. Per-room sub-meters go further: they let you bill each room for its own actual usage rather than splitting a whole-property excess.',
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
        { '@type': 'ListItem', position: 3, name: 'Bills-included HMO fair-usage caps', item: url },
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

/** A bordered callout for the worked example and the clause. */
function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
      <div className="mt-4 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 sm:text-lg">{children}</div>
    </div>
  )
}

export default function BillsIncludedHmoFairUsagePost() {
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
            Bills-included rent is what fills rooms in a professional HMO. It is also what keeps HMO landlords awake
            when energy prices jump, because the tenant has no reason to turn anything off and you are holding the
            bill. A fair-usage cap is how you share that risk: energy is included up to a sensible level, and beyond
            it the tenants cover the extra at your cost. Done well, it protects your margin and nudges people away
            from leaving the heating on with the windows open. Done badly, with a cash cap or a vague clause, it
            causes arguments and, if you try to profit from it, breaks the law.
          </P>
          <P>
            This guide sets out how to do it properly: the one rule that limits what you can charge, how to set the
            allowance, a worked example with real numbers, how to measure and bill the excess, the clause wording,
            and how to handle a tenant who leaves mid-period. It is general information for UK landlords, not legal
            advice.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>You cannot profit on resold energy. Under Ofgem’s Maximum Resale Price rules you charge the excess at your own cost per unit, nothing more.</li>
              <li>Set the cap in units (kWh), not pounds. A cash cap breaks every time prices move.</li>
              <li>Base the allowance on the property’s own meter history, adjusted for occupancy and the seasons.</li>
              <li>Measure with dated, photographed meter readings. Per-room sub-meters let you bill actual usage instead of a blunt cap.</li>
              <li>When someone leaves mid-period, pro-rate the allowance and the excess by the days each tenant occupied.</li>
            </ul>
          </aside>

          <H2 id="what">What a fair-usage cap actually is</H2>
          <P>
            In a bills-included HMO, the rent covers energy up to a reasonable amount of use. The fair-usage cap, or
            fair-usage policy, is the line that says where reasonable ends. Below it, the tenant pays nothing extra.
            Above it, the tenants between them cover the cost of the additional units. It is not a second rent and
            it is not a profit centre. It is a way to recover your cost when a house burns through far more energy
            than you priced the rent around, and to give tenants a reason to care about waste they would otherwise
            never see.
          </P>

          <H2 id="mrp">The one rule that caps what you can charge</H2>
          <P>
            Before you set a single number, understand the limit. If you resell gas or electricity to your tenants,
            you are bound by <A href="https://www.ofgem.gov.uk">Ofgem</A>’s Maximum Resale Price rules. A genuinely
            all-inclusive rent with no separate energy charge sits outside this, but the moment you itemise and
            bill tenants for units over an allowance, you are reselling energy and the rules apply. In plain terms,
            you cannot charge more than you paid: the most you can recover is the price per unit your supplier
            charges you, plus a fair share of the standing charge. You are not allowed to make a profit on energy
            you resell to tenants.
          </P>
          <P>
            That single rule shapes everything else. A fair-usage charge is cost recovery for the units used over
            the allowance, billed at your supplier’s rate, with the bill as evidence. It is never a mark-up, a flat
            penalty, or a round number you picked. Build the clause and the maths around cost, and you stay on the
            right side of the rule. This is general information, not legal advice, so confirm the current position
            with Ofgem or a solicitor before you rely on it.
          </P>

          <H2 id="units">Set the cap in units, not pounds</H2>
          <P>
            The most common mistake is a cash cap: energy is included up to, say, 150 pounds a month. It feels
            simple and it falls apart immediately. When unit prices rise, that 150 pounds buys fewer units, so a
            tenant who did nothing differently suddenly owes money. When prices fall, a tenant can waste energy and
            still sit under the cap. A cash cap also sits awkwardly with the cost-only rule, because the number was
            never tied to what you actually pay.
          </P>
          <P>
            Set the allowance in kilowatt-hours instead. A unit allowance tracks real use, it does not move when
            tariffs move, and it maps straight onto cost recovery: the excess is simply the units over the
            allowance, charged at the rate you pay. Hold the allowance in units and let the price be whatever your
            bill says on the day.
          </P>

          <H2 id="allowance">How to set a fair allowance</H2>
          <P>
            The number that matters most is the property’s own history. Pull the last twelve months of meter
            readings, or your annual statements, and you have a real baseline for how much this house uses with
            normal occupancy. Set the allowance at, or a little above, that baseline. Nothing beats real data from
            the actual building.
          </P>
          <P>
            If you do not have a full year yet, start from a benchmark and adjust. Ofgem publishes typical domestic
            consumption values for a single home: as of its 2026 review, a medium-use home is around 2,500 kWh of
            electricity and 9,500 kWh of gas a year (check Ofgem for the current figures, as they are reviewed). An
            HMO with several occupants uses more than one home, but not in a straight line per head, because
            kitchens, hallways, boilers and routers are shared. Use the single-home figure as a floor, scale it for
            the number of occupants and the shared space, and lean on the property’s meters as soon as you have a
            few quarters of readings.
          </P>
          <P>
            Two adjustments catch people out. First, seasonality: a flat monthly allowance punishes winter and
            rewards summer, so either set the allowance over the whole year or the tenancy, or vary it by season.
            Second, the make-up of the house: electric heating, a hot-tub, or a house full of gamers changes the
            baseline, and the fair number is the one you can evidence for that property, not a figure from a forum.
          </P>

          <H2 id="example">A worked example</H2>
          <P>
            Numbers make this concrete. Take a five-bed HMO on a single electricity meter, billed quarterly.
          </P>
          <Box title="Worked example, electricity">
            <p>
              <strong>1. Baseline from history.</strong> Last year the property used 5,400 kWh of electricity. That
              is your evidence-based baseline, well above a single medium home (2,500 kWh) because five people share
              it.
            </p>
            <p>
              <strong>2. Set the allowance.</strong> 5,400 kWh a year is 1,350 kWh a quarter. Set the fair-usage
              allowance for the quarter at 1,350 kWh for the whole property.
            </p>
            <p>
              <strong>3. Read the meter.</strong> Opening reading at the start of the quarter, closing reading at
              the end, both dated and photographed. This quarter the house used 1,620 kWh.
            </p>
            <p>
              <strong>4. Find the excess.</strong> 1,620 used minus 1,350 allowed is 270 kWh over.
            </p>
            <p>
              <strong>5. Price it at your cost.</strong> Your supplier charges you 24.5p per kWh. The excess costs
              270 × 0.245 = 66.15 pounds. That is the whole charge: no mark-up, and the standing charge stays out of
              it because it is fixed and already covered by the rent.
            </p>
            <p>
              <strong>6. Share it fairly.</strong> If all five tenants were in for the full quarter, that is 13.23
              pounds each. Send the figure with a copy of the supplier’s bill so everyone can see the rate.
            </p>
          </Box>
          <P>
            Notice what the cap is doing. It is not making you money; the 66.15 pounds is exactly what the extra
            units cost you. It is protecting the rent you set and giving the house a reason to not run the immersion
            heater around the clock.
          </P>

          <H2 id="measure">How to measure it</H2>
          <P>
            The charge is only as strong as the evidence behind it. Take meter readings at the start and end of
            every period, date them, and photograph the meter so there is no dispute about the figures. A smart
            meter makes this easier and gives you a usage trail, but it is not required. Keep your own supplier
            bills, because they are what prove the rate you are allowed to pass on.
          </P>
          <P>
            One limit is worth naming: a single property meter tells you the total, not who used what. That is why
            a whole-property excess is split across tenants rather than pinned on one room. If you want to bill a
            room for its own usage, you need per-room sub-metering, which changes the whole approach, as we come to
            below.
          </P>
          <Box title="On the bill">
            <p>
              Whatever method you use, the excess should land on a clear statement next to the rent, with the units,
              the rate and the split shown, and the supplier’s bill attached. PulseHub, for example, puts metered
              charges on the same monthly bill as rent so a resident sees one balance rather than a surprise invoice.
            </p>
          </Box>
          <div className="mx-auto mt-2 max-w-sm">
            <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
              <ProductScreenshot
                src={screenshots.invoice.src}
                alt="A PulseHub HMO invoice showing monthly rent and metered electricity charges with the total amount due in pounds"
                width={screenshots.invoice.width}
                height={screenshots.invoice.height}
                frame={false}
                sizes="(max-width: 640px) calc(100vw - 3.5rem), 24rem"
                className="rounded-lg"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Rent and metered electricity on one bill
            </p>
          </div>

          <H2 id="split">Billing the excess, and splitting it fairly</H2>
          <P>
            Charge the excess units at your supplier’s rate and no more. That keeps you inside the resale rule. For
            the split, the fairest method is by occupied days: work out how many tenant-days each room contributed
            to the period and divide the excess in proportion. When everyone was present for the whole period that
            collapses to an equal split, which is why an equal split looks fine until someone moves in or out.
          </P>
          <P>
            Resist two temptations. Do not fold the standing charge into the excess, because it is fixed and already
            in the rent. And do not reach for the deposit: energy overuse is a cost to bill with evidence, not a
            deposit deduction, and deposit schemes rarely back a vague fair-usage claim. Bill it openly, with the
            numbers and the supplier’s bill, and it holds up.
          </P>

          <H2 id="leaver">The tenant who leaves mid-period</H2>
          <P>
            This is the case the 500-word guides skip, and the one that causes the most friction. If a tenant moves
            out a third of the way through the quarter, they did not have use of the house for the other two
            thirds, so they should not carry a full share of an allowance or an excess that built up after they
            left. Pro-rate it: each tenant’s share of both the allowance and the excess follows the days they
            occupied a room in the period, and a replacement tenant picks up from their move-in date.
          </P>
          <P>
            Doing that by hand across rooms and dates is exactly where fair-usage policies become a chore, and where
            the maths quietly goes wrong. Software that already holds each resident’s move-in date can split a
            metered charge between them automatically, instead of you working out tenant-days on paper. Our guide
            to{' '}
            <A href={postPath('hmo-rent-tracking')}>tracking HMO rent, payments and arrears</A> covers the same
            discipline for the rent itself.
          </P>

          <H2 id="clause">Example fair-usage clause</H2>
          <P>
            A fair-usage charge is only enforceable if it is written into the tenancy, clearly and fairly, and
            agreed by the tenants before they sign. The wording below is an example of the elements a fair clause
            covers. It is not legal advice and not a template to copy blindly: have it checked by a solicitor or
            your redress scheme, and make sure it matches how you actually bill.
          </P>
          <Box title="Example wording only, not legal advice">
            <p>
              Electricity and gas are included in the rent up to a fair-usage allowance of [X] kWh of electricity
              and [Y] kWh of gas per [period] for the whole property, measured by meter readings taken and recorded
              at the start and end of each [period].
            </p>
            <p>
              If usage exceeds the allowance, the tenants will together pay for the excess units at the landlord’s
              own cost per unit, being the rate the landlord’s supplier charges, with no mark-up and on production
              of the supplier’s bill. The standing charge is not part of this charge.
            </p>
            <p>
              The excess is shared between the tenants in proportion to the days each occupied a room during the
              [period]. The allowance is expressed in units, not as a cash cap, and the landlord will not make a
              profit on resold energy.
            </p>
          </Box>

          <H2 id="software">A cleaner way: bill metered usage, not a blunt cap</H2>
          <P>
            A cap is a workaround for not knowing who used what. The moment you can meter rooms, the fairer answer
            is to stop capping and simply bill each resident for their actual share. This is how{' '}
            <A href={routes.hmo}>PulseHub handles HMO utilities</A>: you record a meter reading, it is priced
            against your tariff, and it is split between residents by their join dates, on the same monthly bill as
            the rent. Everyone pays their real share at your cost, so there is no cap to argue about, no cash limit
            to revise when prices move, and the resale rule is satisfied because the charge is your cost and nothing
            more.
          </P>
          <P>
            Whether you run a formal allowance or bill metered usage directly, the hard part is the bookkeeping:
            readings, rates, who occupied which room and when, and a clear line on every resident’s statement.
            Across several HMOs that is more than a spreadsheet wants to hold, which is the same reason landlords
            move rent tracking off Excel. See our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple HMO properties without spreadsheets</A>.
          </P>

          <H2 id="start">Run your HMO utilities the fair way</H2>
          <P>
            Fair usage only works if it is fair in both directions: you recover your real cost, tenants pay for
            what they actually use, and both sides can see the figures. PulseHub keeps rooms, residents, rent and
            metered utilities on one platform, splits charges by occupancy, and puts them on a single bill per
            resident, in pounds. See <A href={routes.hmo}>HMO management software</A>, or start a free trial and set
            up your first property in minutes.
          </P>
          <div className="mt-6">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[50rem] sm:mt-16">
          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>
        </div>
      </article>

      <CtaBand
        heading="Bill HMO utilities fairly, without the spreadsheet."
        text="Record meter readings, split charges by occupancy, and put rent and utilities on one bill per resident. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
