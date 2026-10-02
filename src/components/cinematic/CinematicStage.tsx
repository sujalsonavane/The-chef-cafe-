import { lazy, Suspense } from 'react'
import { getExperience, type ExperienceMode, type Experience } from '../../utils/experience'
import { LightweightCinematic } from './LightweightCinematic'
import { ReducedMotionCinematic } from './ReducedMotionCinematic'

// Dynamic lazy import: Non-3D users (mobile, reduced motion, non-WebGL)
// NEVER download or parse Three.js, shaders, or 3D desktop geometry.
const DesktopScene = lazy(() => import('../../scenes/desktop'))

/**
 * The single slot where the cinematic experience mounts.
 *
 * Routing:
 *   - 'FULL_CINEMATIC' → <DesktopScene/> (Three.js 3D curtain reveal + camera pass-through)
 *   - 'LIGHTWEIGHT'    → <LightweightCinematic/> (Fast 2D/2.5D brand introduction)
 *   - 'REDUCED_MOTION' → <ReducedMotionCinematic/> (Static accessible presentation)
 *
 * Priority:
 *   REDUCED_MOTION > LIGHTWEIGHT > FULL_CINEMATIC
 */
export function CinematicStage() {
  const mode: ExperienceMode = getExperience()

  if (mode === 'REDUCED_MOTION') {
    return <ReducedMotionCinematic />
  }

  if (mode === 'LIGHTWEIGHT') {
    return <LightweightCinematic />
  }

  return (
    <Suspense fallback={<div className="cinematic-stage-fallback" aria-hidden="true" />}>
      <DesktopScene />
    </Suspense>
  )
}

export type { ExperienceMode, Experience }