import { CtaBand } from '@/components/cta-band'
import { routes } from '@/lib/navigation'

export default function Cta() {
  return (
    <CtaBand
      heading="Take Control of Your Accommodation Operations"
      text="Bring properties, residents, rent, occupancy and daily operations into one connected platform."
      secondaryHref={routes.contact}
      secondaryLabel="Book a Demo"
    />
  )
}
