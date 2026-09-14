import { FeatureShowcase } from '@/components/feature-showcase'
import { screenshots } from '@/lib/screenshots'

export default function ResidentsShowcase() {
  return (
    <FeatureShowcase
      id="residents"
      reverse
      heading="Manage Residents From Application to Check-Out"
      text="Keep resident records, applications, deposits, notices, and occupancy details organised in one place."
      points={[
        'Resident profiles',
        'Applications and waiting lists',
        'Deposit tracking',
        'Notice and check-out management',
        'Searchable resident records',
      ]}
      src={screenshots.residents.src}
      alt={screenshots.residents.alt}
      width={screenshots.residents.width}
      height={screenshots.residents.height}
    />
  )
}
