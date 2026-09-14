import { BarChart3, BedDouble, Bell, Building2, CreditCard, FileText, Landmark, LayoutGrid, Receipt, Shield, Users, Wrench } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { routes } from '@/lib/navigation'

export const productFeatures = [
  {
    icon: BedDouble,
    title: 'Room & Occupancy Management',
        description: 'Properties, floors, rooms, beds and allocations.',
  },
  {
    icon: Users,
    title: 'Resident Management',
        description: 'Profiles, tenancy details, documents and payment history.',
  },
  {
    icon: CreditCard,
    title: 'Rent & Payment Management',
        description: 'Schedules, deposits, partial payments and overdue balances.',
  },
  {
    icon: Bell,
    title: 'Automated Rent Reminders',
    description: 'Reduce manual follow-ups with reminders for upcoming payments, overdue rent and important resident updates.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Requests',
        description: 'Record issues, assign follow-up and keep a work history.',
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
    heading: 'Property, Rooms and Occupancy',
    subtitle: 'See the layout of each site and which rooms and beds are occupied, available or allocated.',
    columns: 'two' as const,
    items: [
      {
        icon: BedDouble,
        title: 'Rooms and Beds',
        description: 'Organise properties, floors, rooms and beds.',
      },
      {
        icon: LayoutGrid,
        title: 'Occupancy',
        description: 'See which rooms and beds are occupied or available.',
      },
    ],
  },
  {
    id: 'residents',
    heading: 'Resident Records and Member History',
    subtitle: 'Each person’s profile, documents and history — separate from property rent collection.',
    columns: 'two' as const,
    items: [
      {
        icon: Users,
        title: 'Resident Records',
        description: 'Profiles, payment records and communication history.',
      },
      {
        icon: FileText,
        title: 'Documents and Tenancy Details',
        description: 'Tenancy information stored with the resident record.',
      },
    ],
  },
  {
    id: 'payments',
    heading: 'Rent and Payments',
    subtitle: 'What is due, paid or outstanding — the rent screen, not the member timeline.',
    columns: 'three' as const,
    items: [
      {
        icon: CreditCard,
        title: 'Rent and Payment Tracking',
        description: 'Schedules, receipts, partial payments and overdue balances.',
      },
      {
        icon: Landmark,
        title: 'Deposits',
        description: 'Deposits kept visible with other payment activity.',
      },
      {
        icon: Bell,
        title: 'Payment Reminders',
        description: 'Upcoming and overdue rent reminders.',
      },
    ],
  },
  {
    id: 'operations',
    heading: 'Maintenance and Shared Costs',
    subtitle: 'Log issues through to resolution, and allocate shared bills.',
    columns: 'two' as const,
    items: [
      {
        icon: Wrench,
        title: 'Maintenance and Complaints',
        description: 'Complaints and maintenance requests, with progress and history.',
      },
      {
        icon: Receipt,
        title: 'Utility and Bill Allocation',
        description: 'Shared utility and other bills across rooms or residents.',
      },
    ],
  },
  {
    id: 'portfolio',
    heading: 'Reporting and Multiple Properties',
    subtitle: 'The dashboard shows the selected property. Switch site from the header, or compare sites in All Properties.',
    columns: 'three' as const,
    items: [
      {
        icon: BarChart3,
        title: 'Reports and Financial Insights',
        description: 'Occupancy, collections, balances, expenses and performance.',
      },
      {
        icon: Building2,
        title: 'Property Switcher and All Properties',
        description: 'Switch the selected site, or compare occupancy, collections, costs and profit. Plans allow 1, 3 or 10 properties.',
      },
      {
        icon: Shield,
        title: 'Team Access',
        description: 'Role-based access for property managers.',
      },
    ],
  },
]

export default function Features() {
  const homepageFeatures = productFeatures.filter((item) =>
    [
      'Room & Occupancy Management',
      'Resident Management',
      'Rent & Payment Management',
      'Maintenance & Requests',
    ].includes(item.title),
  )

  return (
    <section id="features" className="scroll-mt-20 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Manage Your Accommodation Operations"
          subtitle="Rooms, residents, rent and maintenance — the daily work of running a site."
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
