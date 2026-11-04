import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import { DollarMarketPage, marketJsonLd, type DollarMarketContent } from '@/components/dollar-market-page'
import { routes } from '@/lib/navigation'
import { malaysiaScreenshots } from '@/lib/screenshots'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'

const PATH = routes.malaysia
const NAME = 'Room Rental & Co-Living Management Software for Malaysia'

export const metadata = pageMetadata({
  title: 'Room Rental & Co-Living Management Software (Malaysia)',
  languages: marketHreflang,
  description:
    'Room rental, co-living and student accommodation software for Malaysia: rent by the room and bed, split utilities, deposits and every property, in one platform.',
  path: PATH,
})

const content: DollarMarketContent = {
  country: 'Malaysia',
  path: PATH,
  eyebrow: 'Room rental & co-living · Malaysia',
  heading: 'Room Rental and Co-Living Management Software for Malaysia',
  heroText:
    'PulseHub is property management software for Malaysian operators who rent by the room and the bed: room rentals, co-living, student accommodation and worker dormitories. Manage residents, rent, deposits, utilities and every property from one platform.',
  useCasesHeading: 'Built for renting by the room, not the whole unit',
  useCases: [
    { icon: Home, title: 'Room rentals', description: 'Bilik sewa and shared homes with per-room rent, deposits and bed-level occupancy.', href: routes.sharedHousing },
    { icon: Building2, title: 'Co-living', description: 'Co-living with private rooms, shared spaces and per-room rent.', href: routes.coliving },
    { icon: GraduationCap, title: 'Student accommodation', description: 'Student houses and hostels managed through the leasing cycle.', href: routes.student },
    { icon: BedDouble, title: 'Worker dormitories & hostels', description: 'Bed-level occupancy and per-bed billing for worker dormitories and hostels.', href: routes.sharedHousing },
  ],
  faqs: [
    {
      question: 'What kinds of Malaysian accommodation does PulseHub suit?',
      answer:
        'Operations that rent by the room or the bed: room rentals (bilik sewa), co-living, student accommodation, hostels and worker dormitories. It manages each property at the room and bed level, with a separate record and bill for every resident.',
    },
    {
      question: 'Is it a PMS for co-living and room-rental operators?',
      answer:
        'Yes. PulseHub is a property management system built for operators who rent by the room and the bed, with bed-level occupancy, per-resident billing, deposits and a view across every property.',
    },
    {
      question: 'Can it manage worker dormitories?',
      answer:
        'Yes, at the operational level: bed-level occupancy, resident records and per-bed billing. It does not include Malaysia’s worker-housing certification or reporting, for example under the Employees’ Minimum Standards of Housing and Amenities Act, so handle those through the relevant authority.',
    },
    {
      question: 'Can it bill utilities and rent per resident?',
      answer:
        'Yes. PulseHub meters electricity and splits it between residents by their move-in dates, and adds recurring charges such as water and gas, so each resident gets one bill covering their share.',
    },
    {
      question: 'Is pricing in Malaysian ringgit?',
      answer:
        'Your PulseHub subscription is billed in USD, with a 14-day free trial and no card required. Inside the app you bill your own residents in ringgit.',
    },
    {
      question: 'Can I try it before subscribing?',
      answer: 'Yes. Start a 14-day free trial with no card required, or book a demo first.',
    },
  ],
  pricingHeading: 'Malaysia pricing',
  ctaHeading: 'Run your Malaysian room rentals and co-living from one platform.',
  ctaText:
    'Start a 14-day free trial with no card required, or book a demo to see PulseHub with your rooms and residents in mind.',
  screenshots: malaysiaScreenshots,
}

export default function MalaysiaPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(marketJsonLd(NAME, PATH, content.faqs)) }} />
      <DollarMarketPage content={content} />
    </SiteShell>
  )
}
