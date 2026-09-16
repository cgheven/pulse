import { SolutionPage } from '@/components/solution-page'
import { ProductScreenshot } from '@/components/feature-showcase'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { ClipboardList, CreditCard, Eye, Files } from 'lucide-react'

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
      eyebrow="Student Accommodation Software"
      heading="Manage Student Accommodation Through Every Move-In and Move-Out"
      text="Handle room and bed allocation, resident records, occupancy and rent tracking — and keep everyday accommodation operations organised right through the year."
      heroVisual={
        <ProductScreenshot
          src={screenshots.residents.src}
          alt={screenshots.residents.alt}
          width={screenshots.residents.width}
          height={screenshots.residents.height}
          priority
          sizes="(max-width: 1023px) calc(100vw - 2rem), 592px"
        />
      }
      problemHeading="Built around the accommodation cycle"
      problem="Keep room allocations, resident records, occupancy and payment activity organised throughout the accommodation cycle."
      outcomes={[
        {
          icon: Files,
          title: 'Reduce manual administration',
          description: 'Keep allocations, resident files and payment activity in one system as people move in and out.',
        },
        {
          icon: Eye,
          title: 'Improve room and occupancy visibility',
          description: 'See which rooms and beds are available and keep allocations current through the year.',
        },
        {
          icon: CreditCard,
          title: 'Track payments more clearly',
          description: 'Follow upcoming, paid and overdue amounts without rebuilding occupancy lists in spreadsheets.',
        },
        {
          icon: ClipboardList,
          title: 'Keep property information organised',
          description: 'Record maintenance, shared costs and site-level reports next to the resident and room records you already use.',
        },
      ]}
      faqs={[
        {
          question: 'What type of student accommodation teams can use PulseHub?',
          answer:
            'PulseHub is for teams that manage room-based student accommodation and need a single place for rooms, residents, occupancy, payments and daily property tasks. It is operational software, not a student-finance or university admissions system.',
        },
        {
          question: 'Can I manage multiple properties?',
          answer:
            'Yes. Plans are based on property allowance — Basic includes 1 property, Standard includes 3, and Business includes 10. Review pricing, or contact us if you operate a larger portfolio.',
        },
        {
          question: 'Can I track rent and overdue payments?',
          answer:
            'Yes. PulseHub helps you track rent schedules, payment records, outstanding balances and payment history for residents in your properties.',
        },
        {
          question: 'Can I manage rooms and occupancy?',
          answer:
            'Yes. You can organise rooms, beds, availability and resident allocations as occupancy changes through the accommodation cycle.',
        },
        {
          question: 'Does PulseHub integrate with university systems?',
          answer:
            'No. PulseHub does not currently offer university, student-finance or admissions integrations. It focuses on operational records: rooms, residents, occupancy, payments, maintenance and reporting.',
        },
        {
          question: 'Is a free trial available?',
          answer:
            'Yes. You can start a 14-day free trial with no card required from the Start Free Trial button.',
        },
        {
          question: 'Can I book a product demonstration?',
          answer:
            'Yes. Use Book a Demo to contact the team and request a walkthrough focused on student accommodation operations.',
        },
      ]}
      ctaHeading="Make student accommodation management easier."
      ctaText="Start a free trial, or book a demonstration to see how PulseHub organises rooms, residents and payments."
    />
  )
}
