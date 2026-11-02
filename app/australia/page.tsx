import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import { DollarMarketPage, marketJsonLd, type DollarMarketContent } from '@/components/dollar-market-page'
import { routes } from '@/lib/navigation'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'

const PATH = routes.australia
const NAME = 'Rooming House & Co-Living Management Software for Australia'

export const metadata = pageMetadata({
  title: 'Rooming House & Co-Living Management Software (Australia)',
  languages: marketHreflang,
  description:
    'Rooming house, co-living and share house management software for Australia: rent by the room and bed, split utilities, deposits and every property, in one platform.',
  path: PATH,
})

const content: DollarMarketContent = {
  country: 'Australia',
  path: PATH,
  eyebrow: 'Rooming house & co-living · Australia',
  heading: 'Rooming House and Co-Living Management Software for Australia',
  heroText:
    'PulseHub is property management software for Australian operators who rent by the room and the bed: rooming houses, share houses, student accommodation and co-living. Manage residents, rent, deposits, utilities and every property from one platform.',
  useCasesHeading: 'Built for renting by the room, not the whole lease',
  useCases: [
    { icon: Home, title: 'Rooming houses', description: 'Per-room rent, bed-level occupancy and resident records for rooming house operators, including the regulated markets of Victoria and Queensland.', href: routes.sharedHousing },
    { icon: GraduationCap, title: 'Student accommodation', description: 'Student housing and off-campus rooms managed through the whole leasing cycle.', href: routes.student },
    { icon: Building2, title: 'Co-living & share houses', description: 'Share houses and co-living with private rooms, shared spaces and per-room rent.', href: routes.coliving },
    { icon: BedDouble, title: 'Boarding houses', description: 'Boarding houses and shared homes with deposits, utilities and a bed-level view.', href: routes.sharedHousing },
  ],
  faqs: [
    {
      question: 'What kinds of Australian accommodation does PulseHub suit?',
      answer:
        'Operations that rent by the room or the bed: rooming houses, share houses, boarding houses, student accommodation and co-living. It manages each property at the room and bed level, with a separate record and bill for every resident.',
    },
    {
      question: 'Is it suitable for rooming houses in Victoria and Queensland?',
      answer:
        'Yes. PulseHub manages per-room rent, bed-level occupancy, deposits and resident records, and keeps a full history for each room and resident. It is operational software, not legal advice, so check your obligations under the rooming house rules in your state.',
    },
    {
      question: 'Can it split utilities between residents?',
      answer:
        'Yes. PulseHub meters electricity and splits the usage between residents by their move-in dates, and you can add recurring charges such as water and gas, so each resident gets one bill covering their share.',
    },
    {
      question: 'Can I manage more than one property?',
      answer:
        'Yes. Run every property from one account, switch between them, move a resident or a room between properties, and use the All Properties view to compare occupancy, collections and outstanding balances.',
    },
    {
      question: 'Is pricing in Australian dollars?',
      answer:
        'Your PulseHub subscription is billed in USD, with a 14-day free trial and no card required. Inside the app you bill your own residents in your local currency.',
    },
    {
      question: 'Can I try it before subscribing?',
      answer: 'Yes. Start a 14-day free trial with no card required, or book a demo first.',
    },
  ],
  pricingHeading: 'Australia pricing',
  ctaHeading: 'Run your Australian rooming houses and share houses from one platform.',
  ctaText:
    'Start a 14-day free trial with no card required, or book a demo to see PulseHub with your rooms and residents in mind.',
}

export default function AustraliaPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(marketJsonLd(NAME, PATH, content.faqs)) }} />
      <DollarMarketPage content={content} />
    </SiteShell>
  )
}
