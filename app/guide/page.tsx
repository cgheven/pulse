import type { ReactNode } from 'react'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import { CtaBand } from '@/components/cta-band'
import { ProductScreenshot } from '@/components/feature-showcase'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { SITE_NAME, SITE_URL, SIGN_UP_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'PulseHub Setup Guide: Get Your Property Running in About an Hour',
  description:
    'Step-by-step PulseHub setup guide for new accounts: create your property, add rooms and residents, collect rent, split electricity, add your team, track compliance and read your reports.',
  path: routes.guide,
  absoluteTitle: true,
})

const canonical = `${SITE_URL}${routes.guide}`

const TOC = [
  { href: '#start', label: 'Before you start' },
  { href: '#settings', label: '1. Set up your property' },
  { href: '#spaces', label: '2. Add your rooms' },
  { href: '#residents', label: '3. Add your residents' },
  { href: '#payments', label: '4. Collect rent' },
  { href: '#electricity', label: '5. Electricity' },
  { href: '#team', label: '6. Your team' },
  { href: '#daily', label: '7. Day to day' },
  { href: '#compliance', label: '8. Compliance' },
  { href: '#reports', label: '9. Reports' },
  { href: '#subscription', label: '10. Subscription' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      name: 'How to set up your property on PulseHub',
      description:
        'Create your PulseHub account and configure your property end to end: pricing, rooms, residents, rent collection, electricity, team, compliance and reports.',
      url: canonical,
      totalTime: 'PT1H',
      step: [
        { '@type': 'HowToStep', name: 'Create your account', url: `${canonical}#start`, text: 'Sign yourself up, pick the country your property is in, and name your first property. The first 14 days are free with no card required.' },
        { '@type': 'HowToStep', name: 'Set up your property', url: `${canonical}#settings`, text: 'Open Quick Setup and complete the three required steps: property details, package pricing and payment methods. Price before you add rooms or residents.' },
        { '@type': 'HowToStep', name: 'Add your rooms', url: `${canonical}#spaces`, text: 'Add each room with its capacity and whether it has air conditioning, or import a spreadsheet. Occupancy is calculated for you.' },
        { '@type': 'HowToStep', name: 'Add your residents', url: `${canonical}#residents`, text: 'Add residents directly, share your public application form, or import an existing list. Rent and deposit fill in from your pricing.' },
        { '@type': 'HowToStep', name: 'Collect rent', url: `${canonical}#payments`, text: 'Record each payment against the resident and the account it landed in, send a receipt, and chase late balances with reminders.' },
        { '@type': 'HowToStep', name: 'Bill electricity', url: `${canonical}#electricity`, text: 'Enter a meter reading per room; PulseHub prices the usage and splits it between the residents of that room.' },
        { '@type': 'HowToStep', name: 'Add your team', url: `${canonical}#team`, text: 'Record staff for payroll, and add managers who log in with scoped permissions and chosen properties.' },
        { '@type': 'HowToStep', name: 'Run the property day to day', url: `${canonical}#daily`, text: 'Handle complaints, leaves, expenses, bills and announcements as part of your weekly routine.' },
        { '@type': 'HowToStep', name: 'Track compliance', url: `${canonical}#compliance`, text: 'For English properties, record certificates and licences with expiry dates and get reminded before each one lapses.' },
        { '@type': 'HowToStep', name: 'Read your reports and subscribe', url: `${canonical}#reports`, text: 'Review income, outstanding rent and reconciliation, compare properties, and choose a plan when the trial ends.' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Setup Guide', item: canonical },
      ],
    },
  ],
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded bg-muted px-1.5 py-0.5 font-mono text-[0.86em] text-foreground/90">
      {children}
    </span>
  )
}

function Shot({
  src,
  alt,
  label,
  caption,
  w = 1440,
  h = 900,
  priority = false,
}: {
  src: string
  alt: string
  label: string
  caption?: string
  w?: number
  h?: number
  priority?: boolean
}) {
  return (
    <figure className="my-6">
      <ProductScreenshot
        src={src}
        alt={alt}
        width={w}
        height={h}
        label={label}
        priority={priority}
        sizes="(max-width: 1023px) calc(100vw - 2rem), 720px"
      />
      {caption ? (
        <figcaption className="mt-2.5 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

function Section({
  id,
  eyebrow,
  title,
  dek,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  dek: string
  children?: ReactNode
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 border-t border-border pt-12 first:mt-0 first:border-t-0 first:pt-0">
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mb-3 font-display text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mb-6 max-w-[64ch] text-base leading-relaxed text-muted-foreground">{dek}</p>
      {children}
    </section>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-3.5 rounded-xl border border-border bg-card px-5 py-4">
      <h3 className="mb-1.5 text-sm font-semibold text-foreground">{title}</h3>
      <div className="space-y-2 text-[0.95rem] leading-relaxed text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-3.5 border-t border-border py-3.5 first:border-t-0 first:pt-0">
      <div className="pt-0.5 font-mono text-xs text-primary">{n}</div>
      <div>
        <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
        <div className="max-w-[62ch] space-y-2 text-[0.95rem] leading-relaxed text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 rounded-r-lg border-l-2 border-primary bg-primary/5 px-4 py-3 text-[0.95rem] leading-relaxed text-foreground/90 [&_strong]:text-primary">
      {children}
    </div>
  )
}

export default function GuidePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl items-start gap-12 px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:grid lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start" aria-label="On this page">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">On this page</p>
          <nav className="flex flex-col gap-0.5 border-l border-border text-sm">
            {TOC.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="-ml-px border-l border-transparent px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <Link href={routes.home} className="hover:text-foreground">
              {SITE_NAME}
            </Link>
            <span className="px-1.5 text-muted-foreground/50">/</span>
            <span className="text-foreground/80">Setup Guide</span>
          </nav>

          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">Getting started</p>
          <h1 className="max-w-[18ch] text-balance font-display text-[clamp(2rem,4.6vw,3.25rem)] font-medium leading-[1.06] tracking-tight text-foreground">
            Setting up your property on PulseHub
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Follow these ten steps in order the first time you sign in. It takes about an hour for a property of thirty
            rooms, and most of that is typing in your residents. After setup, jump to whichever section you need.
          </p>

          <nav className="-mx-1 mt-8 flex gap-1.5 overflow-x-auto px-1 pb-2 lg:hidden" aria-label="On this page">
            {TOC.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Section
            id="start"
            eyebrow="Before you start"
            title="Create your account"
            dek="You sign yourself up, with no call and no sales process. Your first 14 days are free and you are not asked for a card."
          >
            <Step n="01" title="Sign up">
              <p>
                Go to the{' '}
                <a href={SIGN_UP_URL} className="text-primary underline underline-offset-2 hover:no-underline">
                  sign-up page
                </a>
                , enter your name, email, a password, and your country. The country you pick sets your currency and the
                wording used across the app, so choose the country the property is actually in.
              </p>
            </Step>
            <Step n="02" title="Name your first property">
              <p>
                Give it the name your residents would recognise. You can rename it later, and add more properties
                whenever you need them.
              </p>
            </Step>
            <Step n="03" title="Sign in">
              <p>
                You land on the Dashboard with a <Kbd>Quick Setup</Kbd> link at the top of the sidebar.
              </p>
            </Step>
            <Shot
              src="/guide/01-dashboard.png"
              alt="The PulseHub dashboard you land on after signing in, with the trial banner and a Quick Setup link in the sidebar"
              label="Dashboard"
              caption="After you sign in you land on the Dashboard. Quick Setup sits at the top of the sidebar, and the banner across the top counts down your free trial."
              priority
            />
            <Note>
              <strong>Your trial:</strong> 14 days with everything switched on. The banner across the top counts down.
              Nothing is charged until you choose a plan, and nothing is deleted when the trial ends. The account turns
              read-only until you subscribe.
            </Note>
          </Section>

          <Section
            id="settings"
            eyebrow="1. Setup"
            title="Set up your property"
            dek="Everything you need is on one screen. Open Quick Setup, the first item in the sidebar, and work down the list, so you never have to go hunting through Settings."
          >
            <p className="mb-4 max-w-[64ch] text-base leading-relaxed text-muted-foreground">
              Quick Setup is thirteen steps with a progress bar across the top. Three are marked{' '}
              <strong className="font-medium text-foreground">Required</strong>, which are property details, pricing and
              payment methods, and the rest are optional, there when you want them. Each one opens in place and saves as
              you go, so you can stop halfway and come back.
            </p>
            <Shot
              src="/guide/02-setup-steps.png"
              alt="The Quick Setup screen with its three required steps: property details, pricing and payment methods"
              label="Quick Setup"
              w={1219}
              h={590}
              caption="The three required steps sit at the top: property details, pricing and payment methods. Everything below them is optional."
            />

            <Card title="Step 1 — Property details (required)">
              <p>
                Name, address, city, area, phone, email, capacity, and who can live here. This is what appears on
                receipts and your public pages, so write the name as residents would recognise it.
              </p>
            </Card>
            <Shot src="/guide/04-settings-property.png" alt="The property details step" label="Property details" />

            <Card title="Step 2 — Package pricing & charges (required)">
              <p>
                <strong>Seater Pricing</strong> is the quick way: set a rent and deposit per seat count, for a 1 seater,
                2 seater, and so on, and every room prices itself. You never price a room by hand.
              </p>
              <p>
                There are <strong>two price lists</strong>, behind the <Kbd>Non-AC</Kbd> and <Kbd>AC</Kbd> toggle above
                the table. A room takes its price from the list matching whether it has air conditioning, at its own seat
                count, so a 3-person room with AC takes the 3 seater price from the AC list, and the same room without AC
                takes it from the Non-AC list.
              </p>
              <p>
                <strong>Fill in both lists if you have both kinds of room.</strong> They are independent: a seat count
                priced only on the Non-AC side leaves AC rooms of that size with no price at all, and PulseHub will tell
                you it could not work out the rent when you put somebody in one.
              </p>
              <p>
                Underneath, the package table covers meals: Space Only, Space + Breakfast &amp; Dinner, Space + 3 Meals.
                Fill in only the packages you actually sell.
              </p>
              <p>
                Set your <strong>Default Security Deposit</strong>, your <strong>per-unit electricity rate</strong>, and
                your <strong>notice period in days</strong> in the same panel.
              </p>
            </Card>
            <Shot
              src="/guide/05-settings-pricing.png"
              alt="Package Pricing with the seater rent and deposit table"
              label="Package pricing"
              caption="Seater Pricing. Leave a deposit blank and it falls back to the Default Security Deposit set further down."
            />

            <Card title="Step 3 — Payment methods (required)">
              <p>
                The accounts you want residents to pay into. These are printed on rent reminders, and when you record a
                payment you pick which of them the money landed in, which is what makes your reconciliation tie back to a
                real bank statement.
              </p>
            </Card>

            <Note>
              <strong>Order matters.</strong> Price before you add rooms or residents. Both screens auto-fill from this
              table at the moment you create the record, so a price set later does not reach back and correct what you
              already entered.
            </Note>

            <Card title="The optional steps">
              <dl className="divide-y divide-border">
                {[
                  {
                    term: 'Billing date',
                    desc: 'Leave it off and each resident bills monthly from their own join date (join the 25th, next bill the 25th). Set a fixed day and everyone bills on that day instead, with mid-month joiners prorated up to it.',
                  },
                  {
                    term: 'Terms & conditions',
                    desc: 'Add your own house rules, or use the defaults. Applicants accept them before they can apply.',
                  },
                  {
                    term: 'Welcome email',
                    desc: 'Your WiFi password, meal timings and 7-day menu, sent automatically to every new resident.',
                  },
                  { term: 'Referral rewards', desc: 'Reward residents who bring a friend.' },
                  {
                    term: 'Your web address',
                    desc: 'A free public page for the property, with live availability.',
                  },
                ].map((item) => (
                  <div
                    key={item.term}
                    className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[168px_1fr] sm:gap-5"
                  >
                    <dt className="font-medium text-foreground">{item.term}</dt>
                    <dd>{item.desc}</dd>
                  </div>
                ))}
              </dl>
              <p className="pt-1">
                Skip all of them on day one if you like. Nothing downstream depends on them, and the progress bar is a
                checklist, not a gate.
              </p>
            </Card>
          </Section>

          <Section
            id="spaces"
            eyebrow="2. Inventory"
            title="Add your rooms"
            dek="Quick Setup step 11 brings you here. You need at least one room before you can make anybody active, because a resident is always attached to a room."
          >
            <Shot
              src="/guide/06-spaces.png"
              alt="The Spaces page listing rooms with occupancy"
              label="Spaces"
              caption="Spaces. The counts along the top, All, Available and Occupied, are filters, not just totals."
            />
            <Step n="01" title="Tap Add Room">
              <p>
                Enter the room number, floor, type and <strong>capacity</strong>. Capacity is how many people sleep in
                the room, and it is what picks the rent from your seater table, so a 3-person room must say 3.
              </p>
            </Step>
            <Step n="02" title="Flag what the room has">
              <p>
                Mark an attached washroom, or air conditioning, if it has them. The AC flag is what decides which of the
                two seater price lists the room is priced from, so get it right before you put anybody in. It also
                decides whether meter readings are asked for later.
              </p>
            </Step>
            <Step n="03" title="Save, then repeat, or import">
              <p>
                For a property with many rooms, <Kbd>Import</Kbd> takes a spreadsheet instead. <Kbd>Excel</Kbd> and{' '}
                <Kbd>PDF</Kbd> export the list back out.
              </p>
            </Step>
            <Shot src="/guide/07-add-room.png" alt="The Add Room dialog" label="Add room" />
            <Note>
              Occupancy is worked out by PulseHub, not typed in. A room becomes Occupied when you put someone in it and
              frees up when they check out, and a room cannot be filled past its capacity or deleted while somebody is
              still in it.
            </Note>
          </Section>

          <Section
            id="residents"
            eyebrow="3. People"
            title="Add your residents"
            dek="Quick Setup step 12. The tabs across the middle are Active, Waiting, Checked Out, Applications and Vehicles."
          >
            <Shot
              src="/guide/08-tenants.png"
              alt="The Residents page with its tabs and filters"
              label="Residents"
              w={3024}
              h={1582}
              caption="Residents. The tab counts tell you how many are in each state."
            />
            <Card title="Three ways to get people in">
              <p>
                <strong>Add Resident</strong> types somebody in directly. Name, contact, room, package and join date;
                rent and deposit fill themselves in from your pricing.
              </p>
              <p>
                <strong>Share Application Form</strong> sends your public link. People apply themselves and land in the
                Applications tab for you to approve.
              </p>
              <p>
                <strong>Import Excel</strong> is the fastest route when you are moving an existing property onto PulseHub.
              </p>
            </Card>
            <Shot src="/guide/09-add-resident.png" alt="The Add Resident dialog" label="Add resident" />

            <Card title="Joining mid-month">
              <p>
                PulseHub asks whether a resident who joins part-way through the month pays for the whole month or only
                the days they are there. Pick per the agreement you made with them. It is set per resident, not once for
                the property.
              </p>
            </Card>

            <Card title="When someone is leaving">
              <p>
                <Kbd>Give Notice</Kbd> records the date they intend to go, and PulseHub holds them to the notice period
                from your settings. <Kbd>Check Out</Kbd> is the actual move-out: take the final meter reading, settle the
                balance, go through the room condition checklist, and the room frees up.
              </p>
            </Card>
          </Section>

          <Section
            id="payments"
            eyebrow="4. Money in"
            title="Collect rent"
            dek="Quick Setup step 13, and where you will spend most of your month from then on. One row per resident, one month at a time."
          >
            <Shot
              src="/guide/10-payments.png"
              alt="The Payments page showing the month's rent rows"
              label="Payments"
              caption="Payments. The arrows beside the month move you between months; the tiles above are that month's totals."
            />
            <Card title="The four tabs">
              <p>
                <strong>Monthly View</strong> is this month&apos;s rows. <strong>Due Today</strong> is who is due right
                now. <strong>All History</strong> is every payment ever taken. <strong>Electricity Billing</strong> is
                meter readings, covered in the next section.
              </p>
            </Card>
            <Card title="Taking a payment">
              <p>
                Tap <Kbd>Pay</Kbd> on the row. Enter what actually arrived; a part payment is fine, the row simply shows
                the remaining balance and stays unpaid until it is cleared. Choose whether it came in as cash or to a
                bank account; if it was a bank transfer, pick which of your accounts received it, so your reconciliation
                ties back to the right statement.
              </p>
              <p>A receipt is produced for every payment and can be sent straight to the resident.</p>
            </Card>
            <Shot
              src="/guide/11-record-payment.png"
              alt="The Record Payment dialog"
              label="Record payment"
              caption="Record Payment. A discount, a late fee and one-off charges such as a lost key can all go on the same receipt."
            />
            <Card title="Chasing what is late">
              <p>
                <Kbd>Remind</Kbd> on a single row, or <Kbd>Send reminders</Kbd> to chase everybody unpaid at once. Bulk
                reminders are capped at three a month so residents are not spammed.
              </p>
            </Card>
            <Note>
              The eye icon beside the month hides every amount on the page, useful when the screen is visible to
              residents standing at your desk.
            </Note>
          </Section>

          <Section
            id="electricity"
            eyebrow="5. Metered usage"
            title="Electricity"
            dek="Only if you bill electricity by meter. Skip this section entirely if your rent is all-inclusive."
          >
            <Shot
              src="/guide/12-electricity.png"
              alt="The Electricity Billing tab with meter readings per room"
              label="Electricity billing"
            />
            <Step n="01" title="Enter this month's reading">
              <p>One reading per room, taken from the meter on the wall.</p>
            </Step>
            <Step n="02" title="Apply">
              <p>
                PulseHub takes the difference from last month&apos;s reading, multiplies by your per-unit rate, and
                splits the cost between everybody living in that room. The charge lands on each of their rent rows.
              </p>
            </Step>
            <Note>
              <strong>Read the meters before you take the rent.</strong> Applying a reading changes what each resident
              owes that month, so a payment taken first has to be corrected afterwards.
            </Note>
          </Section>

          <Section
            id="team"
            eyebrow="6. Delegating"
            title="Your team"
            dek="Two different things with similar names. Staff are people you employ and pay. Managers are people who can log in."
          >
            <Card title="Staff">
              <p>
                Your warden, cook and cleaner: who they are, what you pay them, when they were paid. A staff record is
                about payroll. It does not give anybody access to PulseHub.
              </p>
            </Card>
            <Card title="Managers">
              <p>
                A manager signs in with their own email and password and sees only what you allow. Tap{' '}
                <Kbd>Add Manager</Kbd>, enter their details, and tick the permissions they need: collecting rent, adding
                residents, handling complaints, approving leave, and so on.
              </p>
              <p>
                They set their own password on first sign-in, so you never hold it. You also choose which properties they
                cover, so a manager sees only the sites you assign them.
              </p>
            </Card>
            <Shot
              src="/guide/13-add-manager.png"
              alt="The Add Manager dialog with its permission tick boxes"
              label="Add manager"
              caption="Give a manager the permissions their job needs and nothing more: rent collection without the ability to delete records, for instance."
            />
          </Section>

          <Section
            id="daily"
            eyebrow="7. Day to day"
            title="Running the property"
            dek="The parts you will use every week once setup is behind you."
          >
            <Card title="Complaints">
              <p>
                Log a maintenance issue yourself, or tap <Kbd>Get QR Code</Kbd>, print it, and put it on the wall.
                Residents scan it and report problems themselves, with a photo, without an account or a login. Each one
                moves through Open, In Progress and Resolved.
              </p>
            </Card>
            <Shot
              src="/guide/14-complaint-qr.png"
              alt="The complaints QR code dialog"
              label="Complaints QR"
              caption="Print this once. Residents scan it to report a problem; it arrives on your Complaints page."
            />

            <Card title="Leaves">
              <p>
                A record of who is away and when they are due back, so you know who is in the building. Staff can record
                a leave directly, or residents request it themselves by scanning <Kbd>Resident QR</Kbd>. A request is
                pending until somebody at the property approves it.
              </p>
            </Card>
            <Shot src="/guide/15-leave-qr.png" alt="The resident leave QR dialog" label="Leave QR" />

            <Card title="Money out">
              <p>
                <strong>Expenses</strong> are one-off costs like repairs and cleaning. <strong>Bills</strong> are
                recurring utilities with due dates, which can repeat monthly on their own. <strong>Kitchen</strong> is
                grocery spending. <strong>Food List</strong> is the menu you are serving. All four feed the profit figure
                in your reports.
              </p>
            </Card>
            <Card title="Announcements">
              <p>Your notice board. Post something once and every resident sees it.</p>
            </Card>
          </Section>

          <Section
            id="compliance"
            eyebrow="8. England only"
            title="Compliance"
            dek="A deadline tracker for the certificates and licences an English property has to keep current. It is a reminder system, not legal advice."
          >
            <Shot
              src="/guide/18-compliance.png"
              alt="The Compliance page listing certificates and their expiry dates"
              label="Compliance"
            />
            <Card title="How to use it">
              <p>
                Add each certificate you hold, for gas safety, electrical, the fire alarm, the HMO licence, with its
                expiry date, and upload the document itself as evidence. PulseHub emails you before each one lapses and
                shows at a glance which properties are compliant and which are not.
              </p>
              <p>
                Check what your own council requires. Requirements differ by authority and this page tracks dates; it
                does not tell you what the law demands of you.
              </p>
            </Card>
          </Section>

          <Section id="reports" eyebrow="9. Overview" title="Reports" dek="Where the month adds up.">
            <Shot src="/guide/16-reports.png" alt="The Reports page" label="Reports" />
            <Card title="Reports">
              <p>
                Income against expenses, what is still outstanding, and the reconciliation that ties collected rent back
                to the account each payment landed in. Exportable to Excel and PDF.
              </p>
            </Card>
            <Card title="All Properties">
              <p>
                Every site side by side, with occupancy, collection and profit, when you run more than one. The switcher
                at the top of every page moves you between them.
              </p>
            </Card>
            <Shot
              src="/guide/17-all-properties.png"
              alt="The All Properties overview comparing sites"
              label="All properties"
            />
          </Section>

          <Section
            id="subscription"
            eyebrow="10. Paying for PulseHub"
            title="Your subscription"
            dek="What happens when the free trial runs out."
          >
            <Card title="Choosing a plan">
              <p>
                Open <Kbd>Billing</Kbd> and pick a plan. You are billed per property, monthly or annually. Adding a
                property adds to the bill; you can cancel whenever you like and keep access to the end of the period you
                have already paid for. See{' '}
                <Link href={routes.pricing} className="text-primary underline underline-offset-2 hover:no-underline">
                  current pricing
                </Link>{' '}
                for the plan in your country.
              </p>
            </Card>
            <Note>
              If the trial ends before you subscribe, nothing is deleted. The account goes read-only, so you can still
              see everything but not add to it, and comes straight back the moment you pay.
            </Note>
          </Section>

          <div className="mt-14 border-t border-border pt-8">
            <h2 className="mb-2 font-display text-xl font-medium text-foreground">Stuck on something?</h2>
            <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted-foreground">
              Use <Kbd>Suggest a Feature</Kbd> in the sidebar to reach the PulseHub team, or{' '}
              <Link href={routes.contact} className="text-primary underline underline-offset-2 hover:no-underline">
                contact us
              </Link>
              . It goes straight to us and is the quickest way to get an answer or tell us something is missing.
            </p>
          </div>
        </div>
      </div>

      <CtaBand
        heading="Start running your property on PulseHub"
        text="Your first 14 days are free, with no card required. Sign up and follow this guide to be live in about an hour."
      />
    </SiteShell>
  )
}
