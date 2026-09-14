import { BarChart3, BedDouble, Bell, Building2, CreditCard, Eye, FileText, Landmark, LayoutGrid, Receipt, Shield, Users, Wallet, Wrench } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { routes } from '@/lib/navigation'

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
    icon: Bell,
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

export const featureGroups = [
  {
    id: 'rooms',
    heading: 'Property and Room Management',
    items: [
      {
        icon: BedDouble,
        title: 'Room Management',
        description: 'Organise properties, floors, rooms and beds so your team can see the layout of each site.',
      },
      {
        icon: LayoutGrid,
        title: 'Occupancy Management',
        description: 'See which rooms and beds are occupied or available, and keep resident allocations up to date.',
      },
    ],
  },
  {
    id: 'residents',
    heading: 'Resident Management',
    items: [
      {
        icon: Users,
        title: 'Resident Records',
        description: 'Keep resident profiles, payment records and communication history in one place.',
      },
      {
        icon: FileText,
        title: 'Documents and Tenancy Details',
        description: 'Store tenancy information and supporting documents alongside each resident record.',
      },
    ],
  },
  {
    id: 'payments',
    heading: 'Rent and Payments',
    items: [
      {
        icon: CreditCard,
        title: 'Rent Tracking',
        description: 'Track rent schedules and see which payments are upcoming, paid or overdue.',
      },
      {
        icon: Wallet,
        title: 'Payment Records',
        description: 'Keep receipts, partial payments and payment history attached to each resident.',
      },
      {
        icon: Landmark,
        title: 'Deposits',
        description: 'Record deposits collected and keep them visible alongside other payment activity.',
      },
      {
        icon: Bell,
        title: 'Automated Reminders',
        description: 'Reduce manual follow-ups with reminders for upcoming payments, overdue rent and important resident updates.',
      },
    ],
  },
  {
    id: 'operations',
    heading: 'Maintenance and Shared Costs',
    items: [
      {
        icon: Wrench,
        title: 'Maintenance Requests',
        description: 'Record maintenance issues, assign tasks, track progress and keep a history of property-related work.',
      },
      {
        icon: Receipt,
        title: 'Utility and Bill Allocation',
        description: 'Manage shared utility costs and allocate bills across rooms, residents or properties.',
      },
    ],
  },
  {
    id: 'portfolio',
    heading: 'Reporting and Portfolio Control',
    items: [
      {
        icon: BarChart3,
        title: 'Reports and Financial Insights',
        description: 'Review occupancy, collections, outstanding balances, expenses and property performance.',
      },
      {
        icon: Building2,
        title: 'Multi-Property Management',
        description: 'Manage multiple HMOs, co-living properties or accommodation sites from one central account.',
      },
      {
        icon: Shield,
        title: 'Team Access and Permissions',
        description: 'Give property managers the access they need, with role-based permissions for operational work.',
      },
      {
        icon: Eye,
        title: 'Property-Level Visibility',
        description: 'See occupancy, collections and outstanding balances for each property without rebuilding reports from spreadsheets.',
      },
    ],
  },
]

export default function Features() {
  const homepageFeatures = productFeatures.filter(
    (item) => !['Automated Rent Reminders', 'Utility & Bill Allocation'].includes(item.title),
  )

  return (
    <section id="features" className="scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Manage Your Accommodation Operations"
          subtitle="The capabilities operators use every day — rooms, residents, rent, maintenance, reporting and multiple properties."
        />
        <CardGrid items={homepageFeatures} columns="three" />
        <p className="mt-6 text-center">
          <a href={routes.features} className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline">
            Explore the Platform
          </a>
        </p>
      </div>
    </section>
  )
}
