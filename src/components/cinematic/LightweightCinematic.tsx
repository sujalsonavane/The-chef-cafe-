import { useEffect } from 'react'

interface LightweightCinematicProps {
  onReady?: () => void
}

/**
 * Lightweight 2D/2.5D Experience Placeholder.
 * Mounts for mobile and devices unsuitable for the 650vh Three.js desktop track.
 * Does NOT import Three.js, shaders, or 3D geometry.
 */
export function LightweightCinematic({ onReady }: LightweightCinematicProps) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <section className="lightweight-cinematic" aria-label="The Chef Cafe Introduction">
      <div className="lightweight-cinematic__stage">
        <div className="lightweight-cinematic__brand">
          <span className="lightweight-cinematic__eyebrow">Est. 2024 · Vashi, Navi Mumbai</span>
          <h1 className="lightweight-cinematic__title">The Chef Cafe</h1>
          <p className="lightweight-cinematic__tagline">Food • Music • Dining • Moments</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=The+Chef+Cafe+Spire+Tower+Sector+19D+Vashi+Navi+Mumbai"
            target="_blank"
            rel="noopener noreferrer"
            className="cinematic-location-pointer"
            title="Open The Chef Cafe on Google Maps"
            style={{ marginTop: '1.2rem', pointerEvents: 'auto' }}
          >
            <svg
              className="location-pin-icon"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span>Sector 19D, Vashi · Navi Mumbai</span>
            <span className="location-pointer-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
