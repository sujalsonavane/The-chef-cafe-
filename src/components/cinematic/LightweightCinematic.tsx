import { useEffect } from 'react'
import { CornerFlourish } from './CornerFlourish'

interface LightweightCinematicProps {
  onReady?: () => void
  onOpenMenuPage?: () => void
  onBookTable?: () => void
}

/**
 * Lightweight Theatrical Mobile Experience.
 * Matches the reference image aesthetic with the red curtain backdrop,
 * Victorian corner flourishes, and centered hero composition.
 */
export function LightweightCinematic({ onReady, onOpenMenuPage, onBookTable }: LightweightCinematicProps) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <section className="lightweight-cinematic" aria-label="The Chef Cafe Introduction">
      {/* ─── GOLDEN INSET FRAME & ORNATE VICTORIAN CORNER FLOURISHES ─── */}
      <div className="curtain-stage-frame" aria-hidden="true">
        <div className="curtain-corner-flourish curtain-corner--tl">
          <CornerFlourish />
        </div>
        <div className="curtain-corner-flourish curtain-corner--tr">
          <CornerFlourish />
        </div>
        <div className="curtain-corner-flourish curtain-corner--bl">
          <CornerFlourish />
        </div>
        <div className="curtain-corner-flourish curtain-corner--br">
          <CornerFlourish />
        </div>
        <div className="curtain-frame-border" />
      </div>

      {/* ─── GOLDEN SPARKLE STAR (Lower-Right) ─── */}
      <div className="curtain-sparkle-star" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
      </div>

      <div className="lightweight-cinematic__stage">
        {/* ─── CENTER HERO COMPOSITION ─── */}
        <div className="cinematic-hero-stack">
          {/* 1. Cafe Logo Medallion with Golden Halo */}
          <div className="curtain-logo-crest">
            <div className="curtain-logo-crest__halo" aria-hidden="true" />
            <img
              src="/logo-256.png"
              alt="The Chef Cafe crest"
              className="curtain-logo-crest__img"
              width={78}
              height={78}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* 2. Eyebrow: ✦ VASHI · NAVI MUMBAI ✦ */}
          <span className="curtain-hero-eyebrow">
            ✦&nbsp;&nbsp;VASHI · NAVI MUMBAI&nbsp;&nbsp;✦
          </span>

          {/* 3. Flanked Row: [ ✦ TANDOORI KITCHEN ] · Est. 2024 · [ ✦ AL FRESCO DINING ] */}
          <div className="curtain-flanked-row" role="list" aria-label="Highlights">
            <span className="curtain-flank-pill" role="listitem">
              <span className="flank-pill-star" aria-hidden="true">✦</span>
              <span>TANDOORI KITCHEN</span>
            </span>
            <span className="curtain-flank-center">
              <span className="flank-dot" aria-hidden="true">·</span>
              <span className="flank-year">Est. 2024</span>
              <span className="flank-dot" aria-hidden="true">·</span>
            </span>
            <span className="curtain-flank-pill" role="listitem">
              <span className="flank-pill-star" aria-hidden="true">✦</span>
              <span>AL FRESCO DINING</span>
            </span>
          </div>

          {/* 4. Subtitle: A Stage for Unforgettable Dining */}
          <p className="curtain-hero-tagline">
            A Stage for Unforgettable Dining
          </p>

          {/* 5. Classical Serif Main Title with 3D drop shadow */}
          <h1 className="cinematic-title" aria-label="The Chef Cafe">
            <span className="title-part title-part--left">THE CHEF</span>
            <span className="title-spacer" aria-hidden="true">&nbsp;</span>
            <span className="title-part title-part--right">CAFE</span>
          </h1>

          {/* 6. Diamond Separator */}
          <div className="curtain-diamond-separator" aria-hidden="true">
            ◆
          </div>

          {/* 7. Location Pill */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=The+Chef+Cafe+Spire+Tower+Sector+19D+Vashi+Navi+Mumbai"
            target="_blank"
            rel="noopener noreferrer"
            className="cinematic-location-pointer"
            title="Open The Chef Cafe on Google Maps"
            aria-label="Open The Chef Cafe location on Google Maps"
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

          {/* Actions */}
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

          {/* 8. Scroll Indicator */}
          <p className="cinematic-scroll-indicator">
            — SCROLL TO ENTER —
          </p>
        </div>
      </div>
    </section>
  )
}
