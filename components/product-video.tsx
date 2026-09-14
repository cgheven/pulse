'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function ProductVideo({
  src,
  width,
  height,
  ariaLabel,
  className,
}: {
  src: string
  width: number
  height: number
  ariaLabel: string
  className?: string
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
    <div className={cn('w-full min-w-0 overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl shadow-primary/10', className)}>
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
