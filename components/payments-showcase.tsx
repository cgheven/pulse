import { ProductScreenshot } from '@/components/feature-showcase'
import { screenshots } from '@/lib/screenshots'

export default function PaymentsShowcase() {
  return (
    <section id="payments" className="scroll-mt-20 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-5 max-w-3xl space-y-2 text-center sm:mb-8 sm:space-y-3">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Stay on Top of Rent and Payments</h2>
          <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
            Rent, utility charges and outstanding balances — separate from each member’s activity timeline.
          </p>
        </div>
        <ProductScreenshot
          src={screenshots.payments.src}
          alt={screenshots.payments.alt}
          width={screenshots.payments.width}
          height={screenshots.payments.height}
          sizes="(max-width: 1152px) calc(100vw - 2rem), 1152px"
        />
      </div>
    </section>
  )
}
