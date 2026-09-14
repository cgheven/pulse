import { Building2, GraduationCap, Home, Users } from 'lucide-react'
import { CardGrid, SectionHeading } from '@/components/card-grid'
import { routes } from '@/lib/navigation'

export default function Audience() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading heading="Built for Modern Accommodation Operators" />
        <CardGrid
          columns="four"
          items={[
            {
              icon: Home,
              title: 'HMO Operators',
              description: 'Manage rooms, residents, rent and property operations across your HMO portfolio.',
              href: routes.hmo,
            },
            {
              icon: Users,
              title: 'Co-Living Operators',
              description: 'Coordinate shared living spaces, occupancy, payments and resident operations from one platform.',
              href: routes.coliving,
            },
            {
              icon: GraduationCap,
              title: 'Student Accommodation Providers',
              description: 'Keep rooms, residents, payments and daily accommodation tasks organised.',
              href: routes.student,
            },
            {
              icon: Building2,
              title: 'Shared Accommodation Businesses',
              description: 'Bring property, occupancy, financial and resident information together in one place.',
              href: routes.features,
            },
          ]}
        />
      </div>
    </section>
  )
}
