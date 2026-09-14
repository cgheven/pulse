import { FeatureShowcase } from '@/components/feature-showcase'
import { screenshots } from '@/lib/screenshots'

export default function ComplaintsShowcase() {
  return (
    <FeatureShowcase
      id="maintenance"
      compact
      reverse
      heading="Resolve Maintenance Issues Faster"
      text="Track resident complaints, maintenance requests, progress, and resolutions without losing visibility."
      points={[
        'Open, in-progress, and resolved issues',
        'Maintenance request tracking',
        'Resident issue history',
        'Resolution status',
        'QR-based complaint submission',
      ]}
      src={screenshots.complaints.src}
      alt={screenshots.complaints.alt}
      width={screenshots.complaints.width}
      height={screenshots.complaints.height}
    />
  )
}
