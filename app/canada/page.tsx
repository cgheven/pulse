import { BedDouble, Building2, GraduationCap, Home } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import { DollarMarketPage, marketJsonLd, type DollarMarketContent } from '@/components/dollar-market-page'
import { routes } from '@/lib/navigation'
import { jsonLdScript, marketHreflang, pageMetadata } from '@/lib/seo'

const PATH = routes.canada
const NAME = 'Rooming House & Student Housing Management Software for Canada'

export const metadata = pageMetadata({
  title: 'Rooming House & Student Housing Management Software (Canada)',
  languages: marketHreflang,
  description:
    'Rooming house, student housing and shared accommodation software for Canada: rent by the room and bed, split utilities, deposits and every property, in one platform.',
  path: PATH,
})

const content: DollarMarketContent = {
  country: 'Canada',
  path: PATH,
  eyebrow: 'Rooming house & student housing · Canada',
  heading: 'Rooming House and Student Housing Management Software for Canada',
  heroText:
    'PulseHub is property management software for Canadian operators who rent by the room and the bed: rooming houses, off-campus student housing, shared accommodation and co-living. Manage residents, rent, deposits, utilities and every property from one platform.',
  useCasesHeading: 'Built for renting by the room, not the whole unit',
  useCases: [
    { icon: Home, title: 'Rooming houses', description: 'Per-room rent, bed-level occupancy and resident records for rooming house operators across Canada.', href: routes.sharedHousing },
    { icon: GraduationCap, title: 'Off-campus student housing', description: 'Off-campus houses and student rooms in Toronto, Vancouver and beyond, through the leasing cycle.', href: routes.student },
    { icon: Building2, title: 'Co-living & shared', description: 'Co-living and shared accommodation with private rooms, shared spaces and per-room rent.', href: routes.coliving },
    { icon: BedDouble, title: 'Multi-property student rentals', description: 'Several student houses on one platform, with a bed-level view of every room.', href: routes.sharedHousing },
  ],
  faqs: [
    {
      question: 'What kinds of Canadian accommodation does PulseHub suit?',
      answer:
        'Operations that rent by the room or the bed: rooming houses, off-campus student housing, shared accommodation and co-living. It manages each property at the room and bed level, with a separate record and bill for every resident.',
    },
    {
      question: 'Is it good for off-campus student housing?',
      answer:
        'Yes. Manage student houses and rooms in Toronto, Vancouver and beyond through the leasing cycle, with per-room rent, deposits and a waiting list for incoming students.',
    },
    {
      question: 'Can I run several student rental properties on one platform?',
      answer:
        'Yes. Run every property from one account, switch between them, and use the All Properties view to compare occupancy, collections and outstanding balances across your portfolio.',
    },
    {
      question: 'Can it track room rentals and split utilities?',
      answer:
        'Yes. Track per-room rent and payments, and meter electricity split between residents by their move-in dates, with recurring charges such as water and gas on the same bill.',
    },
    {
      question: 'Is pricing in Canadian dollars?',
      answer:
        'Your PulseHub subscription is billed in USD, with a 14-day free trial and no card required. Inside the app you bill your own residents in your local currency.',
    },
    {
      question: 'Can I try it before subscribing?',
      answer: 'Yes. Start a 14-day free trial with no card required, or book a demo first.',
    },
  ],
  pricingHeading: 'Canada pricing',
  ctaHeading: 'Run your Canadian rooming houses and student rentals from one platform.',
  ctaText:
    'Start a 14-day free trial with no card required, or book a demo to see PulseHub with your rooms and residents in mind.',
}

export default function CanadaPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(marketJsonLd(NAME, PATH, content.faqs)) }} />
      <DollarMarketPage content={content} />
    </SiteShell>
  )
}
