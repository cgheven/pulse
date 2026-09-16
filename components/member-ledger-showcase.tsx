import { ProductVideo } from '@/components/product-video'

const timeline = ['Admissions', 'Room changes', 'Charges', 'Payments', 'Deposits', 'Complaints']

export default function MemberLedgerShowcase() {
  return (
    <section id="member-timeline" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="reveal mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="min-w-0 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">02 · The difference</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.06] tracking-tight">
            Everything about a resident, in one record.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The member timeline is the one thing a rent tracker or lettings CRM doesn’t have: a complete
            history for each resident. Rent collection stays on the Payments screen; the timeline is their
            full history.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-sm">
            {timeline.map((item) => (
              <li key={item} className="flex items-center gap-2.5 border-b border-border pb-2 font-mono text-sm text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <ProductVideo
            src="/videos/member-ledger.mp4"
            width={2026}
            height={1080}
            label="Resident · member timeline"
            ariaLabel="PulseHub member timeline showing admissions, room changes, charges, payments, deposits, complaints and other member records"
          />
          <p className="sr-only">
            A short product recording of the PulseHub member timeline. It shows a complete record of member
            activity, including admissions, room changes, charges, payments, deposits and complaints, looping
            silently without playback controls.
          </p>
        </div>
      </div>
    </section>
  )
}
