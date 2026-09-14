import { FaqList } from '@/components/faq-list'
import { SectionHeading } from '@/components/card-grid'

export const homeFaqs = [
  {
    question: 'What type of accommodation businesses can use PulseHub?',
    answer:
      'HMOs, co-living spaces, student accommodation, shared accommodation and other room-based operators.',
  },
  {
    question: 'Can I manage multiple properties?',
    answer:
      'Yes. Basic includes 1 property, Standard 3, and Business 10. Switch site from the header, or open All Properties to compare the portfolio. If you add properties, move to the next plan.',
  },
  {
    question: 'What is the member timeline?',
    answer:
      'A member’s history in PulseHub — admissions, room changes, charges, payments, deposits and complaints. Rent collection is on the Payments screen.',
  },
  {
    question: 'Can I track rent and overdue payments?',
    answer: 'Yes. PulseHub tracks rent schedules, payment records, outstanding balances, deposits and payment history.',
  },
  {
    question: 'Can I manage rooms and occupancy?',
    answer: 'Yes. You can organise properties, rooms, beds, availability and resident allocations.',
  },
  {
    question: 'Can I manage maintenance requests?',
    answer: 'Yes. Maintenance is included on every plan — record issues, assign follow-up and keep a history of the work.',
  },
  {
    question: 'Is a free trial available?',
    answer: 'Yes. A 14-day free trial with no card required, from the Start Free Trial button.',
  },
]

export default function HomeFaq() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading heading="Frequently Asked Questions" />
        <FaqList items={homeFaqs} />
      </div>
    </section>
  )
}
