import type { ReactNode } from 'react'
import { SolutionPage } from '@/components/solution-page'
import { ProductScreenshot } from '@/components/feature-showcase'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { ClipboardList, CreditCard, Eye, Files } from 'lucide-react'

export const metadata = pageMetadata({
  title: 'Student Accommodation Management Software',
  description:
    'Student accommodation management software for independent and mid-market operators: rooms, beds, residents, rent, deposits, occupancy and multiple properties.',
  path: routes.student,
})

type Shot = { src: string; width: number; height: number; alt: string }

function WorkflowBlock({
  eyebrow,
  title,
  body,
  shot,
  label,
  reverse = false,
}: {
  eyebrow: string
  title: string
  body: string
  shot: Shot
  label: string
  reverse?: boolean
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={`min-w-0 ${reverse ? 'lg:order-2' : ''}`}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>
      </div>
      <div className={`min-w-0 ${reverse ? 'lg:order-1' : ''}`}>
        <ProductScreenshot
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          label={label}
          sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
        />
      </div>
    </div>
  )
}

const sections: ReactNode = (
  <>
    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl border-l-2 border-primary pl-6 sm:pl-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Who it is for</p>
        <h2 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.1] tracking-tight">
          Built for independent and mid-market operators
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          PulseHub suits teams running roughly 50 to 500 beds across 1 to 10 properties: independent student
          accommodation and student housing providers, shared houses and co-living, and hostels that let by the
          room or bed. It is not a university student information system and not an enterprise platform for large
          purpose-built student accommodation, so you are not configuring features built for universities that you
          will never use.
        </p>
      </div>
    </section>

    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">How it works day to day</p>
        <h2 className="mb-10 max-w-3xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
          Rooms, residents, rent and occupancy in one place
        </h2>
        <div className="space-y-12 sm:space-y-16">
          <WorkflowBlock
            eyebrow="Occupancy"
            title="Keep rooms and beds full through the year"
            body="See which rooms and beds are taken, free or reserved, and keep allocations current as students move in and out. A waiting list holds incoming residents with their move-in dates, so a room that frees up already has someone lined up for it."
            shot={screenshots.residentsWaiting}
            label="Residents · waiting list & move-ins"
          />
          <WorkflowBlock
            eyebrow="Rent & deposits"
            title="Track rent, part-payments and deposits"
            body="Follow rent due, paid and overdue for every resident, record part-payments, and hold a deposit on each record to settle at move-out. Utility and electricity charges sit on the same monthly bill, so each resident has one running balance instead of several."
            shot={screenshots.payments}
            label="Payments · rent, utilities & balances"
            reverse
          />
          <WorkflowBlock
            eyebrow="Multiple properties"
            title="Run every property from one login"
            body="Manage one site or ten from a single account. The multi-property view compares occupancy, income, costs and outstanding balances across properties, so month end does not mean stitching spreadsheets together."
            shot={screenshots.properties}
            label="All properties · occupancy & income"
          />
        </div>
      </div>
    </section>

    <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">What it is, and is not</p>
        <h2 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.1] tracking-tight">
          How PulseHub differs from a hotel PMS or university system
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          A hotel PMS is built for nightly stays and a university system for enrolment and student finance.
          PulseHub is built for the accommodation itself: rooms and beds let by the month, resident records,
          deposits, occupancy and the daily running of one or several sites. It records payments and issues
          receipts, but it does not process card payments, manage guarantors, or connect to university finance or
          admissions systems. Billing runs on a monthly cycle, with pro-rata for mid-month moves and a deposit held
          on each resident record.
        </p>
      </div>
    </section>
  </>
)

export default function StudentPage() {
  return (
    <SolutionPage
      path={routes.student}
      title="Student Accommodation Management Software"
      eyebrow="Student Accommodation Software"
      heading="Student Accommodation Management Software for Operators"
      text="Handle room and bed allocation, resident records, occupancy and rent tracking, and keep everyday operations organised right through the accommodation year."
      supporting="For independent and mid-market student accommodation operators, not universities or enterprise PBSA."
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
      outcomesHeading="Made for the rhythm of the academic year"
      outcomes={[
        {
          icon: Files,
          title: 'Handle move-in and move-out',
          description: 'Keep allocations, resident files and payment activity in one system as students move in and out.',
        },
        {
          icon: Eye,
          title: 'Track beds through the year',
          description: 'See which rooms and beds are available and keep allocations current through the accommodation cycle.',
        },
        {
          icon: CreditCard,
          title: 'Follow rent across the year',
          description: 'Follow upcoming, paid and overdue amounts without rebuilding occupancy lists in spreadsheets.',
        },
        {
          icon: ClipboardList,
          title: 'Keep site records together',
          description: 'Record maintenance, shared costs and site-level reports next to the resident and room records you already use.',
        },
      ]}
      sections={sections}
      faqs={[
        {
          question: 'What type of student accommodation teams can use PulseHub?',
          answer:
            'PulseHub is for teams that manage room-based student accommodation and need a single place for rooms, residents, occupancy, payments and daily property tasks. It is operational software, not a student-finance or university admissions system.',
        },
        {
          question: 'Can I manage multiple properties?',
          answer:
            'Yes. Plans are based on property allowance: Basic includes 1 property, Standard up to 3, and Business up to 10. Review pricing, or contact us if you operate a larger portfolio.',
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
          question: 'Does PulseHub handle termly or term-based rent?',
          answer:
            'PulseHub bills on a monthly cycle rather than by academic term. You can pro-rate a mid-month move-in, record part-payments, carry a balance forward and hold a deposit on each resident, but it does not generate term-based rent schedules or manage guarantors.',
        },
        {
          question: 'Does PulseHub integrate with university systems?',
          answer:
            'No. PulseHub has no university, student-finance or admissions integrations. It is operational software for the building itself: rooms, residents, occupancy, payments, maintenance and reporting.',
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
      relatedGuide={{
        href: '/blog/student-accommodation-management',
        label: 'Student Accommodation Management: A Complete Guide for UK Operators',
      }}
    />
  )
}
