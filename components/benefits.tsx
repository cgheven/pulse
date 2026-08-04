'use client'

import { TrendingUp, Zap, Users, Smile, Smartphone, Building2 } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Increase Revenue',
    stats: 'Up to 35% higher occupancy rates',
    description: 'Optimize pricing and reduce vacancies with intelligent room management.',
  },
  {
    icon: Zap,
    title: 'Save Time',
    stats: 'Save 20+ hours per week',
    description: 'Automate repetitive tasks and focus on guest experience.',
  },
  {
    icon: Users,
    title: 'Clients Satisfaction',
    stats: '40% fewer complaints',
    description: 'Streamlined operations lead to happier guests and better reviews.',
  },
  {
    icon: Smile,
    title: 'Easy to Use',
    stats: 'Setup in under 1 hour',
    description: 'Intuitive interface requiring no technical knowledge.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Access',
    stats: 'Manage on the go',
    description: 'Full functionality on iOS and Android devices.',
  },
  {
    icon: Building2,
    title: 'Multi-Branch Control',
    stats: 'One dashboard, every branch',
    description: 'Track rent, occupancy, and staff across all your branches from a single place.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Why Hostels Love Pulse HMS
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real benefits that impact your bottom line
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 p-4 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
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

        <div className="mt-16 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 border border-primary/20 rounded-2xl p-12">
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
    </section>
  )
}
