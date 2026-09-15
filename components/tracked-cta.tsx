'use client'

import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { trackSignIn, trackStartTrial, type CtaLocation } from '@/lib/analytics'
import { SIGN_IN_URL, SIGN_UP_URL } from '@/lib/site'

type ButtonSize = 'sm' | 'lg' | 'default'
type ButtonVariant = 'default' | 'outline'

export function StartTrialButton({
  location,
  className,
  size = 'default',
  variant = 'default',
  children = 'Start Free Trial',
}: {
  location: CtaLocation
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
  children?: ReactNode
}) {
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      nativeButton={false}
      render={
        <a
          href={SIGN_UP_URL}
          onClick={() => {
            trackStartTrial(location)
          }}
        />
      }
    >
      {children}
    </Button>
  )
}

export function SignInButton({
  location,
  className,
  size = 'default',
  variant = 'outline',
  children = 'Sign in',
}: {
  location: CtaLocation
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
  children?: ReactNode
}) {
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      nativeButton={false}
      render={
        <a
          href={SIGN_IN_URL}
          onClick={() => {
            trackSignIn(location)
          }}
        />
      }
    >
      {children}
    </Button>
  )
}
