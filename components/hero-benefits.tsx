import { Building2, CreditCard, LayoutGrid } from 'lucide-react'

const benefits = [
  {
    icon: LayoutGrid,
    title: 'Room-Level Control',
    description: 'Manage rooms, beds, residents and availability in one place.',
  },
  {
    icon: CreditCard,
    title: 'Automated Rent Tracking',
    description: 'Track upcoming, paid and overdue payments at a glance.',
  },
  {
    icon: Building2,
    title: 'Multi-Property Visibility',
    description: 'Monitor your accommodation portfolio from one central dashboard.',
  },
]

export default function HeroBenefits() {
  return (
    <section className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
        {benefits.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6">
              <Icon className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mb-2 font-semibold">{item.title}</p>
              <p className="text-sm text-foreground/60">{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
