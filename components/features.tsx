import { BarChart3, BedDouble, Building2, ClipboardList, CreditCard, Receipt, Users, Wrench } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'

export const productFeatures = [
  {
    icon: BedDouble,
    title: 'Room & Occupancy Management',
    description: 'Manage properties, floors, rooms, beds, availability and resident allocations with complete visibility.',
  },
  {
    icon: Users,
    title: 'Resident Management',
    description: 'Keep resident profiles, tenancy information, documents, payment records and communication history in one place.',
  },
  {
    icon: CreditCard,
    title: 'Rent & Payment Management',
    description: 'Track rent schedules, deposits, partial payments, overdue balances, receipts and payment history.',
  },
  {
    icon: ClipboardList,
    title: 'Automated Rent Reminders',
    description: 'Reduce manual follow-ups with reminders for upcoming payments, overdue rent and important resident updates.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Requests',
    description: 'Record maintenance issues, assign tasks, track progress and maintain a clear history of property-related work.',
  },
  {
    icon: Receipt,
    title: 'Utility & Bill Allocation',
    description: 'Manage shared utility costs and allocate bills across rooms, residents or properties.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Financial Insights',
    description: 'Understand occupancy, revenue, collections, outstanding balances, expenses and property performance.',
  },
  {
    icon: Building2,
    title: 'Multi-Property Management',
    description: 'Manage multiple HMOs, co-living properties or accommodation sites from one central account.',
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Everything Your Accommodation Business Needs"
          subtitle="One connected platform for managing properties, residents, payments and daily operations."
        />
        <CardGrid items={productFeatures} columns="four" />
      </div>
    </section>
  )
}
