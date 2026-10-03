import { useEffect } from 'react'

interface ReducedMotionCinematicProps {
  onReady?: () => void
}

/**
 * Accessible Reduced-Motion Experience Component.
 * Mounts when the user has enabled prefers-reduced-motion: reduce at the OS level.
 * Renders static, calm typography without motion or 3D loops.
 */
export function ReducedMotionCinematic({ onReady }: ReducedMotionCinematicProps) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <section className="reduced-motion-cinematic" aria-label="The Chef Cafe Introduction">
      <div className="reduced-motion-cinematic__stage">
        <div className="reduced-motion-cinematic__brand">
          <div className="lightweight-cinematic__logo-badge">
            <img
              src="/logo-256.png"
              alt="The Chef Cafe crest"
              className="lightweight-cinematic__logo-img"
              width={76}
              height={76}
              loading="eager"
              decoding="async"
            />
          </div>
          <span className="reduced-motion-cinematic__eyebrow">Est. 2024 · Vashi, Navi Mumbai</span>
          <h1 className="reduced-motion-cinematic__title">The Chef Cafe</h1>
          <p className="reduced-motion-cinematic__tagline">Food • Music • Dining • Moments</p>
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
