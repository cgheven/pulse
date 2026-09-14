import { SolutionPage } from '@/components/solution-page'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { BarChart3, BedDouble, Building2, CreditCard, Receipt, Shield, Users, Wrench } from 'lucide-react'

export const metadata = pageMetadata({
  title: 'HMO Management Software for Property Operators',
  description:
    'Manage HMO rooms, residents, rent, occupancy and property operations with PulseHub accommodation management software.',
  path: routes.hmo,
})

export default function HmoPage() {
  return (
    <SolutionPage
      path={routes.hmo}
      title="HMO Management Software for UK Property Operators"
      heading="HMO Management Software for Growing Property Portfolios"
      text="Manage rooms, residents, rent and property operations across your HMO portfolio from one connected platform."
      supporting="Replace disconnected spreadsheets and manual records with a clearer view of your rooms, residents, payments and property operations."
      sections={[
        { icon: BedDouble, title: 'Room and occupancy management', description: 'Organise properties, rooms, beds, availability and resident allocations.' },
        { icon: Users, title: 'Resident and tenancy records', description: 'Keep resident profiles, documents and payment history together.' },
        { icon: CreditCard, title: 'Rent and payment tracking', description: 'See upcoming, paid and overdue rent without chasing through spreadsheets.' },
        { icon: Receipt, title: 'Shared utility and bill allocation', description: 'Allocate shared costs across rooms, residents or properties.' },
        { icon: Wrench, title: 'Maintenance and operational tasks', description: 'Record issues, assign follow-up and keep a history of property work.' },
        { icon: BarChart3, title: 'Property-level reporting', description: 'Review occupancy, collections, outstanding balances and expenses.' },
        { icon: Building2, title: 'Multi-property visibility', description: 'Monitor more than one HMO from a single PulseHub account.' },
        { icon: Shield, title: 'Team access and permissions', description: 'Give managers access to the properties they operate.' },
      ]}
      faqs={[
        {
          question: 'Is PulseHub HMO management software?',
          answer: 'PulseHub is accommodation management software used by HMO operators to manage rooms, residents, rent, occupancy and property operations.',
        },
        {
          question: 'Can I manage more than one HMO?',
          answer: 'Yes, where your plan includes multi-property management. Review pricing or contact us to discuss your portfolio.',
        },
      ]}
    />
  )
}
