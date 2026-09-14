'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'
import { ANNUAL_NOTE, formatGbp, pricingPlans } from '@/lib/pricing'

export default function PricingGrid({ heading, subtitle }: { heading: string; subtitle: string }) {
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section id="pricing" className="scroll-mt-20 bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{heading}</h2>
          <p className="text-lg text-foreground/70 sm:text-xl">{subtitle}</p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="inline-flex max-w-full items-center rounded-full border border-border bg-card p-1" role="group" aria-label="Billing cycle">
            <button
              type="button"
              aria-pressed={cycle === 'monthly'}
              onClick={() => setCycle('monthly')}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold ${cycle === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-foreground/60'}`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={cycle === 'yearly'}
              onClick={() => setCycle('yearly')}
              className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold sm:px-5 ${cycle === 'yearly' ? 'bg-primary text-primary-foreground' : 'text-foreground/60'}`}
            >
              Annual
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${cycle === 'yearly' ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary'}`}>
                2 months free
              </span>
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price = cycle === 'monthly' ? plan.monthly : plan.yearly
            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl bg-card ${plan.highlight ? 'border-2 border-primary shadow-lg shadow-primary/20' : 'border border-border'}`}
              >
                {plan.highlight ? (
                  <div className="rounded-t-2xl bg-primary py-2 text-center text-sm font-semibold text-primary-foreground">
                    Most popular
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-foreground/60">{plan.description}</p>
                  <div className="my-6">
                    <div className="text-4xl font-bold">{formatGbp(price)}</div>
                    <p className="mt-1 text-sm text-foreground/60">
                      per {cycle === 'monthly' ? 'month' : 'year'} · {plan.properties} {plan.properties === 1 ? 'property' : 'properties'}
                    </p>
                    {cycle === 'yearly' ? <p className="mt-1 text-xs text-foreground/50">{ANNUAL_NOTE}</p> : null}
                  </div>
                  <Button
                    size="lg"
                    variant={plan.highlight ? 'default' : 'outline'}
                    className={`mb-6 min-h-11 w-full ${plan.highlight ? 'bg-primary hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary/10'}`}
                    nativeButton={false}
                    render={<a href={SIGN_UP_URL} />}
                  >
                    Start Free Trial
                  </Button>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
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

        <p className="mt-12 text-center text-sm text-foreground/60">
          Need a different setup?{' '}
          <a href={routes.contact} className="font-medium text-primary hover:underline">
            Contact us to discuss your requirements.
          </a>
        </p>
      </div>
    </section>
  )
}
