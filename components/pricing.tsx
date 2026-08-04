'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

function waLink(message: string) {
  return `https://wa.me/923336673553?text=${encodeURIComponent(message)}`
}

const plans = [
  {
    name: 'Monthly',
    price: 'Rs 8,000',
    period: 'per branch / month',
    description: 'Billed monthly, cancel anytime',
    features: [
      'AC bill splitting & auto-calculation',
      'WhatsApp rent & bill reminders',
      'Your own branded mini website',
      'Multi-branch dashboard',
      'Tenant & room management',
      'Direct WhatsApp support',
    ],
    highlight: false,
    whatsappUrl: waLink("Hi! I'm interested in the Monthly plan (Rs 8,000/branch) for Pulse HMS. Can you share more details?"),
  },
  {
    name: 'Annual',
    price: 'Rs 80,000',
    period: 'per branch / year',
    description: '2 months free — save Rs 16,000',
    features: [
      'AC bill splitting & auto-calculation',
      'WhatsApp rent & bill reminders',
      'Your own branded mini website',
      'Multi-branch dashboard',
      'Tenant & room management',
      'Direct WhatsApp support',
    ],
    highlight: true,
    whatsappUrl: waLink("Hi! I'm interested in the Annual plan (Rs 80,000/branch) for Pulse HMS. Can you share more details?"),
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            One price per branch. No hidden fees, no setup cost.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
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
                  BEST VALUE
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">
                  {plan.name}
                </h3>
                <p className="text-foreground/60 mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="text-4xl font-bold">
                    {plan.price}
                  </div>
                  <p className="text-foreground/60 text-sm mt-1">
                    {plan.period}
                  </p>
                </div>

                <Button
                  size="lg"
                  className={`w-full mb-8 ${
                    plan.highlight
                      ? 'bg-primary hover:bg-primary/90'
                      : 'border border-primary text-primary hover:bg-primary/10 bg-transparent'
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                  nativeButton={false}
                  render={<a href={plan.whatsappUrl} target="_blank" rel="noopener noreferrer" />}
                >
                  Get Started
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
