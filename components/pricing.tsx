'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

function waLink(message: string) {
  return `https://wa.me/923336673553?text=${encodeURIComponent(message)}`
}

type Cycle = 'monthly' | 'yearly'

const plans = [
  {
    name: 'Basic',
    description: 'Complete hostel management software',
    monthly: { price: 'Rs 6,000', note: '+ one-time onboarding fee' },
    yearly: { price: 'Rs 60,000', note: '2 months free · no onboarding fee' },
    features: [
      'RedFlag alerts to identify defaulters',
      'Multi-branch support',
      'Manager accounts per branch',
      'Mini website',
      'Reconciliation to prevent fraud',
      'AC bill splitting',
      'Bike parking management',
      'Tenant feedback on checkout',
      'Complaint portal',
    ],
    highlight: false,
  },
  {
    name: 'Premium',
    description: 'Everything in Basic, plus WhatsApp automation and a branded website',
    monthly: { price: 'Rs 10,000', note: 'no onboarding fee' },
    yearly: { price: 'Rs 100,000', note: '2 months free · no onboarding fee' },
    features: [
      'Everything in Basic',
      'Your own branded website',
      'WhatsApp rent & bill automation',
    ],
    highlight: true,
  },
]

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>('monthly')

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Priced per branch. Pick the package that fits your hostel.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center rounded-full border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setCycle('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                cycle === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/60'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setCycle('yearly')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                cycle === 'yearly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/60'
              }`}
            >
              Yearly
              <span
                className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                  cycle === 'yearly'
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                2 months free
              </span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => {
            const priceInfo = plan[cycle]
            const whatsappUrl = waLink(
              `Hi! I'm interested in the ${plan.name} package (${priceInfo.price}/branch, ${cycle}) for Pulse HMS. Can you share more details?`
            )

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 ${
                  plan.highlight
                    ? 'sm:scale-105 border-2 border-primary shadow-lg shadow-primary/20 bg-card'
                    : 'border border-border bg-card hover:border-primary/50'
                }`}
              >
                {plan.highlight && (
                  <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-semibold rounded-t-2xl">
                    RECOMMENDED
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-foreground/60 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="text-4xl font-bold">{priceInfo.price}</div>
                    <p className="text-foreground/60 text-sm mt-1">
                      per branch / {cycle === 'monthly' ? 'month' : 'year'}
                    </p>
                    <p className="text-foreground/50 text-xs mt-1">{priceInfo.note}</p>
                  </div>

                  <Button
                    size="lg"
                    className={`w-full mb-6 ${
                      plan.highlight
                        ? 'bg-primary hover:bg-primary/90'
                        : 'border border-primary text-primary hover:bg-primary/10 bg-transparent'
                    }`}
                    variant={plan.highlight ? 'default' : 'outline'}
                    nativeButton={false}
                    render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-2.5">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground/60 mb-4">
            Have questions? We&apos;re here to help.
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            nativeButton={false}
            render={
              <a
                href={waLink("Hi! I have a question about Pulse HMS pricing.")}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
