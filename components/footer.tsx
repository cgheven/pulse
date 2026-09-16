import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import {
  CONTACT_EMAIL,
  PRIVACY_URL,
  TERMS_URL,
} from '@/lib/site'
import { routes, solutionLinks } from '@/lib/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:py-16">
          <div className="col-span-2">
            <Link href="/" className="mb-3 flex items-center gap-3">
              <Image src="/logo.png" alt="" width={44} height={44} className="h-10 w-10 rounded-xl sm:h-11 sm:w-11" />
              <span className="text-lg font-bold">PulseHub</span>
            </Link>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              One platform for room-based operators — properties, rooms, residents, rent and daily
              operations, across every site.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
              HMO · Student · Co-living · Hostels
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Product</p>
            <ul className="space-y-1 text-[15px] text-muted-foreground">
              <li><Link href={routes.features} className="inline-flex min-h-10 items-center hover:text-primary">Features</Link></li>
              <li><Link href={routes.pricing} className="inline-flex min-h-10 items-center hover:text-primary">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Solutions</p>
            <ul className="space-y-1 text-[15px] text-muted-foreground">
              {solutionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-primary">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="mb-3 text-sm font-semibold">Company</p>
            <ul className="space-y-1 text-[15px] text-muted-foreground">
              <li><Link href={routes.about} className="inline-flex min-h-10 items-center hover:text-primary">About</Link></li>
              <li><Link href={routes.contact} className="inline-flex min-h-10 items-center hover:text-primary">Contact</Link></li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-10 items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="break-all">{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 text-[15px] text-muted-foreground sm:flex-row sm:items-center sm:py-8">
          <p>© {currentYear} PulseHub. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={PRIVACY_URL} className="inline-flex min-h-10 items-center hover:text-primary">Privacy Policy</a>
            <a href={TERMS_URL} className="inline-flex min-h-10 items-center hover:text-primary">Terms of Service</a>
            <Link href={routes.cookies} className="inline-flex min-h-10 items-center hover:text-primary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
