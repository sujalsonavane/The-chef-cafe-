import { useEffect } from 'react'
import type { ExperienceMode } from '../../utils/experience'

interface CinematicIntroProps {
  experience: ExperienceMode | 'cinematic' | 'mobile' | 'reduced'
  onCinematicReady?: () => void
}

/**
 * Legacy scaffold component from Step 1.
 * Retained for backwards compatibility; does not import Three.js or create renderers.
 */
export function CinematicIntro({ experience, onCinematicReady }: CinematicIntroProps) {
  useEffect(() => {
    onCinematicReady?.()
  }, [onCinematicReady])

  const label =
    experience === 'FULL_CINEMATIC' || experience === 'cinematic'
      ? 'Desktop 3D'
      : experience === 'LIGHTWEIGHT' || experience === 'mobile'
        ? 'Mobile 2D/2.5D'
        : 'Reduced motion'

  return (
    <div className="cinematic-stage__inner">
      <div className="cinematic-intro">
        <p className="eyebrow">The Chef Cafe · Vashi</p>
        <h1 className="cinematic-intro__title">A taste of what&nbsp;is&nbsp;to&nbsp;come</h1>
        <p className="cinematic-intro__lede">
          Cinematic opening sequence. The full 3D curtain reveal mounts from <code>src/scenes/desktop</code>.
        </p>
        <span className="cinematic-intro__badge" aria-hidden="true">
          {label}
        </span>
      </div>
    </div>
  )
}