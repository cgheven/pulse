import { FaqList } from '@/components/faq-list'
import { SectionHeading } from '@/components/card-grid'

export const homeFaqs = [
  {
    question: 'What type of accommodation businesses can use PulseHub?',
    answer:
      'PulseHub is designed for HMOs, co-living spaces, student accommodation providers, shared accommodation businesses and other room-based accommodation operators.',
  },
  {
    question: 'Can I manage multiple properties?',
    answer:
      'Yes. Plans are based on property allowance: Basic includes 1 property, Standard includes 3, and Business includes 10. Use the property switcher to move between sites, or open All Properties for a portfolio view. If you add properties, move to the next plan rather than starting a separate subscription for each site. Contact us if you need a larger allowance.',
  },
  {
    question: 'What is the member timeline?',
    answer:
      'The member timeline is the record of a person’s history in PulseHub. It can include admissions, room changes, charges, payments, deposits, complaints and other activity in one place. Rent collection for the property is handled separately on the Payments screen.',
  },
  {
    question: 'Can I track rent and overdue payments?',
    answer:
      'Yes. PulseHub helps operators manage rent schedules, payment records, outstanding balances, deposits and payment history.',
  },
  {
    question: 'Can I manage rooms and occupancy?',
    answer:
      'Yes. PulseHub provides room-level management for organising properties, rooms, beds, availability and resident allocations.',
  },
  {
    question: 'Can I manage maintenance requests?',
    answer:
      'Yes. Maintenance management is part of the PulseHub platform on every plan. You can record issues, assign follow-up and keep a history of property-related work.',
  },
  {
    question: 'Is a free trial available?',
    answer:
      'Yes. You can start a 14-day free trial with no card required. Open an account from the Start Free Trial button.',
  },
  {
    question: 'Can I book a product demonstration?',
    answer:
      'Yes. Use Book a Demo on the contact page to email the PulseHub team and request a walkthrough.',
  },
]

export default function HomeFaq() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading heading="Frequently Asked Questions" subtitle="Practical answers for accommodation operators evaluating PulseHub." />
        <FaqList items={homeFaqs} />
      </div>
    </section>
  )
}
