'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react'
import { SignInButton, StartTrialButton } from '@/components/tracked-cta'
import { primaryNav, solutionLinks } from '@/lib/navigation'
import { OTHER_PRODUCTS } from '@/lib/site'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  function close() {
    setIsOpen(false)
    setSolutionsOpen(false)
    setProductsOpen(false)
  }

  return (
    <header
      className="fixed z-50 w-full max-w-full overflow-x-clip border-b border-border bg-background/95 backdrop-blur-sm"
      style={{ top: 'var(--promo-h)' }}
    >
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
              <span className="hidden font-mono text-[10px] font-medium tracking-[0.14em] text-primary sm:block">
                ACCOMMODATION MANAGEMENT
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
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
                  <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    One platform · by use case
                  </p>
                  {solutionLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      onClick={close}
                    >
                      {item.menuLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {primaryNav.map((item) =>
              item.highlight ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">New</span>
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-sm text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-expanded={productsOpen}
                aria-controls="products-menu"
                onClick={() => setProductsOpen((open) => !open)}
                onBlur={(event) => {
                  if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) {
                    setProductsOpen(false)
                  }
                }}
              >
                More Products
                <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {productsOpen && (
                <div
                  id="products-menu"
                  className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-card p-2 shadow-lg"
                >
                  <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    More from Pulse
                  </p>
                  {OTHER_PRODUCTS.map((product) => (
                    <a
                      key={product.url}
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      onClick={close}
                    >
                      {product.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
            <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">One platform · by use case</p>
            {solutionLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="block min-h-11 py-2 text-[15px] font-medium text-foreground/80">
                {item.menuLabel}
              </Link>
            ))}
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={item.highlight ? 'flex min-h-11 items-center gap-1.5 py-2 text-[15px] font-semibold text-primary' : 'block min-h-11 py-2 text-sm font-medium text-foreground/80'}
              >
                {item.highlight ? <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                {item.label}
                {item.highlight ? <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">New</span> : null}
              </Link>
            ))}
            <p className="pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">More from Pulse</p>
            {OTHER_PRODUCTS.map((product) => (
              <a key={product.url} href={product.url} target="_blank" rel="noopener noreferrer" onClick={close} className="block min-h-11 py-2 text-[15px] font-medium text-foreground/80">
                {product.name}
              </a>
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
