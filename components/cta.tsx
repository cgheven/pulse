import { CtaBand } from '@/components/cta-band'
import { routes } from '@/lib/navigation'

export default function Cta() {
  return (
    <CtaBand
      heading="Start Managing Your Properties More Easily"
      text="14-day free trial, no card — or book a demonstration for your properties."
      secondaryHref={routes.contact}
      secondaryLabel="Book a Demo"
    />
  )
}
