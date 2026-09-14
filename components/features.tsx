import { Building2, Users, BarChart3, Shield, Wrench, Zap, Wallet, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: Wallet,
    title: 'Rent and occupancy management',
    description: 'Track rooms, beds, rent, deposits, and occupancy so you always know what is due and what is vacant.',
  },
  {
    icon: Users,
    title: 'Resident and tenant management',
    description: 'Keep resident and tenant records, check-ins, and communication in one place for every property.',
  },
  {
    icon: BarChart3,
    title: 'Reports and operational insights',
    description: 'See collections, outstanding balances, and occupancy trends without exporting spreadsheets.',
  },
  {
    icon: Shield,
    title: 'Staff and permissions',
    description: 'Give managers the right access per property, with role-based permissions and a clear audit trail.',
  },
  {
    icon: Wrench,
    title: 'Maintenance and complaints',
    description: 'Log maintenance and resident complaints, assign follow-up, and close the loop from one portal.',
  },
  {
    icon: Zap,
    title: 'Accommodation billing software',
    description: 'Automate rent and bill runs, reminders, and reconciliation so finance work stays consistent.',
  },
  {
    icon: Building2,
    title: 'Multi-property accommodation management',
    description: 'Run hostels, HMOs, and co-living sites from a single dashboard instead of separate systems.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp rent reminders',
    description: 'Send automated WhatsApp reminders for rent and bills so your team spends less time chasing payments.',
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Powerful Features for Hostel and Accommodation Management
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
            Property management for hostels and student accommodation — residents, rooms, billing, and staff in one platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 motion-reduce:transition-none"
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors motion-reduce:transition-none">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
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
