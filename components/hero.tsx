'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                <span className="block">Hostel Management,</span>
                <span className="block text-primary">Simplified.</span>
              </h1>

              <p className="text-xl text-foreground/70 leading-relaxed max-w-lg">
                Advanced hostel management system designed to streamline operations, increase efficiency, and boost your bottom line with real-time monitoring and intelligent automation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
                nativeButton={false}
                render={
                  <a
                    href="https://najam.hostels.yourpulse.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                See Your Website
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                nativeButton={false}
                render={
                  <a
                    href="https://www.youtube.com/watch?v=FQa7F3eBf0A&list=PLZBaLnheMcj0"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary">24 Hrs</p>
                <p className="text-sm text-foreground/60">From Sign-up to Live</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-sm text-foreground/60">Customer Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-sm text-foreground/60">Expert Support</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
            <div className="relative rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden">
              <Image
                src="/dashboard-preview.png"
                alt="Pulse HMS dashboard showing net profit, collected rent, outstanding payments, and revenue trends"
                width={3022}
                height={1658}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
