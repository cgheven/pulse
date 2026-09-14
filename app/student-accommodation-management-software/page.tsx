import { SolutionPage } from '@/components/solution-page'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { BarChart3, BedDouble, Building2, CreditCard, Receipt, Users, Wrench } from 'lucide-react'

export const metadata = pageMetadata({
  title: 'Student Accommodation Management Software',
  description:
    'Organise rooms, residents, payments, occupancy and daily operations with PulseHub student accommodation management software.',
  path: routes.student,
})

export default function StudentPage() {
  return (
    <SolutionPage
      path={routes.student}
      title="Student Accommodation Management Software"
      heading="Student Accommodation Management Made Simpler"
      text="Keep rooms, residents, payments and accommodation operations organised with one simple management platform."
      supporting="Give your team one reliable place to manage accommodation records, room availability, resident information and payment activity."
      sections={[
        { icon: BedDouble, title: 'Room and bed allocation', description: 'Organise rooms, beds and availability as residents move in and out.' },
        { icon: Users, title: 'Resident records', description: 'Keep profiles, documents and allocation details in one place.' },
        { icon: CreditCard, title: 'Occupancy and rent tracking', description: 'See who is in residence and which payments are upcoming, paid or overdue.' },
        { icon: Wrench, title: 'Maintenance requests', description: 'Log issues, assign work and keep a record of what has been completed.' },
        { icon: Receipt, title: 'Utility allocation', description: 'Allocate shared bills across rooms or residents where needed.' },
        { icon: BarChart3, title: 'Operational reports', description: 'Review occupancy, collections and outstanding balances.' },
        { icon: Building2, title: 'Multi-property management', description: 'Run more than one student accommodation site from one account, where your plan allows.' },
      ]}
      faqs={[
        {
          question: 'Can student accommodation teams use PulseHub?',
          answer: 'Yes. PulseHub is used to organise rooms, residents, payments, occupancy and daily accommodation tasks.',
        },
        {
          question: 'Does PulseHub connect to university or student-finance systems?',
          answer: 'PulseHub does not currently offer university or student-finance integrations. It focuses on operational records, occupancy, payments and property administration.',
        },
      ]}
    />
  )
}
