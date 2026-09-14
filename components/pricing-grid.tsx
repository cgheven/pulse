'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'
import {
  ANNUAL_MONTHS_SAVED,
  ANNUAL_NOTE,
  annualSaving,
  formatGbp,
  MONTHS_INCLUDED_ANNUALLY,
  MONTHS_PAID_ANNUALLY,
  pricingPlans,
  propertyLabel,
} from '@/lib/pricing'

export default function PricingGrid({ heading, subtitle }: { heading: string; subtitle: string }) {
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly')
  const isAnnual = cycle === 'yearly'

  return (
    <section id="pricing" className="scroll-mt-20 bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{heading}</h2>
          <p className="text-base text-foreground/70 sm:text-lg">{subtitle}</p>
        </div>

        <div className="mb-8 flex w-full flex-col items-center gap-3">
          <div
            className="grid w-full max-w-md grid-cols-2 rounded-full border border-border bg-card p-1"
            role="group"
            aria-label="Billing cycle"
          >
            <button
              type="button"
              aria-pressed={cycle === 'monthly'}
              onClick={() => setCycle('monthly')}
              className={`min-h-11 rounded-full px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                cycle === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-foreground/65 hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={isAnnual}
              onClick={() => setCycle('yearly')}
              className={`min-h-11 rounded-full px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isAnnual ? 'bg-primary text-primary-foreground' : 'text-foreground/65 hover:text-foreground'
              }`}
            >
              Annual
            </button>
          </div>
          <p className="max-w-md text-center text-sm text-foreground/65 sm:text-base" aria-live="polite">
            {isAnnual
              ? `Pay for ${MONTHS_PAID_ANNUALLY} months, get ${MONTHS_INCLUDED_ANNUALLY}. Save the equivalent of ${ANNUAL_MONTHS_SAVED} months.`
              : `Switch to annual to pay for ${MONTHS_PAID_ANNUALLY} months and get ${MONTHS_INCLUDED_ANNUALLY}.`}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.yearly : plan.monthly
            const saving = annualSaving(plan.monthly)
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl bg-card ${
                  plan.highlight ? 'border-2 border-primary shadow-lg shadow-primary/15' : 'border border-border'
                }`}
              >
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p
                    className={`mb-3 text-sm font-semibold ${plan.highlight ? 'text-primary' : 'invisible max-lg:hidden'}`}
                    aria-hidden={!plan.highlight}
                  >
                    Most popular
                  </p>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-2 min-h-12 text-base text-foreground/60">{plan.description}</p>
                  <p className="mt-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {propertyLabel(plan.properties)}
                  </p>
                  <div className="my-6">
                    <div className="text-4xl font-bold tabular-nums">{formatGbp(price)}</div>
                    <p className="mt-1 text-sm text-foreground/60">
                      {isAnnual ? 'per year, billed annually' : 'per month'}
                    </p>
                    <p className="mt-1 min-h-10 text-sm text-foreground/55">
                      {isAnnual
                        ? `Save ${formatGbp(saving)} — ${ANNUAL_MONTHS_SAVED} months included free.`
                        : '\u00a0'}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    variant={plan.highlight ? 'default' : 'outline'}
                    className={`mb-6 min-h-11 w-full whitespace-normal ${
                      plan.highlight ? 'bg-primary hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary/10'
                    }`}
                    nativeButton={false}
                    render={<a href={SIGN_UP_URL} />}
                  >
                    Start Free Trial
                  </Button>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-base text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3 text-center text-sm text-foreground/60 sm:text-base">
          <p>
            Every plan includes the PulseHub accommodation management platform. Plans are differentiated by property
            allowance — 1, 3 or 10 properties — not by removing core product capabilities.
          </p>
          <p>
            If your portfolio grows, move to the next property-capacity plan rather than starting a separate subscription
            for each additional property. {ANNUAL_NOTE}
          </p>
          <p>
            Need more than 10 properties or a different setup?{' '}
            <a href={routes.contact} className="font-medium text-primary hover:underline">
              Contact us to discuss your requirements.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
