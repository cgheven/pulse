'use client'

import { useEffect } from 'react'
import { trackSolutionPageViewed } from '@/lib/analytics'

export function SolutionPageView({ path }: { path: string }) {
  useEffect(() => {
    trackSolutionPageViewed(path)
  }, [path])

  return null
}
