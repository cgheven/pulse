import { CtaBand } from '@/components/cta-band'
import { routes } from '@/lib/navigation'

export default function Cta() {
  return (
    <CtaBand
      heading="Start Managing Your Properties More Easily"
      text="Open a 14-day free trial, or book a demonstration if you would like to see PulseHub with your properties in mind."
      secondaryHref={routes.contact}
      secondaryLabel="Book a Demo"
    />
  )
}
