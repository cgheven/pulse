import { SolutionPage } from '@/components/solution-page'
import { ProductScreenshot } from '@/components/feature-showcase'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { ClipboardList, CreditCard, Eye, Files } from 'lucide-react'

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
      eyebrow="Co-Living Management Software"
      heading="Run Every Co-Living Property From One Connected Platform"
      text="Manage shared living spaces, rooms and occupancy, residents, rent, shared utilities and maintenance — across every property from one dashboard."
      heroVisual={
        <ProductScreenshot
          src={screenshots.properties.src}
          alt={screenshots.properties.alt}
          width={screenshots.properties.width}
          height={screenshots.properties.height}
          priority
          sizes="(max-width: 1023px) calc(100vw - 2rem), 592px"
        />
      }
      problemHeading="Shared living needs connected operations"
      problem="Manage shared spaces, room availability, resident information, shared costs and property operations from one central platform."
      outcomes={[
        {
          icon: Files,
          title: 'Reduce manual administration',
          description: 'Stop splitting occupancy, resident files and shared costs across separate spreadsheets and message threads.',
        },
        {
          icon: Eye,
          title: 'Improve room and occupancy visibility',
          description: 'Keep room availability and allocations visible across shared living spaces.',
        },
        {
          icon: CreditCard,
          title: 'Track payments more clearly',
          description: 'See rent schedules, deposits, outstanding balances and payment history next to each resident.',
        },
        {
          icon: ClipboardList,
          title: 'Keep property information organised',
          description: 'Record maintenance, utility allocation and property reports in the same platform as occupancy.',
        },
      ]}
      faqs={[
        {
          question: 'What type of co-living operators can use PulseHub?',
          answer:
            'PulseHub is for operators managing shared living spaces who need room occupancy, resident records, payments, shared costs and day-to-day property tasks in one place. It is not a community, events or resident social app.',
        },
        {
          question: 'Can I manage multiple properties?',
          answer:
            'Yes. Each plan has a published property allowance: 1, 3 or 10 properties. If your portfolio grows, move to the next plan. Contact us if you need a larger allowance.',
        },
        {
          question: 'Can I track rent and overdue payments?',
          answer:
            'Yes. PulseHub helps you track rent schedules, deposits, partial payments, outstanding balances and payment history.',
        },
        {
          question: 'Can I manage rooms and occupancy?',
          answer:
            'Yes. You can organise rooms, beds, availability and resident allocations across shared living spaces.',
        },
        {
          question: 'Can I manage maintenance requests?',
          answer:
            'Yes. Maintenance management is part of the PulseHub platform on every plan. You can record issues, assign follow-up and keep a history of property work.',
        },
        {
          question: 'Does PulseHub include a resident community or events app?',
          answer:
            'No. PulseHub focuses on operational management — occupancy, residents, payments, maintenance and reporting — rather than community or events features.',
        },
        {
          question: 'Is a free trial available?',
          answer:
            'Yes. You can start a 14-day free trial with no card required from the Start Free Trial button.',
        },
        {
          question: 'Can I book a product demonstration?',
          answer:
            'Yes. Use Book a Demo to contact the PulseHub team and request a walkthrough of co-living operations.',
        },
      ]}
      ctaHeading="Bring your co-living operations into one platform."
      ctaText="Start a free trial, or book a demonstration to see PulseHub with shared living operations in mind."
    />
  )
}
