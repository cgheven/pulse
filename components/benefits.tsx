import { TrendingUp, Zap, Users, Smile, Smartphone, Building2 } from 'lucide-react'
import { SIGN_UP_URL } from '@/lib/site'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Clearer occupancy and rent control',
    stats: 'See vacancies and arrears early',
    description: 'Rent and occupancy management that helps you fill rooms and follow up on outstanding balances.',
  },
  {
    icon: Zap,
    title: 'Less admin each week',
    stats: 'Automate billing and reminders',
    description: 'Cut repetitive work with automated billing, notifications, and reports so staff can focus on residents.',
  },
  {
    icon: Users,
    title: 'Better resident communication',
    stats: 'One place for tenants and staff',
    description: 'Resident and tenant management with a complaint portal so issues are logged, assigned, and resolved.',
  },
  {
    icon: Smile,
    title: 'Straightforward to run',
    stats: 'Live in 24 hours',
    description: 'An interface built for operators — no technical team required to manage day-to-day operations.',
  },
  {
    icon: Smartphone,
    title: 'Manage from anywhere',
    stats: 'Full web access on mobile',
    description: 'Check occupancy, payments, and tasks from a phone or laptop while you are on site.',
  },
  {
    icon: Building2,
    title: 'Built for multiple sites',
    stats: 'One dashboard, every property',
    description: 'Student accommodation management and HMO management software that scales from one house to a portfolio.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why Accommodation Businesses Choose PulseHub
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
            Built for UK hostel operators, co-living operators, guest houses, and small accommodation businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 motion-reduce:transition-none"
              >
                <div className="mb-4 p-4 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors motion-reduce:transition-none">
                  <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-primary font-semibold text-sm mb-3">
                  {benefit.stats}
                </p>
                <p className="text-foreground/60">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Manage Every Property From One Platform
            </h2>
            <p className="text-lg text-foreground/70">
              Co-living management software and multi-property accommodation management in a single PulseHub workspace — rooms, residents, staff, and billing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#pricing"
                className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                View PulseHub pricing
              </a>
              <a
                href={SIGN_UP_URL}
                className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Start your free trial
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-transparent to-primary/10 border border-primary/20 rounded-2xl p-8 sm:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-foreground/70 mb-4">
                &quot;Switching to Pulse HMS was the best decision for our hostel. We cut our management time in half and increased bookings by 40%.&quot;
              </p>
              <p className="font-semibold text-foreground">
                — Adeel, Owner of Chohan Executive Boys Hostel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
