'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { SignInButton, StartTrialButton } from '@/components/tracked-cta'
import { primaryNav, solutionLinks } from '@/lib/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  function close() {
    setIsOpen(false)
    setSolutionsOpen(false)
  }

  return (
    <header className="fixed top-0 z-50 w-full max-w-full overflow-x-clip border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={close}>
            <Image
              src="/logo.png"
              alt="PulseHub"
              width={44}
              height={44}
              className="h-9 w-9 shrink-0 rounded-xl sm:h-11 sm:w-11"
              priority
            />
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="text-base font-bold text-foreground sm:text-lg">PulseHub</span>
              <span className="hidden text-[10px] font-semibold tracking-[0.12em] text-primary sm:block">
                ACCOMMODATION MANAGEMENT
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <Link href="/features" className="rounded-sm text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Features
            </Link>
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-expanded={solutionsOpen}
                aria-controls="solutions-menu"
                onClick={() => setSolutionsOpen((open) => !open)}
                onBlur={(event) => {
                  if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) {
                    setSolutionsOpen(false)
                  }
                }}
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {solutionsOpen && (
                <div
                  id="solutions-menu"
                  className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-card p-2 shadow-lg"
                >
                  {solutionLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 hover:bg-muted"
                      onClick={close}
                    >
                      <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                      <span className="block text-xs text-foreground/60">{item.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {primaryNav.filter((item) => item.label !== 'Features').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <SignInButton
              location="header"
              size="sm"
              className="min-h-9 border-primary px-3 text-primary hover:bg-primary/10"
            />
            <StartTrialButton
              location="header"
              size="sm"
              className="min-h-9 bg-primary px-3 hover:bg-primary/90"
            />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <StartTrialButton
              location="header"
              size="sm"
              className="min-h-9 bg-primary px-3 hover:bg-primary/90"
            >
              Free Trial
            </StartTrialButton>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-50 space-y-1 border-b border-border bg-background px-4 py-4 shadow-lg sm:px-6 lg:hidden"
          >
            <Link href="/features" onClick={close} className="block min-h-11 py-2 text-sm font-medium text-foreground/80">
              Features
            </Link>
            <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">Solutions</p>
            {solutionLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="block min-h-11 py-2 text-sm font-medium text-foreground/80">
                {item.label}
              </Link>
            ))}
            {primaryNav.filter((item) => item.label !== 'Features').map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="block min-h-11 py-2 text-sm font-medium text-foreground/80">
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <SignInButton
                location="header"
                className="min-h-11 border-primary text-primary hover:bg-primary/10"
              />
              <StartTrialButton location="header" className="min-h-11 bg-primary hover:bg-primary/90" />
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
