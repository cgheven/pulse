import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export const alt = 'Pulse HMS — Hostel Management, Simplified.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const logoData = await readFile(join(process.cwd(), 'public/logo.png'), 'base64')
const logoSrc = `data:image/png;base64,${logoData}`

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0b0b0d 0%, #1a1a1d 100%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={160} height={160} />
        <div
          style={{
            marginTop: 32,
            fontSize: 72,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: -1,
          }}
        >
          Pulse HMS
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: '#FFC107',
            fontWeight: 600,
          }}
        >
          Hostel Management, Simplified.
        </div>
      </div>
    ),
    { ...size }
  )
}
