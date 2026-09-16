import { FaqList } from '@/components/faq-list'
import { SectionHeading } from '@/components/card-grid'

export const homeFaqs = [
  {
    question: 'What type of accommodation businesses can use PulseHub?',
    answer:
      'HMOs, student accommodation, co-living, hostels, shared accommodation and other room-based operators who manage occupancy, residents, rent and property tasks.',
  },
  {
    question: 'Is PulseHub one platform or separate products for each use case?',
    answer:
      'One platform. HMO, student, co-living and hostel operators all use the same PulseHub — rooms, residents, rent and reporting — shaped around their kind of accommodation, not separate software products.',
  },
  {
    question: 'Can I manage multiple properties?',
    answer:
      'Yes. Basic includes 1 property, Standard 3, and Business 10. Switch site from the header, or open All Properties to compare the portfolio. If you add properties, move to the next plan.',
  },
  {
    question: 'What is the member timeline?',
    answer:
      'A complete history for each resident — admissions, room changes, charges, payments, deposits and complaints in one record. Rent collection lives on the Payments screen; the timeline is the person’s story.',
  },
  {
    question: 'Is a free trial available?',
    answer:
      'Yes — a 14-day free trial with no card required, from the Start Free Trial button. You can also book a demo to see PulseHub with your properties in mind.',
  },
]

export default function HomeFaq() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading heading="Frequently asked questions" />
        <FaqList items={homeFaqs} />
      </div>
    </section>
  )
}
