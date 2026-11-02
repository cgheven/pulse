import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import { DollarMarketPage, marketJsonLd, type DollarMarketContent } from '@/components/dollar-market-page'
import { routes } from '@/lib/navigation'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'

const PATH = routes.newZealand
const NAME = 'Boarding House & Student Accommodation Software for New Zealand'

export const metadata = pageMetadata({
  title: 'Boarding House & Student Accommodation Software (New Zealand)',
  languages: marketHreflang,
  description:
    'Boarding house, flatting and student accommodation software for New Zealand: rent by the room and bed, split utilities, bonds and every property, in one platform.',
  path: PATH,
})

const content: DollarMarketContent = {
  country: 'New Zealand',
  path: PATH,
  eyebrow: 'Boarding house & student accommodation · New Zealand',
  heading: 'Boarding House and Student Accommodation Software for New Zealand',
  heroText:
    'PulseHub is property management software for New Zealand operators who rent by the room and the bed: boarding houses, flats, student accommodation and co-living. Manage residents, rent, bonds, utilities and every property from one platform.',
  useCasesHeading: 'Built for renting by the room, not the whole tenancy',
  useCases: [
    { icon: Home, title: 'Boarding houses', description: 'Per-room rent, bed-level occupancy and a tenancy timeline for boarding house operators.', href: routes.sharedHousing },
    { icon: BedDouble, title: 'Flatting & room rentals', description: 'Flats and room rentals with per-room rent, bonds and bed-level occupancy.', href: routes.sharedHousing },
    { icon: GraduationCap, title: 'Student accommodation', description: 'Student houses and rooms managed through the tenancy cycle.', href: routes.student },
    { icon: Building2, title: 'Co-living', description: 'Co-living with private rooms, shared spaces and per-room rent.', href: routes.coliving },
  ],
  faqs: [
    {
      question: 'What kinds of New Zealand accommodation does PulseHub suit?',
      answer:
        'Operations that rent by the room or the bed: boarding houses, flats, student accommodation and co-living. It manages each property at the room and bed level, with a separate record and bill for every resident.',
    },
    {
      question: 'Is it suitable for boarding houses?',
      answer:
        'Yes. PulseHub manages per-room rent, bed-level occupancy, bonds and resident records for boarding house operators, and keeps a tenancy timeline for each resident. It is operational software, not legal advice, so check your obligations under the Residential Tenancies Act.',
    },
    {
      question: 'Does it keep a tenancy timeline for each resident?',
      answer:
        'Yes. Every resident has a timeline of their stay: rent and charges, part-payments, the bond held, notices and move-out, all in one place.',
    },
    {
      question: 'Can it allocate rent and utilities per resident?',
      answer:
        'Yes. PulseHub meters electricity and splits it between residents by their move-in dates, and adds recurring charges such as water and gas, so each resident gets one bill covering their share.',
    },
    {
      question: 'Is pricing in New Zealand dollars?',
      answer:
        'Your PulseHub subscription is billed in USD, with a 14-day free trial and no card required. Inside the app you bill your own residents in your local currency.',
    },
    {
      question: 'Can I try it before subscribing?',
      answer: 'Yes. Start a 14-day free trial with no card required, or book a demo first.',
    },
  ],
  pricingHeading: 'New Zealand pricing',
  ctaHeading: 'Run your New Zealand boarding houses and flats from one platform.',
  ctaText:
    'Start a 14-day free trial with no card required, or book a demo to see PulseHub with your rooms and residents in mind.',
}

export default function NewZealandPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(marketJsonLd(NAME, PATH, content.faqs)) }} />
      <DollarMarketPage content={content} />
    </SiteShell>
  )
}
