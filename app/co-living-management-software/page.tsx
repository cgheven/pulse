import { SolutionPage } from '@/components/solution-page'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { BarChart3, BedDouble, Building2, CreditCard, Receipt, Users, Wrench } from 'lucide-react'

export const metadata = pageMetadata({
  title: 'Co-Living Management Software',
  description:
    'Manage co-living rooms, residents, payments, utilities and property operations from one connected platform.',
  path: routes.coliving,
})

export default function ColivingPage() {
  return (
    <SolutionPage
      path={routes.coliving}
      title="Co-Living Management Software"
      heading="Manage Your Co-Living Properties in One Place"
      text="Manage shared living spaces, residents, payments and property operations from one central dashboard."
      supporting="Make shared accommodation operations easier to manage with connected property, resident, payment and occupancy information."
      sections={[
        { icon: BedDouble, title: 'Room and occupancy management', description: 'Keep rooms, beds and availability organised across shared living spaces.' },
        { icon: Users, title: 'Resident profiles', description: 'Store resident information, documents and payment history together.' },
        { icon: CreditCard, title: 'Rent and payment tracking', description: 'Track rent schedules, deposits, partial payments and overdue balances.' },
        { icon: Receipt, title: 'Shared utility allocation', description: 'Allocate shared costs across rooms or residents.' },
        { icon: Wrench, title: 'Maintenance management', description: 'Record maintenance work and keep a clear history of property issues.' },
        { icon: Building2, title: 'Multi-property control', description: 'Manage more than one co-living site from a single account, where your plan allows.' },
        { icon: BarChart3, title: 'Reports and operational visibility', description: 'See occupancy, collections, outstanding balances and property performance.' },
      ]}
      faqs={[
        {
          question: 'Is PulseHub suitable for co-living operators?',
          answer: 'Yes. PulseHub helps co-living operators manage rooms, residents, payments, utilities and day-to-day property operations.',
        },
        {
          question: 'Does PulseHub include a resident community or events app?',
          answer: 'No. PulseHub focuses on operational management — occupancy, residents, payments, maintenance and reporting — rather than community or events features.',
        },
      ]}
    />
  )
}
