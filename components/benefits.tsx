import { Eye, Layers, Link2, MousePointerClick, Files, SlidersHorizontal } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'

export default function Benefits() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Built to Make Accommodation Operations Easier"
          subtitle="Spend less time on administration and more time managing your properties."
        />
        <CardGrid
          items={[
            {
              icon: Files,
              title: 'Less Administration',
              description: 'Reduce spreadsheets, manual records and repetitive payment follow-ups.',
            },
            {
              icon: Eye,
              title: 'Better Visibility',
              description: 'See occupancy, upcoming payments, overdue balances and operational tasks at a glance.',
            },
            {
              icon: SlidersHorizontal,
              title: 'More Control',
              description: 'Manage properties, residents, staff and finances from one central platform.',
            },
            {
              icon: Layers,
              title: 'Designed for Growing Operators',
              description: 'Start with one property and expand as your accommodation portfolio grows.',
            },
            {
              icon: MousePointerClick,
              title: 'Simple to Use',
              description: 'A clean interface designed to help teams complete everyday tasks with fewer clicks.',
            },
            {
              icon: Link2,
              title: 'One Connected Platform',
              description: 'Bring resident management, occupancy, payments, maintenance and reporting together.',
            },
          ]}
        />
      </div>
    </section>
  )
}
