import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import { DollarMarketPage, marketJsonLd, type DollarMarketContent } from '@/components/dollar-market-page'
import { routes } from '@/lib/navigation'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'

const PATH = routes.singapore
const NAME = 'Co-Living & Room Rental Management Software for Singapore'

export const metadata = pageMetadata({
  title: 'Co-Living & Room Rental Management Software (Singapore)',
  languages: marketHreflang,
  description:
    'Co-living, student hostel and room rental management software for Singapore: rent by the room and bed, split utilities, deposits and every property, in one platform.',
  path: PATH,
})

const content: DollarMarketContent = {
  country: 'Singapore',
  path: PATH,
  eyebrow: 'Co-living & room rental · Singapore',
  heading: 'Co-Living and Room Rental Management Software for Singapore',
  heroText:
    'PulseHub is property management software for Singapore operators who rent by the room and the bed: co-living, room rentals, student hostels and worker dormitories. Manage residents, rent, deposits, utilities and every property from one platform.',
  useCasesHeading: 'A PMS for operators who rent by the room',
  useCases: [
    { icon: Building2, title: 'Co-living operators', description: 'Premium co-living with private rooms, shared spaces and per-room rent.', href: routes.coliving },
    { icon: Home, title: 'Room rentals', description: 'HDB and condo room rentals with per-room rent, deposits and bed-level occupancy.', href: routes.sharedHousing },
    { icon: GraduationCap, title: 'Student hostels', description: 'Student hostels and accommodation managed through the leasing cycle.', href: routes.student },
    { icon: BedDouble, title: 'Worker dormitories & hostels', description: 'Bed-level occupancy and per-bed billing for worker dormitories and hostels.', href: routes.sharedHousing },
  ],
  faqs: [
    {
      question: 'What kinds of Singapore accommodation does PulseHub suit?',
      answer:
        'Operations that rent by the room or the bed: co-living, room rentals, student hostels and worker dormitories. It manages each property at the room and bed level, with a separate record and bill for every resident.',
    },
    {
      question: 'Is it a PMS for co-living operators?',
      answer:
        'Yes. PulseHub is a property management system built for co-living and room-rental operators, with bed-level occupancy, per-resident billing, deposits and a view across every property.',
    },
    {
      question: 'Can it manage worker dormitories?',
      answer:
        'Yes, at the operational level: bed-level occupancy, resident records and per-bed billing. It does not include Singapore dormitory-licensing or regulatory reporting, so handle those through the relevant authority.',
    },
    {
      question: 'Does it keep a resident timeline and track rent?',
      answer:
        'Yes. Every resident has a timeline of their stay with rent and charges, part-payments, the deposit held, notices and move-out, and you can track rent and arrears per resident and across the portfolio.',
    },
    {
      question: 'Is pricing in Singapore dollars?',
      answer:
        'Your PulseHub subscription is billed in USD, with a 14-day free trial and no card required. Inside the app you bill your own residents in your local currency.',
    },
    {
      question: 'Can I try it before subscribing?',
      answer: 'Yes. Start a 14-day free trial with no card required, or book a demo first.',
    },
  ],
  pricingHeading: 'Singapore pricing',
  ctaHeading: 'Run your Singapore co-living and room rentals from one platform.',
  ctaText:
    'Start a 14-day free trial with no card required, or book a demo to see PulseHub with your rooms and residents in mind.',
}

export default function SingaporePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(marketJsonLd(NAME, PATH, content.faqs)) }} />
      <DollarMarketPage content={content} />
    </SiteShell>
  )
}
