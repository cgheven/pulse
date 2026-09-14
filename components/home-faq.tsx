import { FaqList } from '@/components/faq-list'
import { SectionHeading } from '@/components/card-grid'

export const homeFaqs = [
  {
    question: 'What type of accommodation businesses can use PulseHub?',
    answer:
      'PulseHub is designed for HMOs, co-living spaces, student accommodation providers, shared accommodation businesses and other room-based accommodation operators.',
  },
  {
    question: 'Can I manage more than one property?',
    answer:
      'PulseHub supports multi-property management where enabled by your plan. Review the plan details or contact us to discuss your portfolio.',
  },
  {
    question: 'Can I track rent and payments?',
    answer:
      'PulseHub helps operators manage rent schedules, payment records, outstanding balances and payment history, based on the functionality available in their account.',
  },
  {
    question: 'Can I manage rooms and occupancy?',
    answer:
      'PulseHub provides room-level management for organising properties, rooms, beds, availability and resident allocations where supported.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. You can start a 14-day free trial with no card required. Open an account from the Start Free Trial button.',
  },
  {
    question: 'Can I book a product demonstration?',
    answer:
      'Yes. Visitors can contact the PulseHub team to discuss their requirements or request a demonstration.',
  },
]

export default function HomeFaq() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading heading="Frequently asked questions" subtitle="Practical answers for accommodation operators evaluating PulseHub." />
        <FaqList items={homeFaqs} />
      </div>
    </section>
  )
}
