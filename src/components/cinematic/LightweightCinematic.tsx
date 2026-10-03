import { useEffect } from 'react'

interface LightweightCinematicProps {
  onReady?: () => void
  onOpenMenuPage?: () => void
  onBookTable?: () => void
}

/**
 * Lightweight 2D/2.5D Mobile Experience.
 * Beautiful mobile hero featuring The Chef Cafe official crest, location, and quick actions.
 */
export function LightweightCinematic({ onReady, onOpenMenuPage, onBookTable }: LightweightCinematicProps) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <section className="lightweight-cinematic" aria-label="The Chef Cafe Introduction">
      <div className="lightweight-cinematic__stage">
        <div className="lightweight-cinematic__brand">
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

          {(onOpenMenuPage || onBookTable) && (
            <div className="lightweight-cinematic__actions">
              {onOpenMenuPage && (
                <button
                  type="button"
                  onClick={onOpenMenuPage}
                  className="btn btn-outline"
                >
                  Explore Menu
                </button>
              )}
              {onBookTable && (
                <button
                  type="button"
                  onClick={onBookTable}
                  className="btn btn-primary"
                >
                  Book a Table
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
