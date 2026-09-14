import { BedDouble, Building2, CreditCard, MousePointerClick, Receipt, Users } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'

export default function Benefits() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Built for the details that matter"
          subtitle="From room-level occupancy to payment history and property-level reporting, PulseHub keeps the details of your accommodation business connected."
        />
        <CardGrid
          items={[
            {
              icon: BedDouble,
              title: 'Room and bed-level management',
              description: 'Organise rooms, beds, availability and allocations instead of treating a property as a single unit.',
            },
            {
              icon: Users,
              title: 'Centralised resident records',
              description: 'Keep profiles, tenancy details, documents and payment history attached to each resident.',
            },
            {
              icon: CreditCard,
              title: 'Rent and payment tracking',
              description: 'See schedules, deposits, partial payments, overdue balances and receipts in one place.',
            },
            {
              icon: Receipt,
              title: 'Utility and bill allocation',
              description: 'Allocate shared costs across rooms, residents or properties.',
            },
            {
              icon: Building2,
              title: 'Property and portfolio visibility',
              description: 'Review occupancy, collections and expenses at property level, then manage multiple sites from one account.',
            },
            {
              icon: MousePointerClick,
              title: 'Straightforward daily workflows',
              description: 'A clean interface designed to help small and mid-sized operators complete everyday tasks with fewer clicks.',
            },
          ]}
        />
      </div>
    </section>
  )
}
