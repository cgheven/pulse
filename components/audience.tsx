import { Building2, GraduationCap, Home, Users } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { routes } from '@/lib/navigation'

export default function Audience() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Who PulseHub Is For"
          subtitle="Room-based operators who need occupancy, residents, rent and property tasks in one place."
        />
        <CardGrid
          columns="four"
          items={[
            {
              icon: Home,
              title: 'HMO Operators',
              description: 'Licensed HMOs and shared houses.',
              href: routes.hmo,
            },
            {
              icon: Users,
              title: 'Co-Living Operators',
              description: 'Shared living sites and occupancy.',
              href: routes.coliving,
            },
            {
              icon: GraduationCap,
              title: 'Student Accommodation',
              description: 'Student houses and halls.',
              href: routes.student,
            },
            {
              icon: Building2,
              title: 'Shared Accommodation',
              description: 'Room-based sites outgrowing spreadsheets.',
              href: routes.features,
            },
          ]}
        />
      </div>
    </section>
  )
}
