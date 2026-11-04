import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import { DollarMarketPage, marketJsonLd, type DollarMarketContent } from '@/components/dollar-market-page'
import { routes } from '@/lib/navigation'
import { uaeScreenshots } from '@/lib/screenshots'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'

const PATH = routes.uae
const NAME = 'Co-Living & Bedspace Management Software for the UAE'

export const metadata = pageMetadata({
  title: 'Co-Living & Bedspace Management Software (UAE)',
  languages: marketHreflang,
  description:
    'Co-living, bedspace and staff accommodation software for the UAE: rent by the room and bed, split electricity, deposits and every property, in one platform.',
  path: PATH,
})

const content: DollarMarketContent = {
  country: 'UAE',
  path: PATH,
  eyebrow: 'Co-living & bedspace · UAE',
  heading: 'Co-Living and Bedspace Management Software for the UAE',
  heroText:
    'PulseHub is property management software for UAE operators who rent by the room and the bed: co-living, bed spaces, room rentals and staff accommodation. Manage residents, rent, deposits, utilities and every property from one platform.',
  useCasesHeading: 'Built for renting by the room and the bed',
  useCases: [
    { icon: Building2, title: 'Co-living operators', description: 'Private rooms and shared spaces in Dubai and across the UAE, with per-room rent.', href: routes.coliving },
    { icon: Home, title: 'Bed space & room rentals', description: 'Bed spaces and partition rooms with per-bed rent, deposits and true occupancy.', href: routes.sharedHousing },
    { icon: BedDouble, title: 'Staff & labour accommodation', description: 'Bed-level occupancy and per-bed billing for staff and labour accommodation.', href: '/blog/worker-accommodation-management-software' },
    { icon: GraduationCap, title: 'Student accommodation', description: 'Student housing and hostels managed through the leasing cycle.', href: routes.student },
  ],
  faqs: [
    {
      question: 'What kinds of UAE accommodation does PulseHub suit?',
      answer:
        'Operations that rent by the room or the bed: co-living, bed spaces and partition rooms, room rentals, staff and labour accommodation, and student hostels. It manages each property at the room and bed level, with a separate record and bill for every resident.',
    },
    {
      question: 'Is it a PMS for co-living and bedspace operators?',
      answer:
        'Yes. PulseHub is a property management system built for operators who rent by the room and the bed, with bed-level occupancy, per-resident billing, deposits and a view across every property.',
    },
    {
      question: 'Can it manage staff and labour accommodation?',
      answer:
        'Yes, at the operational level: bed-level occupancy, resident records and per-bed billing, and you can bill the worker or the employer. It does not include a given emirate’s labour-accommodation licensing or standards, so handle those through the relevant authority. This is general information, not legal advice.',
    },
    {
      question: 'Can it bill electricity and utilities per resident?',
      answer:
        'Yes. PulseHub meters electricity and splits it between residents by their move-in dates, and adds recurring charges such as water and gas, so each resident gets one bill covering their share.',
    },
    {
      question: 'Is pricing in dirhams?',
      answer:
        'Your PulseHub subscription is billed in USD, with a 14-day free trial and no card required. Inside the app you bill your own residents in dirhams.',
    },
    {
      question: 'Can I try it before subscribing?',
      answer: 'Yes. Start a 14-day free trial with no card required, or book a demo first.',
    },
  ],
  pricingHeading: 'UAE pricing',
  ctaHeading: 'Run your UAE co-living and bedspace accommodation from one platform.',
  ctaText:
    'Start a 14-day free trial with no card required, or book a demo to see PulseHub with your rooms and residents in mind.',
  screenshots: uaeScreenshots,
}

export default function UaePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(marketJsonLd(NAME, PATH, content.faqs)) }} />
      <DollarMarketPage content={content} />
    </SiteShell>
  )
}
