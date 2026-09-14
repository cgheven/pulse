'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { SIGN_IN_URL, SIGN_UP_URL } from '@/lib/site'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
] as const

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            <Image
              src="/logo.png"
              alt="PulseHub"
              width={44}
              height={44}
              className="h-11 w-11 rounded-xl shrink-0"
              priority
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-lg font-bold text-foreground">Pulse</span>
              <span className="hidden sm:block text-[10px] font-semibold tracking-[0.15em] text-primary truncate">
                PULSE OF YOUR BUSINESS
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10 min-h-9 px-3"
              nativeButton={false}
              render={<a href={SIGN_IN_URL} />}
            >
              Sign in
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 min-h-9 px-3"
              nativeButton={false}
              render={<a href={SIGN_UP_URL} />}
            >
              Start free trial
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="lg:hidden pb-4 space-y-3 border-t border-border pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block min-h-11 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-primary text-primary hover:bg-primary/10 min-h-11"
                nativeButton={false}
                render={<a href={SIGN_IN_URL} />}
              >
                Sign in
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90 min-h-11"
                nativeButton={false}
                render={<a href={SIGN_UP_URL} />}
              >
                Start free trial
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
