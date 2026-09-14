import { Building2, GraduationCap, Home, Users } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { routes } from '@/lib/navigation'

export default function Audience() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Who PulseHub Is For"
          subtitle="PulseHub is built for room-based accommodation operators who need occupancy, residents, rent and property tasks in one place."
        />
        <CardGrid
          columns="four"
          items={[
            {
              icon: Home,
              title: 'HMO Operators',
              description: 'Room-level occupancy, residents and rent for licensed HMOs and shared houses.',
              href: routes.hmo,
            },
            {
              icon: Users,
              title: 'Co-Living Operators',
              description: 'Shared living sites that need occupancy, payments and resident operations in one place.',
              href: routes.coliving,
            },
            {
              icon: GraduationCap,
              title: 'Student Accommodation Providers',
              description: 'Student houses and halls with rooms, residents and payment records to keep organised.',
              href: routes.student,
            },
            {
              icon: Building2,
              title: 'Shared Accommodation Businesses',
              description: 'Room-based shared accommodation that outgrows spreadsheets and disconnected tools.',
              href: routes.features,
            },
          ]}
        />
      </div>
    </section>
  )
}
