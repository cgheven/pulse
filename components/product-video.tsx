'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function ProductVideo({
  src,
  width,
  height,
  ariaLabel,
  className,
  label,
}: {
  src: string
  width: number
  height: number
  ariaLabel: string
  className?: string
  label?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const playIfAllowed = () => {
      if (motionQuery.matches) {
        video.pause()
        return
      }
      void video.play().catch(() => {
        // Autoplay can be blocked until the clip is muted and in view.
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          playIfAllowed()
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(video)

    const onMotionChange = () => {
      if (motionQuery.matches) {
        video.pause()
      }
    }

    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      observer.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <div className={cn('w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-[0_28px_70px_-28px_rgb(0_0_0/0.30)]', className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
        {label ? (
          <span className="ml-2 truncate font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
        ) : null}
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        width={width}
        height={height}
        className="h-auto w-full max-w-full object-contain"
        style={{ aspectRatio: `${width} / ${height}` }}
        aria-label={ariaLabel}
      >
        <source src={src} type="video/mp4" />
        {ariaLabel}
      </video>
    </div>
  )
}
