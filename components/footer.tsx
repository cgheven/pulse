'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Pulse Logo"
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg">Pulse</span>
                <span className="text-[10px] font-semibold tracking-[0.15em] text-primary">
                  PULSE OF YOUR BUSINESS
                </span>
              </div>
            </Link>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Mail className="w-4 h-4" />
                <a href="mailto:mohammad.aamir@yourpulse.io" className="hover:text-primary transition-colors">
                  mohammad.aamir@yourpulse.io
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Phone className="w-4 h-4" />
                <a href="tel:+923336673553" className="hover:text-primary transition-colors">
                  +92 333 66 73553
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>
            © {currentYear} PulseHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
