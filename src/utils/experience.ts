import { detectCapabilities, type Capabilities } from './featureDetect'

/**
 * Three conceptual experience tiers:
 *   - FULL_CINEMATIC : Full Three.js 3D curtain + camera pass-through (desktop capable)
 *   - LIGHTWEIGHT    : Responsive 2D / 2.5D experience for mobile and constrained devices
 *   - REDUCED_MOTION : Accessible, non-motion presentation respecting user OS preferences
 *
 * Strict Priority:
 *   REDUCED_MOTION > LIGHTWEIGHT > FULL_CINEMATIC
 */
export type ExperienceMode = 'FULL_CINEMATIC' | 'LIGHTWEIGHT' | 'REDUCED_MOTION'

// Backward-compatible alias for any existing references
export type Experience = ExperienceMode | 'cinematic' | 'mobile' | 'reduced'

export interface ExperienceDecision {
  mode: ExperienceMode
  reason: string
  capabilities: Capabilities
}

let cachedDecision: ExperienceDecision | null = null

/**
 * Evaluates the client's capabilities and returns the selected ExperienceMode with rationale.
 * Cached on initial evaluation to ensure stable page-load selection that does not thrash on resize.
 */
export function getExperienceDetails(): ExperienceDecision {
  if (cachedDecision) {
    return cachedDecision
  }

  // Developer / test override via URL query parameter (e.g. ?exp=lightweight or ?exp=reduced)
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    const params = new URLSearchParams(window.location.search)
    const override = params.get('experience') || params.get('exp')
    if (override) {
      const normalized = override.toUpperCase().replace('-', '_')
      if (normalized === 'REDUCED_MOTION' || normalized === 'REDUCED') {
        cachedDecision = {
          mode: 'REDUCED_MOTION',
          reason: 'Manual URL override (?exp=reduced)',
          capabilities: detectCapabilities(),
        }
        return cachedDecision
      }
      if (normalized === 'LIGHTWEIGHT' || normalized === 'MOBILE' || normalized === '2D') {
        cachedDecision = {
          mode: 'LIGHTWEIGHT',
          reason: 'Manual URL override (?exp=lightweight)',
          capabilities: detectCapabilities(),
        }
        return cachedDecision
      }
      if (normalized === 'FULL_CINEMATIC' || normalized === 'CINEMATIC' || normalized === '3D') {
        cachedDecision = {
          mode: 'FULL_CINEMATIC',
          reason: 'Manual URL override (?exp=cinematic)',
          capabilities: detectCapabilities(),
        }
        return cachedDecision
      }
    }
  }

  const caps = detectCapabilities()

  // ── Priority 1: User explicitly requests reduced motion ───────────────
  if (caps.reducedMotion) {
    cachedDecision = {
      mode: 'REDUCED_MOTION',
      reason: 'User preference: prefers-reduced-motion: reduce detected',
      capabilities: caps,
    }
    return cachedDecision
  }

  // ── Priority 2: WebGL unsupported or unavailable ─────────────────────
  if (!caps.webgl) {
    cachedDecision = {
      mode: 'LIGHTWEIGHT',
      reason: 'WebGL unsupported or context creation failed',
      capabilities: caps,
    }
    return cachedDecision
  }

  // ── Priority 3: Compact mobile viewport (< 768px) ───────────────────
  if (caps.isSmallViewport) {
    cachedDecision = {
      mode: 'LIGHTWEIGHT',
      reason: `Compact viewport (${caps.viewportWidth}px < 768px) unsuitable for 650vh desktop 3D track`,
      capabilities: caps,
    }
    return cachedDecision
  }

  // ── Priority 4: Severely constrained hardware ────────────────────────
  if (caps.isConstrainedHardware) {
    cachedDecision = {
      mode: 'LIGHTWEIGHT',
      reason: `Hardware constrained (${caps.hardwareConcurrency ?? 'unknown'} cores, ${caps.deviceMemory ?? 'unknown'}GB RAM)`,
      capabilities: caps,
    }
    return cachedDecision
  }

  // ── Priority 5: Full desktop 3D cinematic ────────────────────────────
  cachedDecision = {
    mode: 'FULL_CINEMATIC',
    reason: 'Capable device with WebGL support and standard motion preference',
    capabilities: caps,
  }
  return cachedDecision
}

/**
 * Returns the active ExperienceMode: 'FULL_CINEMATIC' | 'LIGHTWEIGHT' | 'REDUCED_MOTION'.
 */
export function getExperience(): ExperienceMode {
  return getExperienceDetails().mode
}

/**
 * Reset experience cache (for unit / automated test suites).
 */
export function resetExperienceCache(): void {
  cachedDecision = null
}

/**
 * Backward compatibility with existing foundation API.
 */
export function pickExperience(): ExperienceMode {
  return getExperience()
}

/**
 * Global constant determined at page load.
 */
export const EXPERIENCE: ExperienceMode = getExperience()