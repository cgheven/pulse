import { SectionHeading } from '@/components/card-grid'

const steps = [
  {
    step: '1',
    title: 'Set Up Your Properties',
    description: 'Organise properties, floors, rooms, beds and available spaces.',
  },
  {
    step: '2',
    title: 'Add Residents',
    description: 'Keep resident profiles, documents, tenancy details and allocations together.',
  },
  {
    step: '3',
    title: 'Manage Rent and Operations',
    description: 'Track payments, balances, utilities, maintenance and daily tasks.',
  },
  {
    step: '4',
    title: 'Monitor Your Portfolio',
    description: 'Review occupancy, collections, outstanding balances and property performance.',
  },
]

export default function Workflow() {
  return (
    <section className="bg-muted/30 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="How PulseHub Works"
          subtitle="Set up your properties, keep resident and payment records together, then review occupancy and collections from one dashboard."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <li key={item.step} className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {item.step}
              </span>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-base text-foreground/70">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
