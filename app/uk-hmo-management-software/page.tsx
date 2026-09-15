import { SolutionPage } from '@/components/solution-page'
import { DashboardImage } from '@/components/product-visual'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { BarChart3, BedDouble, Building2, ClipboardList, CreditCard, Eye, Files, Receipt, Shield, Users, Wrench } from 'lucide-react'

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
      eyebrow="HMO Management Software"
      heading="Manage Your HMO Portfolio Without the Spreadsheet Chaos"
      text="Track rooms and occupancy, residents, rent and payments, and everyday property operations across every HMO in your portfolio — all in one platform."
      heroVisual={<DashboardImage priority />}
      problemHeading="Why HMO operations get hard to manage"
      problem="Managing multiple rooms, rent schedules, residents and property tasks across an HMO portfolio can quickly become difficult with spreadsheets and disconnected tools."
      outcomes={[
        {
          icon: Files,
          title: 'Reduce manual administration',
          description: 'Keep room lists, resident records and rent activity together instead of updating separate spreadsheets.',
        },
        {
          icon: Eye,
          title: 'Improve room and occupancy visibility',
          description: 'See which rooms and beds are occupied or available, and keep allocations up to date as residents move.',
        },
        {
          icon: CreditCard,
          title: 'Track payments more clearly',
          description: 'Review upcoming, paid and overdue rent, plus deposits and payment history, from one place.',
        },
        {
          icon: ClipboardList,
          title: 'Keep property information organised',
          description: 'Record maintenance, shared costs and property-level reports alongside the rest of your HMO operations.',
        },
      ]}
      sections={[
        { icon: BedDouble, title: 'Room and occupancy management', description: 'Organise properties, rooms, beds, availability and resident allocations.' },
        { icon: Users, title: 'Resident and tenancy records', description: 'Keep resident profiles, documents and payment history together.' },
        { icon: CreditCard, title: 'Rent and payment tracking', description: 'See upcoming, paid and overdue rent without chasing through spreadsheets.' },
        { icon: Receipt, title: 'Shared utility and bill allocation', description: 'Allocate shared costs across rooms, residents or properties.' },
        { icon: Wrench, title: 'Maintenance and operational tasks', description: 'Record issues, assign follow-up and keep a history of property work.' },
        { icon: BarChart3, title: 'Property-level reporting', description: 'Review occupancy, collections, outstanding balances and expenses.' },
        { icon: Building2, title: 'Multi-property visibility', description: 'Monitor more than one HMO from a single PulseHub account, up to the property allowance on your plan.' },
        { icon: Shield, title: 'Team access and permissions', description: 'Give managers access to the properties they operate.' },
      ]}
      faqs={[
        {
          question: 'What type of HMO operators can use PulseHub?',
          answer:
            'PulseHub is accommodation management software for operators who need to manage rooms, residents, rent, occupancy and property tasks across one or more HMOs. It is designed for room-based operations rather than a generic sales or lettings CRM.',
        },
        {
          question: 'Can I manage multiple HMO properties?',
          answer:
            'Yes. Choose a plan by property allowance: Basic includes 1 property, Standard includes 3, and Business includes 10. If you add properties, move to the next plan rather than starting a separate subscription for each site. Contact us if you need a larger portfolio or a different setup.',
        },
        {
          question: 'Can I track rent and overdue payments?',
          answer:
            'Yes. PulseHub helps you track rent schedules, payment records, outstanding balances, deposits and payment history, then follow up on overdue amounts from those records.',
        },
        {
          question: 'Can I manage rooms and occupancy?',
          answer:
            'Yes. You can organise properties, rooms, beds, availability and resident allocations so the team can see which spaces are occupied or available.',
        },
        {
          question: 'Can I manage maintenance requests?',
          answer:
            'Yes. Maintenance management is part of the PulseHub platform on every plan. You can record issues, assign follow-up and keep a history of property-related work.',
        },
        {
          question: 'Is a free trial available?',
          answer:
            'Yes. You can start a 14-day free trial with no card required from the Start Free Trial button, which opens the PulseHub signup page.',
        },
        {
          question: 'Can I book a product demonstration?',
          answer:
            'Yes. Use Book a Demo to contact the PulseHub team and request a walkthrough of rooms, residents, rent and daily operations.',
        },
      ]}
      ctaHeading="Ready to simplify your HMO operations?"
      ctaText="Start a free trial, or book a demonstration if you would like to see PulseHub with your HMO workflow in mind."
    />
  )
}
