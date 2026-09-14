'use client'

import { ProductVideo } from '@/components/product-video'
import { SectionHeading } from '@/components/card-grid'

export default function MemberLedgerShowcase() {
  return (
    <section id="member-timeline" className="scroll-mt-20 bg-muted/30 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          heading="See the Member Timeline in Action"
          subtitle="A member’s history in one place — admissions, room changes, charges, payments, deposits and complaints. This is the member record, not the rent-collection screen."
        />
        <ProductVideo
          src="/videos/member-ledger.mp4"
          width={2026}
          height={1080}
          ariaLabel="PulseHub member timeline showing admissions, room changes, charges, payments, deposits, complaints and other member records"
        />
        <p className="sr-only">
          A short product recording of the PulseHub member timeline. It shows a complete record of member activity, including admissions, room changes, charges, payments, deposits and complaints, looping silently without playback controls.
        </p>
      </div>
    </section>
  )
}
