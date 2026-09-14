import { Check } from 'lucide-react'
import { ProductScreenshot } from '@/components/feature-showcase'
import { screenshots } from '@/lib/screenshots'

const points = [
  'Monthly rent collection',
  'Paid, pending and partial payments',
  'Utility and AC charges',
  'Payment reminders',
]

export default function PaymentsShowcase() {
  return (
    <section id="payments" className="scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-6 max-w-3xl space-y-3 text-center sm:mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Stay on Top of Rent and Payments</h2>
          <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
            Track rent, utility charges, outstanding balances and payment activity from one place — separate from each member’s full activity timeline.
          </p>
        </div>
        <ProductScreenshot
          src={screenshots.payments.src}
          alt={screenshots.payments.alt}
          width={screenshots.payments.width}
          height={screenshots.payments.height}
          sizes="(max-width: 1152px) calc(100vw - 2rem), 1152px"
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
