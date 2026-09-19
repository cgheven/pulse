'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackDemoSubmitted } from '@/lib/analytics'
import { BOOK_DEMO_ENDPOINT } from '@/lib/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground/80'

export function BookDemoForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [minDate, setMinDate] = useState('')

  // Set the date floor on the client to avoid an SSR/CSR hydration mismatch.
  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10))
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return
    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      contactName: String(data.get('contactName') ?? '').trim(),
      businessName: String(data.get('businessName') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      city: String(data.get('city') ?? '').trim(),
      propertyCount: String(data.get('propertyCount') ?? '').trim(),
      preferredDate: String(data.get('preferredDate') ?? '').trim(),
      preferredTime: String(data.get('preferredTime') ?? '').trim(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: String(data.get('message') ?? '').trim(),
      contactRef2: String(data.get('contactRef2') ?? ''), // honeypot, must stay empty
    }

    setStatus('submitting')
    setError(null)

    try {
      const res = await fetch(BOOK_DEMO_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json().catch(() => ({}))
      if (res.ok && result?.success) {
        trackDemoSubmitted()
        setStatus('success')
        form.reset()
        return
      }
      setError(typeof result?.error === 'string' ? result.error : 'Something went wrong. Please try again.')
      setStatus('error')
    } catch {
      setError('Something went wrong. Please try again, or email hello@yourpulse.io.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-primary/30 bg-card p-8 text-center sm:p-10">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h2 className="font-display text-2xl font-medium tracking-tight">Thanks, your demo request is in.</h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          We will be in touch to confirm a time that works for you. If you included a preferred date and time,
          we will do our best to match it.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contactName" className={labelClass}>Your name <span className="text-primary">*</span></label>
          <input id="contactName" name="contactName" type="text" required maxLength={100} autoComplete="name" className={fieldClass} placeholder="e.g. Ahmed Khan" />
        </div>
        <div>
          <label htmlFor="businessName" className={labelClass}>Business or property name <span className="text-primary">*</span></label>
          <input id="businessName" name="businessName" type="text" required maxLength={150} autoComplete="organization" className={fieldClass} placeholder="e.g. Al-Noor Hostel" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone or WhatsApp <span className="text-primary">*</span></label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} placeholder="e.g. 0300 1234567" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" maxLength={254} autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>City or country</label>
          <input id="city" name="city" type="text" maxLength={100} className={fieldClass} placeholder="e.g. Lahore, Pakistan" />
        </div>
        <div>
          <label htmlFor="propertyCount" className={labelClass}>Number of properties</label>
          <input id="propertyCount" name="propertyCount" type="number" min={1} max={999} className={fieldClass} placeholder="e.g. 3" />
        </div>
        <div>
          <label htmlFor="preferredDate" className={labelClass}>Preferred date</label>
          <input id="preferredDate" name="preferredDate" type="date" min={minDate} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelClass}>Preferred time</label>
          <input id="preferredTime" name="preferredTime" type="time" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Anything you would like us to know?</label>
        <textarea id="message" name="message" rows={4} maxLength={1000} className={fieldClass} placeholder="e.g. Managing 3 branches, around 60 rooms." />
      </div>

      {/* Honeypot: hidden and off-screen, must stay empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="contactRef2">Do not fill this in</label>
        <input id="contactRef2" name="contactRef2" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && error ? (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-base text-destructive">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90 disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending…' : 'Book my demo'}
        </Button>
        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">No card required · a real person will follow up</p>
      </div>
    </form>
  )
}
