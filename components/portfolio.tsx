import { Building2 } from 'lucide-react'
import { SectionHeading } from '@/components/card-grid'
import { routes } from '@/lib/navigation'

export default function Portfolio() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-4">
          <Building2 className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <SectionHeading
          heading="Manage Every Property From One Platform"
          subtitle="See occupancy, rent and operational activity across your accommodation portfolio without switching between spreadsheets or disconnected tools."
        />
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href={routes.pricing} className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline">
            View pricing
          </a>
          <a href={routes.features} className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline">
            Explore accommodation management features
          </a>
        </div>
      </div>
    </section>
  )
}
