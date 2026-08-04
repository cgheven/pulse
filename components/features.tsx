'use client'

import { Calendar, Users, BarChart3, Clock, Shield, Zap, PieChart, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: Calendar,
    title: 'Smart Booking System',
    description: 'Automated reservation management with intelligent room allocation and occupancy tracking.',
  },
  {
    icon: Users,
    title: 'Guest Management',
    description: 'Comprehensive guest profiles with check-in/check-out automation and communication tools.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time dashboards with key metrics, revenue insights, and performance analytics.',
  },
  {
    icon: Clock,
    title: 'Staff Management',
    description: 'Schedule staff shifts, manage tasks, and track productivity with ease.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with role-based access control and audit trails.',
  },
  {
    icon: Zap,
    title: 'Automation Tools',
    description: 'Reduce manual work with automated billing, notifications, and reporting.',
  },
  {
    icon: PieChart,
    title: 'Financial Tracking',
    description: 'Invoice management, expense tracking, and revenue reporting in one place.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Rent Reminders',
    description: 'Automated WhatsApp reminders for rent and AC bills, so you never have to chase tenants.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Powerful Features Built for Success
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Everything you need to run your hostel efficiently and profitably
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
