import { BarChart3, BedDouble, Bell, Building2, CreditCard, FileText, Landmark, LayoutGrid, Receipt, Shield, Users, Wrench } from 'lucide-react'

/**
 * Capability groups used by the /features page. The homepage no longer renders a
 * feature card grid. The product videos and screenshots carry that story.
 */
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
    subtitle: 'Each person’s profile, documents and history, separate from property rent collection.',
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
    subtitle: 'What is due, paid or outstanding: the rent screen, not the member timeline.',
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
