import { SolutionPage } from '@/components/solution-page'
import { DashboardImage } from '@/components/product-visual'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { postPath } from '@/lib/blog'
import { getRegion, formatPrice } from '@/lib/pricing'
import { ClipboardList, CreditCard, Eye, ShieldCheck } from 'lucide-react'

export const metadata = pageMetadata({
  title: 'HMO Management Software for UK Property Operators',
  description:
    'Track HMO rooms, per-room rent, occupancy and safety-certificate compliance (gas, EICR, EPC, fire, HMO licence) across your portfolio with PulseHub. Plans from £25/month.',
  path: routes.hmo,
})

const gb = getRegion('gb')
// 'gb' is a tiered market, so monthly is always defined.
const fromPrice = formatPrice(gb.monthly!.basic, gb)

/** The certificates and licence PulseHub tracks, with the usual England timing. */
const certificates: { label: string; timing: string }[] = [
  { label: 'HMO licence', timing: 'Where required, with its conditions and expiry date' },
  { label: 'Gas safety (CP12)', timing: 'Every 12 months, where there is gas' },
  { label: 'Electrical (EICR)', timing: 'At least every 5 years' },
  { label: 'Fire detection and alarms', timing: 'In place and working, checked when reported' },
  { label: 'Energy performance (EPC)', timing: 'A valid certificate on file' },
]

/** Illustrative portfolio compliance view. */
const matrix: { property: string; status: 'green' | 'amber' | 'red'; note: string }[] = [
  { property: 'Oakfield Road', status: 'green', note: 'All current' },
  { property: 'Station Terrace', status: 'amber', note: 'EICR due in 21 days' },
  { property: 'Mill Street', status: 'red', note: 'Gas safety expired' },
]

const statusDot: Record<'green' | 'amber' | 'red', string> = { green: '🟢', amber: '🟡', red: '🔴' }

function ComplianceSection() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">HMO compliance</p>
        <h2 className="mb-4 max-w-3xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
          Keep every HMO certificate current, across the whole portfolio
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Record each property&rsquo;s safety certificates and licence with their renewal dates, see at a glance which
          properties are compliant and which need action, and keep the evidence files in one place. PulseHub keeps the
          records and sends the reminders. It does not carry out inspections or make a property compliant on its own, and
          it is not legal advice.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <dl className="divide-y divide-border rounded-xl border border-border p-6">
            {certificates.map((c) => (
              <div key={c.label} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[200px_1fr] sm:gap-5">
                <dt className="font-medium text-foreground">{c.label}</dt>
                <dd className="text-sm text-muted-foreground">{c.timing}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-xl border border-border p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Example: portfolio compliance view
            </p>
            <ul className="space-y-3">
              {matrix.map((row) => (
                <li key={row.property} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="flex items-center gap-3">
                    <span aria-hidden>{statusDot[row.status]}</span>
                    <span className="font-medium text-foreground">{row.property}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">{row.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              A daily reminder flags anything due or overdue before the date passes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HmoPage() {
  return (
    <SolutionPage
      path={routes.hmo}
      title="HMO Management Software for UK Property Operators"
      eyebrow="HMO Management Software"
      heading="Manage Your HMO Portfolio Without the Spreadsheet Chaos"
      text="Track rooms and occupancy, residents, per-room rent and payments, safety-certificate compliance and everyday property operations across every HMO in your portfolio, all in one platform."
      supporting={`Best for HMO operators who let rooms individually, split utility bills by join date, and need every safety certificate and licence tracked in one place. Plans from ${fromPrice}/month.`}
      heroVisual={<DashboardImage priority />}
      problemHeading="Why HMO operations get hard to manage"
      problem="Managing multiple rooms, rent schedules, residents, property tasks and a stack of safety certificates across an HMO portfolio quickly becomes difficult with spreadsheets and disconnected tools."
      outcomesHeading="One platform for every HMO in your portfolio"
      outcomes={[
        {
          icon: ClipboardList,
          title: 'Cut HMO admin',
          description: 'Keep room lists, tenant records and rent activity together instead of updating separate spreadsheets.',
        },
        {
          icon: Eye,
          title: 'Track rooms, beds and voids',
          description: 'See which rooms and beds are let or empty, and keep allocations up to date as tenants move in and out.',
        },
        {
          icon: CreditCard,
          title: 'Per-room rent and arrears',
          description: 'Review upcoming, paid and overdue rent per tenancy, plus deposits and payment history, from one place.',
        },
        {
          icon: ShieldCheck,
          title: 'Stay on top of HMO compliance',
          description: 'Record gas, EICR, EPC, fire and licence documents with their renewal dates, and get reminded before they lapse.',
        },
      ]}
      sections={<ComplianceSection />}
      relatedGuide={{ href: postPath('hmo-compliance'), label: 'HMO compliance: the records and certificates that matter' }}
      faqs={[
        {
          question: 'What type of HMO operators can use PulseHub?',
          answer:
            'PulseHub is accommodation management software for operators who need to manage rooms, residents, rent, occupancy, compliance records and property tasks across one or more HMOs. It is designed for room-based operations rather than a generic sales or lettings CRM.',
        },
        {
          question: 'Can PulseHub track HMO safety certificates and licences?',
          answer:
            'Yes. You can record the HMO licence, gas safety record, electrical inspection (EICR), fire detection and alarm checks, and the EPC for each property, each with its renewal date, and see a portfolio view of which properties are compliant and which need action. A daily reminder flags anything due or overdue. PulseHub keeps the records and reminders; it does not carry out inspections or make a property compliant, and it is not legal advice.',
        },
        {
          question: 'Which HMO certificates and documents can I record?',
          answer:
            'The common England set: the HMO licence and its conditions, the gas safety record (where there is gas), the electrical installation inspection (EICR), fire detection and alarm records, and the Energy Performance Certificate (EPC), along with who occupies each room and a history of inspections and repairs. Exactly which rules apply depends on the property and the local council, so confirm current requirements on GOV.UK and with your local authority.',
        },
        {
          question: 'Can I manage multiple HMO properties?',
          answer:
            'Yes. Choose a plan by property allowance: Basic includes 1 property, Standard includes 3, and Business includes 10. If you add properties, move to the next plan rather than starting a separate subscription for each site. Contact us if you need a larger portfolio or a different setup.',
        },
        {
          question: 'Can I track rent and overdue payments?',
          answer:
            'Yes. PulseHub helps you track rent schedules, payment records, outstanding balances, deposits and payment history per tenancy, then follow up on overdue amounts from those records.',
        },
        {
          question: 'Can I manage rooms and occupancy?',
          answer:
            'Yes. You can organise properties, rooms, beds, availability and resident allocations so the team can see which spaces are occupied or available.',
        },
        {
          question: 'Can I manage maintenance requests?',
          answer:
            'Yes. Maintenance management is part of the PulseHub platform on every plan. You can record issues, assign follow-up and keep a history of property-related work.',
        },
        {
          question: 'Is a free trial available?',
          answer:
            'Yes. You can start a 14-day free trial with no card required from the Start Free Trial button, which opens the PulseHub signup page.',
        },
        {
          question: 'Can I book a product demonstration?',
          answer:
            'Yes. Use Book a Demo to contact the PulseHub team and request a walkthrough of rooms, residents, rent, compliance and daily operations.',
        },
      ]}
      ctaHeading="Ready to simplify your HMO operations?"
      ctaText="Start a free trial, or book a demonstration if you would like to see PulseHub with your HMO workflow in mind."
    />
  )
}
