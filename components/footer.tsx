import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  PRIVACY_URL,
  TERMS_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  YOUTUBE_URL,
} from '@/lib/site'
import { routes, solutionLinks } from '@/lib/navigation'

/** Shorter labels for the two longest solution names, so the footer column stays one line each. */
const FOOTER_SOLUTION_LABELS: Record<string, string> = {
  [routes.student]: 'Student Housing',
  [routes.coliving]: 'Co-Living',
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-7 lg:gap-x-6 lg:gap-y-10 lg:py-16">
          <div className="col-span-2">
            <Link href="/" className="mb-3 flex items-center gap-3">
              <Image src="/logo.png" alt="" width={44} height={44} className="h-10 w-10 rounded-xl sm:h-11 sm:w-11" />
              <span className="text-lg font-bold">PulseHub</span>
            </Link>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              One platform for room-based operators: properties, rooms, residents, rent and daily
              operations, across every site.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
              HMO · Student · Co-living · Hostels
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-flex min-h-10 items-center gap-2 text-[15px] text-muted-foreground hover:text-primary">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">{CONTACT_EMAIL}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-10 items-center gap-2 text-[15px] text-muted-foreground hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="whitespace-nowrap">{WHATSAPP_DISPLAY}</span>
            </a>
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
                  <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-primary">{FOOTER_SOLUTION_LABELS[item.href] ?? item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="mb-3 text-sm font-semibold">Company</p>
            <ul className="space-y-1 text-[15px] text-muted-foreground">
              <li><Link href={routes.about} className="inline-flex min-h-10 items-center hover:text-primary">About</Link></li>
              <li><Link href={routes.blog} className="inline-flex min-h-10 items-center hover:text-primary">Blog</Link></li>
              <li><Link href={routes.contact} className="inline-flex min-h-10 items-center hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <p className="mb-3 text-sm font-semibold">Markets</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[15px] text-muted-foreground">
              <li><Link href={routes.us} className="inline-flex min-h-10 items-center hover:text-primary">United States</Link></li>
              <li><Link href={routes.uk} className="inline-flex min-h-10 items-center hover:text-primary">United Kingdom</Link></li>
              <li><Link href={routes.australia} className="inline-flex min-h-10 items-center hover:text-primary">Australia</Link></li>
              <li><Link href={routes.canada} className="inline-flex min-h-10 items-center hover:text-primary">Canada</Link></li>
              <li><Link href={routes.newZealand} className="inline-flex min-h-10 items-center hover:text-primary">New Zealand</Link></li>
              <li><Link href={routes.singapore} className="inline-flex min-h-10 items-center hover:text-primary">Singapore</Link></li>
              <li><Link href={routes.malaysia} className="inline-flex min-h-10 items-center hover:text-primary">Malaysia</Link></li>
              <li><Link href={routes.uae} className="inline-flex min-h-10 items-center hover:text-primary">UAE</Link></li>
              <li><Link href={routes.pakistan} className="inline-flex min-h-10 items-center hover:text-primary">Pakistan</Link></li>
              <li><Link href={routes.philippines} className="inline-flex min-h-10 items-center hover:text-primary">Philippines</Link></li>
              <li><Link href={routes.india} className="inline-flex min-h-10 items-center hover:text-primary">India</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 text-[15px] text-muted-foreground sm:flex-row sm:items-center sm:py-8">
          <p>© {currentYear} PulseHub. All rights reserved.</p>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">LinkedIn</a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">YouTube</a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-primary">Facebook</a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={PRIVACY_URL} className="inline-flex min-h-10 items-center hover:text-primary">Privacy Policy</a>
              <a href={TERMS_URL} className="inline-flex min-h-10 items-center hover:text-primary">Terms of Service</a>
              <Link href={routes.cookies} className="inline-flex min-h-10 items-center hover:text-primary">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
