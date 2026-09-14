import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  SIGN_IN_URL,
  SIGN_UP_URL,
  WHATSAPP_URL,
} from '@/lib/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 group min-w-0">
              <Image
                src="/logo.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg">Pulse</span>
                <span className="text-[10px] font-semibold tracking-[0.15em] text-primary">
                  PULSE OF YOUR BUSINESS
                </span>
              </div>
            </Link>
            <p className="text-sm text-foreground/60 max-w-xs">
              Hostel management software for UK accommodation businesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors inline-flex min-h-11 items-center">
                  Explore hostel management features
                </Link>
              </li>
              <li>
                <Link href="#benefits" className="hover:text-primary transition-colors inline-flex min-h-11 items-center">
                  Why choose PulseHub
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary transition-colors inline-flex min-h-11 items-center">
                  View PulseHub pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href={SIGN_IN_URL} className="hover:text-primary transition-colors inline-flex min-h-11 items-center">
                  Sign in
                </a>
              </li>
              <li>
                <a href={SIGN_UP_URL} className="hover:text-primary transition-colors inline-flex min-h-11 items-center">
                  Start free trial
                </a>
              </li>
            </ul>
          </div>

          <div id="contact" className="scroll-mt-20">
            <h3 className="font-semibold mb-4">Contact us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-primary transition-colors">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors inline-flex min-h-11 items-center"
                >
                  Contact the PulseHub team on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>
            © {currentYear} PulseHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
