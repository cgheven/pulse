'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const WHATSAPP_URL = `https://wa.me/923336673553?text=${encodeURIComponent(
  "Hi! I'm interested in Pulse HMS for my hostel. Can you share more details?"
)}`
const SIGN_IN_URL = 'https://hostel.yourpulse.io/'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Pulse Logo"
              width={44}
              height={44}
              className="h-11 w-11 rounded-xl"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-foreground">Pulse</span>
              <span className="text-[10px] font-semibold tracking-[0.15em] text-primary">
                PULSE OF YOUR BUSINESS
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10"
              nativeButton={false}
              render={<a href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer" />}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90"
              nativeButton={false}
              render={<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />}
            >
              Get Started
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            <Link href="#features" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Features
            </Link>
            <Link href="#benefits" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Benefits
            </Link>
            <Link href="#pricing" className="block text-sm font-medium text-foreground/70 hover:text-foreground">
              Pricing
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              Contact
            </Link>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-primary text-primary hover:bg-primary/10"
                nativeButton={false}
                render={<a href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer" />}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90"
                nativeButton={false}
                render={<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
