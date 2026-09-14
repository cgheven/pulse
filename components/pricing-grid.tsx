'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'
import {
  ANNUAL_MONTHS_SAVED,
  annualSaving,
  corePlanFeatures,
  formatGbp,
  MONTHS_INCLUDED_ANNUALLY,
  MONTHS_PAID_ANNUALLY,
  pricingPlans,
  propertyLabel,
} from '@/lib/pricing'

export default function PricingGrid({ heading, subtitle }: { heading?: string; subtitle: string }) {
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly')
  const isAnnual = cycle === 'yearly'

  return (
    <section id="pricing" className="scroll-mt-20 bg-muted/30 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-6 max-w-3xl space-y-3 text-center sm:mb-8 sm:space-y-4">
          {heading ? <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{heading}</h2> : null}
          <p className="text-base text-foreground/70 sm:text-lg">{subtitle}</p>
        </div>

        <div className="mb-6 flex w-full flex-col items-center gap-2 sm:mb-8 sm:gap-3">
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
              ? `Pay for ${MONTHS_PAID_ANNUALLY} months, get ${MONTHS_INCLUDED_ANNUALLY}. Save ${ANNUAL_MONTHS_SAVED} months.`
              : `Annual billing: pay ${MONTHS_PAID_ANNUALLY} months, get ${MONTHS_INCLUDED_ANNUALLY}.`}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-4 sm:gap-5 lg:grid-cols-3">
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
                <div className="flex flex-1 flex-col p-5 sm:p-8">
                  {plan.highlight ? <p className="mb-2 text-sm font-semibold text-primary">Most popular</p> : null}
                  <h3 className="text-xl font-bold sm:text-2xl">{plan.name}</h3>
                  <p className="mt-1 text-sm text-foreground/60 sm:mt-2 sm:text-base">{plan.description}</p>
                  <p className="mt-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {propertyLabel(plan.properties)}
                  </p>
                  <div className="my-5 sm:my-6">
                    <div className="text-3xl font-bold tabular-nums sm:text-4xl">{formatGbp(price)}</div>
                    <p className="mt-1 text-sm text-foreground/60">
                      {isAnnual ? 'per year, billed annually' : 'per month'}
                    </p>
                    {isAnnual ? (
                      <p className="mt-1 text-sm text-foreground/55">
                        Save {formatGbp(saving)} — {ANNUAL_MONTHS_SAVED} months included free.
                      </p>
                    ) : null}
                  </div>
                  <Button
                    size="lg"
                    variant={plan.highlight ? 'default' : 'outline'}
                    className={`min-h-11 w-full whitespace-normal ${
                      plan.highlight ? 'bg-primary hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary/10'
                    }`}
                    nativeButton={false}
                    render={<a href={SIGN_UP_URL} />}
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <h3 className="text-center text-base font-semibold sm:text-lg">Every plan includes</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {corePlanFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80 sm:text-base">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center text-sm text-foreground/60 sm:text-base">
            <p>
              Need more than 10 properties?{' '}
              <a href={routes.contact} className="font-medium text-primary hover:underline">
                Contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
